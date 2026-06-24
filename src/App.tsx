import { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  Rotate3d, 
  Maximize2, 
  Eye, 
  Clock, 
  Volume2, 
  VolumeX, 
  Zap, 
  Compass, 
  Calendar, 
  Award,
  ChevronRight
} from 'lucide-react';

import Navigation from './components/Navigation';
import HexagonFlower from './components/HexagonFlower';
import ThreeGoldenLogo from './components/ThreeGoldenLogo';
import ServiceModal from './components/ServiceModal';
import BookingForm from './components/BookingForm';

import { SERVICES, GENERAL_STATS, backgroundHero } from './data';
import { ServiceItem } from './types';

export default function App() {
  // SERVICE STATE
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingPrefillId, setBookingPrefillId] = useState<string>('exterior');

  // MUSIC / AMBIENT SOUND CAPABILITY STATE
  // Cinematic ambient drone sound fits standard luxury landing pages
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // INTERACTIVE PARALLAX MOUSE STATE
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // RECENT REAL-TIME COMPARATOR SLIDER
  const [sliderPosition, setSliderPosition] = useState(50);
  const isSliderDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const x = (e.clientX / width) * 2 - 1;
      const y = (e.clientY / height) * 2 - 1;
      setMousePos({ 
        x: isNaN(x) || !isFinite(x) ? 0 : x, 
        y: isNaN(y) || !isFinite(y) ? 0 : y 
      });
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - (window.innerHeight || 1);
      if (scrollHeight > 0) {
        setScrollProgress(window.scrollY / scrollHeight);
      }
    };

    window.addEventListener('mousemove', handleMouseMove as any);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle ambient background music simulation
  useEffect(() => {
    try {
      if (!audioRef.current) {
        // A beautiful luxurious low synth ambient pad space loop
        audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav'); // cinematic soft sub
        audioRef.current.loop = true;
        audioRef.current.volume = 0.15;
      }
      
      if (!isMuted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    } catch (e) {
      console.warn("Audio elements are not supported or blocked in this environment:", e);
    }
  }, [isMuted]);

  // Open respective service modal helper
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  // Open booking coordinator with prefilled option
  const handleOpenBooking = (prefillId: string = 'exterior') => {
    setBookingPrefillId(prefillId);
    setIsBookingOpen(true);
  };

  // Drag before-after slider logic
  const handleSliderMove = (clientX: number, rectLeft: number, rectWidth: number) => {
    const pos = ((clientX - rectLeft) / rectWidth) * 100;
    setSliderPosition(Math.max(0, Math.min(100, pos)));
  };

  const currentService = SERVICES.find(s => s.id === selectedServiceId);

  return (
    <div className="relative min-h-screen text-gray-100 overflow-hidden bg-[#030303] flex flex-col justify-between" id="applet-viewport-root">
      
      {/* 1. KINEMATIC BACKGROUND WITH EXPENSIVE AMBIENT PARALLAX */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `scale(1.08) translate(${mousePos.x * -14}px, ${mousePos.y * -14}px)`
        }}
        id="parallax-background-container"
      >
        {/* Luxury villa interior wallpaper we generated */}
        <img 
          src={backgroundHero} 
          alt="Studio ambient backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none filter brightness-[0.22] contrast-[1.05]"
        />
        {/* Dark radial glow vignettes */}
        <div className="absolute inset-0 bg-radial-vignette bg-gradient-to-t from-[#030303] via-black/40 to-[#030303]" />
        
        {/* Premium ambient particles gold dust floating */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#DFB15B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </div>

      {/* 2. TOP BAR HEADER NAVIGATION CONTROL */}
      <Navigation 
        onSelectService={handleSelectService}
        onOpenBooking={() => handleOpenBooking('exterior')}
        activeServiceId={selectedServiceId || undefined}
      />

      {/* Subtle bottom line for the navigation block */}
      <div 
        className="absolute top-[88px] left-0 h-[1px] bg-gradient-to-r from-transparent via-[#DFB15B]/20 to-transparent transition-all duration-1000"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* 3. HERO CONTENT CONTAINER (SINGLE PAGE MASTER STAGE) */}
      <main className="relative z-10 flex-grow flex flex-col" id="master-main-wrapper">
        
        {/* HERO SECTION STAGE - Adjusted top padding to completely prevent overlap with absolute header controls */}
        <section className="min-h-screen px-6 lg:px-12 flex flex-col items-center justify-center pt-48 sm:pt-48 md:pt-44 lg:pt-44 xl:pt-48 pb-16" id="section-hero">
          <div className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center gap-12">
            
            {/* CENTERED AREA: STUDIO HEADLINE CREDENTIALS */}
            <div className="flex flex-col items-center text-center space-y-5 md:space-y-6 max-w-3xl mx-auto animate-fade-in" id="hero-headlines">
              
              {/* Animated Gold Sparkle Header micro tagline */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#DFB15B]/10 to-transparent border-l-2 border-[#DFB15B] text-[9px] font-sans font-semibold tracking-[0.25em] text-[#DFB15B] uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Архитектура • Интерьер • Визуализация
              </div>

              {/* Grand Cinematic Typography headings */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-[1.15] font-serif font-light tracking-tight text-white uppercase max-w-none sm:whitespace-nowrap">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#DFB15B] to-[#9E7B31] font-medium drop-shadow-[0_2px_15px_rgba(223,177,91,0.25)]">
                    3D Визуализация
                  </span>{" "}
                  и моделирование
                </h1>
                
                <ThreeGoldenLogo />
                
                <p className="text-xs sm:text-[13px] text-gray-400 font-sans font-light leading-relaxed max-w-xl mx-auto">
                  Мы создаём фотореалистичные визуализации и интерактивные 3D-модели, которые продают дорогостоящие идеи и вдохновляют на безупречную реализацию.
                </p>
              </div>

              {/* Call to Action Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
                <button 
                  onClick={() => handleOpenBooking('exterior')}
                  className="group relative border border-[#DFB15B] hover:border-white px-7 py-3.5 text-[10.5px] font-semibold tracking-[0.25em] uppercase text-[#DFB15B] hover:text-black hover:bg-[#DFB15B] transition-all duration-300 shadow-[0_0_15px_rgba(223,177,91,0.12)] hover:shadow-[0_0_25px_rgba(223,177,91,0.35)] rounded-none cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
                  id="btn-main-cta"
                >
                  Заказать визуализацию
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                
                {/* Secondary Explore link */}
                <a 
                  href="#experience-showroom"
                  className="text-[9px] tracking-[0.2em] text-gray-500 hover:text-[#DFB15B] transition-colors py-2 uppercase font-mono flex items-center gap-1.5"
                >
                  смотреть шоурум <ChevronDown className="w-3 h-3 animate-bounce" />
                </a>
              </div>
            </div>

            {/* CENTER / BOTTOM STAGE: SHOWSTOPPING INTERACTIVE HONEYCOMB FLOWER */}
            <div className="w-full flex justify-center items-center relative" id="hero-hexagon-flower-panel">
              <div className="w-full max-w-[550px] md:max-w-[620px] lg:max-w-[640px] xl:max-w-[680px] relative animate-[float_10s_ease-in-out_infinite]">
                <HexagonFlower 
                  onSelectService={handleSelectService} 
                  onOpenBooking={() => handleOpenBooking('exterior')} 
                  isMuted={isMuted} 
                />
              </div>
            </div>

          </div>
        </section>

        {/* 4. SHOWCASE SECTION "BEFORE / AFTER REVEAL SLIDER" */}
        <section 
          id="experience-showroom" 
          className="min-h-screen bg-[#050505]/95 px-6 lg:px-12 py-24 border-t border-neutral-900 relative z-10"
        >
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Section titles */}
            <div className="text-center space-y-3">
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-amber-500/80">
                ИНТЕРАКТИВНЫЙ ОПЫТ С ТЕХНОЛОГИЯМИ AP
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif text-white tracking-wide uppercase">
                От чертежа к фотореализму
              </h2>
              <p className="text-xs text-gray-400 max-w-xl mx-auto">
                Потяните слайдер по центру, чтобы увидеть, как сухие CAD схемы и векторные планы превращаются в кинематографичную модель с физически корректными текстурами.
              </p>
            </div>

            {/* COMPARATIVE INTERACTIVE COMPOSITIONS SLIDER */}
            <div className="max-w-4xl mx-auto relative select-none">
              
              <div 
                className="relative aspect-[16/10] w-full bg-[#0a0a0a] border border-[#DFB15B]/30 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                onMouseMove={(e) => {
                  if (isSliderDragging.current) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    handleSliderMove(e.clientX, rect.left, rect.width);
                  }
                }}
                onTouchMove={(e) => {
                  if (e.touches[0]) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    handleSliderMove(e.touches[0].clientX, rect.left, rect.width);
                  }
                }}
                onMouseDown={() => { isSliderDragging.current = true; }}
                onMouseUp={() => { isSliderDragging.current = false; }}
                onMouseLeave={() => { isSliderDragging.current = false; }}
                onTouchStart={() => { isSliderDragging.current = true; }}
                onTouchEnd={() => { isSliderDragging.current = false; }}
                id="before-after-slider-viewport"
              >
                {/* Underneath: Schematic Blueprint / Wireframe layer */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 bg-[#0c1824] opacity-90 z-10 mix-blend-color pointer-events-none" />
                  <img 
                    src={SERVICES[1].bgImage} // luxury interior living room
                    alt="Blueprint schematic"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast(1.2) brightness(0.9) grayscale(1) sepia(0.2) hue-rotate(180deg)"
                  />
                  {/* Digital blueprint grid overlay */}
                  <div className="absolute inset-0 border border-cyan-500/10 grid grid-cols-12 grid-rows-12 pointer-events-none" />
                </div>

                {/* Overlying foreground: Photorealistic pristine render */}
                <div 
                  className="absolute inset-0 w-full h-full z-10 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src={SERVICES[1].bgImage} 
                    alt="Photorealistic finished render"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full object-cover"
                    style={{ width: '1000px', maxWidth: 'none', height: '100%' }} // ensure consistent bounds
                  />
                </div>

                {/* Vertical slider divider handles */}
                <div 
                  className="absolute inset-y-0 w-[2px] bg-[#DFB15B] z-20 cursor-ew-resize pointer-events-none shadow-[0_0_10px_#DFB15B]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Interactive golden handle knob */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#DFB15B] bg-[#0c0c0c] text-[#DFB15B] shadow-[0_0_15px_rgba(223,177,91,0.5)]">
                    <Rotate3d className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                {/* Tags */}
                <span className="absolute left-6 top-6 bg-black/90 p-2 border border-neutral-800 text-[9px] font-mono text-cyan-400 tracking-wider z-10">
                  BEFORE: CAD BLUEPRINT SCHEMES
                </span>
                <span className="absolute right-6 top-6 bg-black/95 p-2 border border-[#DFB15B]/35 text-[9px] font-mono text-[#DFB15B] tracking-wider z-30">
                  AFTER: 3D PHOTOREALISTIC RENDER
                </span>
              </div>

              <p className="text-center text-[10px] text-gray-500 font-mono uppercase mt-4">
                ◀ Зажмите золотой диск и потяните влево или вправо для сопоставления ▶
              </p>
            </div>

            {/* Showcase gallery grids of actual results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              {[
                { title: 'Экстерьеры', tag: 'Dusk Villa', img: SERVICES[0].bgImage, desc: 'Загородное поместье с многослойным вечерним освещением и зеркальным отражением бассейна.' },
                { title: 'Интерьеры', tag: 'Luxury Lounge', img: SERVICES[1].bgImage, desc: 'Гостиная пентхауса с мраморными текстурами и вкраплениями полированной латуни.' },
                { title: 'Концепты', tag: 'Showroom Loft', img: SERVICES[5].bgImage, desc: 'Виртуальная бренд-зона с интерактивной световой сценой для диджитал презентаций.' }
              ].map((proj, id) => (
                <div key={id} className="group overflow-hidden bg-[#0a0a0a] border border-neutral-900 hover:border-[#DFB15B]/40 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={proj.img} 
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-95" 
                    />
                    <span className="absolute bottom-3 left-3 bg-black/90 text-[8px] font-mono text-[#DFB15B] px-2 py-0.5 tracking-widest uppercase">
                      {proj.tag}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="text-xs font-serif text-white tracking-widest uppercase">{proj.title}</h4>
                    <p className="text-[10px] text-gray-400 leading-relaxed font-sans">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 5. WORK METHODOLOGY STEPS TIMELINE SECTION */}
        <section className="bg-[#030303]/90 px-6 lg:px-12 py-24 relative z-10 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-2">
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-amber-500">
                ПРОЦЕСС РАЗРАБОТКИ
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif text-white tracking-wide uppercase">
                Этапы создания совершенства
              </h2>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Рабочий процесс студии 3D VISUAL AP базируется на строгой методологии и глубоком понимании архитектуры.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Техническое ТЗ', desc: 'Сбор чертежей, планов этажей, ландшафтных карт фасадов и мудбордов для определения концепции и освещения.' },
                { step: '02', title: 'Clay Моделинг', desc: 'Построение высокополигональной геометрии сцены, расстановка камер и утверждение ключевых ракурсов обзора.' },
                { step: '03', title: 'Шейдеры и свет', desc: 'Наложение PBR материалов, расчёт преломлений света, тонкая настройка отражений и атмосферной дымки.' },
                { step: '04', title: 'Пост-обработка', desc: 'Финальный художественный рендеринг в разрешении 8К с цветокоррекцией в DaVinci для достижения кино-картинки.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#080808] p-6 border border-neutral-900 relative space-y-4">
                  <div className="text-4xl font-serif text-[#DFB15B]/30 font-bold leading-none">{item.step}</div>
                  <h3 className="text-xs font-serif uppercase tracking-widest text-[#DFB15B] font-semibold">{item.title}</h3>
                  <p className="text-[10.5px] leading-relaxed text-gray-400 font-sans">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Quality trust seal cards */}
            <div className="bg-[#080808] p-8 border border-[#DFB15B]/20 text-center max-w-2xl mx-auto space-y-4">
              <Award className="w-10 h-10 text-[#DFB15B] mx-auto animate-pulse" />
              <h3 className="text-sm font-serif text-[#DFB15B] uppercase tracking-widest font-semibold">
                Гарантия фотореализма и соблюдения сроков
              </h3>
              <p className="text-xs text-gray-300 leading-normal max-w-lg mx-auto">
                Каждый ракурс проходит трехэтапный внутренний контроль качества у нашего арт-директора до показа клиенту. Все сметные обязательства закреплены юридически.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* 6. BOTTOM FOOTER HUD (WITH STATS & COPY) */}
      <footer className="relative z-20 bg-gradient-to-t from-black via-black/80 to-[#030303] pt-12 pb-6 px-6 lg:px-12 border-t border-neutral-900" id="master-footer">
        
        {/* UPPER FOOTER GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-neutral-950">
          
          {/* Logo stamp */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-lg font-semibold tracking-wider text-white">
              3D VISUAL <span className="text-[#DFB15B] font-serif font-light">AP</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal max-w-xs uppercase tracking-wider font-mono">
              АРХИТЕКТУРА И МОДЕЛИРОВАНИЕ КЛАССА LUXURY
            </p>
          </div>

          {/* Core Russian Minimalist Coordinates Stats of the studio */}
          <div className="lg:col-span-8 flex flex-wrap gap-8 lg:justify-end" id="footer-stats-hud">
            {GENERAL_STATS.map((stat, i) => (
              <div key={i} className="flex gap-3 items-center" id={`stat-node-${i}`}>
                <div className="text-3xl font-serif text-[#DFB15B] font-semibold tracking-tight">
                  {stat.value}
                </div>
                <div className="h-6 w-[1px] bg-neutral-800" />
                <div className="text-[7.5px] tracking-[0.2em] text-[#A3A3A3] uppercase max-w-[120px] font-sans">
                  {stat.labelRu}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* LOWER FOOTER ROW */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between text-gray-600 text-[9px] tracking-widest font-mono">
          <p>© 2026 3D VISUAL AP. ALL RIGHTS RESERVED (V07SOT CORP).</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="mailto:vo7sot@gmail.com" className="hover:text-[#DFB15B] transition-colors">VO7SOT@GMAIL.COM</a>
            <span>ST. PETERSBURG / MOSCOW / COORD PORTAL</span>
          </div>
        </div>

      </footer>

      {/* 7. AMBIENT BACKGROUND CONSOLE SOUND TOGGLE IN CORNER */}
      <div className="fixed bottom-6 left-6 z-40">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 bg-black/80 border border-[#DFB15B]/30 text-[#DFB15B] hover:text-white hover:border-[#DFB15B] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)]"
          title="Toggle Background Ambient Pad"
          id="btn-volume-toggle"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
        </button>
      </div>

      {/* 8. ACTIVE SERVICE METADATA MODALS */}
      {selectedServiceId && currentService && (
        <ServiceModal 
          service={currentService}
          onClose={() => setSelectedServiceId(null)}
          onOpenBooking={handleOpenBooking}
        />
      )}

      {/* 9. SERVICE INQUIRY/ESTIMATOR BOOKING FORM */}
      {isBookingOpen && (
        <BookingForm 
          initialServiceId={bookingPrefillId}
          onClose={() => setIsBookingOpen(false)}
        />
      )}

    </div>
  );
}
