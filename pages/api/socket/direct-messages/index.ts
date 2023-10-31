import { NextApiRequest } from "next";
import { currentProfilePages } from '../../../../lib/current-profile-page';
import { NextApiResponseServerIo } from '../../../../types';
import { db } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo){
    /* En caso de que el metodo no sea POST salimos de la funcion */
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'Method not allowed'})
    }

    /* En caso de que el metodo sea 'POST' hacemos un try y catch */
    try {
        /* Obtenemos el usuario con la nueva utilidad que creamos anteriormente */
        const profile = await currentProfilePages(req)

        /* Obtenemos los values del formulario que mandamos a traves de 'values' al hacer la peticion */
        const { content, fileUrl } = req.body

        /* Obtenemos los query que mandamos a traves de qs al hacer la peticion */
        const { conversationId } = req.query

        if(!profile){
            return res.status(401).json({ error: 'Unauthorized' })
        }

        if(!conversationId){
            return res.status(400).json({ error: 'ConversationId missing' })
        }

        if(!content){
            return res.status(400).json({ error: 'Content missing' })
        }

        /* Obtenemos la conversacion */
        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    {
                        memberOne: {
                            profileId: profile.id
                        }
                    },
                    {
                        memberTwo: {
                            profileId: profile.id
                        }
                    }
                ]
            },
            include: {
                memberOne: {
                    include: {
                        profile: true
                    }
                },
                memberTwo: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        if(!conversation){
            return res.status(404).json({ error: 'Conversation not found' })
        }

        /* Obtenemos el miembro */
        const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo

        if(!member){
            return res.status(404).json({ error: 'Member not found' })
        }

        /* Creamos el mensaje */
        const message = await db.directMessage.create({
            data: {
                content,
                fileUrl,
                memberId: member.id,
                conversationId: conversationId as string
            },
            include: {
                member: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        /* Emitimos un socket io (no entendi bien para que es) */
        const channelKey = `chat:${conversationId}:message`
        res?.socket?.server?.io.emit(channelKey, message)

        return res.status(200).json(message)
        
    } catch (error) {
        console.log("DIRECT_MESSAGE_POST_ERROR", error)
        return res.status(500).json({ error: 'Internal Error' })
    }
}