<!-- Ctrl+K V para ver vista previa -->
# DISEÑO DE LA PAGINA DE CHATS
<!-- Redireccion a los chats -->
1. Creamos la funcion *onNavigateChannel* ► `components/server/server-channel.tsx`
2. Creamos la funcion *onAction* ► `components/server/server-channel.tsx`
3. Creamos la funcion *onNavigateMember* ► `components/server/server-member.tsx`
4. Creamos la page *ChannelIdPage* ► `app/(main)/servers/[serverId]/channels/[channelId]/page.tsx`
5. Creamos la page *MemberIdPage* ► `app/(main)/servers/[serverId]/conversations/[memberId]/page.tsx`
6. Trabajamos en el ServerIdPage para redirijir al usuario al chat general ► `servers/[serverId]/page.tsx`
<!-- Chat Header -->
1. Creamos el componente *MobileToggle* ► `components/mobile-toggle.tsx`
2. Creamos el componente *ChatHeader* ► `components/chat/chat-header.tsx`
3. Agregamos el MobileToggle al *ChatHeader* ► `components/chat/chat-header.tsx`
4. Agregamos el ChatHeader al *ChannelIdPage* ► `servers/[serverId]/channels/[channelId]/page.tsx`
<!-- Prisma Schema -->
1. En el archivo `prisma/schema.prisma`: 
   - Creamos el model *Message*
   - Creamos el model *Conversation*
   - Creamos el model *DirectMessage*
2. Ejecutamos en la terminal:
   - npx prisma generate
   - npx prisma db push
<!-- Conversation Setup -->
1. Creamos la utilidad *conversation.ts* ► `lib/conversation.ts`
   - Creamos la funcion *findConversation*
   - Creamos la funcion *createNewConversation* 
   - Creamos la funcion *getOrCreateConversation*
2. Trabajamos en el *MemberIdPage* ► `app/(main)/servers/[serverId]/conversations/[memberId]/page.tsx`
<!-- SocketIO Setup -->
1. Instalamos Socket IO
2. Instalamos Socket IO (client)
3. Creamos el type *NextApiResponseServerIo* ► `types.ts`
4. Creamos el archivo *io.ts* ► `pages/api/socket/io.ts`
5. Creamos el provider *SocketProvider* ► `components/providers/socket-provider.tsx`
6. Envolvemos el ModalProvider y el children dentro del *SocketProvider* ► `app/layout.tsx`
7. Creamos el componente *SocketIndicator* ► `components/socket-indicator.tsx`
8. Usamos el SocketIndicator en el *ChatHeader* ► `components/chat/chat-header.tsx`
<!-- Chat Input -->
1. Creamos la utilidad *CurrentProfilePage* ► `lib/current-profile-page.ts`
2. Creamos el endpoint para crear los mensajes ► `pages/api/socket/messages/index.ts`
3. Creamos el componente *ChatInput* ► `components/chat/chat-input.tsx`
4. Agregamos el ChatInput al *ChannelIdPage* ► `(main)/servers/[serverId]/channels/[channelId]/page.tsx`
5. Creamos la funcionalidad para poder enviar archivos:
   - Agregamos *messageFile* dentro del ModalType ► `hooks/use-modal-store.tsx`
   - Agregamos el *apiUrl* y *query* al ModalData ► `hooks/use-modal-store.tsx`
   - Creamos el componente *MessageFileModal* ► `components/modals/message-file-modal.tsx`
   - Agregamos el MessageFileModal al *ModalProvider* ► `components/providers/modal-provider.tsx`
   - Usamos el *onOpen* para enviar un archivo ► `components/chat/chat-input.tsx`
6. Creamos la funcionalidad para poder enviar emojis:
   - Instalamos los emojis ► npm i emoji-mart @emoji-mart/data @emoji-mart/react
   - Creamos el componente *EmojiPicker* ► `components/emoji-picker.tsx`
   - Usamos el EmojiPicker para enviar emojis ► `components/chat/chat-input.tsx`
