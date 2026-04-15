import { MapPin, Clock, Phone, Mail, Coffee } from "lucide-react";

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
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", date: "", message: "" });
  };

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
          <div className="space-y-8">
            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: MapPin,
                  title: "Dirección",
                  lines: ["Calle Plateros 348", "Centro Histórico, Cusco"],
                },
                {
                  icon: Clock,
                  title: "Horarios",
                  lines: ["Lun – Vie: 7:00 – 21:00", "Sáb – Dom: 7:00 – 22:00"],
                },
                {
                  icon: Phone,
                  title: "Teléfono",
                  lines: ["+51 984 123 456", "+51 084 22-3456"],
                },
                {
                  icon: Mail,
                  title: "Email",
                  lines: ["hola@laserantina.pe", "reservas@laserantina.pe"],
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

            {/* Mapa placeholder */}
            <div
              className="w-full h-52 rounded-2xl border border-[#C8A96E]/20 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #F5F0E8, #E8DFD0)",
              }}
            >
              <div className="text-center">
                <MapPin className="w-8 h-8 text-[#C8A96E] mx-auto mb-2" />
                <p className="text-[#6B3A2A]/60 text-sm font-medium">
                  Centro Histórico del Cusco
                </p>
                <p className="text-[#6B3A2A]/40 text-xs mt-1">
                  A 2 cuadras de la Plaza de Armas
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-xs text-[#C8A96E] hover:underline font-medium"
                >
                  Ver en Google Maps →
                </a>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex items-center gap-4">
              <span className="text-[#6B3A2A]/50 text-sm">Síguenos:</span>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C8A96E]/20 hover:border-[#C8A96E]/50 text-[#6B3A2A] hover:text-[#C8A96E] transition-all text-sm font-medium"
              >
                <InstagramIcon />
                @laserantina
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C8A96E]/20 hover:border-[#C8A96E]/50 text-[#6B3A2A] hover:text-[#C8A96E] transition-all text-sm font-medium"
              >
                <FacebookIcon />
                La Serantina
              </a>
            </div>
          </div>

          {/* Formulario de reserva */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#C8A96E]/15">
            <h3 className="text-2xl font-serif font-bold text-[#1C1008] mb-2">
              Reserva una mesa
            </h3>
            <p className="text-[#6B3A2A]/50 text-sm mb-8">
              Asegura tu lugar especial en La Serantina
            </p>

            {submitted ? (
              <div className="text-center py-12">
                <Coffee className="w-12 h-12 mx-auto mb-4 text-[#C8A96E]" />
                <h4 className="text-xl font-bold text-[#1C1008] mb-2">
                  ¡Reserva recibida!
                </h4>
                <p className="text-[#6B3A2A]/60 text-sm">
                  Te contactaremos pronto para confirmar. ¡Te esperamos!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1C1008] mb-1.5">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Tu nombre"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C8A96E]/20 focus:border-[#C8A96E] focus:outline-none focus:ring-2 focus:ring-[#C8A96E]/10 text-sm text-[#1C1008] bg-[#FBF8F3] transition-all placeholder:text-[#6B3A2A]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1008] mb-1.5">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="tu@email.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C8A96E]/20 focus:border-[#C8A96E] focus:outline-none focus:ring-2 focus:ring-[#C8A96E]/10 text-sm text-[#1C1008] bg-[#FBF8F3] transition-all placeholder:text-[#6B3A2A]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C1008] mb-1.5">
                    Fecha y hora
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#C8A96E]/20 focus:border-[#C8A96E] focus:outline-none focus:ring-2 focus:ring-[#C8A96E]/10 text-sm text-[#1C1008] bg-[#FBF8F3] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C1008] mb-1.5">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="¿Alguna ocasión especial o petición?"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#C8A96E]/20 focus:border-[#C8A96E] focus:outline-none focus:ring-2 focus:ring-[#C8A96E]/10 text-sm text-[#1C1008] bg-[#FBF8F3] transition-all placeholder:text-[#6B3A2A]/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1C1008] text-[#C8A96E] rounded-xl font-semibold text-base hover:bg-[#3D1F0D] transition-colors tracking-wide"
                >
                  Confirmar Reserva
                </button>

                <p className="text-center text-xs text-[#6B3A2A]/40">
                  Te confirmaremos tu reserva en menos de 24 horas
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
