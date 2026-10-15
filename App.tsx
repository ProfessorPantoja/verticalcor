import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  Menu,
  X,
  PaintBucket,
  ShieldAlert,
  Eye,
  TrendingDown,
  Brush,
  Building2,
  DoorOpen,
  ChevronDown,
  ChevronUp,
  Wrench,
  Sparkles,
  CalendarCheck,
  PaintRoller,
  ReceiptText,
  ArrowRight,
  Send
} from 'lucide-react';
import { motion, MotionConfig, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import MapSection from './components/MapSection';
import { Reveal } from './components/Reveal';
import { SmartVideoPlayer } from './components/SmartVideoPlayer';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { SectionHeading } from './components/SectionHeading';
import { BrandRibbon } from './components/BrandRibbon';
import { AnimatedWords } from './components/AnimatedWords';
import { Spotlight } from './components/Spotlight';
import { SectionWave } from './components/SectionWave';
import { FAQItem } from './types';
import { SITE_CONTACT, buildWhatsAppLink } from './siteConfig';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formProperty, setFormProperty] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Símbolo da marca (só o "V", fundo transparente); o nome vai em texto ao lado
  const simboloFundoEscuro = "/simbolo-vertical-cor-branco.png"; // V branco + fita ciano
  const simboloFundoClaro = "/simbolo-vertical-cor.png"; // V marinho + fita ciano

  // Topo: a foto desce mais devagar que a rolagem (profundidade); desligado se o sistema pede menos movimento
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(heroProgress, [0, 1], ['0%', reduceMotion ? '0%' : '18%']);

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

  const whatsappLink = buildWhatsAppLink();
  const whatsappBudgetLink = buildWhatsAppLink("Olá, vim do site da VERTICAL COR e quero solicitar um orçamento.");

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const messageParts = [
      SITE_CONTACT.defaultWhatsAppMessage,
      formName.trim() ? `Nome: ${formName.trim()}` : "",
      formPhone.trim() ? `Telefone informado: ${formPhone.trim()}` : "",
      formProperty ? `Tipo de imóvel: ${formProperty}` : ""
    ].filter(Boolean);

    window.open(buildWhatsAppLink(messageParts.join("\n")), "_blank", "noopener,noreferrer");
    setFormSubmitted(true);
  };

  const faqs: FAQItem[] = [
    { question: "Vocês cobram pelo orçamento?", answer: "Não! A visita técnica e o orçamento são 100% gratuitos em Vila Velha e região." },
    { question: "A pintura faz muita sujeira?", answer: "Nossa equipe segue um protocolo rigoroso de isolamento de áreas. A limpeza é nossa prioridade e protegemos pisos e móveis." },
    { question: "Aceitam cartão de crédito?", answer: "Sim, parcelamos seu projeto para facilitar a realização do serviço." },
    { question: "Qual o prazo médio de uma obra?", answer: "Depende do tamanho do projeto, mas estabelecemos um cronograma fixo no contrato e seguimos à risca." }
  ];

  return (
    <MotionConfig reducedMotion="user">
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
            <a href="#inicio" className="flex items-center gap-3 group" aria-label="Vertical Cor, voltar ao início">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                {!logoError ? (
                  <img
                    src={isHeaderSolid ? simboloFundoClaro : simboloFundoEscuro}
                    alt=""
                    width={52}
                    height={46}
                    className="h-10 w-auto md:h-11 object-contain transition-all duration-300 block"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  // Fallback Logo (If image fails)
                  <div className={`h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transition-colors ${isHeaderSolid ? 'bg-cyan-600 text-white' : 'bg-white text-navy-900'}`}>
                    V
                  </div>
                )}
              </motion.div>

              <div className="flex flex-col">
                <span className={`text-xl font-bold tracking-tight leading-none ${isHeaderSolid ? 'text-navy-900' : 'text-white'}`}>VERTICAL</span>
                <span className={`text-sm font-light tracking-widest ${isHeaderSolid ? 'text-cyan-600' : 'text-cyan-400'}`}>COR</span>
              </div>
            </a>

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
              <a href={whatsappBudgetLink} target="_blank" rel="noopener noreferrer" className={`px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5 ${isHeaderSolid ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-white text-navy-900 hover:bg-slate-100'}`}>
                <WhatsAppIcon size={18} /> Orçamento
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 -mr-2 ${isHeaderSolid ? 'text-navy-900' : 'text-white'}`}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-b border-slate-100 absolute w-full shadow-xl top-full left-0"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#inicio" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg">Início</a>
              <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg">Serviços</a>
              <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg">Portfólio</a>
              <a href="#contato" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-lg">Contato</a>
              <a href={whatsappBudgetLink} target="_blank" rel="noopener noreferrer" className="block mt-4 text-center bg-cyan-600 text-white px-3 py-3 rounded-lg font-bold">
                Orçamento via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* 2. Hero Section */}
      <section id="inicio" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Predial High End */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            style={{ y: heroImageY }}
            className="w-full h-full"
          >
            <img
              src="/hero-predial.webp"
              alt="Fachada Predial Moderna"
              width={1920}
              height={1280}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-navy-900/10 md:via-transparent md:to-transparent"></div>
          {/* Assinatura: a fita ciano da logo se desenha atrás do texto */}
          <BrandRibbon className="absolute inset-0 w-full h-full mix-blend-screen translate-y-[24%] md:translate-y-[26%]" opacity={0.4} delay={0.5} duration={2.6} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white max-w-4xl">
            <AnimatedWords text="Sua fachada é o seu cartão de visitas." delay={0.3} /> <br />
            <AnimatedWords text="Não deixe seu patrimônio desvalorizar." delay={0.8} wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200" />
          </h1>

          <Reveal delay={0.4}>
            <p className="text-lg md:text-2xl text-slate-100 max-w-2xl mb-10 border-l-4 border-cyan-500 pl-6">
              Especialistas em pintura predial, residencial e acabamentos de alto padrão em Vila Velha.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={whatsappBudgetLink} target="_blank" rel="noopener noreferrer" className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg whitespace-nowrap transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(8,145,178,0.4)] flex items-center justify-center gap-2">
                <WhatsAppIcon size={20} /> Pedir orçamento grátis
              </a>
            </div>
          </Reveal>
        </div>

        {/* Scroll Indicator (no rodapé do hero, só no computador) */}
        <motion.div
          className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* NOVO: Seção de Vídeo (Segunda Dobra) */}
      <section className="py-20 bg-white relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12">
              <SectionHeading
                eyebrow="Na prática"
                title="Qualidade que valoriza seu imóvel"
                subtitle="Assista ao vídeo e veja como nosso processo de pintura predial transforma e protege seu patrimônio com excelência."
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="aspect-video w-full bg-slate-100 rounded-2xl overflow-hidden shadow-2xl relative border border-slate-200">
              <SmartVideoPlayer videoId="-A7RzIT8QWw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Seção da Dor (Cards flutuantes) */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <Reveal>
              <SectionHeading eyebrow="O custo de esperar" title="Sinais de que seu imóvel pede socorro" />
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.2}>
              <Spotlight className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-cyan-500 hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-navy-800 to-navy-900 ring-1 ring-cyan-400/30 shadow-lg shadow-navy-900/30 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 mx-auto">
                  <TrendingDown size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3 text-center">Desvalorização</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Pintura descascada e suja derruba o valor de venda e de aluguel do imóvel.
                </p>
              </Spotlight>
            </Reveal>

            <Reveal delay={0.4}>
              <Spotlight className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-cyan-500 hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-navy-800 to-navy-900 ring-1 ring-cyan-400/30 shadow-lg shadow-navy-900/30 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 mx-auto">
                  <ShieldAlert size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3 text-center">Infiltrações</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Pequenas trincas hoje tornam-se grandes prejuízos estruturais amanhã.
                </p>
              </Spotlight>
            </Reveal>

            <Reveal delay={0.6}>
              <Spotlight className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-cyan-500 hover:-translate-y-2 transition-transform duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-navy-800 to-navy-900 ring-1 ring-cyan-400/30 shadow-lg shadow-navy-900/30 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 mx-auto">
                  <Eye size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3 text-center">Má Impressão</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  O que seus clientes ou visitas pensam ao ver sua fachada malcuidada?
                </p>
              </Spotlight>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. A Solução (Services) */}
      <section id="servicos" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="mb-16">
              <SectionHeading
                align="left"
                eyebrow="Nossa expertise"
                title={<>Acabamento fino e <br />proteção duradoura</>}
                subtitle="Utilizamos técnicas avançadas e materiais de alta performance para garantir durabilidade extrema."
              />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "Pintura Predial", desc: "Restauração completa e lavagem de fachadas." },
              { icon: Brush, title: "Efeitos Decorativos", desc: "Cimento queimado, marmorato e texturas em alta." },
              { icon: Wrench, title: "Tratamento de Superfícies", desc: "Impermeabilização, reparo de trincas e Drywall." },
              { icon: DoorOpen, title: "Acabamentos Especiais", desc: "Verniz em madeiras e pintura de portas." }
            ].map((service, idx) => (
              <Reveal key={idx} delay={idx * 0.1} fullHeight>
                <Spotlight className="group h-full p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-navy-800 to-navy-900 ring-1 ring-cyan-400/30 text-cyan-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-cyan-500 group-hover:to-cyan-600 group-hover:text-white transition-all">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center">
              <a href={buildWhatsAppLink("Olá, vim do site da VERTICAL COR e quero o orçamento de um serviço.")} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-bold text-cyan-700 hover:text-cyan-600">
                Pedir orçamento de um serviço <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Transformação (Before/After) */}
      <section id="portfolio" className="pt-28 pb-28 md:pt-40 md:pb-40 bg-navy-900 text-white overflow-hidden relative">
        <SectionWave position="top" fillClassName="fill-white" />
        <SectionWave position="bottom" fillClassName="fill-slate-50" />
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle,_#ffffff_1px,_transparent_1px)] [background-size:24px_24px]" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
              <SectionHeading
                dark
                align="left"
                eyebrow="Resultado"
                title="Veja a transformação"
                subtitle="Arraste para ver o resultado do Padrão Vertical Cor."
              />
              <a href={whatsappBudgetLink} target="_blank" rel="noopener noreferrer" className="group whitespace-nowrap bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-navy-900 px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2">
                Quero esse resultado <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Moldura com borda em degradê ciano e brilho da marca */}
            <div className="max-w-4xl mx-auto p-[3px] rounded-2xl bg-gradient-to-br from-cyan-400 via-navy-800 to-cyan-600 shadow-[0_0_90px_-20px_rgba(34,211,238,0.55)]">
              <div className="rounded-[13px] overflow-hidden bg-navy-900">
                <BeforeAfterSlider
                  beforeImage="/antes.webp"
                  afterImage="/depois.webp"
                />
              </div>
            </div>
            <p className="text-center text-slate-400 text-sm mt-4">Veja a transformação que a pintura pode trazer</p>
          </Reveal>
        </div>
      </section>

      {/* 6. Prova Social e Autoridade */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <Reveal>
              <SectionHeading eyebrow="Diferenciais" title="Por que escolher a Vertical Cor?" />
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: "Limpeza Extrema", text: "Protegemos seu piso e móveis. Entregamos a obra limpa." },
              { icon: CalendarCheck, title: "Prazo Garantido", text: "Cronograma seguido à risca." },
              { icon: PaintRoller, title: "Materiais Premium", text: "Só trabalhamos com tintas e insumos de primeira linha." },
              { icon: ReceiptText, title: "Orçamento Transparente", text: "Sem surpresas no final da obra." }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1} fullHeight>
                <Spotlight className="h-full flex flex-col items-center text-center group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full shadow-lg shadow-cyan-600/30 ring-8 ring-cyan-50 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={34} />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-navy-900">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.text}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12">
              <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" />
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="border border-slate-200 rounded-xl overflow-hidden hover:border-cyan-200 transition-colors">
                  <button
                    className="w-full flex justify-between items-center p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeAccordion === index}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                  >
                    <span className="font-bold text-navy-900 text-lg">{faq.question}</span>
                    {activeAccordion === index ? <ChevronUp className="text-cyan-600" /> : <ChevronDown className="text-slate-400" />}
                  </button>
                  {activeAccordion === index && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
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
      <footer id="contato" className="bg-navy-900 text-slate-300 pt-28 md:pt-40 pb-24 md:pb-10 relative overflow-hidden">
        <SectionWave position="top" fillClassName="fill-white" />
        {/* Decorative Blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none"></div>
        {/* A fita da marca, grande e bem suave, ao fundo do contato */}
        <BrandRibbon className="absolute inset-0 w-full h-full" opacity={0.12} delay={0.2} duration={3} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-20">

            {/* Left: CTA & Form */}
            <Reveal>
              <div>
                <div className="mb-10">
                  <SectionHeading
                    dark
                    align="left"
                    eyebrow="Orçamento"
                    title="Pronto para transformar seu imóvel?"
                    subtitle="Entre em contato hoje e receba uma visita técnica gratuita de um profissional especializado."
                  />
                </div>

                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label htmlFor="form-name" className="sr-only">Seu nome</label>
                    <input id="form-name" name="name" type="text" autoComplete="name" aria-label="Seu nome" className="w-full bg-white/5 border border-slate-600 rounded-xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Seu nome" value={formName} onChange={(event) => setFormName(event.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="form-phone" className="sr-only">Seu telefone ou WhatsApp</label>
                    <input id="form-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-label="Seu telefone ou WhatsApp" className="w-full bg-white/5 border border-slate-600 rounded-xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Seu WhatsApp: (27) 9XXXX-XXXX" value={formPhone} onChange={(event) => setFormPhone(event.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="form-property" className="sr-only">Tipo de imóvel</label>
                    <select id="form-property" name="property" className={`w-full bg-white/5 border border-slate-600 rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all ${formProperty ? 'text-white' : 'text-slate-400'}`} value={formProperty} onChange={(event) => setFormProperty(event.target.value)}>
                      <option value="" className="text-navy-900">Tipo de imóvel (opcional)</option>
                      <option value="Prédio ou condomínio" className="text-navy-900">Prédio ou condomínio</option>
                      <option value="Casa" className="text-navy-900">Casa</option>
                      <option value="Comércio ou empresa" className="text-navy-900">Comércio ou empresa</option>
                      <option value="Outro" className="text-navy-900">Outro</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg shadow-cyan-900/50">
                    <WhatsAppIcon size={20} /> Pedir orçamento pelo WhatsApp
                  </button>
                  <p className="text-slate-400 text-sm text-center">O WhatsApp abre com a sua mensagem pronta; é só enviar.</p>
                  {formSubmitted && (
                    <p role="status" className="text-green-400 text-sm text-center pt-1">
                      Abrimos o WhatsApp para você concluir o envio. Se não abriu, fale conosco pelo botão verde no canto da tela.
                    </p>
                  )}
                </form>
              </div>
            </Reveal>

            {/* Right: Map & Contact Info */}
            <Reveal delay={0.2}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    {!logoError ? (
                      <img src={simboloFundoEscuro} alt="Vertical Cor" width={54} height={48} className="h-12 w-auto object-contain" onError={() => setLogoError(true)} />
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
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <WhatsAppIcon size={20} />
                      </div>
                      <span className="text-lg">WhatsApp {SITE_CONTACT.phoneDisplay}</span>
                    </a>
                    <a href={`tel:+${SITE_CONTACT.whatsappNumber}`} className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <Phone size={20} />
                      </div>
                      <span className="text-lg">Ligar agora</span>
                    </a>
                    <a href={`mailto:${SITE_CONTACT.email}`} className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <Mail size={20} />
                      </div>
                      <span className="text-lg break-all">{SITE_CONTACT.email}</span>
                    </a>

                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <p>© {new Date().getFullYear()} Vertical Cor. Todos os direitos reservados.</p>
            {/* Crédito de quem fez o site: ícone e nome levam ao site da Letreiro Digital */}
            <a
              href="https://letreirodigital.com.br/?utm_source=verticalcor&utm_medium=credito-rodape"
              target="_blank"
              rel="noopener"
              className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <img src="/letreiro-digital-icone.svg" alt="" width={22} height={22} className="w-[22px] h-[22px] rounded-md group-hover:scale-110 transition-transform" />
              <span>Site feito pela <span className="font-semibold text-slate-300 group-hover:text-[#FEEE03] transition-colors">Letreiro Digital</span></span>
            </a>
            <div className="mt-4 md:mt-0 flex gap-6">
              <a href="/politica-de-privacidade.html" className="hover:text-cyan-400 transition-colors">Política de Privacidade</a>
              <a href="/termos-de-uso.html" className="hover:text-cyan-400 transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20bd5a]"
        aria-label="Fale conosco no WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <WhatsAppIcon size={30} />
      </motion.a>
    </div>
    </MotionConfig>
  );
}

export default App;
