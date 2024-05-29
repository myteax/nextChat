import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import database from "@/lib/db";
import { NextApiRequest } from "next";
import { MongoClient } from "mongodb";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const user = await getSession(request, res);
  if (user) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }
  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
