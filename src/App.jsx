import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Calendar, 
  ChevronRight, 
  Menu, 
  X, 
  Heart, 
  Star,
  Zap,
  Leaf,
  Plus,
  Minus,
  Check,
  Send,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import logo from "./assets/LogoCircular.png";
import imagenRetiro from './assets/Imagenes/Imagen retiro.jpg';
import imagenEquipo from './assets/Imagenes/Imagen equipo.jpg';
import instagram1 from './assets/Imagenes/imagen instagram 1.jpg';
import instagram2 from './assets/Imagenes/imagen instagram 2.jpg';
import instagram3 from './assets/Imagenes/imagen instagram 3.jpeg';
import instagram4 from './assets/Imagenes/imagen instagram 4.jpeg';
import instagram5 from './assets/Imagenes/imagen instagram 5.jpg';
import instagram6 from './assets/Imagenes/imagen instagram 6.jpeg';
import instagram7 from './assets/Imagenes/imagen instagram 7.jpeg';
import instagram8 from './assets/Imagenes/imagen instagram 8.jpg';
import retiroSeptiembre1 from './assets/Imagenes/Retiro refugio cristal.jpeg';
import retiroSeptiembre2 from './assets/Imagenes/Retiro refugio cristal 2.jpeg';
import retiroSeptiembre3 from './assets/Imagenes/Retiro refugio cristal 3.jpeg';
import retiroSeptiembre4 from './assets/Imagenes/Retiro refugio cristal 4.jpeg';

