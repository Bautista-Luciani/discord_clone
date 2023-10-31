<!-- Ctrl+K V para ver vista previa -->
# DISEÑO DEL SERVIDOR
<!-- Navigation Sidebar -->
1. Creamos el archivo `(main)/servers/[serverId]/page.tsx`
2. Creamos el MainLayout ► `(main)/layout.tsx`
3. Creamos el componente *NavigationSidebar* ► `components/navigation/navigation-sidebar.tsx`
4. Creamos el componente *NavigationAction* ► `components/navigation/navigation-action.tsx`
5. Creamos el componente *ActionTooltip* ► `components/action-tooltip.tsx`
6. Creamos el componente *NavigationItem* ► `components/navigation/navigation-item.tsx`
<!-- Server Modal -->
7. Instalamos zustand ► npm i zustand
8. Creamos el hook *useModal* ► `hooks/use-modal-store.ts`
   - Creamos el ModalType
   - Creamos la interfaz ModalStore
   - Creamos la funcion useModal
9.  Creamos el componente *CreateServerModal* ► `components/modals/create-server-modal.tsx`
10. Trabajamos en el formulario del modal para crear un servidor:
   - Definimos el schema del formulario
   - Creamos el formulario con useForm
   - Creamos el onSubmit
11. Creamos la estructura del modal para crear un servidor
12. Trabajamos en la funcion para abrir y cerrar el modal para crear un servidor:
    - Extraemos todos los atributos del useModal
    - Creamos la constante *isModalOpen*
    - Le pasamos la constante *isModalOpen* al Dialog
    - Creamos la funcion *handleClose*
    - Le pasamos la funcion *handleClose* al Dialog
13. Creamos el componente ModalProvider ► `components/providers/modal-provider.tsx`
14. Agregamos el ModalProvider al RootLayout ► `app/layout.tsx`
15. Usamos el metodo *onOpen* para crear un nuevo servidor ► `components/navigation/navigation-action.tsx`
<!-- Server Sidebar -->
16.  Creamos el *ServerIdLayout* ► `app/(main)/servers/[serverId]/layout.tsx`
17.  Creamos el componente *ServerSidebar* ► `components/server/server-sidebar.tsx`
18.  Creamos el componente *ServerHeader* ► `components/server/server-header.tsx`
19.  Creamos el archivo `types.ts` en la raiz del proyecto
20.  Trabajamos en todas las opciones del ServerSidebar ► `notas/archivos/serverSidebarOptions`
    - invitations
    - serverSettings
    - manageMembers
    - channelCreation
    - deleteOrLeaveServer
21. Creamos y trabajamos en el buscador del ServerSidebar:
    - Creamos el componente *ServerSearch* ► `components/server/server-search.tsx`
    - Dentro del archivo `components/server/server-sidebar.tsx`:
      - Definimos los iconos para cada channel
      - Definimos los iconos para cada rol
      - Agregamos el componente ServerSearch dentro del sidebar
22. Creamos y trabajamos la lista de los channels y members del ServerSidebar:
    - Creamos el componente *ServerSection* ► `components/server/server-section.tsx`
    - Creamos el componente *ServerChannel* ► `components/server/server-channel.tsx`
    - Creamos el componente *ServerMember* ► `components/server/server-member.tsx`
    - Dentro del archivo `components/server/server-sidebar.tsx`:
      - Agregamos el componente ServerSection dentro del sidebar
      - Agregamos el componente ServerChannel dentro del sidebar
      - Agregamos el componente ServerMember dentro del sidebar
23. Trabajamos en las opciones del channel ► `notas/archivos/channelSidebarOptions`
    - delete
    - edit
