import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  if (signedInPages.find((page) => page === req.nextUrl.pathname)) {
    const token = req.cookies.get(process.env.COOKIE_NAME);

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
