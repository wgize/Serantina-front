import { useState } from "react";
import {
  Coffee,
  Cake,
  Sandwich,
  Leaf,
  Search,
  X,
  Star,
  Wheat,
} from "lucide-react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { ProductModal } from "./ProductModal";
import ProductCarousel from "@/components/ProductCarousel";
import type { MenuItem, Category } from "@/types/cart";
import { useSearch } from "@/contexts/SearchContext";

const categories: { id: Category; label: string; icon: ElementType }[] = [
  { id: "cafes", label: "Cafés", icon: Coffee },
  { id: "bebidas", label: "Bebidas", icon: Leaf },
  { id: "porciones", label: "Porciones", icon: Cake },
  { id: "hojaldres", label: "Hojaldres", icon: Wheat },
  { id: "salados", label: "Empanadas", icon: Sandwich },
  { id: "tortas", label: "Tortas", icon: Star },
];

// ─── Opciones de personalización por tipo ───────────────────────────────────
const optCafe = ["Sin azúcar", "Extra leche", "Descafeinado", "Leche vegetal"];
const optCaliente = ["Sin azúcar", "Extra caliente", "Tibio"];
const optJugo = ["Sin colar", "Solo colado", "Con leche (+S/ 1)", "Sin azúcar"];
const optPorcion = ["Con cubiertos", "Para llevar", "Porción extra de crema"];
const optHojaldre = ["Para llevar", "Con azúcar glass extra"];
const optPye = ["Para llevar", "Con manjar extra", "Con helado"];
const optAlfajor = ["Para llevar", "En caja de regalo"];
const optEmpanada = ["Con ají", "Con limón", "Para llevar"];
const optTorta = [
  "Con dedicatoria",
  "Con decoración temática",
  "Para llevar",
  "Con cubiertos",
];

