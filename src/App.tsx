import React, { useState, useEffect, useRef } from 'react';
import {
  Settings,
  Wrench,
  Cpu,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Factory,
  ShieldCheck,
  MessageSquare,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const SERVICES = [
  {
    id: 1,
    title: "Moldes para Rotomoldagem",
    description: "Projetos desenvolvidos com precisão dimensional e foco absoluto em durabilidade estrutural.",
    icon: <Cpu className="w-5 h-5" />,
    details: ["Fabricação", "Desenvolvimento Técnico", "Manutenção e Recuperação", "Melhoria Técnica"]
  },
  {
    id: 2,
    title: "Manutenção Industrial",
    description: "Serviços de manutenção mecânica e estrutural rigorosa, com metodologia e segurança operacional.",
    icon: <Wrench className="w-5 h-5" />,
    details: ["Corretiva e Preventiva", "Reforços Estruturais", "Recuperação de Componentes", "Apoio Técnico"]
  },
  {
    id: 3,
    title: "Engenharia e Montagem",
    description: "Soluções sob medida para ambientes industriais complexos que demandam alto rigor de execução.",
    icon: <Settings className="w-5 h-5" />,
    details: ["Estruturas Metálicas", "Suportes e Bases Técnicas", "Montagem de Conjuntos", "Adequações"]
  }
];

const DIFFERENTIATORS = [
  "Especialização em moldes para rotomoldagem",
  "Foco técnico com engenharia de processo",
  "Controle de qualidade auditável",
  "Engenharia direta com o cliente (B2B)",
  "Soluções puramente sob medida",
  "Previsibilidade rigorosa de prazos"
];

const PROCESS_STEPS = [
  { step: "01", title: "Análise Técnica", desc: "Entendimento dimensional da necessidade." },
  { step: "02", title: "Definição de Solução", desc: "Escopo técnico e engenharia aplicada." },
  { step: "03", title: "Fabricação Controlada", desc: "Execução com maquinário de precisão." },
  { step: "04", title: "Inspeção e Validação", desc: "Garantias e testes de tolerância." },
  { step: "05", title: "Entrega e Suporte", desc: "Start-up da operação e acompanhamento." }
];

// Hook de scroll reveal com IntersectionObserver (JS puro)
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    // Pequeno delay para DOM estar pronto
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}

// Hook de efeito magnético no cursor para botões
function useMagneticEffect() {
  useEffect(() => {
    const btns = document.querySelectorAll<HTMLElement>('.magnetic-btn');

    const handleMouseMove = (e: MouseEvent, btn: HTMLElement) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    };

    const handleMouseLeave = (btn: HTMLElement) => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    };

    const handleMouseEnter = (btn: HTMLElement) => {
      btn.style.transition = 'transform 0.1s ease';
    };

    const listeners: Array<() => void> = [];

    btns.forEach((btn) => {
      const move = (e: MouseEvent) => handleMouseMove(e, btn);
      const leave = () => handleMouseLeave(btn);
      const enter = () => handleMouseEnter(btn);
      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
      btn.addEventListener('mouseenter', enter);
      listeners.push(() => {
        btn.removeEventListener('mousemove', move);
        btn.removeEventListener('mouseleave', leave);
        btn.removeEventListener('mouseenter', enter);
      });
    });

    return () => listeners.forEach((cleanup) => cleanup());
  }, []);
}

// Hook de contador animado
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { count, ref } = useCountUp(value);
  return <span ref={ref as React.RefObject<HTMLSpanElement>}>{count}{suffix}</span>;
}

const HERO_VIDEOS = [
  "_uUDdWNs_Eo",
  "ytY7JTtaFxo",
  "I8QbyWyOm5c"
];

