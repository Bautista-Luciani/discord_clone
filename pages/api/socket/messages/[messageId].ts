import { currentProfilePages } from "@/lib/current-profile-page";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "DELETE" && req.method !== "PATCH") {
        return res.status(405).json({ error: "Message not allowed" })
    }

    try {
        /* Obtenemos el usuario pero con el metodo para los pages y le pasamos como parametro la request */
        const profile = await currentProfilePages(req)

        /* Obtenemos el messageId, channelId y serverId que le pasamos en la query-string */
        const { messageId, channelId, serverId } = req.query

        /* Obtenemos el content que lo pasamos en las values */
        const { content } = req.body

        if (!profile) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        if (!channelId) {
            return res.status(400).json({ error: "ChannelId missing" })
        }

        if (!serverId) {
            return res.status(400).json({ error: "ServerId missing" })
        }

        /* Obtenemos el servidor */
        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            include: {
                members: true
            }
        })

        if (!server) {
            return res.status(404).json({ error: "Server not found" })
        }

        /* Obtenemos el channel */
        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string
            }
        })

        if (!channel) {
            return res.status(404).json({ error: "Channel not found" })
        }

        /* Obtenemos un member */
        const member = server.members.find(member => member.profileId === profile.id)

        if (!member) {
            return res.status(404).json({ error: "Member not found" })
        }

        /* Obtenemos el mensaje */
        let message = await db.message.findFirst({
            where: {
                id: messageId as string,
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

        if (!message || message.deleted) {
            return res.status(404).json({ error: "Message not found" })
        }

        const isMessageOwner = message.memberId === member.id
        const isAdmin = member.role === MemberRole.ADMIN
        const isModerator = member.role === MemberRole.MODERATOR
        const canModify = isMessageOwner || isAdmin || isModerator

        if (!canModify) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        if (req.method === "DELETE") {
            message = await db.message.update({
                where: {
                    id: messageId as string
                },
                data: {
                    fileUrl: null,
                    content: "This message has been deleted",
                    deleted: true
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                }
            })
        }

        if (req.method === "PATCH") {

            if (!isMessageOwner) {
                return res.status(401).json({ error: "Unathorized" })
            }

            message = await db.message.update({
                where: {
                    id: messageId as string
                },
                data: {
                    content: content
                },
                include: {
                    member: {
                        include: {
                            profile: true
                        }
                    }
                }
            })
        }

        const updatedKey = `chat:${channelId}:messages:update`

        res?.socket?.server?.io?.emit(updatedKey, message)

        return res.status(200).json(message)

    } catch (error) {
        console.log("EDIT_DELETE_MESSAGE_ERROR", error)
        return res.status(500).json({ error: "Internal error" })
    }
}