//импорты
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

//логика
export default async function middleware(request: NextRequest) {
  //запускаем саму работу мидлвары - даём ей данные
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const pathname = request.nextUrl.pathname;
  //обратна защита
  if (token && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  //защита для дешборда
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  //редирект
  return NextResponse.next();
}
//где будет работать мидлвара
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
