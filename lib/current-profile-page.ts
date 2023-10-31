import { getAuth } from "@clerk/nextjs/server"
import { db } from "./db"
import { NextApiRequest } from "next"

/* Creamos este archivo para obtener el usuario para los archivos que se encuentren dentro de la carpeta 'pages'
Ya que dentro de esos archivos no funciona el metodo 'auth()'
El archivo es el mismo que el 'cuurent-profile.ts', lo unico que reemplazamos el el metodo 'auth' por el metodo 'getAuth()' de "@clerk/nextjs/server" 
Ademas debemos pasarle el req como parametro */

export const currentProfilePages = async(req: NextApiRequest) => {
    const { userId } = getAuth(req)

    if(!userId){
        return null
    }

    const profile = await db.profile.findUnique({
        where: {
            userId
        }
    })

    return profile
}
