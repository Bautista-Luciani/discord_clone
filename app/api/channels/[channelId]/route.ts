import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole, Member } from '@prisma/client';
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }:{ params: { channelId: string }}){
    try {
        /* Obtenemos el usuario */
        const profile = await currentProfile()

        /* Obtenemos el serverId que lo enviamos a traves de query-string al hace la peticion */
        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get('serverId')

        if(!profile){
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if(!serverId){
            return new NextResponse('ServerId missing', { status: 400 })
        }

        if(!params.channelId){
            return new NextResponse('ChannelId missing', { status: 400 })
        }

        /* Obtenemos el servidor... */
        const server = await db.server.update({
            /* ...el cual coincida con su id... */
            where: {
                id: serverId,
                members: {
                    some: {
                        /*...y que el usuario que obtuvimos recientemente sea miembro del servidor
                        y que ademas su rol sea o admin o moderator... */
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            /* ...para luego eliminar el channel, siempre y cuando no sea el channel 'general' */
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: {
                            not: "general"
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)

    } catch (error) {
        console.log('DELETE_CHANNEL_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function PATCH(req: Request, { params }:{ params: { channelId: string }}){
    try {
        /* Obtenemos el usuario */
        const profile = await currentProfile()
        
        /* Obtenemos los valores del form que los mandamos en 'values' al hacer la peticion */
        const { name, type } = await req.json()

        /* Obtenemos el serverId que lo enviamos a traves de query-string al hace la peticion */
        const { searchParams } = new URL(req.url)
        const serverId = searchParams.get('serverId')

        if(!profile){
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if(!serverId){
            return new NextResponse('ServerId missing', { status: 400 })
        }

        if(!params.channelId){
            return new NextResponse('ChannelId missing', { status: 401 })
        }

        if(name === 'general'){
            return new NextResponse('Cannot edit general channel', { status: 400 })
        }

        /* Obtenemos el servidor... */
        const server = await db.server.update({
            /* ...el cual coincida con su id... */
            where: {
                id: serverId,
                members: {
                    some: {
                        /*...y que el usuario que obtuvimos recientemente sea miembro del servidor
                        y que ademas su rol sea o admin o moderator... */
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            /* ... y buscamos el channel el cual coincida con el id y que no sea el general... */
                            id: params.channelId,
                            NOT: {
                                name: 'general'
                            }
                        },
                        /* ...para finalmente editar el channel */
                        data: {
                            name,
                            type
                        }
                    }
                }
            }
        })

        return NextResponse.json(server)
        
    } catch (error) {
        console.log('EDIT_CHANNEL_ERROR', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}