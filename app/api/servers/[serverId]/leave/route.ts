import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }:{ params: {serverId: string}}) {
    try {
        const profile = await currentProfile()

        if(!profile){
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if(!params.serverId){
            return new NextResponse('ServerId missing', { status: 400 })
        }

        const server = await db.server.update({
            /* Buscamos el servidor el cual coincida con el serverId, y que el profileId no coincida con el id del admin,
            ya que el admin no va a poder dejar el servidor
            Tambien verificamos que el usuario sea miembro del servidor */
            where: {
                id: params.serverId,
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            /* Luego de hacer las verificaciones, eliminamos el miembro */
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log('LEAVE_SERVER_PATCH', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}