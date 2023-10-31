# LEAVE SERVER (GUEST)
1. Agregamos la opcion *leaveServer* al ModalType ► `hooks/use-modal-store.ts`
2. Creamos un endpoint para salir del servidor ► `api/server/[serverId]/leave/route.ts`
3. Creamos el componente *LeaveServerModal* ► `components/modals/leave-server-modal.tsx`
4. Agregamos el LeaveServerModal al ModalProvider ► `components/providers/modal-provider.tsx`
5. Usamos el *onOpen* para abrir un modal al tocar "Leave Server" ► `components/server/server-header.tsx`

# DELETE SERVER (ADMIN)
1. Agregamos la opcion *deleteServer* al ModalType ► `hooks/use-modal-store.ts`
2. Creamos un endpoint para eliminar el servidor ► `api/server/[serverId]/route.ts`
3. Creamos el componente *DeleteServerModal* ► `components/modals/delete-server-modal.tsx`
4. Agregamos el DeleteServerModal al ModalProvider ► `components/providers/modal-provider.tsx`
5. Usamos el *onOpen* para abrir un modal al tocar "Delete Server" ► `components/server/server-header.tsx`
