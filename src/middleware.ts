import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

    const token = request.cookies.get("token")?.value;

    // const protectedRoutes = [
    //     "/pages/home"
    // ];

    // const currentPath = request.nextUrl.pathname

    // if (protectedRoutes.some(route => currentPath.startsWith(route))) {
    //     if (!token) {
    //         return NextResponse.redirect(new URL("/", request.url));
    //     }

    //     try {
    //         const secret = process.env.TOKEN;
    //         jwt.verify(token ?? "", secret ?? "");
    //     } catch (error) {
    //         return NextResponse.redirect(new URL("/", request.url))
    //     }

    // }

    return NextResponse.next();
}

// export const config = {
//     matcher: [
//         "/pages/:path*",   // protège le dashboard web
//         // "/api/:path*",         // protège aussi API si tu veux
//     ],
// };