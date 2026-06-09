import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let ratelimit: Ratelimit | null = null

function getRatelimit() {
  if (!ratelimit && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '1 m'),
      analytics: true,
    })
  }
  return ratelimit
}

export async function checkRateLimit(identifier: string): Promise<{ success: boolean; remaining: number }> {
  const rl = getRatelimit()
  if (!rl) return { success: true, remaining: 999 }

  const result = await rl.limit(identifier)
  return { success: result.success, remaining: result.remaining }
}
