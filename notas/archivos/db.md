<!-- Ctrl+K V para ver vista previa -->
# BASE DE DATOS
### Para la base de datos vamos a usar `Prisma` y `PlanetScale`
1. Instalamos prisma ► npm install -D prisma
2. Inicializamos prisma ► npx prisma init
3. Vamos a [https://app.planetscale.com/bautiluciani/welcome]
4. Creamos una nueva base de datos:
   - Le definimos un nombre, en este caso *discord-app*
   - Seleccionamos el plan gratuito
   - Elegimos la db, en este caso Prisma
   - Creamos una contraseña
   - Copiamos la variable de entorno y la pegamos en el archivo *.env*
   - Copiamos el schema y lo pegamos en el archivo *schema.prisma*
5. En el archivo `schema.prisma`:
   - Creamos un modelo para los perfiles
   - Creamos un modelo para los servidores
   - Relacionamos ambos modelos
   - Creamos una enumeracion para definir los valores del rol de los miembros
   - Creamos un modelo para los miembros
   - Relacionamos el modelo de los miembros con el de los perfiles
   - Relacionamos el modelo de los miembros con el de los servidores
   - Creamos una enumeracion para definir los valores del tipo del canal
   - Creamos un modelo para los canales
   - Relacionamos el modelo de los canales con el de los perfiles
   - Relacionamos el modelo de los canales con el de los servidores
6.  En la terminal ejecutamos: (*Esto hay que hacerlo cada vez que modificamos el schema.prisma*)
    - npx prisma generate
    - npx prisma db push 
7. Instalamos prisma client ► npm i @prisma/client
8. Creamos el archivo *db.ts* para que prisma solo se inicialice una vez, si no hacemos esto prisma se inicializa cada vez que hace una modificacion en la base de datos ► `lib/db.ts`
9. Creamos el archivo *initial-profile.ts* para obtener los datos del usuario en caso de que exista, y en caso de que no crear un nuevo usuario ► `lib/initial-profile.ts`