function HeroBackground() {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <div className="absolute inset-0 bg-[#F8F9FA]" />
      {HERO_VIDEOS.map((videoId, index) => (
        <div 
          key={videoId} 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] transition-opacity duration-[2000ms] ease-in-out ${index === currentVideo ? 'opacity-[0.7] md:opacity-[0.85]' : 'opacity-0'}`}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playsinline=1`}
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        </div>
      ))}
      {/* Overlay layers to blend the video and ensure text readability */}
      <div className="absolute inset-0 bg-white/40 md:bg-white/25 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-[#F8F9FA]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)]" />
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useScrollReveal();
  useMagneticEffect();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans overflow-x-hidden">

      {/* Barra de progresso de leitura */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 z-[200] origin-left shadow-[0_0_8px_rgba(37,99,235,0.6)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Cursor glow (desktop only) */}
      <div id="cursor-glow" className="cursor-glow" aria-hidden="true" />

      {/* === NAVEGAÇÃO === */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-600/25 blur-lg rounded-xl group-hover:bg-blue-600/50 transition-all duration-500" />
                <div className="relative w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 cursor-pointer overflow-hidden">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <Settings className="w-5 h-5 text-white" />
                  </motion.div>
                  {/* Sheen effect */}
                  <div className="sheen-effect" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                METAL <span className="text-blue-600">MACH</span>
              </span>
            </motion.div>

            {/* Nav links */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center gap-8 bg-white/60 backdrop-blur-md px-8 py-3 rounded-full border border-white/50 shadow-sm"
            >
              {[
                { href: '#servicos', label: 'Serviços' },
                { href: '#diferenciais', label: 'Diferenciais' },
                { href: '#processo', label: 'Processo' },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="nav-link text-sm font-semibold text-gray-600 hover:text-blue-600">
                  {label}
                </a>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block"
            >
              <a href="#contato" className="magnetic-btn cta-btn group relative overflow-hidden bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/25 flex items-center gap-2">
                <span className="relative z-10">Solicitar Orçamento</span>
                <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                <div className="btn-shine" />
              </a>
            </motion.div>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative z-50 p-2 text-gray-900 bg-white/80 backdrop-blur-md rounded-lg border border-gray-200 transition-all hover:bg-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-white/92 md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-2xl font-bold text-center">
              {[
                { href: '#servicos', label: 'Serviços' },
                { href: '#diferenciais', label: 'Diferenciais' },
                { href: '#processo', label: 'Processo' },
                { href: '#contato', label: 'Contato' },
              ].map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  href={href}
                  className="hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === HERO === */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden">
        <HeroBackground />

        {/* Blob de fundo */}
        <div className="hero-blob hero-blob-1 z-[2]" />
        <div className="hero-blob hero-blob-2 z-[2]" />
        {/* Partículas flutuantes */}
        <div className="floating-particles z-[2]" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
          >
            {/* Conteúdo principal */}
            <div className="w-full relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                {/* Badge de status */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold uppercase tracking-wider mb-8 border border-blue-200/50 shadow-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-600" />
                  </span>
                  <span className="relative z-10 text-[10px] sm:text-xs">Engenharia e Precisão Aplicada</span>
                </div>

                {/* Título com animação de texto */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-gray-900 drop-shadow-[0_4px_12px_rgba(255,255,255,0.7)] flex flex-col items-center gap-2">
                  <span className="animated-word block">Fabricação de Moldes</span>
                  <span className="animated-word block delay-100 flex flex-wrap justify-center items-center gap-2">
                    <span className="text-blue-600/80">&amp;</span>
                    <span className="caixa-destaque">
                      <span className="text-blue-700 gradient-text drop-shadow-sm">Manutenção Industrial.</span>
                    </span>
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-2xl mx-auto leading-relaxed font-bold animated-word delay-200 drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">
                  Atendemos manufaturas que exigem confiabilidade absoluta. Soluções de alta precisão desenhadas para resistir ao chão de fábrica moderno.
                </p>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4 mb-14 animated-word delay-200 justify-center">
                  <a href="#contato" className="magnetic-btn group relative flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-[15px] shadow-[0_10px_20px_-10px_rgba(37,99,235,0.6)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
                    <span className="relative z-10 font-black tracking-wide">Orçamento Técnico</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_forwards]" />
                  </a>
                  <a href="#servicos" className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md">
                    Explorar Capacidades
                  </a>
                </div>

                {/* Estatísticas com contador */}
                <div className="flex flex-wrap justify-center gap-10 pt-8 border-t border-gray-300/60 w-full max-w-3xl mx-auto">
                  {[
                    { value: 10, suffix: '+', label: 'anos de mercado' },
                    { value: 300, suffix: '+', label: 'projetos entregues' },
                    { value: 100, suffix: '%', label: 'foco B2B industrial' },
                  ].map(({ value, suffix, label }) => (
                    <div key={label} className="flex flex-col items-center">
                      <span className="text-3xl font-black text-gray-900 tabular-nums drop-shadow-sm">
                        <StatNumber value={value} suffix={suffix} />
                      </span>
                      <span className="text-xs text-gray-700 font-bold mt-0.5">{label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === SERVIÇOS === */}
      <section id="servicos" className="py-24 bg-white relative overflow-hidden">
        <div className="img-seta hidden md:block" aria-hidden="true" />
        <div className="section-bg-grid" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-blue-600" />
                <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">Nossos Serviços</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Soluções modulares para cenários exigentes.</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((service, idx) => (
              <div
                key={service.id}
                className="reveal service-card group relative p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white flex flex-col h-full overflow-hidden cursor-default"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {/* Glow hover */}
                <div className="card-glow" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 bg-white border border-gray-200/80 rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-600/20 transition-all duration-400">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed flex-grow">{service.description}</p>

                  <ul className="space-y-3 pt-6 border-t border-gray-200/70">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                        <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === DIFERENCIAIS === */}
      <section id="diferenciais" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="img-seta hidden md:block" style={{ filter: 'brightness(0) invert(1) opacity(0.1)' }} aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="diff-glow" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Card azul */}
            <div className="lg:col-span-5 reveal">
              <div className="bg-blue-600 rounded-3xl p-10 lg:p-12 relative overflow-hidden shadow-2xl shadow-blue-900/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <div className="mb-8 p-3 bg-white/15 w-fit rounded-xl border border-white/20 backdrop-blur-sm">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white leading-tight">Perfil de Clientes Atendidos</h3>
                  <ul className="space-y-5">
                    {[
                      "Indústrias de Rotomoldagem",
                      "Fabricantes de Máquinas e Bens de Capital",
                      "Setores de Manutenção Industrial",
                      "Engenharias Integradoras"
                    ].map((client, i) => (
                      <li key={i} className="flex items-start gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-2.5 flex-shrink-0 group-hover:scale-150 transition-transform duration-200" />
                        <span className="text-blue-50 font-medium leading-snug">{client}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Diferenciais lista */}
            <div className="lg:col-span-6 lg:col-start-7 lg:pl-8">
              <div className="flex items-center gap-3 mb-4 reveal">
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-blue-400 font-bold text-sm tracking-wider uppercase">Vantagem Competitiva</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-white leading-tight reveal">
                Engenharia que fala a <br className="hidden md:block" />linguagem do chão de fábrica.
              </h2>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
                {DIFFERENTIATORS.map((item, idx) => (
                  <div
                    key={idx}
                    className="reveal flex flex-col gap-3 group"
                    style={{ transitionDelay: `${idx * 60}ms` }}
                  >
                    <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 border border-gray-700 group-hover:border-blue-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-600/20">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500 group-hover:text-green-400 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM14.4743 8.419C14.7952 8.68094 14.8429 9.15341 14.581 9.47428L8.86671 16.4743C8.72427 16.6488 8.51096 16.75 8.28571 16.75C8.06047 16.75 7.84716 16.6488 7.70472 16.4743L5.419 13.6743C5.15707 13.3534 5.20484 12.8809 5.52572 12.619C5.84659 12.3571 6.31906 12.4048 6.581 12.7257L8.28571 14.814L13.419 8.52572C13.6809 8.20484 14.1534 8.15707 14.4743 8.419ZM18.4743 8.41901C18.7952 8.68095 18.8429 9.15342 18.581 9.47429L12.8665 16.4743C12.7152 16.6596 12.4846 16.7617 12.2457 16.7489C12.0068 16.7362 11.7883 16.6103 11.6575 16.4099L11.3719 15.9724C11.1455 15.6256 11.2432 15.1608 11.5901 14.9344C11.7939 14.8014 12.0384 14.7803 12.2514 14.8558L17.419 8.52571C17.681 8.20484 18.1534 8.15707 18.4743 8.41901Z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-300 group-hover:text-white transition-colors duration-200 text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === PROCESSO === */}
      <section id="processo" className="py-24 bg-[#F8F9FA] relative overflow-hidden">
        <div className="img-seta hidden md:block" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
          <div className="text-center max-w-2xl mx-auto mb-20 reveal">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">Arquitetura de Qualidade</h2>
            <p className="text-gray-500 font-medium">Método testado para eliminar retrabalhos e garantir precisão na entrega.</p>
          </div>

          <div className="relative">
            {/* Linha conectora animada */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] overflow-hidden -z-0">
              <div className="connector-line" />
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="reveal flex flex-col items-center text-center group"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center text-lg font-extrabold text-blue-600 mb-6 group-hover:scale-110 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-blue-600/20 transition-all duration-400 relative pulse-ring">
                    <span className="relative z-10">{step.step}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">{step.title}</h4>
                  <p className="text-sm text-gray-500 font-medium max-w-[180px] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="reveal cta-card bg-white rounded-3xl p-8 md:p-16 border border-gray-200/50 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 to-transparent pointer-events-none" />
            <div className="cta-shimmer" aria-hidden="true" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-200/50 icon-float">
                <Phone className="w-7 h-7" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">Acesso direto ao corpo técnico.</h2>
              <p className="text-gray-500 text-lg mb-10 font-medium leading-relaxed">
                Não perca tempo com atendimento genérico. Envie seu projeto diretamente para análise técnica e orçamentária.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/5547996713889" target="_blank" rel="noopener noreferrer"
                  className="magnetic-btn whatsapp-btn flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20c05c] text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-0.5">
                  <svg width="20" height="20" viewBox="-2 -2 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M9.516.012C4.206.262.017 4.652.033 9.929a9.798 9.798 0 0 0 1.085 4.465L.06 19.495a.387.387 0 0 0 .47.453l5.034-1.184a9.981 9.981 0 0 0 4.284 1.032c5.427.083 9.951-4.195 10.12-9.58C20.15 4.441 15.351-.265 9.516.011zm6.007 15.367a7.784 7.784 0 0 1-5.52 2.27 7.77 7.77 0 0 1-3.474-.808l-.701-.347-3.087.726.65-3.131-.346-.672A7.62 7.62 0 0 1 2.197 9.9c0-2.07.812-4.017 2.286-5.48a7.85 7.85 0 0 1 5.52-2.271c2.086 0 4.046.806 5.52 2.27a7.672 7.672 0 0 1 2.287 5.48c0 2.052-.825 4.03-2.287 5.481z" />
                    <path d="M14.842 12.045l-1.931-.55a.723.723 0 0 0-.713.186l-.472.478a.707.707 0 0 1-.765.16c-.913-.367-2.835-2.063-3.326-2.912a.694.694 0 0 1 .056-.774l.412-.53a.71.71 0 0 0 .089-.726L7.38 5.553a.723.723 0 0 0-1.125-.256c-.539.453-1.179 1.14-1.256 1.903-.137 1.343.443 3.036 2.637 5.07 2.535 2.349 4.566 2.66 5.887 2.341.75-.18 1.35-.903 1.727-1.494a.713.713 0 0 0-.408-1.072z" />
                  </svg>
                  Eng. John (WhatsApp)
                </a>
                <a href="https://wa.me/5547988382276" target="_blank" rel="noopener noreferrer"
                  className="magnetic-btn whatsapp-btn flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20c05c] text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-0.5">
                  <svg width="20" height="20" viewBox="-2 -2 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M9.516.012C4.206.262.017 4.652.033 9.929a9.798 9.798 0 0 0 1.085 4.465L.06 19.495a.387.387 0 0 0 .47.453l5.034-1.184a9.981 9.981 0 0 0 4.284 1.032c5.427.083 9.951-4.195 10.12-9.58C20.15 4.441 15.351-.265 9.516.011zm6.007 15.367a7.784 7.784 0 0 1-5.52 2.27 7.77 7.77 0 0 1-3.474-.808l-.701-.347-3.087.726.65-3.131-.346-.672A7.62 7.62 0 0 1 2.197 9.9c0-2.07.812-4.017 2.286-5.48a7.85 7.85 0 0 1 5.52-2.271c2.086 0 4.046.806 5.52 2.27a7.672 7.672 0 0 1 2.287 5.48c0 2.052-.825 4.03-2.287 5.481z" />
                    <path d="M14.842 12.045l-1.931-.55a.723.723 0 0 0-.713.186l-.472.478a.707.707 0 0 1-.765.16c-.913-.367-2.835-2.063-3.326-2.912a.694.694 0 0 1 .056-.774l.412-.53a.71.71 0 0 0 .089-.726L7.38 5.553a.723.723 0 0 0-1.125-.256c-.539.453-1.179 1.14-1.256 1.903-.137 1.343.443 3.036 2.637 5.07 2.535 2.349 4.566 2.66 5.887 2.341.75-.18 1.35-.903 1.727-1.494a.713.713 0 0 0-.408-1.072z" />
                  </svg>
                  Eng. Jacson (WhatsApp)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer id="contato" className="bg-white border-t border-gray-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-1 pr-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                  <Settings className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold tracking-tight text-gray-900">METAL MACH</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">
                Excelência usinada. Especialistas em fabricação rigorosa e soluções construtivas para a indústria.
              </p>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-gray-900">Competências</h5>
              <ul className="space-y-3 text-sm text-gray-600 font-medium">
                {["Centro de Usinagem", "Engenharia de Moldes", "Manutenção Estrutural", "Laudos Técnicos"].map(item => (
                  <li key={item}><span className="hover:text-blue-600 cursor-pointer transition-colors duration-150 block">{item}</span></li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-gray-900">Dados da Empresa</h5>
              <ul className="space-y-4 text-sm text-gray-600 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">Av. dos Imigrantes, 1147, Sala 02<br />Centro Sul, Schroeder - SC</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>metalmachbr@gmail.com</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="font-bold text-gray-900">Operação</span>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">Segunda a Sexta</p>
                <p className="text-base font-bold text-gray-900 mb-6">08:00 – 18:00</p>
                <div className="h-px w-full bg-gray-200 mb-4" />
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">CNPJ</p>
                <p className="text-sm font-medium text-gray-700">62.398.156/0001-20</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 font-medium">© {new Date().getFullYear()} METAL MACH. Todos os direitos reservados.</p>
            <p className="text-xs text-gray-400 font-medium">M&M SC SOLUÇÕES LTDA.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
