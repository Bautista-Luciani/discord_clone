# EDIT CHANNEL
1. Agregamos la opcion *editChannel* al ModalType ► `hooks/use-modal-store.ts`
2. Creamos el endpoint para editar un channel ► `api/channels/[channelId]/route.ts`
3. Creamos el componente *EditChannelModal* ► `components/modals/delete-channel-modal.tsx`
4. Agregamos el EditChannelModal al ModalProvider ► `components/providers/modal-provider.tsx`
5. Usamos el *onOpen* para abrir un modal al tocar "Edit" ► `components/server/server-channel.tsx`