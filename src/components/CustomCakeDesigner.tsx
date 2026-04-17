import React, { useState } from "react";
import { X, Phone, ImagePlus, ChevronDown } from "lucide-react";
import ProductCarousel from "@/components/ProductCarousel";
import { cn } from "@/lib/utils";

// ─── Datos de configuración ──────────────────────────────────────────────────

const cakeImages = [
  { src: "https://picsum.photos/600/400?random=801", alt: "Torta personalizada" },
  { src: "https://picsum.photos/600/400?random=802", alt: "Torta de cumpleaños" },
  { src: "https://picsum.photos/600/400?random=803", alt: "Torta de bodas" },
  { src: "https://picsum.photos/600/400?random=804", alt: "Torta temática" },
  { src: "https://picsum.photos/600/400?random=805", alt: "Torta decorada" },
];

const bizcochosBase = [
  "Red Velvet",
  "Frutos Secos",
  "Naranja",
  "Chocolate",
  "Arco Iris",
  "Tres Leches",
];

const tresLechesOptions = [
  "Vainilla",
  "Chocolate",
  "Moca",
  "Cereza",
  "Fresa",
];

const decoraciones = [
  { label: "Detallado en crema", desc: "Acabado profesional con manga pastelera" },
  { label: "Azúcar comestible", desc: "Flores y figuras en azúcar artesanal" },
  { label: "Impresión comestible", desc: "Foto o diseño impreso en papel comestible" },
  { label: "Fondant", desc: "Cobertura lisa de fondant moldeable" },
  { label: "Flores naturales", desc: "Decoración con flores frescas de temporada" },
  { label: "Minimalista", desc: "Acabado simple y elegante sin adornos elaborados" },
];

const tamanos = [
  { label: "8 porciones",  price: "S/ 30" },
  { label: "12 porciones", price: "S/ 40" },
  { label: "16 porciones", price: "S/ 55" },
  { label: "32 porciones", price: "S/ 70" },
];

// Tres Leches tiene precio fijo independiente del tamaño
const TRES_LECHES_PRICE = "S/ 45";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildWhatsAppMessage(
  bizcocho: string,
  tresLechesSabor: string,
  decoracion: string,
  tamano: string,
  price: string,
  ocasion: string,
  dedicatoria: string,
): string {
  const sep = "----------------------------";
  let msg = "Hola! Quisiera encargar una *torta personalizada* en La Sarentina:\n\n";
  msg += `${sep}\n`;
  msg += `*Sabor/Bizcocho:* ${bizcocho}${tresLechesSabor ? ` – ${tresLechesSabor}` : ""}\n`;
  msg += `*Decoración:* ${decoracion}\n`;
  msg += `*Tamaño:* ${tamano}\n`;
  if (ocasion) msg += `*Ocasión:* ${ocasion}\n`;
  if (dedicatoria) msg += `*Dedicatoria:* "${dedicatoria}"\n`;
  msg += `${sep}\n`;
  msg += `\n*Precio estimado: ${price}*\n\n`;
  msg +=
    "*IMPORTANTE:* Por favor adjunta una foto de referencia del diseño que deseas al responder este mensaje.\n\n";
  msg += "Confirmarán disponibilidad y detalles. Gracias!";
  return msg;
}

// ─── Componente modal ────────────────────────────────────────────────────────

interface DesignerModalProps {
  onClose: () => void;
}

