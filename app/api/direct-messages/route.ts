import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { DirectMessage } from "@prisma/client"
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
        const conversationId = searchParams.get("conversationId")

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!conversationId){
            return new NextResponse("ConversationId missing", { status: 400 })
        }

        let message: DirectMessage[] = []

        if(cursor){
            message = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    conversationId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                }, 
                orderBy: {
                    createdAt: "asc"
                }
            })
        } else {
            message = await db.directMessage.findMany({
                take: MESSAGES_BATCH,
                where: {
                    conversationId
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                }, 
                orderBy: {
                    createdAt: "asc"
                }
            })
        }

        let nextCursor = null

        if(message.length === MESSAGES_BATCH){
            nextCursor = message[MESSAGES_BATCH - 1].id
        }

        return NextResponse.json({
            items: message,
            nextCursor
        })

    } catch (error) {
        console.log('GET_DIRECT_MESSAGES_ERROR', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}