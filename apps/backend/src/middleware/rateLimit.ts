/**
 * Rate Limiting Middleware
 * 100 req/min per IP, 1000 req/min per User
 */
import type { Core } from '@strapi/strapi';

// In-Memory Store (später: Redis für Production)
const ipRequests = new Map<string, { count: number; resetAt: number }>();
const userRequests = new Map<number, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 Minute
const IP_LIMIT = 100;
const USER_LIMIT = 1000;

const createRateLimitMiddleware = () => {
  return async (ctx: any, next: () => Promise<void>) => {
    const now = Date.now();
    const ip = ctx.ip || ctx.request.ip || 'unknown';
    const userId = ctx.state?.user?.id;

    // IP-based Rate Limiting
    let ipData = ipRequests.get(ip);
    if (!ipData || now > ipData.resetAt) {
      ipData = { count: 0, resetAt: now + WINDOW_MS };
      ipRequests.set(ip, ipData);
    }
    
    ipData.count++;
    
    if (ipData.count > IP_LIMIT) {
      ctx.set('Retry-After', String(Math.ceil((ipData.resetAt - now) / 1000)));
      ctx.throw(429, 'Rate limit exceeded. Try again later.');
      return;
    }

    // User-based Rate Limiting (wenn eingeloggt)
    if (userId) {
      let userData = userRequests.get(userId);
      if (!userData || now > userData.resetAt) {
        userData = { count: 0, resetAt: now + WINDOW_MS };
        userRequests.set(userId, userData);
      }
      
      userData.count++;
      
      if (userData.count > USER_LIMIT) {
        ctx.set('Retry-After', String(Math.ceil((userData.resetAt - now) / 1000)));
        ctx.throw(429, 'User rate limit exceeded. Try again later.');
        return;
      }
    }

    // Headers setzen
    ctx.set('X-RateLimit-Limit', String(userId ? USER_LIMIT : IP_LIMIT));
    ctx.set('X-RateLimit-Remaining', String(userId 
      ? USER_LIMIT - (userRequests.get(userId)?.count || 0)
      : IP_LIMIT - ipData.count));

    await next();
  };
};

export default createRateLimitMiddleware;