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

        /* Obtenemos el directMessageId y conversationId que le pasamos en la query-string */
        const { directMessageId, conversationId } = req.query

        /* Obtenemos el content que lo pasamos en las values */
        const { content } = req.body

        if (!profile) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        if (!directMessageId) {
            return res.status(400).json({ error: "DirectMessageId missing" })
        }

        if (!conversationId) {
            return res.status(400).json({ error: "ConversationId missing" })
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

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" })
        }

        /* Obtenemos un member */
        const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo

        if (!member) {
            return res.status(404).json({ error: "Member not found" })
        }

        /* Obtenemos el mensaje */
        let directMessage = await db.directMessage.findFirst({
            where: {
                id: directMessageId as string,
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

        if (!directMessage || directMessage.deleted) {
            return res.status(404).json({ error: "Message not found" })
        }

        const isMessageOwner = directMessage.memberId === member.id
        const isAdmin = member.role === MemberRole.ADMIN
        const isModerator = member.role === MemberRole.MODERATOR
        const canModify = isMessageOwner || isAdmin || isModerator

        if (!canModify) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        if (req.method === "DELETE") {
            directMessage = await db.directMessage.update({
                where: {
                    id: directMessageId as string
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

            directMessage = await db.directMessage.update({
                where: {
                    id: directMessageId as string
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

        const updatedKey = `chat:${conversation.id}:messages:update`

        res?.socket?.server?.io?.emit(updatedKey, directMessage)

        return res.status(200).json(directMessage)

    } catch (error) {
        console.log("EDIT_DELETE_DIRECT_MESSAGE_ERROR", error)
        return res.status(500).json({ error: "Internal error" })
    }
}