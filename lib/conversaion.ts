import { db } from "./db"

/* Funcion para saber cual de los dos metodos de abajo utilizar, en base si existe una conversacion o no */
export const getOrCreateConversation = async(memberOneId: string, memberTwoId: string) => {
    /* Obtenemos una conversacion entre dos miembros */
    let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId)

    /* En caso que no exista creamos una */
    if(!conversation){
        conversation = await createNewConversation(memberOneId, memberTwoId)
    }

    /* Retornamos la conversacion */
    return conversation
}

/* Funcion para buscar una conversacion entre dos miembros */
const findConversation = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.findFirst({
            where: {
                AND: [
                    { memberOneId: memberOneId },
                    { memberTwoId: memberTwoId }
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
    } catch (error) {
        return null
    }
}

/* Funcion para crear una nueva conversacion entre dos miembros */
const createNewConversation = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId
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
    } catch (error) {
        return null
    }
}
