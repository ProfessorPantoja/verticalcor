import React, { useState, useEffect } from 'react';
import {
  Phone,
  Menu,
  X,
  PaintBucket,
  ShieldAlert,
  Eye,
  TrendingDown,
  CheckCircle2,
  Brush,
  Building2,
  DoorOpen,
  ChevronDown,
  ChevronUp,
  Wrench,
  Send,
  Building,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import MapSection from './components/MapSection';
import { Reveal } from './components/Reveal';
import { FAQItem } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Logos - Arquivos locais para maior confiabilidade
  const logoDarkBg = "/logo-dark-bg.png"; // Logo para fundo escuro (Branca/Azul)
  const logoLightBg = "/logo-light-bg.jpg"; // Logo para fundo claro (Azul/Escura)

  // Determine if header should be solid (scrolled OR menu open)
  const isHeaderSolid = isScrolled || isMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const whatsappLink = "https://wa.me/5527999999999?text=Olá!%20Gostaria%20de%20um%20orçamento%20para%20pintura%20predial.";
  const whatsappFloatingButton = "https://wa.me/5527999351626?text=Olá!%20Gostaria%20de%20um%20orçamento%20para%20pintura%20predial.";

  const faqs: FAQItem[] = [
    { question: "Vocês cobram pelo orçamento?", answer: "Não! A visita técnica e o orçamento são 100% gratuitos em Vila Velha e região." },
    { question: "A pintura faz muita sujeira?", answer: "Nossa equipe segue um protocolo rigoroso de isolamento de áreas. A limpeza é nossa prioridade e protegemos pisos e móveis." },
    { question: "Aceitam cartão de crédito?", answer: "Sim, parcelamos seu projeto para facilitar a realização do serviço." },
    { question: "Qual o prazo médio de uma obra?", answer: "Depende do tamanho do projeto, mas estabelecemos um cronograma fixo no contrato e seguimos à risca." }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* 1. Header Inteligente (Animation Premium) */}
      <motion.header
        className={`fixed w-full z-50 transition-all duration-500 ${isHeaderSolid ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Dinâmica */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                {!logoError ? (
                  <img
                    src={isHeaderSolid ? logoLightBg : logoDarkBg}
                    alt="Vertical Cor Logo"
                    className="h-10 w-auto md:h-12 object-contain transition-all duration-300 block"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  // Fallback Logo (If image fails)
                  <div className={`h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transition-colors ${isHeaderSolid ? 'bg-cyan-600 text-white' : 'bg-white text-navy-900'}`}>
                    V
                  </div>
                )}
              </motion.div>

              <div className={`flex flex-col ${isHeaderSolid ? 'opacity-100' : 'opacity-0 md:opacity-100'} transition-opacity duration-300`}>
                <span className={`text-xl font-bold tracking-tight leading-none ${isHeaderSolid ? 'text-navy-900' : 'text-white'}`}>VERTICAL</span>
                <span className={`text-sm font-light tracking-widest ${isHeaderSolid ? 'text-cyan-600' : 'text-cyan-400'}`}>COR</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 items-center">
              {['Início', 'Serviços', 'Portfólio', 'Contato'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                  className={`font-medium transition-colors hover:text-cyan-500 ${isHeaderSolid ? 'text-slate-600' : 'text-slate-200 shadow-black drop-shadow-md'}`}
                >
                  {item}
                </a>
              ))}
              <a href={whatsappFloatingButton} className={`px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5 ${isHeaderSolid ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-white text-navy-900 hover:bg-slate-100'}`}>
                <Phone size={18} /> Orçamento
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden ${isHeaderSolid ? 'text-navy-900' : 'text-white'}`}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-b border-slate-100 absolute w-full shadow-xl top-full left-0"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg">Início</a>
              <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg">Serviços</a>
              <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg">Portfólio</a>
              <a href="#contato" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg">Contato</a>
              <a href={whatsappFloatingButton} className="block mt-4 text-center bg-cyan-600 text-white px-3 py-3 rounded-lg font-bold">
                Orçamento via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* 2. Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Predial High End */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Fachada Predial Moderna"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <Reveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white max-w-4xl">
              Sua fachada é o seu cartão de visitas. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">Não deixe seu patrimônio desvalorizar.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-lg md:text-2xl text-slate-200 max-w-2xl mb-10 font-light border-l-4 border-cyan-500 pl-6">
              Especialistas em pintura predial, residencial e acabamentos de alto padrão em Vila Velha.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappLink} className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(8,145,178,0.4)] flex items-center justify-center gap-2">
                <Building size={20} /> QUERO VALORIZAR MEU IMÓVEL
              </a>
            </div>
          </Reveal>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </section>

      {/* NOVO: Seção de Vídeo (Segunda Dobra) */}
      <section className="py-20 bg-white relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Qualidade que valoriza seu imóvel</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Assista ao vídeo e veja como nosso processo de pintura predial transforma e protege seu patrimônio com excelência.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="aspect-video w-full bg-slate-100 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border border-slate-200">
              {/* Placeholder para o vídeo */}
              <div className="absolute inset-0 flex items-center justify-center bg-navy-900/5 group-hover:bg-navy-900/10 transition-colors">
                <div className="w-20 h-20 bg-cyan-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                alt="Video Thumbnail"
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-sm font-medium backdrop-blur-sm">
                Vídeo Institucional - 01:30
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Seção da Dor (Cards flutuantes) */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Sinais de que seu imóvel pede socorro</h2>
              <div className="w-24 h-1.5 bg-cyan-500 mx-auto rounded-full"></div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-red-500 hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6 mx-auto rotate-3">
                  <TrendingDown size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3 text-center">Desvalorização</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Pintura descascada e suja reduz em até <span className="font-bold text-red-500">20%</span> o valor de venda ou aluguel.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-amber-500 hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6 mx-auto -rotate-3">
                  <ShieldAlert size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3 text-center">Infiltrações</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Pequenas trincas hoje tornam-se grandes prejuízos estruturais amanhã.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-slate-500 hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-6 mx-auto rotate-3">
                  <Eye size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3 text-center">Má Impressão</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  O que seus clientes ou visitas pensam ao ver sua fachada mal cuidada?
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. A Solução (Services) */}
      <section id="servicos" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-20 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <span className="text-cyan-600 font-bold tracking-widest uppercase text-sm mb-2 block">Nossa Expertise</span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-navy-900">Acabamento Fino e <br />Proteção Duradoura</h2>
              </div>
              <p className="text-slate-500 max-w-md pb-2">
                Utilizamos técnicas avançadas e materiais de alta performance para garantir durabilidade extrema.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "Pintura Predial", desc: "Restauração completa e lavagem de fachadas." },
              { icon: Brush, title: "Efeitos Decorativos", desc: "Cimento Queimado, Marmorato e Texturas (Alta tendência)." },
              { icon: Wrench, title: "Tratamento de Superfícies", desc: "Impermeabilização, reparo de trincas e Drywall." },
              { icon: DoorOpen, title: "Acabamentos Especiais", desc: "Verniz em madeiras e pintura de portas." }
            ].map((service, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-cyan-200 transition-all duration-300 cursor-default">
                  <div className="bg-navy-900 text-cyan-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Transformação (Before/After) */}
      <section id="portfolio" className="py-24 bg-navy-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Veja a Transformação</h2>
                <p className="text-slate-300 text-lg">
                  Arraste para ver o resultado do Padrão Vertical Cor.
                </p>
              </div>
              <a href={whatsappLink} className="group whitespace-nowrap bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-navy-900 px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2">
                Quero esse resultado <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl overflow-hidden border-4 border-navy-800 shadow-2xl shadow-black/50">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1594488518001-16c52683058c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                afterImage="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              />
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">Imagens meramente ilustrativas para demonstração da interface</p>
          </Reveal>
        </div>
      </section>

      {/* 6. Prova Social e Autoridade */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-3xl font-bold text-navy-900">Por que escolher a Vertical Cor?</h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: "Limpeza Extrema", text: "Protegemos seu piso e móveis. Entregamos a obra limpa." },
              { title: "Prazo Garantido", text: "Cronograma seguido à risca." },
              { title: "Materiais Premium", text: "Só trabalhamos com tintas e insumos de primeira linha." },
              { title: "Orçamento Transparente", text: "Sem surpresas no final da obra." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-navy-900">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy-900">Dúvidas Frequentes</h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="border border-slate-200 rounded-xl overflow-hidden hover:border-cyan-200 transition-colors">
                  <button
                    className="w-full flex justify-between items-center p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-bold text-navy-900 text-lg">{faq.question}</span>
                    {activeAccordion === index ? <ChevronUp className="text-cyan-600" /> : <ChevronDown className="text-slate-400" />}
                  </button>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="p-6 bg-white text-slate-600 border-t border-slate-200 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Footer (Conversion + Map) */}
      <footer id="contato" className="bg-navy-900 text-slate-300 pt-24 pb-10 relative overflow-hidden">
        {/* Decorative Blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-20">

            {/* Left: CTA & Form */}
            <Reveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pronto para transformar seu imóvel?</h2>
                <p className="mb-10 text-slate-400 text-lg">
                  Entre em contato hoje e receba uma visita técnica gratuita de um engenheiro ou técnico especializado.
                </p>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input type="text" className="w-full bg-navy-800/50 border border-slate-700 rounded-xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <input type="tel" className="w-full bg-navy-800/50 border border-slate-700 rounded-xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="(27) 99999-9999" />
                  </div>
                  <button className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-cyan-900/50">
                    <Send size={20} /> SOLICITAR ORÇAMENTO
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Right: Map & Contact Info */}
            <Reveal delay={0.2}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    {!logoError ? (
                      <img src={logoDarkBg} alt="Vertical Cor" className="h-12 w-auto object-contain" onError={() => setLogoError(true)} />
                    ) : (
                      <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center font-bold text-navy-900">V</div>
                    )}
                    <div className="h-10 w-px bg-slate-700"></div>
                    <p className="text-slate-400 text-sm max-w-[200px]">Excelência em pintura predial e acabamentos.</p>
                  </div>

                  {/* Fixed Map Structure */}
                  <div className="mb-8">
                    <MapSection />
                  </div>

                  <div className="space-y-6">
                    <a href={whatsappLink} className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group">
                      <div className="w-12 h-12 bg-navy-800 rounded-full flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <Phone size={20} />
                      </div>
                      <span className="text-lg">(27) 99999-9999</span>
                    </a>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-navy-800 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                      <span className="text-green-400 font-medium">Equipes disponíveis para início imediato</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>© 2025 Vertical Cor. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0 flex gap-6">
              <a href="#" className="hover:text-cyan-400 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappFloatingButton}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20bd5a]"
        aria-label="Fale conosco no WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <Phone size={32} fill="white" />
      </motion.a>
    </div>
  );
}

export default App;