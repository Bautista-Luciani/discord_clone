<!-- Ctrl+K V para ver vista previa -->
# THEME
### Para la autenticacion vamos a usar `next-themes`
1. Vamos a [https://ui.shadcn.com/docs/dark-mode/next]
2. Instalamos next-theme ► npm install next-themes
3. Creamos el archivo *theme-provider.tsx* y pegamos el contenido que nos brinda la documentacion ► `components/providers/theme-provider.tsx`
4. En el archivo `app/layout.tsx`:
   - Agregamos *suppressHydrationWarning* al html
   - Envolvemos el children en el componente *ThemeProvider*
   - El className del body lo cambiamos por un cn el cual pasamos el font como primer parametro, y como segundo parametro definimos el bg en caso de que el theme sea dark o light
5. Instalamos del shadcu ui components:
   - *Button* ► npx shadcn-ui@latest add button
   - *Dropdown Menu* ► npx shadcn-ui@latest add dropdown-menu
6. Creamos el archivo `mode-toggle.tsx` y pegamos el contenido que nos brinda la documentacion para crear el boton el cual cambia de theme ► `components/mode-toggle.tsx`