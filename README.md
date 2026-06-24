# Portafolio Personal

Sitio web tipo CV. HTML, CSS y JavaScript puro — sin frameworks, sin build step. Responsive y listo para Vercel.

---

## Editar tu información

**Un solo archivo:** `js/data.js`

Abre ese archivo y reemplaza los valores de ejemplo:

| Clave | Qué es |
|-------|--------|
| `perfil.nombre` | Tu nombre completo |
| `perfil.fotoURL` | URL de tu foto (externa) o ruta local como `"assets/foto.jpg"` |
| `perfil.titular` | Descripción corta debajo del nombre |
| `perfil.bio` | Párrafo "Sobre mí" |
| `perfil.email` | Correo de contacto |
| `perfil.linkedin` | URL completa de tu LinkedIn |
| `perfil.github` | URL completa de tu GitHub |
| `cursos` | Array de cursos — agrega/quita objetos según necesites |
| `companeros` | Array de compañeros — cada uno necesita `nombre` y `sitioURL` |

No toques `index.html`, `css/styles.css` ni `js/main.js` a menos que quieras cambiar el diseño.

### Foto local

Copia tu imagen a la carpeta `assets/` y en `data.js` pon:

```js
fotoURL: "assets/tu-foto.jpg",
```

---

## Despliegue en Vercel

### Opción A — GitHub + Vercel (recomendado)

1. Crea un repositorio en GitHub y sube el proyecto:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

2. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub.

3. Haz clic en **Add New → Project**, selecciona tu repositorio y pulsa **Deploy** (sin configuración extra).

4. Tu sitio quedará en `https://tu-repo.vercel.app`.

> Cada `git push` a `main` redesplegará el sitio automáticamente.

---

### Opción B — CLI de Vercel

1. Instala el CLI (requiere Node.js):

```bash
npm install -g vercel
```

2. Desde la carpeta del proyecto:

```bash
vercel login   # abre el navegador para autenticarte
vercel         # primer despliegue (modo preview)
```

3. Para publicar en producción:

```bash
vercel --prod
```

Recibirás la URL del sitio al terminar.
