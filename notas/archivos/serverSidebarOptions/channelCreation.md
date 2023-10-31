# CHANNEL CREATION
1. Agregamos la opcion *createChannel* al ModalType ► `hooks/use-modal-store.ts`
2. Creamos un endpoint para crear un channel ► `api/channels/route.ts`
3. Creamos el componente *ChannelModal* ► `components/modals/create-channel-modal.tsx`
4. Agregamos el ChannelModal al ModalProvider ► `components/providers/modal-provider.tsx`
5. Usamos el *onOpen* para abrir un modal al tocar "Create Channel" ► `components/server/server-header.tsx`