import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define the routes that require authentication
const protectedRoutes = createRouteMatcher([
  '/upcoming',
  '/previous',
  '/recordings',
  '/personal-room',
  '/meeting(.*)', // Matches any route starting with /meeting
]);

// Export the middleware function
export default clerkMiddleware((auth, req) => {
  // Check if the requested route is protected
  if (protectedRoutes(req)) {
    console.log('Protecting route...');
    try {
      auth.protect();
    } catch (error) {
      console.error('Error protecting route:', error);
      // Handle the error, e.g., redirect to a custom error page
      return NextResponse.redirect('/error');
    }
  }
});

// Configuration for the middleware
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};