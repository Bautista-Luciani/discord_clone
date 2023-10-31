# MANAGE MEMBERS
1. Agregamos la opcion *members* al ModalType ► `hooks/use-modal-store.ts`
2. Creamos el componente *UserAvatar* ► `components/user-avatar.tsx`
3. Creamos un endpoint para actualizar el rol de un miembro ► `api/members/[memberId]/route.ts`
4. Creamos un endpoint para eliminar un miembro del servidor ► `api/members/[memberId]/route.ts`
5. Instalamos query-string ► `npm install query-string`
6. Creamos el componente *MembersModal* ► `components/modals/members-modal.tsx`
7. Agregamos el MembersModal al ModalProvider ► `components/providers/modal-provider.tsx`
8. Usamos el *onOpen* para abrir un modal al tocar "Manage Members" ► `components/server/server-header.tsx`