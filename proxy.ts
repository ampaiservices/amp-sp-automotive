import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Preview/staging deploys (*.vercel.app) serve the same content as the
// production domain. Without this header they can index as duplicates and
// split ranking signals — X-Robots-Tag keeps every non-canonical host out
// of search. The canonical host is unaffected.
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: "/:path*",
};
