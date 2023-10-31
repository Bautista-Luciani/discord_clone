# SERVER SETTINGS
1. Agregamos la opcion *editServer* al ModalType ► `hooks/use-modal-store.ts`
2. Creamos un endpoint para actualizar el servidor ► `app/api/servers/[serverId]/route.ts`
3. Creamos el componente *EditServerModal* ► `components/modals/edit-server-modal.tsx`
4. Agregamos el EditServerModal al ModalProvider ► `components/providers/modal-provider.tsx`
5. Usamos el *onOpen* para abrir un modal al tocar "Server Settings" ► `components/server/server-header.tsx`