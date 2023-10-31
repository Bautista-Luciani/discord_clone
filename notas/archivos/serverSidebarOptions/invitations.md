<!-- Ctrl+K V para ver vista previa -->
# INVITE PEOPLE
1. En el archivo `hooks/use-modal-store.ts`:
   - Agregamos la opcion *invite* al ModalType
   - Creamos la interfaz ModalData
   - Agregamos el *ModalData* (data) a la interfaz ModalStore
   - Agregamos *data* al useModal
   - Agregamos *data* como parametro al onOpen
2. Creamos el hook *useOrigin* ► `hooks/use-origin.ts`
3. Creamos un endpoint para actualizar el inviteCode ► `app/api/servers/[serverId]/invite-code/route.ts`
4. Creamos el componente InviteModal ► `components/modals/invite-modal.tsx`
5. Agregamos el InviteModal al ModalProvider ► `components/providers/modal-provider.tsx`
6. Usamos el *onOpen* para abrir un modal al tocar "Invite Peolple" ► `components/server/server-header.tsx`
7. Creamos la redireccion para el link de invitacion ► `app/(invite)/invite/[inviteCode]/page.tsx`
