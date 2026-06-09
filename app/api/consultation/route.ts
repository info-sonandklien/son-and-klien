import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { checkRateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const consultationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(9),
  company: z.string().optional(),
  farmSize: z.string().optional(),
  cropTypes: z.array(z.string()).optional(),
  serviceInterests: z.array(z.string()).optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  language: z.enum(['th', 'en']).default('th'),
  consentPdpa: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
    const { success } = await checkRateLimit(`consultation:${ip}`)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const data = consultationSchema.parse(body)

    if (!data.consentPdpa) {
      return NextResponse.json({ error: 'PDPA consent required' }, { status: 400 })
    }

    // Upsert lead
    const lead = await prisma.lead.upsert({
      where: { email: data.email },
      update: {
        name: data.name,
        phone: data.phone,
        company: data.company,
        serviceInterests: data.serviceInterests ?? [],
        language: data.language,
        score: { increment: 30 },
      },
      create: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        serviceInterests: data.serviceInterests ?? [],
        language: data.language,
        source: 'consultation-form',
        consentPdpa: data.consentPdpa,
        consentDate: new Date(),
        score: 50,
      },
    })

    // Create consultation
    const consultation = await prisma.consultation.create({
      data: {
        leadId: lead.id,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        preferredTime: data.preferredTime,
        farmSize: data.farmSize,
        cropTypes: data.cropTypes ?? [],
        serviceInterests: data.serviceInterests ?? [],
        notes: data.message,
        status: 'PENDING',
      },
    })

    return NextResponse.json(
      { success: true, consultationId: consultation.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 })
    }
    console.error('Consultation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
