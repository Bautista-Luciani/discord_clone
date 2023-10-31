<!-- Ctrl+K V para ver vista previa -->
# HOME PAGE + MODAL INICIAL + CREACION DE SERVIDOR
<!-- Home Page -->
1. Obtenemos el perfil con el metodo que creamos anteriormente
2. Verificamos que el perfil se encuentre dentro de un servidor
   - En caso de que se encuentre lo enviamos a ese servidor
   - En caso de que no se encuentre le mostramos un modal inicial
<!-- Modal Inicial -->
3. Creamos un componente para mostrar el modal inicial ► `components/modals/initial-modal.tsx`
4. Trabajamos en el formulario del modal inicial:
   - Definimos el schema del formulario
   - Creamos el formulario con useForm
   - Creamos el onSubmit *(por ahora solo retorna un log)*
   - Agregamos la variante *primary* al boton → `components/ui/button.tsx`
   - Utilizamos el useState y useEffect para evitar errores, al igual que el if
5. Trabajamos en la subida de imagenes del modal inicial:
   - Vamos a [https://uploadthing.com/dashboard]
   - Creamos una nueva app
   - Le definimos un nombre, en este caso *discord-app*
   - La App URL lo dejamos vacio
   - Vamos a *API Keys*, copiamos las variables de entorno y las pegamos en el archivo *.env*
   - Instalamos uploadthing ► npm install uploadthing @uploadthing/react
   - Creamos el archivo `app/api/uploadthing/core.ts` y pegamos el codigo que nos brinda la documentacion
   - Creamos el archivo `app/api/uploadthing/route.ts` y pegamos el codigo que nos brinda la documentacion
   - Creamos el archivo `lib/uploadthing.ts` y pegamos el codigo que nos brinda la documentacion
   - Agregamos el *publicRoutes* en el archivo *middleware.ts*
   - Creamos el componente *FileUpload* para subir archivos ► `components/file-upload.ts`
6. Una vez trabajado en el formulario y la subida de imagenes vamos a crear la estructura para crear un servidor ► `components/modals/initial-modal.tsx`
<!-- Creacion del Servidor -->
7. Creamos una utilidad para verificar el perfil actual ► `lib/current-profile.ts`
8. Instalamos uuid y sus types ► npm i uuid / npm i -D @types/uuid
9.  Creamos un archivo el cual va a incluir las funciones que realizan las peticiones a la api para los servidores ► `app/api/servers/route.ts`
   - Creamos la funcion para las peticiones *POST*
10. Instalamos axios ► npm install axios
11. Utilizamos la funcion que creamos anteriormente para crear un servidor dentro de la funcion onSubmit para enviar el formulario ► `components/modals/initial-modal.tsx`