<!-- Chat Messages -->
1. Creamos el endpoint para obtener los mensajes ► `app/api/messages/route.ts`
2. Creamos el componente *ChatWelcome* ► `components/chat/chat-welcome.tsx`
3. Instalamos tanstack ► npm i @tanstack/react-query@4
4. Creamos el componente *QueryProvider* ► `components/providers/query-provider.tsx`
5. Envolvemos el children en el QueryProvider ► `app/layout.tsx`
6. Creamos el hook *useChatQuery* ► `hooks/use-chat-query.ts`
7. Creamos el componente *ChatMessages* ► `components/chat/chat-messages.tsx`
8. Usamos el useChatQuery en ChatMessages ► `components/chat/chat-messages.tsx`
9. Agregamos el ChatWelcome al ChatMessages ► `components/chat/chat-messages.tsx`
10. Instalamos format ► npm i date-fns
11. Creamos el endpoint para editar y eliminar los mensajes ► `pages/api/socket/messages/[messageId].ts`
12. Creamos el modal para eliminar los mensajes:
    - Agregamos el *deleteMessage* al useModalStore ► `hooks/use-modal-store.tsx`
    - Creamos el componente *DeleteMessageModal* ► `components/modals/delete-message-modal.tsx`
    - Agregamos el DeleteMessageModal al *ModalProvider* ► `components/providers/modal-provider.tsx`
    - Usamos el *onOpen* para eliminar un mesaje ► `components/chat/chat-item.tsx`
13. Creamos el componente *ChatItem* ► `components/chat/chat-item.tsx`
14. Agregamos el ChatItem al ChatMessages ► `components/chat/chat-messages.tsx`
15. Agregamos el ChatMessages al ChannelIdPage ► `(main)/servers/[serverId]/channels/[channelId]/page.tsx`
<!-- Hooks -->
1. Creamos el hook *useChatSocket* ► `hooks/use-chat-socket.ts`
2. Usamos el useChatSocket en el *ChatMessages* ► `components/chat/chat-messages.tsx`
3. Creamos el hook *useChatScroll* ► `hooks/use-chat-scroll.ts`
4. Usamos el useChatScroll en el *ChatMessages* ► `components/chat/chat-messages.tsx`
<!-- Direct Messages -->
1. Creamos el endpoint para cargar los mensajes del chat entre miembros ► `api/direct-messages/route.ts`
2. Creamos el endpoint para cargar los mensajes del chat entre miembros (SOCKET) ► `pages/api/socket/direct-messages/index.ts`
3. Creamos el endpoint para editar y eliminar los mensajes del chat entre miembros (SOCKET) ► `pages/api/socket/direct-messages/[directMessagesId].ts`
4. Agregamos el ChatMessages al MemberIdPage ► `servers/[serverId]/conversations/[memberId]/page.tsx`
5. Agregamos el ChatInut al MemberIdPage ► `servers/[serverId]/conversations/[memberId]/page.tsx`
<!-- Video Calls -->
1. Vamos a [https://livekit.io/] (Documentation: [https://docs.livekit.io/realtime/quickstarts/nextjs-13/])
2. Nos registramos y creamos una nueva app
3. En el archivo `.env` creamos las siguientes variables de entorno: 
   - `LIVEKIT_API_KEY`
   - `LIVEKIT_API_SECRET`
   - `NEXT_PUBLIC_LIVEKIT_URL`
   Sus valores los encontramos de la siguiente manera:
     - Vamos a *settings*
     - Tocamos en *keys* y luego en *add new key*
     - Generamos una descripcion
     - Copiamos el *api key* y lo pegamos en la variable de entorno *LIVEKIT_API_KEY*
     - Copiamos el *secret key* y lo pegamos en la variable de entorno *LIVEKIT_API_SECRET*
     - Copiamos el *websocket url* y lo pegamos en la variable de entorno *NEXT_PUBLIC_LIVEKIT_URL*
4. Instalamos Livekit ► npm install livekit-server-sdk livekit-client @livekit/components-react @livekit/components-styles --save
5. Creamos un token endpoint y pegamos todo el codigo que nos brinda la documentacion ► `/app/api/get-participant-token/route.ts`
6. Creamos el componente *MediaRoom* ► `components/media-room.tsx`
7. Usamos el MediaRoom en el *ChannelIdPage* ► `(main)/servers/[serverId]/channels/[channelId]/page.tsx`
8. Creamos el componente *ChatVideoButton* ► `components/chat/chat-video-button.tsx`
9. Agregamos el ChatVideoButton al *ChatHeader* ► `components/chat/chat-header.tsx`
10. Agregamos el MediaRoom en el *MemberIdPage* ► `servers/[serverId]/conversations/[memberId]/page.tsx`
