'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#storia', label: 'La Nostra Storia' },
    { href: '#menu', label: 'Menu' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#recensioni', label: 'Recensioni' },
    { href: '#contatti', label: 'Contatti' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[var(--cream)]/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <span className={`font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold transition-colors duration-300 ${
            scrolled ? 'text-[var(--charcoal)]' : 'text-white'
          }`}>
            Molendini
          </span>
          <span className={`text-sm tracking-[0.3em] uppercase transition-colors duration-300 ${
            scrolled ? 'text-[var(--gold-primary)]' : 'text-[var(--gold-light)]'
          }`}>
            al Borgo
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm tracking-widest uppercase transition-all duration-300 hover:text-[var(--gold-primary)] relative group ${
                scrolled ? 'text-[var(--charcoal)]' : 'text-white/90'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--gold-primary)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="https://www.thefork.it/ristorante/molendini-al-borgo-r672985#booking="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-xs"
          >
            Prenota
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden flex flex-col gap-1.5 p-2 ${scrolled ? 'text-[var(--charcoal)]' : 'text-white'}`}
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-[var(--cream)] shadow-xl transition-all duration-500 ${
        menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="py-6 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[var(--charcoal)] text-sm tracking-widest uppercase py-2 hover:text-[var(--gold-primary)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.thefork.it/ristorante/molendini-al-borgo-r672985#booking="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-xs text-center mt-2"
          >
            Prenota Ora
          </a>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070"
          alt="Ristorante elegante"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[var(--gold-primary)]/30 opacity-50 animate-float" />
      <div className="absolute bottom-32 right-16 w-24 h-24 border border-[var(--gold-primary)]/20 opacity-40 animate-float delay-300" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-[var(--gold-light)] text-sm md:text-base tracking-[0.4em] uppercase mb-6 font-light">
            Cerveteri • Dal 2020
          </p>
        </div>

        <h1 className={`font-['Cormorant_Garamond'] text-5xl md:text-7xl lg:text-8xl text-white font-light mb-6 transition-all duration-1000 delay-200 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Molendini
          <span className="block text-[var(--gold-light)] text-3xl md:text-4xl lg:text-5xl mt-2 italic font-light">
            al Borgo
          </span>
        </h1>

        <div className={`gold-line w-32 mx-auto mb-8 transition-all duration-1000 delay-400 ${
          loaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`} />

        <p className={`text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-500 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Gli antichi che abitavano la nostra terra erano maestri del gusto.
          <span className="block text-[var(--gold-light)] mt-2">Pizza & Cucina</span>
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a
            href="https://www.thefork.it/ristorante/molendini-al-borgo-r672985#booking="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Prenota un Tavolo
          </a>
          <a href="#menu" className="btn-outline border-white text-white hover:bg-white hover:text-[var(--charcoal)]">
            Scopri il Menu
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[var(--gold-primary)] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Storia Section
function Storia() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="storia" className="py-24 md:py-32 bg-[var(--cream)] grain-overlay">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className={`relative transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974"
                alt="Interno ristorante Molendini al Borgo"
                fill
                className="object-cover image-hover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-[var(--gold-primary)] -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[var(--gold-primary)]/10 -z-10" />
          </div>

          {/* Content */}
          <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <span className="text-[var(--gold-primary)] text-sm tracking-[0.3em] uppercase">La Nostra Storia</span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl text-[var(--charcoal)] mt-4 mb-8">
              Dove la Tradizione
              <span className="block text-[var(--gold-primary)] italic">Incontra la Novità</span>
            </h2>
            <div className="gold-line w-24 mb-8" />
            <p className="text-[var(--charcoal)]/80 text-lg leading-relaxed mb-6">
              Nel cuore del Centro Storico di Cerveteri c&apos;è un posto in cui la novità incontra la tradizione.
              L&apos;arte e il sapore si fondono in ogni piatto che serviamo.
            </p>
            <p className="text-[var(--charcoal)]/80 text-lg leading-relaxed mb-8">
              Gli antichi che abitavano la nostra terra erano maestri del gusto, e noi portiamo avanti
              questa eredità con passione, utilizzando ingredienti freschi e ricette che raccontano
              la nostra terra.
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="block font-['Cormorant_Garamond'] text-4xl text-[var(--gold-primary)]">5+</span>
                <span className="text-sm text-[var(--charcoal)]/60 uppercase tracking-wider">Anni</span>
              </div>
              <div className="w-px h-12 bg-[var(--gold-primary)]/30" />
              <div className="text-center">
                <span className="block font-['Cormorant_Garamond'] text-4xl text-[var(--gold-primary)]">96%</span>
                <span className="text-sm text-[var(--charcoal)]/60 uppercase tracking-wider">Soddisfazione</span>
              </div>
              <div className="w-px h-12 bg-[var(--gold-primary)]/30" />
              <div className="text-center">
                <span className="block font-['Cormorant_Garamond'] text-4xl text-[var(--gold-primary)]">1.1K</span>
                <span className="text-sm text-[var(--charcoal)]/60 uppercase tracking-wider">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Menu Section
function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('antipasti');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'antipasti', name: 'Antipasti' },
    { id: 'pasta', name: 'Primi' },
    { id: 'secondi', name: 'Secondi' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'dolci', name: 'Dolci' },
  ];

  const menuItems: Record<string, Array<{ name: string; description: string; price: string }>> = {
    antipasti: [
      { name: 'Tagliere dei Borgo', description: 'Selezione di salumi tipici, formaggi locali e miele del Lazio', price: '16' },
      { name: 'Bruschetta Mediterranea', description: 'Pomodorini San Marzano, basilico fresco e olio EVO', price: '8' },
      { name: 'Carciofi alla Romana', description: 'Carciofi nostrani cotti secondo la tradizione', price: '12' },
      { name: 'Burrata Pugliese', description: 'Con pomodori heirloom e ridotto di balsamico', price: '14' },
    ],
    pasta: [
      { name: 'Carbonara dei Molendini', description: 'Rigatoni, guanciale croccante, pecorino romano DOP', price: '14' },
      { name: 'Amatriciana Tradizionale', description: 'Bucatini, guanciale, pomodoro San Marzano', price: '14' },
      { name: 'Cacio e Pepe', description: 'Tonnarelli, pecorino romano, pepe nero', price: '13' },
      { name: 'Ravioli della Casa', description: 'Ripieni di ricotta e spinaci, burro e salvia', price: '16' },
    ],
    secondi: [
      { name: 'Tagliata di Manzo', description: 'Controfiletto alla griglia, rucola e scaglie di parmigiano', price: '22' },
      { name: 'Saltimbocca alla Romana', description: 'Vitello, prosciutto crudo, salvia e vino bianco', price: '18' },
      { name: 'Pollo alla Cacciatora', description: 'Pollo ruspante in umido con pomodoro e olive', price: '16' },
      { name: 'Filetto di Orata', description: 'Al forno con patate e erbe aromatiche', price: '20' },
    ],
    pizza: [
      { name: 'Margherita DOP', description: 'Pomodoro San Marzano, fior di latte, basilico fresco', price: '10' },
      { name: 'Diavola', description: 'Pomodoro, fior di latte, salame piccante', price: '12' },
      { name: 'Quattro Formaggi', description: 'Mozzarella, gorgonzola, parmigiano, fontina', price: '13' },
      { name: 'Capricciosa', description: 'Pomodoro, mozzarella, prosciutto, funghi, carciofi, olive', price: '14' },
      { name: 'Molendini Speciale', description: 'Crema di zucca, salsiccia, provola e rosmarino', price: '15' },
    ],
    dolci: [
      { name: 'Tiramisù della Casa', description: 'Preparato secondo la ricetta tradizionale', price: '7' },
      { name: 'Panna Cotta', description: 'Con frutti di bosco e ridotto di frutti rossi', price: '7' },
      { name: 'Cannolo Siciliano', description: 'Ricotta di pecora, cioccolato e scorze d\'arancia', price: '8' },
      { name: 'Sorbetto al Limone', description: 'Limoni di Sorrento, servito con foglie di menta', price: '5' },
    ],
  };

  return (
    <section id="menu" className="py-24 md:py-32 bg-[var(--charcoal)] grain-overlay relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--gold-primary)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--gold-primary)] rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[var(--gold-primary)] text-sm tracking-[0.3em] uppercase">Gusto Autentico</span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6">
            Il Nostro Menu
          </h2>
          <div className="gold-line w-24 mx-auto" />
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[var(--gold-primary)] text-[var(--charcoal)]'
                  : 'border border-[var(--gold-primary)]/50 text-[var(--gold-primary)] hover:bg-[var(--gold-primary)]/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-400 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {menuItems[activeCategory]?.map((item, index) => (
            <div
              key={item.name}
              className="group p-6 border border-[var(--gold-primary)]/20 hover:border-[var(--gold-primary)]/50 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-['Cormorant_Garamond'] text-2xl text-white group-hover:text-[var(--gold-primary)] transition-colors">
                  {item.name}
                </h3>
                <span className="text-[var(--gold-primary)] font-semibold text-lg ml-4">€{item.price}</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-600 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-white/60 mb-6">Tutti i prezzi includono il servizio</p>
          <a
            href="https://www.thefork.it/ristorante/molendini-al-borgo-r672985#booking="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Prenota il Tavolo
          </a>
        </div>
      </div>
    </section>
  );
}

