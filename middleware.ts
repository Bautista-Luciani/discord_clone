/* En caso de tener la carpeta `src` este archivo debe estar dentro de esa carpeta
En este caso como no la tenemos, este archivo debe estar en la raiz del proyecto */
import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
      publicRoutes: ["/api/uploadthing"]
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 