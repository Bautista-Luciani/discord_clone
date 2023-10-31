<!-- Ctrl+K V para ver vista previa -->
# AUTENTICACION
### Para la autenticacion vamos a usar `Clerk`
1. Vamos a [https://dashboard.clerk.com/]
2. Creamos una nueva aplicacion
3. Agregamos las variables de entorno de clerk en el archivo *.env*
4. En clerk tocamos donde dice 'continue in docs'
5. Instalamos clerk ► npm install @clerk/nextjs
6. Envolvemos la aplicacion en el ClerkProvider ► `layout.tsx`
7. Creamos el archivo `middleware.ts` y pegamos el contenido que nos brinda la documentacion
8. Creamos las carpetas para el login ► `(auth)/sign-in`
9. Creamos las carpetas para el register ► `(auth)/sign-up`
10. Agregamos las 4 variables de entorno para el login y el register ► `.env`
11. Creamos el AuthLayout ► `(auth)/layout.tsx`
12. Utilizamos el componente *UserButton* para cerrar sesion ► `app/page.tsx`