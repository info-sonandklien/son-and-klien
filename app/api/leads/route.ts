import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkRateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
  serviceInterests: z.array(z.string()).optional(),
  language: z.enum(['th', 'en']).default('th'),
  source: z.string().optional(),
  consentPdpa: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
    const { success } = await checkRateLimit(`leads:${ip}`)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const data = leadSchema.parse(body)

    if (!data.consentPdpa) {
      return NextResponse.json({ error: 'PDPA consent required' }, { status: 400 })
    }

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        serviceInterests: data.serviceInterests ?? [],
        language: data.language,
        source: data.source ?? 'website',
        consentPdpa: data.consentPdpa,
        consentDate: new Date(),
        score: 10,
      },
    })

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 })
    }
    console.error('Lead creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
