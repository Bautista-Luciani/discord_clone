import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }:{ params: { serverId: string }}){
    try {
        /* Obtenemos el usuario */
        const profile = await currentProfile()

        /* Obtenemos el name y la imageUrl que la enviamos al hacer la peticion */
        const { name, imageUrl } = await req.json()

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        /* Obtenemos el servidor y lo editamos, depues lo retornamos */
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                name,
                imageUrl
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log("[SERVER_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }:{ params: { serverId: string }}){
    try {
        const profile = await currentProfile()

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!params.serverId){
            return new NextResponse("ServerId missing", { status: 400 })
        }

        /* Eliminamos el servidor el cual coincida con el id, y el id del usuario debe coincidir con el profileId,
        ya que solo el admin puede eliminar el servidor */
        const server = await db.server.delete({
            where: {
                id: params.serverId,
                profileId: profile.id
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log('DELETE_SERVER_ERROR', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}