const DesignerModal: React.FC<DesignerModalProps> = ({ onClose }) => {
  const [bizcocho, setBizcocho] = useState("");
  const [tresLechesSabor, setTresLechesSabor] = useState("");
  const [decoracion, setDecoracion] = useState("");
  const [tamano, setTamano] = useState(tamanos[1]);
  const [ocasion, setOcasion] = useState("");
  const [dedicatoria, setDedicatoria] = useState("");
  const [sent, setSent] = useState(false);

  const isTresLeches = bizcocho === "Tres Leches";
  const activePrice = isTresLeches ? TRES_LECHES_PRICE : tamano.price;
  const canSend = bizcocho !== "" && decoracion !== "" && (!isTresLeches || tresLechesSabor !== "");

  const handleSend = () => {
    const msg = buildWhatsAppMessage(
      bizcocho,
      tresLechesSabor,
      decoracion,
      isTresLeches ? "Torta completa" : tamano.label,
      activePrice,
      ocasion,
      dedicatoria,
    );
    const url = `https://wa.me/51973511402?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle móvil */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[#C8A96E]/30" />
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#1C1008] leading-tight">
                Diseña tu Torta
              </h3>
              <p className="text-xs text-[#6B3A2A]/50 mt-0.5">
                Personaliza cada detalle — te contactamos para confirmar
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#FBF8F3] rounded-full transition-colors ml-3 flex-shrink-0"
            >
              <X className="w-4 h-4 text-[#6B3A2A]" />
            </button>
          </div>

          {/* 1. Sabor del bizcocho */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#1C1008] mb-3">
              1. Sabor del bizcocho
            </label>
            <div className="grid grid-cols-2 gap-2">
              {bizcochosBase.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    setBizcocho(b);
                    if (b !== "Tres Leches") setTresLechesSabor("");
                  }}
                  className={cn(
                    "px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 text-left",
                    bizcocho === b
                      ? "border-[#C8A96E] bg-[#C8A96E]/10 text-[#8B6914]"
                      : "border-[#C8A96E]/15 bg-[#FBF8F3] text-[#6B3A2A] hover:border-[#C8A96E]/40",
                  )}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Sub-selección sabor tres leches */}
            {isTresLeches && (
              <div className="mt-3 pl-3 border-l-2 border-[#C8A96E]/30">
                <p className="text-xs text-[#6B3A2A]/60 mb-2 font-medium">
                  Sabor de las tres leches:
                </p>
                <div className="flex flex-wrap gap-2">
                  {tresLechesOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setTresLechesSabor(s)}
                      className={cn(
                        "px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150",
                        tresLechesSabor === s
                          ? "border-[#C8A96E] bg-[#C8A96E]/10 text-[#8B6914]"
                          : "border-[#C8A96E]/15 bg-white text-[#6B3A2A] hover:border-[#C8A96E]/40",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Tipo de decoración */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#1C1008] mb-3">
              2. Tipo de decoración
            </label>
            <div className="space-y-2">
              {decoraciones.map((d) => (
                <button
                  key={d.label}
                  onClick={() => setDecoracion(d.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all duration-150 text-left",
                    decoracion === d.label
                      ? "border-[#C8A96E] bg-[#C8A96E]/8 text-[#1C1008]"
                      : "border-[#C8A96E]/15 bg-[#FBF8F3] text-[#6B3A2A] hover:border-[#C8A96E]/40",
                  )}
                >
                  <span className={decoracion === d.label ? "font-medium" : ""}>
                    {d.label}
                  </span>
                  <span className="text-xs text-[#6B3A2A]/45 text-right max-w-[45%]">
                    {d.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Tamaño — solo si no es Tres Leches */}
          {!isTresLeches && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1C1008] mb-3">
                3. Tamaño
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tamanos.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setTamano(t)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all duration-150",
                      tamano.label === t.label
                        ? "border-[#C8A96E] bg-[#C8A96E]/8 text-[#1C1008]"
                        : "border-[#C8A96E]/15 bg-[#FBF8F3] text-[#6B3A2A] hover:border-[#C8A96E]/40",
                    )}
                  >
                    <span className={cn("text-xs", tamano.label === t.label ? "font-medium" : "")}>
                      {t.label}
                    </span>
                    <span
                      className={cn(
                        "font-bold text-xs",
                        tamano.label === t.label ? "text-[#C8A96E]" : "text-[#6B3A2A]/55",
                      )}
                    >
                      {t.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Precio estimado */}
          <div className="flex items-center justify-between mb-6 px-4 py-3 bg-[#FBF8F3] rounded-xl border border-[#C8A96E]/15">
            <span className="text-sm text-[#6B3A2A]/60">Precio estimado</span>
            <span className="text-lg font-bold text-[#C8A96E]">{activePrice}</span>
          </div>

          {/* 4. Ocasión */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#1C1008] mb-2">
              Ocasión{" "}
              <span className="text-xs font-normal text-[#6B3A2A]/40">(opcional)</span>
            </label>
            <input
              type="text"
              value={ocasion}
              onChange={(e) => setOcasion(e.target.value)}
              placeholder="Ej: Cumpleaños, Aniversario, Boda..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#C8A96E]/20 focus:border-[#C8A96E] focus:outline-none text-sm text-[#1C1008] bg-[#FBF8F3] transition-all placeholder:text-[#6B3A2A]/30"
            />
          </div>

          {/* 5. Dedicatoria */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#1C1008] mb-2">
              Dedicatoria{" "}
              <span className="text-xs font-normal text-[#6B3A2A]/40">(opcional)</span>
            </label>
            <input
              type="text"
              value={dedicatoria}
              onChange={(e) => setDedicatoria(e.target.value)}
              placeholder="Ej: Feliz cumpleaños Ana!"
              className="w-full px-4 py-2.5 rounded-xl border border-[#C8A96E]/20 focus:border-[#C8A96E] focus:outline-none text-sm text-[#1C1008] bg-[#FBF8F3] transition-all placeholder:text-[#6B3A2A]/30"
            />
          </div>

          {/* Aviso foto de referencia */}
          <div className="flex items-start gap-3 mb-6 p-4 bg-[#C8A96E]/8 border border-[#C8A96E]/25 rounded-xl">
            <ImagePlus className="w-5 h-5 text-[#C8A96E] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#8B6914]">
                Incluye una foto de referencia
              </p>
              <p className="text-xs text-[#6B3A2A]/60 mt-0.5 leading-relaxed">
                Al enviar el mensaje por WhatsApp, adjunta una imagen del diseño
                que deseas como referencia para nuestro equipo.
              </p>
            </div>
          </div>

          {/* Botón enviar */}
          <button
            onClick={handleSend}
            disabled={!canSend || sent}
            className={cn(
              "w-full py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300",
              sent
                ? "bg-[#C8A96E]/20 text-[#C8A96E] cursor-default"
                : canSend
                  ? "bg-[#1C1008] text-[#C8A96E] hover:bg-[#3D1F0D]"
                  : "bg-[#1C1008]/20 text-[#6B3A2A]/40 cursor-not-allowed",
            )}
          >
            <Phone className="w-4 h-4" />
            {sent ? "¡Abriendo WhatsApp!" : "Enviar pedido por WhatsApp"}
          </button>

          {!canSend && (
            <p className="text-center text-xs text-[#6B3A2A]/40 mt-2">
              Elige sabor y tipo de decoración para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Componente principal (box) ───────────────────────────────────────────────

export default function CustomCakeDesigner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#C8A96E]/15">
        {/* Carrusel de fotos de tortas */}
        <div style={{ aspectRatio: "16 / 7" }} className="relative">
          <ProductCarousel images={cakeImages} intervalMs={4000} />
          {/* Badge flotante */}
          <div className="absolute top-3 left-3 bg-[#1C1008]/80 backdrop-blur-sm text-[#C8A96E] text-xs font-semibold px-3 py-1.5 rounded-full">
            Tortas personalizadas
          </div>
        </div>

        {/* Contenido del box */}
        <div className="p-7">
          <h3 className="text-2xl font-serif font-bold text-[#1C1008] mb-2 leading-tight">
            ¿Quieres diseñar
            <br />
            <span className="italic text-[#6B3A2A]">tu propia torta?</span>
          </h3>
          <p className="text-[#6B3A2A]/55 text-sm mb-6 leading-relaxed">
            Elige sabor, tamaño y decoración. Generamos un pedido
            personalizado directo a nuestro equipo vía WhatsApp.
          </p>

          {/* Características */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {[
              { label: "6 sabores", sub: "de bizcocho" },
              { label: "6 tipos", sub: "de decoración" },
              { label: "4 tamaños", sub: "disponibles" },
            ].map((f) => (
              <div
                key={f.label}
                className="text-center p-3 bg-[#FBF8F3] rounded-xl border border-[#C8A96E]/10"
              >
                <p className="text-[#C8A96E] font-bold text-sm">{f.label}</p>
                <p className="text-[#6B3A2A]/50 text-xs mt-0.5">{f.sub}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-3.5 bg-[#1C1008] text-[#C8A96E] rounded-xl font-semibold text-base hover:bg-[#3D1F0D] transition-colors flex items-center justify-center gap-2"
          >
            Diseñar mi torta
            <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </button>

          <p className="text-center text-xs text-[#6B3A2A]/35 mt-3">
            Te confirmamos disponibilidad en menos de 24 h
          </p>
        </div>
      </div>

      {modalOpen && <DesignerModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