// Gallery Section
function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const images = [
    { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000', alt: 'Pizza artigianale', span: 'col-span-2 row-span-2' },
    { src: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1000', alt: 'Pasta fresca', span: '' },
    { src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000', alt: 'Antipasto', span: '' },
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000', alt: 'Tiramisù', span: '' },
    { src: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?q=80&w=1000', alt: 'Interno ristorante', span: 'col-span-2' },
    { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000', alt: 'Ambiente elegante', span: '' },
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[var(--cream)] grain-overlay">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[var(--gold-primary)] text-sm tracking-[0.3em] uppercase">Momenti di Gusto</span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl text-[var(--charcoal)] mt-4 mb-6">
            La Nostra Gallery
          </h2>
          <div className="gold-line w-24 mx-auto" />
        </div>

        {/* Gallery Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative overflow-hidden group ${img.span} aspect-square`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-[var(--charcoal)]/0 group-hover:bg-[var(--charcoal)]/40 transition-all duration-500 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 text-sm tracking-widest uppercase">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a
            href="https://www.instagram.com/molendinialborgo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[var(--charcoal)] hover:text-[var(--gold-primary)] transition-colors group"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="tracking-widest uppercase text-sm">Seguici su Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Reviews Section
function Recensioni() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const reviews = [
    {
      name: 'Marco R.',
      rating: 5,
      text: 'Posto incantevole nel cuore di Cerveteri. La carbonara è semplicemente perfetta e l\'atmosfera è molto accogliente. Tornerò sicuramente!',
      date: '2 settimane fa',
    },
    {
      name: 'Giulia T.',
      rating: 5,
      text: 'Abbiamo festeggiato il nostro anniversario qui e tutto era perfetto. Il servizio impeccabile, i piatti curati nei minimi dettagli. Consigliatissimo!',
      date: '1 mese fa',
    },
    {
      name: 'Alessandro B.',
      rating: 5,
      text: 'La pizza più buona della zona! Impasto leggero e ingredienti di prima qualità. Il personale è gentile e professionale.',
      date: '3 settimane fa',
    },
    {
      name: 'Francesca M.',
      rating: 5,
      text: 'Ambiente elegante ma familiare. I ravioli della casa sono una delizia. Prezzi onesti per la qualità offerta.',
      date: '1 mese fa',
    },
  ];

  return (
    <section id="recensioni" className="py-24 md:py-32 bg-[var(--cream-dark)] grain-overlay relative">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--cream)] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[var(--gold-primary)] text-sm tracking-[0.3em] uppercase">Cosa Dicono di Noi</span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl text-[var(--charcoal)] mt-4 mb-6">
            Le Vostre Recensioni
          </h2>
          <div className="gold-line w-24 mx-auto mb-6" />

          {/* Google Rating */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-[var(--gold-primary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[var(--charcoal)] font-semibold">4.8 / 5</span>
            <span className="text-[var(--charcoal)]/60">su Google</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-8 relative group hover:shadow-xl transition-all duration-500"
            >
              {/* Quote Mark */}
              <div className="absolute -top-4 -left-2 text-[var(--gold-primary)]/20 text-8xl font-serif leading-none">
                &ldquo;
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[var(--gold-primary)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-[var(--charcoal)]/80 text-lg leading-relaxed mb-6 relative z-10">
                {review.text}
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[var(--charcoal)]">{review.name}</p>
                  <p className="text-sm text-[var(--charcoal)]/50">{review.date}</p>
                </div>
                <div className="flex items-center gap-2 text-[var(--charcoal)]/40">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xs">Google</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a
            href="https://www.google.com/maps/place/Molendini+al+Borgo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Leggi tutte le recensioni
          </a>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function Contatti() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const hours = [
    { day: 'Martedì - Venerdì', time: '19:30 - 22:30' },
    { day: 'Sabato - Domenica', time: '12:30 - 15:00 / 19:30 - 23:00' },
    { day: 'Lunedì', time: 'Chiuso', closed: true },
  ];

  return (
    <section id="contatti" className="py-24 md:py-32 bg-[var(--charcoal)] grain-overlay relative">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[var(--gold-primary)] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[var(--gold-primary)] rounded-full" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[var(--gold-primary)] text-sm tracking-[0.3em] uppercase">Vieni a Trovarci</span>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6">
            Contatti & Orari
          </h2>
          <div className="gold-line w-24 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Address */}
            <div className="mb-10">
              <h3 className="font-['Cormorant_Garamond'] text-2xl text-[var(--gold-primary)] mb-4">Dove Siamo</h3>
              <p className="text-white/80 text-lg">
                Via Antonio Ricci, 9<br />
                00052 Cerveteri (RM)<br />
                Lazio, Italia
              </p>
            </div>

            {/* Phone */}
            <div className="mb-10">
              <h3 className="font-['Cormorant_Garamond'] text-2xl text-[var(--gold-primary)] mb-4">Telefono</h3>
              <a
                href="tel:+390639729048"
                className="text-white/80 text-lg hover:text-[var(--gold-primary)] transition-colors"
              >
                +39 06 3972 9048
              </a>
            </div>

            {/* Social */}
            <div className="mb-10">
              <h3 className="font-['Cormorant_Garamond'] text-2xl text-[var(--gold-primary)] mb-4">Seguici</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/molendinialborgo2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-[var(--gold-primary)]/50 flex items-center justify-center text-[var(--gold-primary)] hover:bg-[var(--gold-primary)] hover:text-[var(--charcoal)] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/molendinialborgo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-[var(--gold-primary)]/50 flex items-center justify-center text-[var(--gold-primary)] hover:bg-[var(--gold-primary)] hover:text-[var(--charcoal)] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://www.thefork.it/ristorante/molendini-al-borgo-r672985#booking="
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-block"
            >
              Prenota su TheFork
            </a>
          </div>

          {/* Hours */}
          <div className={`transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="font-['Cormorant_Garamond'] text-2xl text-[var(--gold-primary)] mb-6">Orari di Apertura</h3>
            <div className="space-y-4">
              {hours.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-4 border-b border-[var(--gold-primary)]/20 ${
                    item.closed ? 'text-white/40' : 'text-white/80'
                  }`}
                >
                  <span className="text-lg">{item.day}</span>
                  <span className={`font-medium ${item.closed ? 'text-[var(--burgundy-light)]' : 'text-[var(--gold-primary)]'}`}>
                    {item.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Services */}
            <div className="mt-10">
              <h3 className="font-['Cormorant_Garamond'] text-2xl text-[var(--gold-primary)] mb-4">Servizi</h3>
              <div className="flex flex-wrap gap-3">
                {['Posti a sedere', 'Terrazza', 'Asporto', 'Consegna a domicilio'].map((service) => (
                  <span
                    key={service}
                    className="px-4 py-2 border border-[var(--gold-primary)]/30 text-white/70 text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-10 aspect-video bg-[var(--charcoal-light)] relative overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000"
                alt="Cerveteri centro storico"
                fill
                className="object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <a
                href="https://maps.google.com/?q=Via+Antonio+Ricci+9+Cerveteri"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
              >
                <span className="text-white tracking-widest uppercase text-sm border border-white/50 px-6 py-3">
                  Apri in Google Maps
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 bg-[var(--charcoal)] border-t border-[var(--gold-primary)]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <span className="font-['Cormorant_Garamond'] text-2xl text-white">Molendini</span>
            <span className="text-[var(--gold-primary)] text-sm tracking-widest ml-2">al Borgo</span>
          </div>

          {/* Copyright */}
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Molendini al Borgo. Tutti i diritti riservati.
          </p>

          {/* Links */}
          <div className="flex gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-[var(--gold-primary)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--gold-primary)] transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Storia />
      <Menu />
      <Gallery />
      <Recensioni />
      <Contatti />
      <Footer />
    </main>
  );
}
