import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale") || "de";

  try {
    // Check Redis first
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    const Redis = require("ioredis");
    const redis = new Redis(redisUrl);
    
    const cacheKey = `translations:${locale}`;
    const cached = await redis.get(cacheKey);
    
    if (cached) {
      await redis.quit();
      return NextResponse.json(JSON.parse(cached));
    }

    // Fetch from Strapi
    const res = await fetch(`${STRAPI_URL}/api/ui-texts?locale=${locale}&fields[0]=code&fields[1]=text`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({}, { status: res.status });
    }

    const data = await res.json();
    
    // Transform to { code: text } map
    const translations: Record<string, string> = {};
    for (const item of data.data || []) {
      const code = item.attributes?.code;
      const text = item.attributes?.text;
      if (code && text) {
        translations[code] = text;
      }
    }

    // Cache in Redis for 24 hours
    await redis.setex(cacheKey, 86400, JSON.stringify(translations));
    await redis.quit();

    return NextResponse.json(translations);
  } catch (error) {
    console.error("[translations] Error:", error);
    return NextResponse.json({});
  }
}