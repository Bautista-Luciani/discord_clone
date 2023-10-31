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
        const { serverId, channelId } = req.query

        if(!profile){
            return res.status(401).json({ error: 'Unauthorized' })
        }

        if(!serverId){
            return res.status(400).json({ error: 'ServerId missing' })
        }

        if(!channelId){
            return res.status(400).json({ error: 'ChannelId missing' })
        }

        if(!content){
            return res.status(400).json({ error: 'Content missing' })
        }

        /* Obtenemos el servidor */
        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                /* Verificamos que el usuario sea miembro de este servidor */
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            /* Y que incluya los miembros */
            include: {
                members: true
            }
        })

        if(!server){
            return res.status(404).json({ error: 'Server not found' })
        }

        /* Obtenemos el channel */
        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string
            }
        })

        if(!channel){
            return res.status(404).json({ error: 'Channel not found' })
        }

        /* Obtenemos el miembro */
        const member = server.members.find(member => member.profileId === profile.id )

        if(!member){
            return res.status(404).json({ error: 'Member not found' })
        }

        /* Creamos el mensaje */
        const message = await db.message.create({
            data: {
                content,
                fileUrl,
                memberId: member.id,
                channelId: channelId as string
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
        const channelKey = `chat:${channelId}:messages`
        res?.socket?.server?.io.emit(channelKey, message)

        return res.status(200).json(message)
        
    } catch (error) {
        console.log("MESSAGE_POST_ERROR", error)
        return res.status(500).json({ error: 'Internal Error' })
    }
}