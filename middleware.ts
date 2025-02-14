import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
 
type Session = typeof auth.$Infer.Session;
 
export async function middleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
		baseURL: request.nextUrl.origin,
		headers: {
			cookie: request.headers.get("cookie") || "", 
		},
	});
	const nextUrl = request.nextUrl
	console.log(nextUrl.pathname, session, request.url, 'url')
	if((nextUrl.pathname === '/sign-in' || nextUrl.pathname === '/sign-up' ) && session){
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}
	if(nextUrl.pathname === '/' && session){
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}
	if(nextUrl.pathname === '/' && !session){
		return NextResponse.redirect(new URL('/sign-in', request.url))
	}

    
	if (!session) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}
 
	return NextResponse.next();
}

 
export const config = {
	matcher: ["/dashboard", '/'], 
};