import { Heart, Award, Users, Leaf } from "lucide-react";
import heroImg from "@/assets/hero.png";

const values = [
  {
    icon: Heart,
    title: "Hecho con Amor",
    desc: "Cada receta es preparada con pasión y dedicación, usando ingredientes locales de Cusco y el Valle Sagrado.",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    desc: "Seleccionamos los mejores granos de café de altura, cultivados en las laderas de los Andes peruanos.",
  },
  {
    icon: Users,
    title: "Comunidad",
    desc: "Un espacio acogedor donde vecinos y viajeros se encuentran para compartir momentos especiales.",
  },
  {
    icon: Leaf,
    title: "Sostenible",
    desc: "Comprometidos con el medio ambiente, trabajamos con productores locales y practicas eco-amigables.",
  },
];


export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-[#FBF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[#C8A96E] text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Nuestra Historia
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1008] mb-6">
            Más que una cafetería,
            <br />
            <span className="italic text-[#6B3A2A]">una experiencia</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#C8A96E]" />
            <div className="w-2 h-2 rounded-full bg-[#C8A96E]" />
            <div className="h-px w-12 bg-[#C8A96E]" />
          </div>
          <p className="max-w-2xl mx-auto text-[#6B3A2A]/70 text-base sm:text-lg leading-relaxed">
            Nacimos en el corazón del Cusco con un sueño: crear un refugio donde
            la tradición cafetalera andina se une a la calidez del hogar. Desde
            2015, hemos sido el rincón favorito de cusqueños y visitantes del
            mundo.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Imagen */}
          <div className="relative">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden">
              {/* Imagen de fondo */}
              <img
                src={heroImg}
                alt="La Sarentina"
                className="w-full h-full object-cover"
              />
              {/* Overlay oscuro */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008]/70 via-[#1C1008]/20 to-transparent" />
              {/* Marca sobre la imagen */}
              <div className="absolute bottom-6 left-6">
                <p className="text-[#C8A96E] font-serif italic text-3xl font-bold drop-shadow">
                  La Sarentina
                </p>
                <p className="text-[#F5F0E8]/70 text-xs tracking-[0.3em] uppercase mt-1">
                  Cafetería & Pastelería · Cusco
                </p>
              </div>
              {/* Elementos decorativos */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full border border-[#C8A96E]/40" />
            </div>
            {/* Badge flotante */}
            <div className="absolute -bottom-6 -right-6 bg-[#1C1008] text-white rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-bold text-[#C8A96E]">+9</div>
              <div className="text-xs text-white/70 mt-1">Años de experiencia</div>
            </div>
          </div>

          {/* Texto */}
          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-bold text-[#1C1008]">
              El alma del Cusco
              <br />
              <span className="text-[#C8A96E]">en cada taza</span>
            </h3>
            <p className="text-[#6B3A2A]/70 leading-relaxed">
              La Sarentina nació del amor de una familia cusqueña por el café y
              la repostería artesanal. Inspirados en los sabores del Valle
              Sagrado y las tradiciones andinas, creamos un menú que celebra lo
              mejor de Cusco.
            </p>
            <p className="text-[#6B3A2A]/70 leading-relaxed">
              Nuestros granos de café provienen de pequeños productores de
              altura, seleccionados cuidadosamente para garantizar una taza
              perfecta. Cada pastel, cada sandwich y cada bebida es preparado
              con ingredientes frescos y locales.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { num: "50+", label: "Variedades de café" },
                { num: "30+", label: "Delicias artesanales" },
                { num: "200+", label: "Clientes al día" },
                { num: "4.9★", label: "Calificación promedio" },
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 border-[#C8A96E] pl-4">
                  <div className="text-2xl font-bold text-[#1C1008]">
                    {stat.num}
                  </div>
                  <div className="text-sm text-[#6B3A2A]/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#C8A96E]/10 hover:border-[#C8A96E]/40 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C8A96E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C8A96E]/20 transition-colors">
                <v.icon className="w-6 h-6 text-[#C8A96E]" />
              </div>
              <h4 className="font-semibold text-[#1C1008] mb-2">{v.title}</h4>
              <p className="text-sm text-[#6B3A2A]/60 leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
