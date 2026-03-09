import { kv } from "@vercel/kv";

export const runtime = "edge";

type LeaderboardEntry = {
  id: string;
  nickname: string;
  finalAsset: number;
  createdAt: number;
};

const LEADERBOARD_KEY = "stock-game:leaderboard";

const hasKvConfig =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

export async function GET() {
  if (!hasKvConfig) {
    // 로컬 개발 환경에서 KV 미설정 시에도 에러 없이 동작하도록 빈 리스트 반환
    return Response.json({ entries: [] });
  }

  try {
    const ids = await kv.zrange<string[]>(LEADERBOARD_KEY, 0, 9, {
      rev: true,
    });

    if (!ids || ids.length === 0) {
      return Response.json({ entries: [] });
    }

    const entries = await Promise.all(
      ids.map(async (id) => {
        const data = await kv.hgetall<{
          nickname: string;
          finalAsset: number;
          createdAt: number;
        }>(`stock-game:entry:${id}`);

        if (!data) return null;

        return {
          id,
          nickname: data.nickname,
          finalAsset: Number(data.finalAsset),
          createdAt: Number(data.createdAt),
        } satisfies LeaderboardEntry;
      })
    );

    return Response.json({
      entries: entries.filter(
        (e): e is LeaderboardEntry => e !== null && !Number.isNaN(e.finalAsset)
      ),
    });
  } catch (error) {
    return new Response("Failed to load leaderboard", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nickname = String(body.nickname ?? "").trim();
    const finalAsset = Number(body.finalAsset);

    if (!nickname || !Number.isFinite(finalAsset) || finalAsset <= 0) {
      return new Response("Invalid payload", { status: 400 });
    }

    if (!hasKvConfig) {
      // 로컬 개발 환경에서 KV 미설정일 때는 실제 저장은 건너뛰고 성공 응답만 반환
      return Response.json({ ok: true, skipped: true });
    }

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const createdAt = Date.now();

    await kv.hset(`stock-game:entry:${id}`, {
      nickname,
      finalAsset,
      createdAt,
    });

    await kv.zadd(LEADERBOARD_KEY, {
      score: finalAsset,
      member: id,
    });

    return Response.json({ ok: true });
  } catch (error) {
    return new Response("Failed to save leaderboard", { status: 500 });
  }
}

