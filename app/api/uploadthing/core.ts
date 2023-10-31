/* Todo este codigo nos lo brinda la siguiente documentacion [https://docs.uploadthing.com/nextjs/appdir] 
Tenemos que hacer un par de modificaciones */

// Importamos auth de clerk/nextjs
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Reemplazamos el auth que habia anteriormente por el handleAuth
const handleAuth = () => {
    const {userId} = auth()
    if (!userId) throw new Error("Unauthorized")
    return { userId: userId }
}

export const ourFileRouter = {
    // Eliminamos todo lo que se encontraba dentro de esta funcion y definimos nuestros casos
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    messageFile: f(["image", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;