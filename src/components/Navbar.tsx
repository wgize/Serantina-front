import { useState, useEffect } from "react";
import { Menu, X, Coffee, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#menu", label: "Menú" },
  { href: "#ambiente", label: "Ambiente" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { state, dispatch } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#1C1008]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-[#C8A96E] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Coffee className="w-5 h-5 text-[#1C1008]" />
            </div>
            <span className="text-[#C8A96E] font-bold text-xl tracking-wide font-serif">
              La Serantina
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#F5F0E8]/80 hover:text-[#C8A96E] transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="relative p-2 text-[#F5F0E8]/80 hover:text-[#C8A96E] transition-colors"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="w-5 h-5" />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8A96E] text-[#1C1008] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </button>
            <a
              href="#contacto"
              className="ml-2 px-5 py-2 bg-[#C8A96E] text-[#1C1008] rounded-full text-sm font-semibold hover:bg-[#D4B87A] transition-colors tracking-wide"
            >
              Reservar
            </a>
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden text-[#C8A96E] p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-[#1C1008]/97 backdrop-blur-md",
          isOpen ? "max-h-80 border-t border-[#C8A96E]/20" : "max-h-0",
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#F5F0E8]/80 hover:text-[#C8A96E] transition-colors text-sm font-medium tracking-wide uppercase py-1"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              dispatch({ type: "TOGGLE_CART" });
              setIsOpen(false);
            }}
            className="flex items-center gap-2 text-[#F5F0E8]/80 hover:text-[#C8A96E] transition-colors text-sm font-medium tracking-wide uppercase py-1"
          >
            <ShoppingCart className="w-4 h-4" />
            Carrito ({state.items.length})
          </button>
          <a
            href="#contacto"
            className="mt-2 px-5 py-2.5 bg-[#C8A96E] text-[#1C1008] rounded-full text-sm font-semibold text-center hover:bg-[#D4B87A] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Reservar
          </a>
        </div>
      </div>
    </nav>
  );
}
