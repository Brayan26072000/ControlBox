# Aplicación de reseñas de libros 

Esta es una aplicación web que permite a los usuarios navegar, buscar y dejar reseñas sobre libros. Los usuarios pueden registrarse, iniciar sesión y disfrutar de una experiencia personalizada. La aplicación está implementada en Netlify con un pipeline de CI/CD configurado.

---

## Descripción

La aplicación de reseñas de libros incluye las siguientes características principales:
- **Explorar libros:** Los usuarios pueden navegar por una lista de libros y buscar por título, autor o categoría.
- **Filtrar libros:** Los usuarios pueden filtrar los libros por categoría para encontrar fácilmente lo que buscan.
- **Detalles de libros:** Cada libro muestra información detallada como título, autor, categoría y un resumen.
- **Reseñas:** Los usuarios autenticados pueden:
  - Dejar calificaciones del 1 al 5, junto con comentarios en texto.
  - Ver, editar y eliminar sus propias reseñas.
- **Autenticación:** Los usuarios pueden registrarse, iniciar sesión y cerrar sesión. Solo los usuarios autenticados pueden dejar reseñas.
- **Accesibilidad y diseño responsivo:** La aplicación se adapta a cualquier dispositivo.

---

## Requisitos previos


Antes de ejecutar la aplicación localmente, asegúrate de tener instalado lo siguiente:
```bash
- Node.js (versión 16.0.0 o superior)
- Git
- Un editor de texto como Visual Studio Code

---

## Ejecución local

- Clona el repositorio desde GitHub:
    git clone https://github.com/tu-usuario/tu-repositorio.git

- Navega al directorio del proyecto:
   cd tu-repositorio

- Instala las dependencias del proyecto:
   npm install

- Ejecuta la aplicación en modo de desarrollo:
   npm start

- Abre tu navegador en:
   http://localhost:3000

## Implementación en Netlify

- Ve a Netlify e inicia sesión:
   https://www.netlify.com/

- Haz clic en:
   New site from Git

- Selecciona tu repositorio desde GitHub.

- Configura los ajustes de construcción:
   Comando de construcción: npm run build
   Directorio de publicación: build

- Haz clic en:
   Deploy site

- Una vez finalizado, Netlify te proporcionará una URL pública donde tu aplicación estará en línea.


## CI/CD

La implementación en Netlify está configurada con un pipeline de CI/CD. Esto significa que cada vez que realices un cambio en el repositorio de GitHub, Netlify reconstruirá e implementará automáticamente la aplicación.