// ─── Datos del menú ──────────────────────────────────────────────────────────
const menuItems: Record<Category, MenuItem[]> = {
  // ── Cafés y Barismo ────────────────────────────────────────────────────────
  cafes: [
    {
      name: "Café Pasado",
      desc: "Café filtrado al estilo tradicional cusqueño, suave y aromático.",
      price: "S/ 5",
      image: "https://picsum.photos/400/300?random=101",
      customizationOptions: optCafe,
    },
    {
      name: "Café Americano",
      desc: "Espresso diluido en agua caliente, equilibrado e intenso.",
      price: "S/ 6",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=102",
      customizationOptions: optCafe,
    },
    {
      name: "Cappuccino",
      desc: "Espresso con leche vaporizada y una generosa capa de espuma.",
      price: "S/ 7",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=103",
      customizationOptions: optCafe,
    },
    {
      name: "Mocaccino",
      desc: "Espresso con chocolate y leche vaporizada, perfecto equilibrio.",
      price: "S/ 7",
      image: "https://picsum.photos/400/300?random=104",
      customizationOptions: optCafe,
    },
    {
      name: "Café Latte",
      desc: "Espresso con abundante leche cremosa y arte latte de la casa.",
      price: "S/ 7",
      image: "https://picsum.photos/400/300?random=105",
      customizationOptions: optCafe,
    },
    {
      name: "Latte Macchiato",
      desc: "Leche vaporizada con un toque de espresso al centro, suave y elegante.",
      price: "S/ 7",
      image: "https://picsum.photos/400/300?random=106",
      customizationOptions: optCafe,
    },
  ],

  // ── Bebidas Calientes y Jugos ─────────────────────────────────────────────
  bebidas: [
    {
      name: "Infusiones",
      desc: "Selección de hierbas aromáticas del Valle Sagrado: manzanilla, menta, muña y más.",
      price: "S/ 3",
      image: "https://picsum.photos/400/300?random=201",
      customizationOptions: optCaliente,
    },
    {
      name: "Leche Fresca",
      desc: "Leche entera fresca servida caliente, ideal para acompañar.",
      price: "S/ 5",
      image: "https://picsum.photos/400/300?random=202",
      customizationOptions: optCaliente,
    },
    {
      name: "Chocolate Pasta Pura",
      desc: "Chocolate artesanal preparado con pasta de cacao puro, intenso y reconfortante.",
      price: "S/ 6",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=203",
      customizationOptions: optCaliente,
    },
    {
      name: "Chocolate con Leche",
      desc: "Cacao puro mezclado con leche fresca, cremoso y cálido.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=204",
      customizationOptions: optCaliente,
    },
    {
      name: "Café con Leche",
      desc: "Mezcla clásica de café fuerte con leche fresca caliente.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=205",
      customizationOptions: optCaliente,
    },
    {
      name: "Jugo de Papaya",
      desc: "Papaya fresca licuada al momento, natural y nutritiva.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=206",
      customizationOptions: optJugo,
    },
    {
      name: "Jugo de Piña",
      desc: "Piña fresca exprimida, refrescante y llena de vitamina C.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=207",
      customizationOptions: optJugo,
    },
    {
      name: "Jugo de Plátano",
      desc: "Plátano de la región licuado con leche o agua, cremoso y energizante.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=208",
      customizationOptions: optJugo,
    },
    {
      name: "Jugo de Mango",
      desc: "Mango maduro de temporada licuado al instante, dulce y tropical.",
      price: "S/ 7",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=209",
      customizationOptions: optJugo,
    },
    {
      name: "Jugo de Fresa",
      desc: "Fresas frescas licuadas, vibrantes y naturalmente dulces.",
      price: "S/ 7",
      image: "https://picsum.photos/400/300?random=210",
      customizationOptions: optJugo,
    },
  ],

  // ── Porciones de Torta ────────────────────────────────────────────────────
  porciones: [
    {
      name: "Red Velvet",
      desc: "Porción de torta red velvet con frosting de queso crema, suave y vistosa.",
      price: "S/ 6",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=301",
      customizationOptions: optPorcion,
    },
    {
      name: "Frutos Secos",
      desc: "Porción de torta húmeda con mezcla de nueces, almendras y pasas.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=302",
      customizationOptions: optPorcion,
    },
    {
      name: "Naranja",
      desc: "Porción de bizcocho esponjoso de naranja con glaseado cítrico.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=303",
      customizationOptions: optPorcion,
    },
    {
      name: "Chocolate",
      desc: "Porción de torta de chocolate intenso con cobertura de ganache.",
      price: "S/ 6",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=304",
      customizationOptions: optPorcion,
    },
    {
      name: "Arco Iris",
      desc: "Porción de torta multicolor con capas de bizcocho en distintos colores y crema.",
      price: "S/ 7",
      tag: "Especial",
      image: "https://picsum.photos/400/300?random=305",
      customizationOptions: optPorcion,
    },
    {
      name: "Tres Leches de Vainilla",
      desc: "Bizcocho empapado en tres leches con esencia de vainilla, jugoso y cremoso.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=306",
      customizationOptions: optPorcion,
    },
    {
      name: "Tres Leches de Chocolate",
      desc: "Bizcocho empapado en tres leches con cacao, intenso y meloso.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=307",
      customizationOptions: optPorcion,
    },
    {
      name: "Tres Leches de Maracuyá",
      desc: "Bizcocho empapado en tres leches con maracuyá, intenso y agridulce.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=307",
      customizationOptions: optPorcion,
    },
    {
      name: "Tres Leches de Lúcuma",
      desc: "Bizcocho empapado en tres leches con lúcuma, intenso y dulce.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=307",
      customizationOptions: optPorcion,
    },
    {
      name: "Tres Leches de Moca",
      desc: "Bizcocho tres leches con café moca, para los amantes del café.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=308",
      customizationOptions: optPorcion,
    },
    {
      name: "Tres Leches de Cereza",
      desc: "Bizcocho tres leches con toque de cereza, fresco y delicado.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=309",
      customizationOptions: optPorcion,
    },
    {
      name: "Tres Leches de Fresa",
      desc: "Bizcocho tres leches con fresas frescas, dulce y afrutado.",
      price: "S/ 6",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=310",
      customizationOptions: optPorcion,
    },
    {
      name: "Pionono",
      desc: "Brazo de gitano enrollado con manjar blanco artesanal, clásico cusqueño.",
      price: "S/ 4",
      image: "https://picsum.photos/400/300?random=311",
      customizationOptions: optPorcion,
    },
  ],

  // ── Hojaldres, Pyes y Alfajores ───────────────────────────────────────────
  hojaldres: [
    {
      name: "Lengua de Suegra",
      desc: "Hojaldre crujiente enrollado y caramelizado, fino y delicioso.",
      price: "S/ 3",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=401",
      customizationOptions: optHojaldre,
    },
    {
      name: "Cachito",
      desc: "Hojaldre en forma de cuerno relleno de manjar blanco casero.",
      price: "S/ 3",
      image: "https://picsum.photos/400/300?random=402",
      customizationOptions: optHojaldre,
    },
    {
      name: "Strudel de Manzana",
      desc: "Hojaldre enrollado con relleno de manzana canela y azúcar.",
      price: "S/ 3",
      image: "https://picsum.photos/400/300?random=403",
      customizationOptions: optHojaldre,
    },
    {
      name: "Voulevant",
      desc: "Cesta de hojaldre crujiente rellena de crema pastelera.",
      price: "S/ 3",
      image: "https://picsum.photos/400/300?random=404",
      customizationOptions: optHojaldre,
    },
    {
      name: "Mil Hojas",
      desc: "Capas de hojaldre hojaldrado intercaladas con crema chantilly y manjar.",
      price: "S/ 4",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=405",
      customizationOptions: optHojaldre,
    },
    {
      name: "Cien Hojas",
      desc: "Versión más compacta del mil hojas, igual de crujiente y cremoso.",
      price: "S/ 3",
      image: "https://picsum.photos/400/300?random=406",
      customizationOptions: optHojaldre,
    },
    {
      name: "Pye de Manzana",
      desc: "Tarta de manzana horneada con canela y azúcar, crujiente por fuera y tierna por dentro.",
      price: "S/ 6",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=407",
      customizationOptions: optPye,
    },
    {
      name: "Pye de Limón",
      desc: "Tarta de crema de limón sobre base de hojaldre con merengue tostado.",
      price: "S/ 6",
      image: "https://picsum.photos/400/300?random=408",
      customizationOptions: optPye,
    },
    {
      name: "Mini Pye de Pecana",
      desc: "Pequeña tarta de pecanas caramelizadas, crujiente y dulce.",
      price: "S/ 8",
      tag: "Especial",
      image: "https://picsum.photos/400/300?random=409",
      customizationOptions: optPye,
    },
    {
      name: "Alfajor de Coco",
      desc: "Alfajor de masa suave con manjar blanco artesanal y coco rallado.",
      price: "S/ 3",
      image: "https://picsum.photos/400/300?random=410",
      customizationOptions: optAlfajor,
    },
    {
      name: "Alfajor de Maní",
      desc: "Alfajor crujiente con crema de maní y cobertura de azúcar glass.",
      price: "S/ 3",
      image: "https://picsum.photos/400/300?random=411",
      customizationOptions: optAlfajor,
    },
  ],

  // ── Empanadas ─────────────────────────────────────────────────────────────
  salados: [
    {
      name: "Empanada de Queso",
      desc: "Empanada horneada rellena de queso andino fundido, dorada y crujiente.",
      price: "S/ 4",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=501",
      customizationOptions: optEmpanada,
    },
    {
      name: "Empanada Mixta",
      desc: "Empanada con relleno de queso andino, jamón y vegetales.",
      price: "S/ 4",
      image: "https://picsum.photos/400/300?random=502",
      customizationOptions: optEmpanada,
    },
    {
      name: "Empanada de Pollo",
      desc: "Empanada horneada con relleno jugoso de pollo al ajillo y especias.",
      price: "S/ 5",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=503",
      customizationOptions: optEmpanada,
    },
    {
      name: "Empanada de Carne",
      desc: "Empanada de masa crujiente con relleno de carne molida sazonada.",
      price: "S/ 5",
      image: "https://picsum.photos/400/300?random=504",
      customizationOptions: optEmpanada,
    },
  ],

  // ── Tortas Enteras ────────────────────────────────────────────────────────
  tortas: [
    {
      name: "Red Velvet",
      desc: "Torta completa red velvet con frosting de queso crema. Disponible en 4 tamaños. Pedido con anticipación.",
      price: "S/ 30",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=601",
      sizes: [
        { label: "8 porciones", price: "S/ 30" },
        { label: "12 porciones", price: "S/ 40" },
        { label: "16 porciones", price: "S/ 55" },
        { label: "32 porciones", price: "S/ 70" },
      ],
      customizationOptions: optTorta,
    },
    {
      name: "Frutos Secos",
      desc: "Torta completa con mezcla de nueces, almendras y pasas. Pedido con anticipación.",
      price: "S/ 30",
      image: "https://picsum.photos/400/300?random=602",
      sizes: [
        { label: "8 porciones", price: "S/ 30" },
        { label: "12 porciones", price: "S/ 40" },
        { label: "16 porciones", price: "S/ 55" },
        { label: "32 porciones", price: "S/ 70" },
      ],
      customizationOptions: optTorta,
    },
    {
      name: "Naranja",
      desc: "Torta completa de bizcocho de naranja con glaseado cítrico. Pedido con anticipación.",
      price: "S/ 30",
      image: "https://picsum.photos/400/300?random=603",
      sizes: [
        { label: "8 porciones", price: "S/ 30" },
        { label: "12 porciones", price: "S/ 40" },
        { label: "16 porciones", price: "S/ 55" },
        { label: "32 porciones", price: "S/ 70" },
      ],
      customizationOptions: optTorta,
    },
    {
      name: "Chocolate",
      desc: "Torta completa de chocolate intenso con cobertura de ganache. Pedido con anticipación.",
      price: "S/ 30",
      tag: "Favorito",
      image: "https://picsum.photos/400/300?random=604",
      sizes: [
        { label: "8 porciones", price: "S/ 30" },
        { label: "12 porciones", price: "S/ 40" },
        { label: "16 porciones", price: "S/ 55" },
        { label: "32 porciones", price: "S/ 70" },
      ],
      customizationOptions: optTorta,
    },
    {
      name: "Arco Iris",
      desc: "Torta completa multicolor con capas de colores vibrantes. Pedido con anticipación.",
      price: "S/ 30",
      tag: "Especial",
      image: "https://picsum.photos/400/300?random=605",
      sizes: [
        { label: "8 porciones", price: "S/ 30" },
        { label: "12 porciones", price: "S/ 40" },
        { label: "16 porciones", price: "S/ 55" },
        { label: "32 porciones", price: "S/ 70" },
      ],
      customizationOptions: optTorta,
    },
    {
      name: "Torta Tres Leches",
      desc: "Torta completa tres leches. Disponible en: Vainilla, Chocolate, Moca, Cereza o Fresa. Pedido con anticipación.",
      price: "S/ 45",
      image: "https://picsum.photos/400/300?random=606",
      customizationOptions: [
        "Sabor: Vainilla",
        "Sabor: Chocolate",
        "Sabor: Moca",
        "Sabor: Maracuya",
        "Sabor: Fresa",
        "Con dedicatoria",
        "Para llevar",
        "Con cubiertos",
      ],
    },
  ],
};

