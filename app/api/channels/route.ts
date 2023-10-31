import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        /* Obtenemos el usuario */
        const profile = await currentProfile()
        /* Obtenemos los valores del name y del type que enviamos desde el formulario (en values) */
        const { name, type } = await req.json()
        /* Obtenemos el serverId que enviamos en los params utilizando query-string */
        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get('serverId')

        if(!profile){
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if(!serverId){
            return new NextResponse('ServerId missing', { status: 400 })
        }

        /* Verificamos que el usuario no le haya puesto de nombre 'general' al channel
        Esta valdiacion esta hecha del lado del cliente, pero es importante tambien hacer la validacion del lado del servidor */
        if(name === 'general'){
            return new NextResponse('Name cannot be "general"', { status: 400 })
        }

        const server = await db.server.update({
            where: {
                /* Buscamos el server por su id ... */
                id: serverId,
                members: {
                    some: {
                        /* ... y verificamos de que el usuario sea miembro del servidor
                        y que ademas el usuario debe ser o admin o moderatos, ya que los guest no pueden crear canales */
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: { 
                        profileId: profile.id, name, type 
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log('CHANNEL_POST_ERROR', error);
        return new NextResponse('Internal error', { status: 500 })
    }
}