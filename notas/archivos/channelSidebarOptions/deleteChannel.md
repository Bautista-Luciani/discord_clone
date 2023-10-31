# DELETE CHANNEL
1. Agregamos la opcion *deleteChannel* al ModalType ► `hooks/use-modal-store.ts`
2. Agragramos la opcion *Channel* al ModalData ► `hooks/use-modal-store.ts`
3. Creamos el endpoint para eliminar un channel ► `api/channels/[channelId]/route.ts`
4. Creamos el componente *DeleteChannelModal* ► `components/modals/delete-channel-modal.tsx`
5. Agregamos el DeleteChannelModal al ModalProvider ► `components/providers/modal-provider.tsx`
6. Usamos el *onOpen* para abrir un modal al tocar "Delete" ► `components/server/server-channel.tsx`
