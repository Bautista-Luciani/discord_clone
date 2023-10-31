/* Vamos a usar este hook para controlar todos los modales de la aplicacion */
import { Channel, ChannelType, Server } from '@prisma/client'
import { create } from 'zustand'

/* Aca definimos todos los posibles modales */
export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage"

interface ModalData {
    server?: Server,
    channel?: Channel,
    channelType?: ChannelType,
    apiUrl?: string,
    query?: Record<string, any>
}

interface ModalStore {
    type: ModalType | null
    isOpen: boolean
    data: ModalData
    onOpen: (type: ModalType, data?: ModalData) => void
    onClose: () => void
}

/* Usamos el metodo create() de zustand para crear el modal */
export const useModal = create<ModalStore>((set)=> ({
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) => set({type, isOpen: true, data}),
    onClose: () => set({type: null, isOpen: false})
}))
