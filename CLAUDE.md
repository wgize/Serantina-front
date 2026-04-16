# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server at http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run lint       # ESLint over the whole project
npm run deploy     # build + publish dist/ to GitHub Pages (gh-pages branch)
```

There are no tests configured in this project.

## Architecture

Single-page landing site for **La Sarentina** (cafetería & pastelería, Cusco, Perú). Pure frontend — no backend, no API. All data (menu items, business info) is hardcoded in component files.

### Page composition (`App.tsx`)

```
SearchProvider
  CartProvider
    Navbar
    Hero          #inicio
    About         #nosotros
    Menu          #menu
    Atmosphere    #ambiente
    Contact       #contacto
    Footer
    Cart          (slide-in panel, root level)
```

### State — Cart (`src/contexts/CartContext.tsx`)

`useReducer`-based context. Actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_ITEM`, `CLEAR_CART`, `TOGGLE_CART`, `OPEN_CART`, `CLOSE_CART`. Cart is persisted to `localStorage` under key `laserantina-cart` and rehydrated on mount.

Consumer hook: `src/hooks/useCart.ts`.

**Cart UX**: Adding a product does NOT open the cart panel. Instead the "Agregar al Carrito" button changes to a muted gold confirmation state for 900 ms, then the modal closes. The `ShoppingCart` icon in Navbar plays `animate-cart-bounce` (defined in `index.css`) whenever `items.length` increases.

### State — Search (`src/contexts/SearchContext.tsx`)

Simple `useState` context exposing `{ searchQuery, setSearchQuery }`. Must be imported as `React` is used for `React.FC` / `React.ReactNode`.

Consumer pattern: Navbar sets the query; Menu reads it. When `searchQuery` is non-empty, Menu flattens all categories into `allItems: MenuItemWithCategory[]` and filters by `item.name`. Scrolls to `#menu` on first character typed.

### Cart checkout

`Cart.tsx` generates a WhatsApp deep-link (`wa.me`) with a formatted order summary and opens it in a new tab.
- Phone: `+51973511402`

### Styling conventions

- **Tailwind CSS 4** via the Vite plugin (`@tailwindcss/vite`). No `tailwind.config.*` file.
- Brand tokens defined in `src/index.css` as CSS variables and used inline as hex literals. Use the hex literals to stay consistent:

  | Token | Hex |
  |---|---|
  | Dark background | `#1C1008` |
  | Mid brown | `#3D1F0D` |
  | Terracotta | `#6B3A2A` |
  | Gold (brand) | `#C8A96E` |
  | Cream text | `#F5F0E8` |
  | Light background | `#FBF8F3` |

- Custom animations in `src/index.css`: `animate-fade-in-up`, `animate-float`, `animate-steam`, `animate-steam-d1`, `animate-steam-d2`, `animate-logo-glow`, `animate-cart-bounce`.
- `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class merging.

### Path alias

`@` resolves to `src/`. Always use it for cross-directory imports.

### Key business data (hardcoded)

- **Sede principal**: Prolongacion de la Cultura 720, Cusco 08003 · coords `-13.522394, -71.963018`
- **Otras sedes**: Av. Collasuyo (1ro de Mayo), Amauta (La Canasta), Canasta Mariscal Gamarra, San Sebastián (Municipio)
- **Horario**: Lun–Dom 7:00 am – 11:00 pm
- **Instagram**: `https://www.instagram.com/la_sarentina/`
- **Facebook**: `https://www.facebook.com/Lasarentina`

### Deploy target

`vite.config.ts` sets `base: "/Serantina-front/"`. Keep this in mind when adding static assets.
