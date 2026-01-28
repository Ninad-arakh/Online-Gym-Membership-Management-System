import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  console.log("token from middleware : ", token)

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    console.log("jwt verified")
    return NextResponse.next();
  } catch {
    console.log("jwt failed verification : token : ", token)
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
