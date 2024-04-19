import { NextResponse } from "next/server";

export function middleware(request){
    
    // It uses request.cookies.get('next-auth.session-token') to attempt to retrieve the value of the 'next-auth.session-token' cookie from the incoming request.
    // After deploying it on vercel, next-auth.session-token is renamed to __Secure-next-auth.session-token
    const cookie = request.cookies.get('__Secure-next-auth.session-token'); 

    // The middleware checks if the cookie exists (if (!cookie)). If the cookie is not present, it means the user is not authenticated
    if(!cookie){
        return NextResponse.redirect(new URL('/', request.url));
    }

}

// The middleware is configured to run only for specific routes using the config object. The matcher property is an array of route patterns ('/profile', '/Share-Recipe'). This means that the middleware will be applied to any incoming request with a URL matching one of these patterns. If the user is not authenticated (no 'next-auth.session-token' cookie), they will be redirected to the root URL which in our case is '/'.
export const config = {
  matcher: ['/profile', '/Share-Recipe'],
}; 