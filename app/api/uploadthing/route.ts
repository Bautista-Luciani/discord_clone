/* Todo este codigo nos lo brinda la siguiente documentacion [https://docs.uploadthing.com/nextjs/appdir]*/
import { createNextRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
