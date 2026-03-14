'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

/* ─── Chevron SVGs ─── */
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

/* ─── Lightbox with prev/next + swipe ─── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const touchStart = useRef(0);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
  };

  const current = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center lightbox-enter"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-11 h-11 flex items-center justify-center text-white/50 hover:text-white text-2xl transition-colors"
        onClick={onClose}
        aria-label="Chiudi"
      >
        &times;
      </button>

      {/* Prev */}
      <button
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        aria-label="Foto precedente"
      >
        <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
      </button>

      {/* Image */}
      <div
        className="relative w-[90vw] h-[75vh] md:h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </div>

      {/* Next */}
      <button
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        aria-label="Foto successiva"
      >
        <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
      </button>

      {/* Counter */}
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.3em]">
        {currentIndex + 1} / {images.length}
      </span>
    </div>
  );
}

/* ─── Navigation ─── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#storia', label: 'Chi Siamo' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#recensioni', label: 'Recensioni' },
    { href: '#contatti', label: 'Contatti' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'bg-[var(--cream)]/97 backdrop-blur-lg shadow-sm py-2' : 'bg-transparent py-4 md:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <a href="#home">
          <Image
            src={scrolled ? "/Logo Molendini scuro.png" : "/Logo Molendini chiaro.png"}
            alt="Molendini al Borgo"
            width={scrolled ? 110 : 130}
            height={scrolled ? 110 : 130}
            className="transition-all duration-500 w-[90px] md:w-auto"
          />
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[0.68rem] tracking-[0.22em] uppercase transition-all duration-300 relative group ${
                scrolled ? 'text-[var(--charcoal)]/60 hover:text-[var(--charcoal)]' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--tortora)] transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
          <a
            href="https://www.thefork.it/ristorante/molendini-al-borgo-r672985#booking="
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[0.68rem] tracking-[0.22em] uppercase px-5 py-2 transition-all duration-300 ${
              scrolled
                ? 'border border-[var(--tortora)] text-[var(--tortora-dark)] hover:bg-[var(--tortora)] hover:text-white'
                : 'border border-white/35 text-white/80 hover:bg-white/10 hover:border-white/60'
            }`}
          >
            Prenota
          </a>
        </div>

        {/* Mobile hamburger - 48px touch target */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden flex flex-col gap-1.5 w-12 h-12 items-center justify-center ${scrolled ? 'text-[var(--charcoal)]' : 'text-white'}`}
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu - fullscreen overlay */}
      <div className={`lg:hidden fixed inset-0 top-0 bg-[var(--cream)] transition-all duration-500 z-40 ${
        menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[var(--charcoal)]/70 text-sm tracking-[0.25em] uppercase py-3 hover:text-[var(--charcoal)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.thefork.it/ristorante/molendini-al-borgo-r672985#booking="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4"
            onClick={() => setMenuOpen(false)}
          >
            Prenota Ora
          </a>
        </div>
        {/* Close button in mobile menu */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-5 w-12 h-12 flex items-center justify-center text-[var(--charcoal)]/60"
          aria-label="Chiudi menu"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section id="home" className="relative h-screen min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-new.jpg"
          alt="Piatto gourmet con calice di vino - Molendini al Borgo"
          fill
          className="object-cover blur-[0.5px]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-5 md:px-8 max-w-4xl">
        <div className={`transition-all duration-[1200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[var(--champagne-light)] text-[0.6rem] md:text-[0.72rem] tracking-[0.45em] md:tracking-[0.5em] uppercase mb-6 md:mb-8">
            Pizza &amp; Cucina d&apos;Autore
          </p>
        </div>

        <h1 className={`font-['Cormorant_Garamond'] text-white font-light transition-all duration-[1200ms] delay-200 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <span className="block text-[2.5rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95]">
            Dove la Tradizione
          </span>
          <span className="block text-[var(--champagne-light)] text-[1.8rem] sm:text-4xl md:text-5xl lg:text-[4rem] italic mt-2 md:mt-3">
            Diventa Arte
          </span>
        </h1>

        <div className={`accent-line w-12 md:w-16 mx-auto mt-8 md:mt-10 mb-8 md:mb-10 transition-all duration-[1200ms] delay-400 ${
          loaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`} />

        <p className={`text-white/55 text-[0.85rem] md:text-base font-light max-w-md mx-auto mb-10 md:mb-12 leading-relaxed tracking-wide transition-all duration-[1200ms] delay-500 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          Nel cuore del centro storico di Cerveteri
        </p>

        <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center transition-all duration-[1200ms] delay-700 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <a
            href="https://www.thefork.it/ristorante/molendini-al-borgo-r672985#booking="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Prenota un Tavolo
          </a>
          <a href="#storia" className="btn-outline-light">
            Scopri di Pi&ugrave;
          </a>
        </div>
      </div>

      <div className={`absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 transition-all duration-[1200ms] delay-1000 hidden md:flex ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/25 text-[0.55rem] tracking-[0.4em] uppercase">Scopri</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ─── Storia ─── */
function Storia() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="storia" className="py-20 md:py-40 bg-[var(--cream)] grain-overlay">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <div className={`relative transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden">
              <Image
                src="/images/storia-ravioli.jpg"
                alt="Ravioli fatti a mano - cucina d'autore"
                fill
                className="object-cover image-hover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="hidden md:block absolute -bottom-3 -right-3 w-full h-full border border-[var(--tortora)]/20 -z-10" />
          </div>

          <div className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <span className="text-[var(--tortora)] text-[0.65rem] md:text-[0.68rem] tracking-[0.3em] uppercase">La Nostra Storia</span>
            <h2 className="font-['Cormorant_Garamond'] text-[var(--charcoal)] mt-4 md:mt-5 mb-3 md:mb-4">
              <span className="block text-3xl md:text-5xl">Dove la Tradizione</span>
              <span className="block text-3xl md:text-5xl text-[var(--tortora)] italic mt-1">Incontra la Novit&agrave;</span>
            </h2>
            <div className="w-12 h-px bg-[var(--tortora)] mt-6 md:mt-8 mb-6 md:mb-8" />
            <p className="text-[var(--charcoal)]/55 text-[0.9rem] md:text-[0.95rem] leading-[1.85] mb-4 md:mb-5">
              Nel cuore del Centro Storico di Cerveteri c&apos;&egrave; un posto in cui la novit&agrave; incontra la tradizione.
              L&apos;arte e il sapore si fondono in ogni piatto che serviamo.
            </p>
            <p className="text-[var(--charcoal)]/55 text-[0.9rem] md:text-[0.95rem] leading-[1.85] mb-8 md:mb-10">
              Gli antichi che abitavano la nostra terra erano maestri del gusto, e noi portiamo avanti
              questa eredit&agrave; con passione, utilizzando ingredienti freschi e ricette che raccontano
              la nostra terra.
            </p>
            <a
              href="https://www.thefork.it/ristorante/molendini-al-borgo-r672985#booking="
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
            >
              Prenota un Tavolo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Philosophy Quote ─── */
function Philosophy() {
  return (
    <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden py-16">
      <div className="absolute inset-0">
        <Image src="/images/philosophy-bg.jpg" alt="Gnocchi con verdure e vino nella sala del ristorante" fill className="object-cover blur-[2px]" sizes="100vw" />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="relative z-10 text-center px-6 md:px-8 max-w-2xl md:max-w-3xl">
        <p className="font-['Cormorant_Garamond'] text-white text-xl md:text-3xl lg:text-[2.2rem] italic font-light leading-relaxed">
          &ldquo;Gli antichi che abitavano la nostra terra erano maestri del gusto.
          Noi portiamo avanti questa eredit&agrave;, un piatto alla volta.&rdquo;
        </p>
        <div className="accent-line w-10 md:w-12 mx-auto mt-6 md:mt-8" />
      </div>
    </section>
  );
}

/* ─── Gallery Carousel ─── */
function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const updateArrows = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    // Delay initial check to let images render
    const timer = setTimeout(updateArrows, 300);
    const el = scrollRef.current;
    el?.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      clearTimeout(timer);
      el?.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows, visible]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const slide = scrollRef.current.querySelector<HTMLElement>('.gallery-slide');
      const gap = window.innerWidth < 768 ? 12 : 16;
      const amount = (slide?.offsetWidth || 300) + gap;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  const images = [
    { src: '/images/interior-2.jpg', alt: 'La sala con lampade in rame' },
    { src: '/images/dish-dessert.jpg', alt: 'Sfera al cioccolato con pistacchio' },
    { src: '/images/interior-4.jpg', alt: 'Vista sulla cantina dei vini' },
    { src: '/images/dish-seafood.jpg', alt: 'Piatto di pesce con vino bianco' },
    { src: '/images/dish-pasta-funghi.jpg', alt: 'Pasta fresca con funghi e timo' },
    { src: '/images/dish-ravioli.jpg', alt: 'Ravioli con carciofi e gamberi' },
    { src: '/images/dish-meat.jpg', alt: 'Filetto glassato con rosmarino' },
    { src: '/images/dish-pasta-mare.jpg', alt: 'Pasta ai frutti di mare' },
  ];

  return (
    <>
      <section id="gallery" className="py-20 md:py-40 bg-[var(--cream)] grain-overlay">
        <div ref={sectionRef}>
          {/* Header */}
          <div className={`text-center mb-12 md:mb-20 px-5 md:px-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-[var(--tortora)] text-[0.65rem] md:text-[0.68rem] tracking-[0.3em] uppercase">Il Nostro Mondo</span>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-5xl text-[var(--charcoal)] mt-4 md:mt-5 mb-6 md:mb-8">
              Gallery
            </h2>
            <div className="accent-line-tortora w-14 md:w-16 mx-auto" />
          </div>

          {/* Carousel */}
          <div className={`relative transition-all duration-1000 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Left Arrow */}
            <button
              onClick={() => scroll('left')}
              className={`absolute left-1 md:left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-[var(--charcoal)]/70 hover:text-[var(--charcoal)] hover:bg-white transition-all duration-300 ${
                canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scorri a sinistra"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Scroll Container */}
            <div
              ref={scrollRef}
              className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 md:px-8 scrollbar-hide"
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className="gallery-slide snap-start flex-shrink-0 w-[78vw] sm:w-[45vw] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.75rem)] aspect-[4/3] relative overflow-hidden cursor-zoom-in group"
                  onClick={() => setLightboxIndex(i)}
                  style={{ transitionDelay: visible ? `${i * 60}ms` : '0ms' }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 78vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-500 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white opacity-0 group-hover:opacity-60 transition-all duration-500 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll('right')}
              className={`absolute right-1 md:right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-[var(--charcoal)]/70 hover:text-[var(--charcoal)] hover:bg-white transition-all duration-300 ${
                canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scorri a destra"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Instagram */}
          <div className={`text-center mt-12 md:mt-14 px-5 transition-all duration-1000 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <a
              href="https://www.instagram.com/molendinialborgo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[var(--charcoal)]/40 hover:text-[var(--tortora-dark)] transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="tracking-[0.2em] uppercase text-[0.65rem] md:text-[0.68rem]">Seguici su Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

/* ─── Recensioni ─── */
function Recensioni() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const reviews = [
    { name: 'Marco R.', text: 'Posto incantevole nel cuore di Cerveteri. La carbonara \u00e8 semplicemente perfetta e l\'atmosfera \u00e8 molto accogliente. Torner\u00f2 sicuramente!', date: '2 settimane fa' },
    { name: 'Giulia T.', text: 'Abbiamo festeggiato il nostro anniversario qui e tutto era perfetto. Il servizio impeccabile, i piatti curati nei minimi dettagli.', date: '1 mese fa' },
    { name: 'Alessandro B.', text: 'La pizza pi\u00f9 buona della zona! Impasto leggero e ingredienti di prima qualit\u00e0. Il personale \u00e8 gentile e professionale.', date: '3 settimane fa' },
    { name: 'Francesca M.', text: 'Ambiente elegante ma familiare. I ravioli della casa sono una delizia. Prezzi onesti per la qualit\u00e0 offerta.', date: '1 mese fa' },
  ];

  return (
    <section id="recensioni" className="py-20 md:py-40 bg-[var(--cream-dark)] grain-overlay">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[var(--tortora)] text-[0.65rem] md:text-[0.68rem] tracking-[0.3em] uppercase">Cosa Dicono di Noi</span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-5xl text-[var(--charcoal)] mt-4 md:mt-5 mb-6 md:mb-8">
            Le Vostre Recensioni
          </h2>
          <div className="accent-line-tortora w-14 md:w-16 mx-auto mb-6 md:mb-8" />
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-[var(--champagne)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[var(--charcoal)]/70 text-sm font-medium">4.8 / 5</span>
            <span className="text-[var(--charcoal)]/40 text-sm">su Google</span>
          </div>
        </div>

        <div className={`grid md:grid-cols-2 gap-4 md:gap-5 transition-all duration-1000 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {reviews.map((review, i) => (
            <div key={i} className="bg-[var(--cream)] p-6 md:p-10 relative group hover:shadow-md transition-all duration-500">
              <div className="absolute top-4 md:top-6 right-6 md:right-8 text-[var(--tortora)]/10 text-5xl md:text-6xl font-['Cormorant_Garamond'] leading-none select-none">&rdquo;</div>
              <div className="flex gap-0.5 mb-4 md:mb-5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-3 h-3 text-[var(--champagne)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[var(--charcoal)]/55 text-[0.88rem] md:text-[0.95rem] leading-[1.85] mb-6 md:mb-8 relative z-10">{review.text}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--charcoal)]/80 text-sm font-medium">{review.name}</p>
                  <p className="text-[0.65rem] md:text-[0.7rem] text-[var(--charcoal)]/35 mt-0.5">{review.date}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[var(--charcoal)]/25">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-[0.6rem] md:text-[0.65rem]">Google</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-10 md:mt-12 transition-all duration-1000 delay-400 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <a
            href="https://www.google.com/maps/search/Molendini+al+Borgo+Via+Antonio+Ricci+9+00052+Cerveteri/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-dark"
          >
            Leggi tutte le recensioni
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Cookie Banner ─── */
function CookieBanner({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[90] transition-all duration-700 ${
      show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-[var(--cream)] border-t border-[var(--tortora)]/15 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row items-center gap-4">
          <p className="text-[var(--charcoal)]/55 text-[0.78rem] md:text-[0.82rem] leading-relaxed flex-1 text-center sm:text-left">
            Questo sito utilizza cookie tecnici e servizi di terze parti (Google Maps) per offrirti la migliore esperienza.
          </p>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={onDecline}
              className="px-5 py-2 text-[0.68rem] tracking-[0.15em] uppercase text-[var(--charcoal)]/50 hover:text-[var(--charcoal)]/80 transition-colors"
            >
              Rifiuta
            </button>
            <button
              onClick={onAccept}
              className="px-5 py-2 bg-[var(--tortora)] text-white text-[0.68rem] tracking-[0.15em] uppercase hover:bg-[var(--tortora-dark)] transition-colors"
            >
              Accetta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Floating Call Button (mobile) ─── */
function FloatingCallButton() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href="tel:+390639729048"
      className={`fixed bottom-6 right-5 z-[80] lg:hidden w-14 h-14 rounded-full bg-[var(--tortora)] text-white shadow-lg flex items-center justify-center transition-all duration-500 hover:bg-[var(--tortora-dark)] hover:shadow-xl active:scale-95 ${
        scrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      aria-label="Chiama il ristorante"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    </a>
  );
}

/* ─── Contatti ─── */
function Contatti({ cookieConsent }: { cookieConsent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const hours = [
    { day: 'Marted\u00ec \u2013 Venerd\u00ec', time: '19:30 \u2013 22:30' },
    { day: 'Sabato \u2013 Domenica', time: '12:30 \u2013 15:00 / 19:30 \u2013 23:00' },
    { day: 'Luned\u00ec', time: 'Chiuso', closed: true },
  ];

  return (
    <section id="contatti" className="py-20 md:py-40 bg-[var(--charcoal)] grain-overlay relative">
      <div ref={ref} className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[var(--tortora-light)] text-[0.65rem] md:text-[0.68rem] tracking-[0.3em] uppercase">Vieni a Trovarci</span>
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-5xl text-white mt-4 md:mt-5 mb-6 md:mb-8">
            Contatti &amp; Orari
          </h2>
          <div className="accent-line w-14 md:w-16 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="mb-8 md:mb-10">
              <h3 className="font-['Cormorant_Garamond'] text-lg md:text-xl text-[var(--tortora-light)] mb-3">Dove Siamo</h3>
              <p className="text-white/60 leading-relaxed text-[0.9rem] md:text-base">
                Via Antonio Ricci, 9<br />00052 Cerveteri (RM)<br />Lazio, Italia
              </p>
            </div>
            <div className="mb-8 md:mb-10">
              <h3 className="font-['Cormorant_Garamond'] text-lg md:text-xl text-[var(--tortora-light)] mb-3">Telefono</h3>
              <a href="tel:+390639729048" className="text-white/60 hover:text-white transition-colors text-[0.9rem] md:text-base">
                +39 06 3972 9048
              </a>
            </div>
            <div className="mb-8 md:mb-10">
              <h3 className="font-['Cormorant_Garamond'] text-lg md:text-xl text-[var(--tortora-light)] mb-4">Seguici</h3>
              <div className="flex gap-3">
                {[
                  { href: 'https://www.facebook.com/molendinialborgo2', label: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { href: 'https://www.instagram.com/molendinialborgo', label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 border border-[var(--tortora-light)]/40 flex items-center justify-center text-[var(--tortora-light)] hover:bg-[var(--tortora-light)]/10 hover:border-[var(--tortora-light)] transition-all duration-300"
                    aria-label={s.label}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon}/></svg>
                  </a>
                ))}
              </div>
            </div>
            <a
              href="https://www.thefork.it/ristorante/molendini-al-borgo-r672985#booking="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--tortora)] text-white px-8 py-3 text-[0.75rem] tracking-[3px] uppercase hover:bg-[var(--tortora-dark)] transition-all duration-300 min-h-[48px] flex items-center"
            >
              Prenota su TheFork
            </a>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="font-['Cormorant_Garamond'] text-lg md:text-xl text-[var(--tortora-light)] mb-5 md:mb-6">Orari di Apertura</h3>
            <div>
              {hours.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3.5 md:py-4 border-b border-white/10">
                  <span className={`text-[0.9rem] md:text-base ${item.closed ? 'text-white/30' : 'text-white/60'}`}>{item.day}</span>
                  <span className={`text-[0.9rem] md:text-base font-light ${item.closed ? 'text-white/30 italic' : 'text-[var(--tortora-light)]'}`}>{item.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 md:mt-10">
              <h3 className="font-['Cormorant_Garamond'] text-lg md:text-xl text-[var(--tortora-light)] mb-4">Servizi</h3>
              <div className="flex flex-wrap gap-2">
                {['Posti a sedere', 'Terrazza', 'Asporto', 'Consegna'].map((s) => (
                  <span key={s} className="px-3 py-1.5 border border-white/15 text-white/50 text-[0.68rem] tracking-wider">{s}</span>
                ))}
              </div>
            </div>
            <div className="mt-8 md:mt-10 aspect-video overflow-hidden rounded-sm">
              {cookieConsent === 'accepted' ? (
                <iframe
                  src="https://www.google.com/maps?q=Molendini+al+Borgo,+Via+Antonio+Ricci+9,+00052+Cerveteri+RM&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.3) contrast(1.05)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Molendini al Borgo - Google Maps"
                />
              ) : (
                <a
                  href="https://maps.google.com/?q=Via+Antonio+Ricci+9+Cerveteri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full bg-[var(--charcoal-light)] flex flex-col items-center justify-center gap-3 hover:bg-[var(--charcoal-light)]/80 transition-colors"
                >
                  <svg className="w-8 h-8 text-[var(--tortora-light)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-white/50 text-[0.7rem] tracking-[0.2em] uppercase">Apri in Google Maps</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-10 md:py-12 bg-[var(--charcoal)] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-6">
          <a href="#home">
            <Image src="/Logo Molendini chiaro.png" alt="Molendini al Borgo" width={80} height={80}
              className="opacity-50 hover:opacity-70 transition-opacity duration-300" />
          </a>
          <p className="text-white/25 text-[0.65rem] tracking-wider">&copy; {new Date().getFullYear()} Molendini al Borgo</p>
          <div className="flex items-center gap-5">
            {[
              { href: 'https://www.facebook.com/molendinialborgo2', label: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { href: 'https://www.instagram.com/molendinialborgo', label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-white/40 hover:text-[var(--tortora-light)] transition-colors duration-300"
                aria-label={s.label}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon}/></svg>
              </a>
            ))}
            <span className="text-white/15 mx-0.5">|</span>
            <a href="#" className="text-white/30 hover:text-white/50 transition-colors text-[0.6rem] md:text-[0.65rem] tracking-wider">Privacy</a>
            <a href="#" className="text-white/30 hover:text-white/50 transition-colors text-[0.6rem] md:text-[0.65rem] tracking-wider">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main ─── */
export default function Home() {
  const [cookieConsent, setCookieConsent] = useState('pending');

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (stored) setCookieConsent(stored);
  }, []);

  const handleCookieAccept = () => {
    setCookieConsent('accepted');
    localStorage.setItem('cookie-consent', 'accepted');
  };

  const handleCookieDecline = () => {
    setCookieConsent('declined');
    localStorage.setItem('cookie-consent', 'declined');
  };

  return (
    <main>
      <Navigation />
      <Hero />
      <Storia />
      <Philosophy />
      <Gallery />
      <Recensioni />
      <Contatti cookieConsent={cookieConsent} />
      <Footer />
      <FloatingCallButton />
      {cookieConsent === 'pending' && (
        <CookieBanner onAccept={handleCookieAccept} onDecline={handleCookieDecline} />
      )}
    </main>
  );
}