const InstagramIcon = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const currentRef = domRef.current;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(currentRef);
        }
      });
    }, { threshold: 0.1 });

    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Enviando...');
    try {
      const response = await fetch('https://formspree.io/f/xqenanjp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus('¡Mensaje enviado con éxito! Gracias por contactar.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          setFormStatus(data["errors"].map(error => error["message"]).join(", "));
        } else {
          setFormStatus('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
        }
      }
    } catch (error) {
      setFormStatus('Hubo un error de red. Por favor, comprueba tu conexión.');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Clases', id: 'clases' },
    { name: 'Tarifas', id: 'tarifas' },
    { name: 'Retiros', id: 'retiros' },
    { name: 'Talleres', id: 'talleres' },
    { name: 'Nosotros', id: 'nosotros' },
    { name: 'Contacto', id: 'contacto' }
  ];

  const faqs = [
    { q: "¿Es necesario tener experiencia previa?", a: "Absolutamente no. Nuestras clases de 'Fundamentos' están diseñadas para guiarte desde cero con seguridad y paciencia." },
    { q: "¿Tengo que llevar mi propia esterilla?", a: "Contamos con materiales de alta calidad y bloques de corcho en el estudio, pero eres libre de traer tu propia esterilla si lo prefieres." },
    { q: "¿Cómo reservo mi primera clase?", a: "Puedes hacerlo directamente a través de nuestro botón de WhatsApp o agendando en la sección de tarifas." }
  ];

  const pricing60min = [
    { 
      name: '1 Día / Semana', 
      price: '40€',
      priceSuffix: '/mes',
      features: [
        'Ideal para empezar',
        'Crea un hábito saludable'
      ] 
    },
    { 
      name: '2 Días / Semana', 
      price: '61€', 
      priceSuffix: '/mes',
      features: [
        'Acelera tu progreso',
        'El plan más popular'
      ], 
      popular: true 
    },
    { 
      name: '3 Días / Semana', 
      price: '81€', 
      priceSuffix: '/mes',
      features: [
        'Máximo compromiso',
        'Para una inmersión total'
      ] 
    }
  ];

  const pricing90min = [
    { 
      name: '1 Día / Semana', 
      price: '57€',
      priceSuffix: '/mes',
      features: [
        'Práctica más profunda',
        'Conexión cuerpo-mente'
      ] 
    },
    { 
      name: '2 Días / Semana', 
      price: '82€', 
      priceSuffix: '/mes',
      features: [
        'Transformación constante',
        'Recomendado para avanzar'
      ], 
      popular: true 
    },
    { 
      name: '3 Días / Semana', 
      price: '108€', 
      priceSuffix: '/mes',
      features: [
        'Inmersión completa',
        'Compromiso total con tu bienestar'
      ] 
    }
  ];

  const proximosRetiros = [
    {
      title: 'Retiro Refugio De Cristal',
      date: '25-27 Septiembre, 2026',
      location: 'Casa Rural El Refugio De Cristal, Toledo',
      description: 'Una escapada para reconectar con la naturaleza y contigo. Tres días de yoga, meditación, senderismo y comida saludable en un entorno idílico.',
      images: [
        retiroSeptiembre1,
        retiroSeptiembre2,
        retiroSeptiembre3,
        retiroSeptiembre4,
      ],
      features: [
        'Alojamiento en casa rural con encanto',
        'Clases de Hatha y Vinyasa Yoga diarias',
        'Taller de cocina vegetariana',
        'Rutas de senderismo guiadas',
        'Círculos de mujeres y meditación'
      ],
      price: 'Desde 350€'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3ED] font-sans text-[#1A1A1A] selection:bg-[#707A5E] selection:text-white scroll-smooth overflow-x-hidden">
      
      {/* --- NAVEGACIÓN --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#3C412C]/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="#" className="block">
              <img 
                src={logo}
                alt="The Loto Yoga Experience Logo"
                className={`transition-all duration-500 ${scrolled ? 'h-12' : 'h-16'}`} />
            </a>
            <div className={`text-xl md:text-1xl font-serif tracking-widest uppercase transition-colors ${scrolled ? 'text-[#FAF9F6]' : 'text-[#3C412C]'}`}>
              The Loto Yoga Experience
            </div>
          </div>
          
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className={`text-[10px] tracking-[0.2em] uppercase transition-all hover:opacity-50 ${scrolled ? 'text-[#FAF9F6]' : 'text-[#3C412C]'}`}>
                {link.name}
              </a>
            ))}
            <a 
              href={`https://wa.me/34640665407?text=${encodeURIComponent(`¡Hola! Me gustaría saber más sobre The Loto Yoga Experience. ¿Me puedes ayudar?`)}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-[#707A5E] text-[#FAF9F6] px-6 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-[#3C412C] transition-all border border-transparent hover:border-[#FAF9F6]/20">
              Háblanos
            </a>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={scrolled ? 'text-[#FAF9F6]' : 'text-[#3C412C] hover:scale-110 transition-transform'}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#3C412C] z-60 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-[#FAF9F6] hover:rotate-90 transition-transform"><X size={32} /></button>
          {navLinks.map((link, idx) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-[#FAF9F6] text-3xl font-serif tracking-widest uppercase italic hover:text-[#707A5E] transition-colors"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <a
            href={`https://wa.me/34640665407?text=${encodeURIComponent(`¡Hola! Me gustaría saber más sobre The Loto Yoga Experience. ¿Me puedes ayudar?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 bg-[#707A5E] text-[#FAF9F6] px-10 py-4 rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform">
            Háblanos
          </a>
        </div>
      )}

      {/* --- PORTADA (HERO) --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#3C412C]/5 z-0" />
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-[#707A5E]/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#3C412C]/10 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <FadeInSection delay={0}>
            <span className="text-[#707A5E] uppercase tracking-[0.5em] text-[10px] mb-6 block">Estudio Boutique · Madrid</span>
          </FadeInSection>
          
          <FadeInSection delay={200}>
            <h1 className="text-6xl md:text-9xl font-serif text-[#3C412C] leading-[0.9] mb-10">
              Tu viaje <br />
              <span className="italic font-light">empieza aquí</span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={400}>
            <p className="text-[#1A1A1A]/70 text-lg md:text-xl font-light mb-12 max-w-xl mx-auto leading-relaxed">
              Un espacio sagrado para el movimiento consciente, la respiración profunda y la reconexión total.
            </p>
          </FadeInSection>

          <FadeInSection delay={600}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#contacto" className="bg-[#3C412C] text-[#FAF9F6] px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[#707A5E] transition-all shadow-xl shadow-[#3C412C]/20 hover:-translate-y-1">
                Contacta con nosotros
              </a>
              <a href="https://whatsapp.com/channel/0029VbCK6eGEAKWDBf9RJT1u" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#3C412C] text-xs uppercase tracking-widest font-bold group">
                Grupo de Difusión <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- CLASES --- */}
      <section id="clases" className="py-32 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <FadeInSection className="md:col-span-1">
              <h2 className="text-[#3C412C] text-5xl font-serif mb-6">Nuestra Práctica</h2>
              <p className="text-[#1A1A1A]/60 font-light leading-relaxed mb-8">
                Diseñamos cada sesión para equilibrar el cuerpo físico con la calma mental. No importa tu nivel, hay un mat esperándote.
              </p>
              <div className="h-px w-24 bg-[#707A5E]/30" />
            </FadeInSection>
            
            {[
              { title: 'Círculo de mujeres', level: 'Intermedio', desc: 'Un círculo es un espacio de encuentro, escucha y conexión donde cada persona puede expresarse libremente desde la autenticidad y el respeto.', icon: <Zap size={20} /> },
              { title: 'Hatha Yoga', level: 'Todos los niveles', desc: 'Es un estilo de yoga pausado y accesible, ideal tanto para principiantes como para quienes desean profundizar en una práctica más consciente.', icon: <Leaf size={20} /> },
              { title: 'Ahstanga yoga', level: 'Relajación', desc: 'Es un estilo de yoga ideal para quienes buscan una práctica física más exigente, pero también una herramienta de equilibrio, constancia y crecimiento personal.', icon: <Heart size={20} /> }
            ].map((clase, i) => (
              <FadeInSection key={i} delay={i * 200}>
                <div className="group cursor-default bg-white/50 p-8 rounded-3xl hover:bg-white transition-colors duration-500 hover:shadow-lg hover:shadow-[#3C412C]/5 h-full">
                  <div className="text-[#707A5E] mb-6 transform group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500">{clase.icon}</div>
                  <h3 className="text-2xl font-serif text-[#3C412C] mb-2">{clase.title}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-[#707A5E] block mb-4">{clase.level}</span>
                  <p className="text-[#1A1A1A]/60 text-sm font-light leading-relaxed">{clase.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* --- TARIFAS --- */}
      <section id="tarifas" className="py-32 px-6 bg-[#F5F3ED]">
        <div className="max-w-7xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-5xl font-serif text-[#3C412C] mb-16">Nuestras Tarifas</h2>
          </FadeInSection>
          <FadeInSection delay={100}>
            <h3 className="text-3xl font-serif text-[#3C412C] mb-4">CLASES · 60 MIN</h3>
            <div className="h-px w-24 bg-[#707A5E]/30 mx-auto mb-10" />
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing60min.map((plan, i) => (
              <FadeInSection key={i} delay={i * 200}>
                <div className={`p-12 rounded-[2.5rem] transition-all duration-500 flex flex-col h-full ${plan.popular ? 'bg-[#3C412C] text-[#FAF9F6] shadow-2xl md:scale-105 hover:scale-110' : 'bg-white text-[#3C412C] hover:-translate-y-2 hover:shadow-xl'}`}>
                  {plan.popular && <span className="text-[10px] font-bold uppercase tracking-widest bg-[#707A5E] py-1 px-4 rounded-full self-center mb-6 animate-pulse">El más popular</span>}
                  <h3 className="text-2xl font-serif mb-4">{plan.name}</h3>
                  <div className="text-5xl font-light mb-8 italic">
                    {plan.price}<span className="text-2xl not-italic font-normal align-baseline">{plan.priceSuffix}</span>
                  </div>
                  <ul className="text-sm space-y-4 mb-12 grow opacity-80 text-left pl-4">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3"><Check size={14} className="text-[#707A5E] shrink-0"/> {f}</li>
                    ))}
                  </ul>
                  <a href="#contacto" className={`block text-center w-full py-4 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${plan.popular ? 'bg-[#FAF9F6] text-[#3C412C] hover:bg-[#707A5E] hover:text-white' : 'bg-[#3C412C] text-white hover:bg-[#707A5E]'}`}>
                    Saber más
                  </a>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="mt-24">
            <FadeInSection delay={200}>
              <h3 className="text-3xl font-serif text-[#3C412C] mb-6">PRÁCTICA COMPLETA · 90 MIN</h3>
              <p className="text-[#1A1A1A]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                Una experiencia más profunda donde combinamos asana, respiración, presencia y relajación.
              </p>
            </FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricing90min.map((plan, i) => (
                <FadeInSection key={i} delay={i * 200}>
                  <div className={`p-12 rounded-[2.5rem] transition-all duration-500 flex flex-col h-full ${plan.popular ? 'bg-[#3C412C] text-[#FAF9F6] shadow-2xl md:scale-105 hover:scale-110' : 'bg-white text-[#3C412C] hover:-translate-y-2 hover:shadow-xl'}`}>
                    {plan.popular && <span className="text-[10px] font-bold uppercase tracking-widest bg-[#707A5E] py-1 px-4 rounded-full self-center mb-6 animate-pulse">Recomendado</span>}
                    <h3 className="text-2xl font-serif mb-4">{plan.name}</h3>
                    <div className="text-5xl font-light mb-8 italic">
                      {plan.price}<span className="text-2xl not-italic font-normal align-baseline">{plan.priceSuffix}</span>
                    </div>
                    <ul className="text-sm space-y-4 mb-12 grow opacity-80 text-left pl-4">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3"><Check size={14} className="text-[#707A5E] shrink-0"/> {f}</li>
                      ))}
                    </ul>
                    <a href="#contacto" className={`block text-center w-full py-4 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${plan.popular ? 'bg-[#FAF9F6] text-[#3C412C] hover:bg-[#707A5E] hover:text-white' : 'bg-[#3C412C] text-white hover:bg-[#707A5E]'}`}>
                      Saber más
                    </a>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <FadeInSection delay={300}>
              <h3 className="text-3xl font-serif text-[#3C412C] mb-6">Bonos Flexibles</h3>
              <p className="text-[#1A1A1A]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                ¿Prefieres practicar sin ataduras? Nuestros bonos te dan la libertad de venir cuando quieras.
              </p>
              <div className="flex flex-col md:flex-row gap-8 justify-center">
                <div className="bg-white p-10 rounded-[2.5rem] text-left flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300 w-full md:w-auto">
                  <h4 className="text-xl font-serif text-[#3C412C] mb-2">Bono 10 clases · 60 min</h4>
                  <p className="text-4xl font-light text-[#707A5E] mb-6 italic">105€</p>
                  <div className="grow"></div>
                  <a href="#contacto" className="block text-center bg-[#3C412C] text-white py-3 px-8 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#707A5E] transition-colors mt-4">
                    Saber más
                  </a>
                </div>
                <div className="bg-white p-10 rounded-[2.5rem] text-left flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300 w-full md:w-auto">
                  <h4 className="text-xl font-serif text-[#3C412C] mb-2">Bono 10 clases · 90 min</h4>
                  <p className="text-4xl font-light text-[#707A5E] mb-6 italic">140€</p>
                  <div className="grow"></div>
                  <a href="#contacto" className="block text-center bg-[#3C412C] text-white py-3 px-8 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#707A5E] transition-colors mt-4">
                    Saber más
                  </a>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* --- RETIROS --- */}
      <section id="retiros" className="bg-[#3C412C] py-32 px-6 text-[#FAF9F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <FadeInSection className="relative z-10">
            <span className="text-[#707A5E] uppercase tracking-[0.3em] text-[10px] mb-4 block">Experiencias Inmersivas</span>
            <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight">Retiros de <br /><span className="italic">Desconexión</span></h2>
            <p className="text-[#FAF9F6]/60 font-light text-lg leading-relaxed mb-12">
              Son espacios creados para desconectar de la rutina, reconectar con una misma y vivir experiencias conscientes en la naturaleza. A través del yoga, el movimiento, actividades creativas y momentos de calma, busco crear encuentros llenos de bienestar, conexión y comunidad.
            </p>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#707A5E]/30 pb-4 group cursor-pointer hover:border-[#FAF9F6] transition-colors">
                <div><h4 className="text-xl font-serif group-hover:text-[#707A5E] transition-colors">Ávila: Yoga & Relax</h4><p className="text-[10px] uppercase text-[#707A5E]">Noviembre 2025</p></div>
                <ArrowRight className="group-hover:translate-x-4 group-hover:text-[#707A5E] transition-all" />
              </div>
              <div className="flex justify-between items-center border-b border-[#707A5E]/30 pb-4 group cursor-pointer hover:border-[#FAF9F6] transition-colors">
                <div><h4 className="text-xl font-serif group-hover:text-[#707A5E] transition-colors">Cuenca: Salud y Bienestar</h4><p className="text-[10px] uppercase text-[#707A5E]">Mayo 2026</p></div>
                <ArrowRight className="group-hover:translate-x-4 group-hover:text-[#707A5E] transition-all" />
              </div>
              <div className="flex justify-between items-center border-b border-[#707A5E]/30 pb-4 group cursor-pointer hover:border-[#FAF9F6] transition-colors">
                <div><h4 className="text-xl font-serif group-hover:text-[#707A5E] transition-colors">Cuenca: Proximamente</h4><p className="text-[10px] uppercase text-[#707A5E]">Septiembre 2026</p></div>
                <ArrowRight className="group-hover:translate-x-4 group-hover:text-[#707A5E] transition-all" />
              </div>
            </div>
          </FadeInSection>
          <FadeInSection delay={300}>
            <div className="aspect-4/5 rounded-t-full border border-[#707A5E]/40 hover:scale-105 transition-transform duration-1000 overflow-hidden">
              <img src={imagenRetiro} alt="Retiro de yoga en un entorno natural" className="w-full h-full object-cover" />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- PRÓXIMOS RETIROS --- */}
      <section id="proximos-retiros" className="py-32 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center">
              <span className="text-[#707A5E] uppercase tracking-[0.3em] text-[10px] mb-4 block">No te lo pierdas</span>
              <h2 className="text-5xl md:text-7xl font-serif text-[#3C412C] mb-20 leading-tight">Próximo Retiro</h2>
            </div>
          </FadeInSection>
          
          {proximosRetiros.map((retiro, index) => (
            <FadeInSection key={index} delay={index * 200}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 bg-white p-12 rounded-[3rem] shadow-lg shadow-[#3C412C]/5">
                {/* Columna de Imágenes */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-3xl overflow-hidden shadow-md aspect-square">
                    <img src={retiro.images[0]} alt={`Imagen 1 de ${retiro.title}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-md aspect-square">
                    <img src={retiro.images[1]} alt={`Imagen 2 de ${retiro.title}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-md aspect-square">
                    <img src={retiro.images[2]} alt={`Imagen 3 de ${retiro.title}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-md aspect-square">
                    <img src={retiro.images[3]} alt={`Imagen 4 de ${retiro.title}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                {/* Columna de Texto */}
                <div>
                  <span className="text-[#707A5E] uppercase tracking-[0.3em] text-[10px] mb-4 block">{retiro.date} &middot; {retiro.location}</span>
                  <h3 className="text-4xl font-serif text-[#3C412C] mb-6">{retiro.title}</h3>
                  <p className="text-[#1A1A1A]/70 font-light leading-relaxed mb-8">
                    {retiro.description}
                  </p>
                  <ul className="space-y-3 mb-10">
                    {retiro.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-[#3C412C]/80">
                        <Check size={16} className="text-[#707A5E] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <a 
                      href={`https://wa.me/34640665407?text=${encodeURIComponent(`¡Hola! Me gustaría reservar una plaza para el retiro "${retiro.title}". ¿Me puedes dar más información?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#3C412C] text-[#FAF9F6] px-10 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[#707A5E] transition-all shadow-xl shadow-[#3C412C]/20 hover:-translate-y-1"
                    >
                      Reservar Plaza
                    </a>
                    <div className="text-left">
                      <span className="text-2xl font-serif text-[#707A5E]">{retiro.price}</span>
                      <p className="text-xs text-[#1A1A1A]/50">Plazas limitadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* --- TALLERES --- */}
      <section id="talleres" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl font-serif text-center text-[#3C412C] mb-16 underline decoration-[#707A5E]/30 underline-offset-8">Talleres Especiales</h2>
          </FadeInSection>
          <FadeInSection delay={100}>
            <div className="text-center text-[#1A1A1A]/70 font-light leading-relaxed mb-16 space-y-4 max-w-3xl mx-auto">
              <p>
                Son espacios creados para conectar con el cuerpo, la mente y las emociones desde un lugar consciente, creativo y humano. Cada mes realizo un taller diferente, creando experiencias únicas con distintas temáticas y dinámicas. Entre ellas se encuentran prácticas de yoga, creación de diarios personales, vision boards, escritura consciente y actividades de conexión emocional y creativa. También organizo experiencias en la naturaleza, como senderismo o paseos a caballo, buscando reconectar con el entorno y disfrutar del momento presente.
              </p>
              <p>
                Todos los talleres se anuncian y comparten a través de mis redes sociales, donde voy publicando las próximas fechas, temáticas y toda la información de cada encuentro.
              </p>
            </div>
          </FadeInSection>
          <div className="space-y-6">
            {[
              { title: 'Ruta a caballo y yoga', date: '31 MAY', price: '55€' },
              { title: 'Crea tu diario', date: '14 JUN', price: '40€' },
              { title: 'Vision board', date: 'ENERO 2027', price: '50€' }
            ].map((taller, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className="bg-white border border-[#3C412C]/5 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center hover:shadow-xl hover:shadow-[#3C412C]/5 hover:-translate-y-1 transition-all group">
                  <div className="flex items-center gap-8 mb-4 md:mb-0">
                    <div className="text-center">
                      <span className="block text-2xl font-serif text-[#707A5E] group-hover:scale-110 transition-transform">{taller.date.split(' ')[0]}</span>
                      <span className="text-[10px] text-[#3C412C]/40 uppercase">{taller.date.split(' ')[1]}</span>
                    </div>
                    <h4 className="text-xl font-serif text-[#3C412C]">{taller.title}</h4>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="font-light text-[#707A5E]">{taller.price}</span>
                    <a 
                      href={`https://wa.me/34640665407?text=${encodeURIComponent(`¡Hola! Me encantaría apuntarme al taller de "${taller.title}". ¿Me puedes dar más información?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#3C412C] text-white px-6 py-2 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#707A5E] transition-colors">
                      Inscribirme
                    </a>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* --- QUIÉNES SOMOS --- */}
      <section id="nosotros" className="py-32 px-6 bg-[#707A5E] text-[#FAF9F6]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <FadeInSection className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-64 h-64 md:w-100 md:h-100 bg-[#3C412C] rounded-full overflow-hidden border-8 border-[#FAF9F6]/10 mb-8 flex items-center justify-center italic text-xs text-[#FAF9F6]/40 hover:rotate-3 transition-transform duration-700">
              <img src={imagenEquipo} alt="Retiro de yoga en un entorno natural" className="w-full h-full object-cover" />
            </div>
          </FadeInSection>
          <div className="w-full md:w-1/2">
            <FadeInSection delay={200}>
              <h2 className="text-5xl font-serif mb-8 italic">El Alma del Estudio</h2>
              <p className="text-lg font-light leading-relaxed mb-8 opacity-90">
                Nuestra escuela de yoga nace desde el amor, la sensibilidad y el deseo de crear un espacio donde las personas puedan sentirse en calma, acompañadas y conectadas consigo mismas. Madre e hija, compartimos este proyecto con ilusión, uniendo nuestras energías, aprendizajes y formas de cuidar a quienes forman parte del estudio.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-[#FAF9F6]/20 pt-8">
                <div><h5 className="text-3xl font-serif italic">3+</h5><p className="text-[10px] uppercase tracking-widest opacity-60">Años de experiencia</p></div>
                <div><h5 className="text-3xl font-serif italic">300+</h5><p className="text-[10px] uppercase tracking-widest opacity-60">Alumnos felices</p></div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIOS --- */}
      <section className="py-32 px-6 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-20">
              <div className="flex justify-center gap-1 text-[#707A5E] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <h2 className="text-4xl font-serif text-[#3C412C]">Lo que dicen nuestros alumnos</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { author: "Mayte Palacios", text: "sus talleres y retiros de yoga son una pasada. Muy bien organizados y siempre aprendes algo nuevo." },
              { author: "Adriandb 01", text: "Un gimnasio muy completo y con retiro de yoga súper bien preparados en los que seguro que te divertirás y tendrás un gran cambio de perspectiva en tu vida" },
              { author: "Izan Molina Fernández", text: "Fui con mi pareja, una maravilla Karen y Jennifer, los talleres de yoga que realizan en las instalaciones son muy nutritivos, bonitos y relajantes, volveremos😘" }
            ].map((test, i) => (
              <FadeInSection key={i} delay={i * 300}>
                <div className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full">
                  <p className="text-xl font-light italic text-[#3C412C]/80 mb-8 leading-relaxed">"{test.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#F5F3ED] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#3C412C]">— {test.author}</span>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* --- INSTAGRAM (AESTHETIC) --- */}
      <section id="instagram" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-serif text-[#3C412C] uppercase tracking-widest mb-2">Comunidad Digital</h2>
                <p className="text-[#707A5E] italic text-sm">Inspiración diaria en @thelotoyogaexperience</p>
              </div>
              <a href="https://www.instagram.com/thelotoyogaexperience?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="flex items-center gap-3 bg-[#F5F3ED] text-[#3C412C] px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[#3C412C] hover:text-white transition-all hover:scale-105">
                Seguir en Instagram <InstagramIcon size={16} />
              </a>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[instagram1, instagram2, instagram3, instagram4, instagram5, instagram6, instagram7, instagram8].map((img, i) => (
              <FadeInSection key={img} delay={i * 100}>
                <div className="aspect-square bg-[#F5F3ED] group relative overflow-hidden cursor-pointer rounded-2xl border border-[#3C412C]/5">
                  <div className="absolute inset-0 bg-[#3C412C]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center text-white">
                    <InstagramIcon size={24} className="scale-50 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                  <img src={img} alt={`Publicación de Instagram ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-32 px-6 bg-[#F5F3ED]">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl font-serif text-[#3C412C] text-center mb-16">Dudas Frecuentes</h2>
          </FadeInSection>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className="bg-white rounded-3xl overflow-hidden border border-[#3C412C]/5 hover:border-[#707A5E]/30 transition-colors">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-8 flex justify-between items-center hover:bg-[#FAF9F6] transition-colors"
                  >
                    <span className="text-left font-serif text-[#3C412C] text-lg">{faq.q}</span>
                    <div className={`transform transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`}>
                      {activeFaq === i ? <Minus size={20} className="text-[#707A5E]" /> : <Plus size={20} className="text-[#707A5E]" />}
                    </div>
                  </button>
                  <div 
                    className={`px-8 text-[#1A1A1A]/60 font-light text-sm leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${
                      activeFaq === i ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {faq.a}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* --- FORMULARIO DE CONTACTO --- */}
      <section id="contacto" className="py-32 px-6">
        <FadeInSection>
          <div className="max-w-5xl mx-auto bg-[#3C412C] rounded-[4rem] p-12 md:p-20">
            <h2 className="text-4xl font-serif text-[#FAF9F6] text-center mb-4">Contacta con Nosotros</h2>
            <p className="text-center text-[#FAF9F6]/60 font-light mb-12 max-w-2xl mx-auto">
              ¿Tienes alguna pregunta o quieres saber más? Rellena el formulario y te responderemos lo antes posible.
            </p>
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-lg border border-[#3C412C]/5">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#707A5E] mb-2 block">Nombre</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-[#F5F3ED] border border-transparent px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-[#707A5E] focus:ring-1 focus:ring-[#707A5E] transition-all" />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#707A5E] mb-2 block">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-[#F5F3ED] border border-transparent px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-[#707A5E] focus:ring-1 focus:ring-[#707A5E] transition-all" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#707A5E] mb-2 block">Mensaje</label>
                  <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} required className="w-full bg-[#F5F3ED] border border-transparent px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-[#707A5E] focus:ring-1 focus:ring-[#707A5E] transition-all resize-none"></textarea>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <button type="submit" className="bg-[#3C412C] text-[#FAF9F6] px-12 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[#707A5E] transition-all shadow-lg shadow-[#3C412C]/20 hover:-translate-y-1 w-full md:w-auto flex items-center justify-center gap-3">
                    Enviar Mensaje <Send size={14} />
                  </button>
                  {formStatus && (
                    <p className={`text-sm mt-4 text-center ${formStatus.includes('error') ? 'text-red-500' : 'text-[#707A5E]'}`}>
                      {formStatus}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#F5F3ED] border-t border-[#3C412C]/5 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-xs">
            <h3 className="text-xl font-serif tracking-[0.2em] uppercase text-[#3C412C] mb-6">The Loto Yoga Experience</h3>
            <p className="text-[#1A1A1A]/40 text-xs leading-relaxed mb-8">
              Un santuario urbano dedicado a la expansión de la consciencia a través del movimiento corporal y la quietud mental.
            </p>
            <div className="flex gap-6 text-[#3C412C]/60">
              <InstagramIcon className="cursor-pointer hover:text-[#707A5E] hover:-translate-y-1 transition-transform" size={20} />
              <MessageCircle className="cursor-pointer hover:text-[#707A5E] hover:-translate-y-1 transition-transform" size={20} />
              <MapPin className="cursor-pointer hover:text-[#707A5E] hover:-translate-y-1 transition-transform" size={20} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] uppercase tracking-[0.2em] text-[#3C412C]">
            <div className="flex flex-col gap-4">
              <span className="font-bold text-[#707A5E]">Estudio</span>
              <a href="#clases" className="hover:opacity-50 hover:translate-x-1 transition-all">Clases</a>
              <a href="#horarios" className="hover:opacity-50 hover:translate-x-1 transition-all">Horarios</a>
              <a href="#tarifas" className="hover:opacity-50 hover:translate-x-1 transition-all">Tarifas</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-bold text-[#707A5E]">Contacto</span>
              <span>info@theyogaexperiencejk.com</span>
              <span>+34 640 665 407</span>
              <span>C/ Sociedad de Condueños, 1, 28804 Alcalá de Henares, Madrid</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-bold text-[#707A5E]">Legal</span>
              <a href="#" className="hover:opacity-50 hover:translate-x-1 transition-all">Privacidad</a>
              <a href="#" className="hover:opacity-50 hover:translate-x-1 transition-all">Términos</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#3C412C]/5 text-center text-[8px] uppercase tracking-[0.4em] text-[#3C412C]/30">
          © 2026 THE LOTO YOGA EXPERIENCE · HECHO CON INTENCIÓN · NAMASTÉ
        </div>
      </footer>

      {/* --- BOTÓN WHATSAPP FLOTANTE --- */}
      <div className="fixed bottom-8 right-8 z-100 flex flex-col items-end gap-4 group">
        <div className="bg-white text-[#3C412C] px-6 py-3 rounded-2xl shadow-2xl border border-[#3C412C]/5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <p className="text-[10px] font-bold uppercase tracking-widest">¿Hablamos?</p>
          <p className="text-xs font-light">Respuesta lo antes posible</p>
        </div>
        
        <a 
          href={`https://wa.me/34640665407?text=${encodeURIComponent(`¡Hola! Me gustaría saber más sobre The Loto Yoga Experience. ¿Me puedes ayudar?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all relative"
        >
          <MessageCircle size={32} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#707A5E] border-2 border-white rounded-full animate-bounce" />
        </a>
      </div>

    </div>
  );
};

export default App;