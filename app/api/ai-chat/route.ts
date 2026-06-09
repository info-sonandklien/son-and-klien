import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { checkRateLimit } from '@/lib/rate-limit'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT: Record<string, string> = {
  th: `คุณคือผู้ช่วย AI ของบริษัท SON AND KLIEN Co., Ltd. ผู้เชี่ยวชาญด้านโซลูชันเกษตรกรรมครบวงจรในประเทศไทย
บริการหลัก: วิเคราะห์ดิน, ปุ๋ยสั่งตัด, ยากำจัดศัตรูพืช, เมล็ดพันธุ์คุณภาพ, เครื่องจักรกลการเกษตร, บริการโดรนพ่นยา, ที่ปรึกษาการเกษตร
ตอบเป็นภาษาไทย กระชับ เป็นมิตร และช่วยลูกค้าเข้าใจบริการ หากเหมาะสมให้แนะนำนัดปรึกษาฟรี
ห้ามแนะนำคู่แข่ง ห้ามพูดถึงราคาที่แน่นอน`,
  en: `You are the AI assistant for SON AND KLIEN Co., Ltd., a leading integrated agricultural solutions provider in Thailand.
Key services: soil analysis, custom fertilizers, pesticides, quality seeds, farm equipment, drone spraying, agronomy consulting.
Reply in English, concise and friendly. Help customers understand services. When appropriate, suggest a free consultation booking.
Do not recommend competitors. Do not quote fixed prices.`,
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
    const { success } = await checkRateLimit(`ai-chat:${ip}`)
    if (!success) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }

    const { messages, locale = 'th' } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      max_tokens: 500,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT[locale] ?? SYSTEM_PROMPT.th },
        ...messages.slice(-10).map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
    })

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const data = JSON.stringify(chunk)
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
