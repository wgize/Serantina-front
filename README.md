# La Serantina — Frontend

Sitio web de presentación para **La Serantina**, cafetería & pastelería artesanal ubicada en el Centro Histórico de Cusco, Perú. Es una _landing page_ de una sola página (SPA) con secciones de inicio, historia, menú, ambiente y contacto.

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | UI |
| TypeScript | 6 | Tipado estático |
| Vite | 8 | Bundler / dev server |
| Tailwind CSS | 4 | Estilos (via plugin Vite) |
| Radix UI | — | Componentes accesibles (Accordion, Dialog, NavigationMenu) |
| Lucide React | — | Iconografía |
| gh-pages | — | Deploy a GitHub Pages |

## Estructura del proyecto

```
src/
├── components/
│   ├── Hero.tsx       # Sección principal con CTA y datos de horario
│   ├── About.tsx      # Historia, valores y estadísticas del negocio
│   └── Footer.tsx     # Links de navegación, contacto y redes sociales
├── lib/
│   └── utils.ts       # Utilidades (cn — clsx + tailwind-merge)
├── assets/            # Imágenes estáticas
├── App.tsx
├── main.tsx
└── index.css
```

## Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| Fondo oscuro | `#1C1008` | Header, footer, hero |
| Café medio | `#3D1F0D` | Gradientes |
| Terracota | `#6B3A2A` | Acentos secundarios |
| Dorado | `#C8A96E` | Color de marca principal |
| Crema | `#F5F0E8` | Texto sobre fondos oscuros |
| Fondo claro | `#FBF8F3` | Secciones claras (About) |

## Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build de producción (genera /dist)
npm run build

# Previsualizar el build
npm run preview

# Desplegar a GitHub Pages
npm run deploy
```

## Deploy

El sitio se despliega en **GitHub Pages** bajo la ruta base `/Serantina-front/`.  
El script `npm run deploy` ejecuta `npm run build` y luego publica la carpeta `dist/` en la rama `gh-pages`.

## Alias de rutas

El alias `@` apunta a `src/`, permitiendo importaciones absolutas:

```ts
import { cn } from '@/lib/utils'
```

## Información del negocio (datos en el código)

- **Dirección:** Calle Plateros 348, Centro Histórico, Cusco
- **Horario:** Lun – Dom, 7:00 am – 9:00 pm
- **Email:** hola@laserantina.pe
- **Fundación:** 2015
