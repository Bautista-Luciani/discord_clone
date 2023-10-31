import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { Message } from "@prisma/client"
import { NextResponse } from "next/server"

/* Cantidad de mensajes a mostrar */
const MESSAGES_BATCH = 10

export async function GET(req: Request) {
    try {
        /* Obtenemos el usuario */
        const profile = await currentProfile()

        /* Obtenemos el cursor y el channelId que enviamos en los params utilizando query-string */
        const { searchParams } = new URL(req.url)
        const cursor = searchParams.get("cursor") // Lo usamos para decir cual es el proximo mensaje que se tiene que cargar
        const channelId = searchParams.get("channelId")

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!channelId){
            return new NextResponse("ChannelId missing", { status: 400 })
        }

        let messages: Message[] = []

        if(cursor){
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    channelId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                }, 
                orderBy: {
                    createdAt: "desc"
                }
            })
        } else {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                where: {
                    channelId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                }, 
                orderBy: {
                    createdAt: "desc"
                }
            })
        }

        let nextCursor = null

        if(messages.length === MESSAGES_BATCH){
            nextCursor = messages[MESSAGES_BATCH - 1].id
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        })

    } catch (error) {
        console.log('GET_MESSAGES_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}