/** Fotos destacadas para el carrusel */
const featuredImages = [
  { src: "https://picsum.photos/1200/400?random=301", alt: "Red Velvet" },
  { src: "https://picsum.photos/1200/400?random=103", alt: "Cappuccino" },
  { src: "https://picsum.photos/1200/400?random=405", alt: "Mil Hojas" },
  {
    src: "https://picsum.photos/1200/400?random=503",
    alt: "Empanada de Pollo",
  },
  { src: "https://picsum.photos/1200/400?random=601", alt: "Torta Red Velvet" },
  {
    src: "https://picsum.photos/1200/400?random=203",
    alt: "Chocolate Pasta Pura",
  },
];

const tagColors: Record<string, string> = {
  Favorito: "bg-[#C8A96E]/20 text-[#8B6914]",
  Nuevo: "bg-green-100 text-green-700",
  Especial: "bg-[#6B3A2A]/10 text-[#6B3A2A]",
};

type MenuItemWithCategory = MenuItem & { category: Category };

// Todos los items aplanados para búsqueda
const allItems: MenuItemWithCategory[] = (
  Object.entries(menuItems) as [Category, MenuItem[]][]
).flatMap(([category, items]) => items.map((item) => ({ ...item, category })));

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("cafes");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { searchQuery, setSearchQuery } = useSearch();

  const isSearching = searchQuery.trim().length > 0;

  const displayItems: MenuItemWithCategory[] = isSearching
    ? allItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      )
    : menuItems[activeCategory].map((item) => ({
        ...item,
        category: activeCategory,
      }));

  const categoryIcon = (cat: Category) =>
    categories.find((c) => c.id === cat)?.icon ?? Coffee;

  return (
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[#C8A96E] text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Nuestra Carta
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1008] mb-4">
            Sabores que <span className="italic text-[#6B3A2A]">enamoran</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C8A96E]" />
            <div className="w-2 h-2 rounded-full bg-[#C8A96E]" />
            <div className="h-px w-12 bg-[#C8A96E]" />
          </div>
          <p className="max-w-xl mx-auto text-[#6B3A2A]/60 text-base">
            Elaborado con ingredientes frescos de los Andes peruanos, cada plato
            es una celebración de nuestra tierra.
          </p>
        </div>

        {/* Carrusel de productos destacados */}
        <ProductCarousel images={featuredImages} className="mb-14" />

        {/* Tabs o resultado de búsqueda */}
        {isSearching ? (
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-[#C8A96E]" />
              <span className="text-sm text-[#6B3A2A]/70">
                {displayItems.length > 0 ? (
                  <>
                    <span className="font-semibold text-[#1C1008]">
                      {displayItems.length}
                    </span>{" "}
                    resultado{displayItems.length !== 1 ? "s" : ""} para{" "}
                    <span className="font-semibold text-[#C8A96E]">
                      "{searchQuery}"
                    </span>
                  </>
                ) : (
                  <>
                    Sin resultados para{" "}
                    <span className="font-semibold text-[#C8A96E]">
                      "{searchQuery}"
                    </span>
                  </>
                )}
              </span>
            </div>
            <button
              onClick={() => setSearchQuery("")}
              className="flex items-center gap-1.5 text-xs text-[#6B3A2A]/50 hover:text-[#C8A96E] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Limpiar
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === cat.id
                    ? "bg-[#1C1008] text-[#C8A96E] shadow-lg"
                    : "bg-[#F5F0E8] text-[#6B3A2A] hover:bg-[#C8A96E]/15",
                )}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Items grid */}
        {displayItems.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-[#C8A96E]/30 mx-auto mb-4" />
            <p className="text-[#6B3A2A]/50 text-sm">
              No encontramos productos con ese nombre.
            </p>
            <p className="text-[#6B3A2A]/35 text-xs mt-1">
              Intenta con otro término.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item) => {
              const cat = "category" in item ? item.category : activeCategory;
              const Icon = categoryIcon(cat);
              return (
                <div
                  key={item.name}
                  onClick={() => setSelectedItem(item)}
                  className="group bg-[#FBF8F3] rounded-2xl p-6 border border-[#C8A96E]/10 hover:border-[#C8A96E]/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="w-10 h-10 rounded-xl bg-[#C8A96E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C8A96E]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#C8A96E]" />
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-[#1C1008] text-base leading-tight">
                      {item.name}
                    </h4>
                    {item.tag && (
                      <span
                        className={cn(
                          "text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap",
                          tagColors[item.tag],
                        )}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {isSearching && "category" in item && (
                    <span className="inline-block text-[0.65rem] text-[#C8A96E]/60 uppercase tracking-wider mb-1 font-medium">
                      {categories.find((c) => c.id === item.category)?.label}
                    </span>
                  )}

                  <p className="text-sm text-[#6B3A2A]/60 leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-[#C8A96E]">
                        {item.price}
                      </span>
                      {item.sizes && item.sizes.length > 0 && (
                        <span className="text-xs text-[#6B3A2A]/40 ml-1">
                          desde
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#6B3A2A]/50 group-hover:text-[#C8A96E] transition-colors font-medium">
                      Ver opciones →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-[#6B3A2A]/50 text-sm mb-4">
            ¿Tienes restricciones alimentarias? Podemos adaptarnos.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1C1008] text-[#C8A96E] rounded-full font-semibold hover:bg-[#3D1F0D] transition-colors"
          >
            Ver menú completo
          </a>
        </div>
      </div>

      {/* Product Modal — solo se monta cuando hay un item seleccionado */}
      {selectedItem && (
        <ProductModal
          item={selectedItem}
          isOpen={true}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}
