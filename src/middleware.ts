import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const token = request.cookies.get("admin_authToken")?.value;
  // const path = request.nextUrl.pathname;
 
  // const protectedRoutes = ["/home", "/dashboard"];

  // if (protectedRoutes.some((route) => path.startsWith(route))) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/", request.url))
  //   }

  //   // try{
  //   //     const secret = process.env.TOKEN!;
  //   //     jwt.verify(token, secret);
  //   // }catch(error){
  //   //     console.error(error);
  //   //    return NextResponse.redirect(new URL("/", request.url))
  //   // }
  // }

  // return NextResponse.next();
}
export const config = {
  // matcher: ["/home:path*", "/dashboard:path*"],
};
