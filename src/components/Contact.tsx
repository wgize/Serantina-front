import { MapPin, Clock, Phone, Mail, ExternalLink } from "lucide-react";
import CustomCakeDesigner from "@/components/CustomCakeDesigner";

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const branches = [
  { name: "Av. Collasuyo", detail: "Paradero Primero de Mayo" },
  { name: "Amauta", detail: "Costado de la Canasta" },
  { name: "Canasta Mariscal Gamarra", detail: "Interior de la Canasta" },
  { name: "San Sebastián", detail: "Costado del Municipio" },
];

export default function Contact() {
  return (
    <section id="contacto" className="py-24 bg-[#FBF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#C8A96E] text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Encuéntranos
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1008] mb-4">
            Visítanos en <span className="italic text-[#6B3A2A]">Cusco</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C8A96E]" />
            <div className="w-2 h-2 rounded-full bg-[#C8A96E]" />
            <div className="h-px w-12 bg-[#C8A96E]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info y mapa */}
          <div className="space-y-6">
            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: MapPin,
                  title: "Sede Principal",
                  lines: [
                    "Prolongacion de la Cultura 720",
                    "Cusco 08003, Perú",
                  ],
                },
                {
                  icon: Clock,
                  title: "Horarios",
                  lines: ["Lun – Dom: 7:00 am – 11:00 pm"],
                },
                {
                  icon: Phone,
                  title: "Teléfono",
                  lines: ["+51 973 511 402"],
                },
                {
                  icon: Mail,
                  title: "Email",
                  lines: ["hola@lasarentina.pe"],
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl p-5 border border-[#C8A96E]/15 hover:border-[#C8A96E]/35 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#C8A96E]/10 flex items-center justify-center">
                      <card.icon className="w-4 h-4 text-[#C8A96E]" />
                    </div>
                    <span className="text-[#1C1008] font-semibold text-sm">
                      {card.title}
                    </span>
                  </div>
                  {card.lines.map((line) => (
                    <p key={line} className="text-[#6B3A2A]/60 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Otras sedes */}
            <div className="bg-white rounded-2xl p-5 border border-[#C8A96E]/15">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#C8A96E]/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#C8A96E]" />
                </div>
                <span className="text-[#1C1008] font-semibold text-sm">
                  Otras Sedes
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {branches.map((b) => (
                  <div
                    key={b.name}
                    className="flex items-start gap-2 p-3 rounded-xl bg-[#FBF8F3] border border-[#C8A96E]/10"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#C8A96E] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[#1C1008] text-xs font-semibold">
                        {b.name}
                      </p>
                      <p className="text-[#6B3A2A]/55 text-xs">{b.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mapa embed */}
            <div className="rounded-2xl overflow-hidden border border-[#C8A96E]/20 shadow-sm">
              <iframe
                title="Ubicación La Sarentina"
                src="https://maps.google.com/maps?q=-13.522394,-71.963018&z=17&output=embed&hl=es"
                width="100%"
                height="200"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                allowFullScreen
              />
              <div className="bg-white px-4 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#1C1008] truncate">
                    La Sarentina — Sede Principal
                  </p>
                  <p className="text-xs text-[#6B3A2A]/55 truncate">
                    Prolongacion de la Cultura 720, Cusco 08003
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/Jr3bhyP3P5H96SVC9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 shrink-0 text-xs font-semibold text-[#C8A96E] hover:text-[#B8995E] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Abrir en Maps
                </a>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex items-center gap-4">
              <span className="text-[#6B3A2A]/50 text-sm">Síguenos:</span>
              <a
                href="https://www.instagram.com/la_sarentina/?hl=es-la"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C8A96E]/20 hover:border-[#C8A96E]/50 text-[#6B3A2A] hover:text-[#C8A96E] transition-all text-sm font-medium"
              >
                <InstagramIcon />
                @la_sarentina
              </a>
              <a
                href="https://www.facebook.com/Lasarentina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C8A96E]/20 hover:border-[#C8A96E]/50 text-[#6B3A2A] hover:text-[#C8A96E] transition-all text-sm font-medium"
              >
                <FacebookIcon />
                La Sarentina
              </a>
            </div>
          </div>

          {/* Diseñador de tortas personalizado */}
          <CustomCakeDesigner />
        </div>
      </div>
    </section>
  );
}
