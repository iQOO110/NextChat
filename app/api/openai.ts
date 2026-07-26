import { NextRequest, NextResponse } from "next/server";
import { OpenaiPath } from "@/app/constant";
const ALLOWED_PATHS = new Set(Object.values(OpenaiPath));
const SAFE_URL_RULE = /^(https?:\/\/)(?!127\.|10\.|172\.1[6-9]\.|172\.2[0-9]\.|172\.3[0-1]\.|192\.168|localhost|::1)/;
export async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  if (req.method === "OPTIONS") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
  const subpath = params.path.join("/");
  if (!ALLOWED_PATHS.has(subpath)) {
    return NextResponse.json({ error: "Forbidden API Path" }, { status: 403 });
  }
  const targetBaseUrl = req.headers.get("X-Custom-Url");
  const targetApiKey = req.headers.get("X-Custom-Token");
  if (!targetBaseUrl || !targetApiKey) {
    return NextResponse.json({ error: "Missing API Url or API Key" }, { status: 400 });
  }
  if (!SAFE_URL_RULE.test(targetBaseUrl)) {
    return NextResponse.json({ error: "Internal network address is prohibited" }, { status: 403 });
  }
  const cleanBase = targetBaseUrl.replace(/\/$/, "");
  const targetUrl = `${cleanBase}/${subpath}${req.nextUrl.search}`;
  console("[Custom OpenAI Proxy] Forward =>", targetUrl);
  try {
    const fetchHeaders: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${targetApiKey}`,
    };
    const fetchOpts: RequestInit = {
      method: req.method,
      headers: fetchHeaders,
      signal: req.signal,
      body: ["GET", "HEAD"].includes(req.method) ? null : req.body,
    };
    const upstreamRes = await fetch(targetUrl, fetchOpts);
    let resData: unknown = null;
    try {
      resData = await upstreamRes.json();
    } catch {}
    if (subpath === OpenaiPath.ListModelPath && resData && typeof resData === "object" && "data" in resData) {
      return NextResponse.json(resData, { status: upstreamRes.status });
    }
    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "application/json; charset=utf-8");
    responseHeaders.set("X-Accel-Buffering", "no");
    responseHeaders.delete("www-authenticate");
    return new Response(JSON.stringify(resData), {
      status: upstreamRes.status,
      headers: responseHeaders,
    });
  } catch (err: any) {
    console.error("[Proxy Request Error]", err);
    return NextResponse.json({ error: err.message || "Proxy Gateway Error" }, { status: 502 });
  }
}
export const GET = handle;
export const POST = handle;
export const OPTIONS = handle;
export const runtime = "edge";