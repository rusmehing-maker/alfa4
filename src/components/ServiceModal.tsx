import { useState, useRef, useEffect, MouseEvent } from 'react';
import { 
  X, 
  Calendar, 
  DollarSign, 
  ArrowRight, 
  Layers, 
  Sun, 
  Moon, 
  Sunset,
  Cpu, 
  Maximize2, 
  Gauge, 
  Rotate3d,
  Sparkles
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem;
  onClose: () => void;
  onOpenBooking: (serviceId: string) => void;
}

export default function ServiceModal({ service, onClose, onOpenBooking }: ServiceModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'gallery'>('details');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>(service.gallery[0] || service.bgImage);

  // INTERACTIVE DEMO STATES
  const [dayNightState, setDayNightState] = useState<'day' | 'sunset' | 'night'>('sunset');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Carrara Marble');
  const [cameraView, setCameraView] = useState<'orbit' | 'drone' | 'pan'>('orbit');
  const [panAngle, setPanAngle] = useState<number>(180);
  const [modelMode, setModelMode] = useState<'textured' | 'wireframe' | 'exploded'>('textured');
  const [rotationDegrees, setRotationDegrees] = useState<number>(45);
  const [conceptLightColor, setConceptLightColor] = useState<string>('#DFB15B');

  // Interactive mouse dragging variables for the 360 / 3D viewer
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    startX.current = e.clientX;
    
    // Smooth looping coordinates rotation
    if (service.demo.type === 'tour-360') {
      setPanAngle((prev) => (prev + deltaX * 0.5 + 360) % 360);
    } else if (service.demo.type === 'model-rotate') {
      setRotationDegrees((prev) => (prev + deltaX * 0.8 + 360) % 360);
    }
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Autoplay or slow rotate of the 3D systems if silent
  useEffect(() => {
    if (service.demo.type === 'model-rotate' || service.demo.type === 'tour-360') {
      const interval = setInterval(() => {
        if (!isDragging.current) {
          if (service.demo.type === 'model-rotate') {
            setRotationDegrees((d) => (d + 0.4) % 360);
          } else {
            setPanAngle((a) => (a + 0.1) % 360);
          }
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [service.demo.type]);

  const materialsList = [
    { name: 'Carrara Marble', info: 'Премиальный белый итальянский мрамор с серыми прожилками. Идеально полированная поверхность.', colorClass: 'bg-slate-100' },
    { name: 'Brushed Brass', info: 'Шлифованная латунь с тёплым металлическим отливом для фурнитуры и светильников.', colorClass: 'bg-amber-100' },
    { name: 'Walnut Wood', info: 'Шлифованный американский орех с глубокой текстурой древесных волокон.', colorClass: 'bg-amber-950' },
    { name: 'Deep Green Velvet', info: 'Мягкий бархат изумрудного оттенка для мебели элитного класса.', colorClass: 'bg-emerald-900' }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex items-start md:items-center justify-center p-4 py-8 md:p-10 animate-fade-in"
      id={`modal-service-${service.id}`}
    >
      <div className="bg-[#0b0b0b] border border-[#DFB15B]/30 w-full max-w-6xl rounded-none relative overflow-hidden flex flex-col lg:flex-row shadow-[0_0_80px_rgba(223,177,91,0.15)]">
        
        {/* Subtle decorative background laser lines */}
        <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#DFB15B]/50 to-transparent animate-pulse" />
        <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#DFB15B]/50 to-transparent animate-pulse" />

        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-gray-400 hover:text-[#DFB15B] transition-colors p-2 bg-black/60 border border-gray-800 hover:border-[#DFB15B]"
          id="btn-close-modal"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COMPONENT: STUNNING INTERACTIVE WORKSHOP SIMULATOR */}
        <div className="w-full lg:w-[55%] bg-[#060606] p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#DFB15B]/20 min-h-[400px]">
          <div>
            {/* Visual Header */}
            <div className="flex items-center gap-2 mb-6 text-xs tracking-widest text-[#DFB15B]/80 uppercase font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFB15B] animate-ping" />
              ИНТЕРАКТИВНЫЙ РЕНДЕР СТУДИИ AP
            </div>

            {/* SIMULATOR TYPE 1: DAY & NIGHT SLIDER (Exterior Visualization) */}
            {service.demo.type === 'day-night' && (
              <div className="space-y-6" id="demo-day-night">
                {/* Simulated Canvas viewport */}
                <div className="relative aspect-[4/3] bg-neutral-900 border border-neutral-800 overflow-hidden group">
                  <img 
                    src={service.bgImage} 
                    alt="Current state render"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-1000 ease-out"
                    style={{
                      filter: dayNightState === 'day' 
                        ? 'brightness(1.0) contrast(1.05) saturate(1.0)' 
                        : dayNightState === 'sunset'
                        ? 'brightness(0.8) hue-rotate(-10deg) saturate(1.2) contrast(1.05)'
                        : 'brightness(0.4) contrast(1.2) saturate(0.85) hue-rotate(220deg)'
                    }}
                  />
                  
                  {/* Digital overlay grid HUD lines */}
                  <div className="absolute inset-0 border border-white/5 pointer-events-none grid grid-cols-3 grid-rows-3">
                    <div className="border border-white/5" /><div className="border border-white/5" /><div className="border border-white/5" />
                    <div className="border border-white/5" /><div className="border border-white/5" /><div className="border border-white/5" />
                    <div className="border border-white/5" /><div className="border border-white/5" /><div className="border border-white/5" />
                  </div>

                  {/* Gradient shadow tint layers */}
                  {dayNightState === 'sunset' && (
                    <div className="absolute inset-0 bg-orange-500/10 mix-blend-color-burn pointer-events-none transition-all duration-1000" />
                  )}
                  {dayNightState === 'night' && (
                    <div className="absolute inset-0 bg-blue-950/35 mix-blend-overlay pointer-events-none transition-all duration-1000" />
                  )}

                  {/* Digital HUD Coordinates Label */}
                  <div className="absolute bottom-3 left-3 bg-black/80 px-2 py-1 border border-neutral-800 text-[8px] font-mono text-gray-400 tracking-wider">
                    TIME COORD: {dayNightState === 'day' ? '12:00 PM' : dayNightState === 'sunset' ? '07:30 PM (DUSK)' : '01:00 AM (MIDNIGHT)'}
                  </div>
                </div>

                {/* Day/Night Interaction Switcher */}
                <div className="space-y-3">
                  <div className="text-xs text-gray-400 font-mono tracking-wider text-center uppercase">
                    Выберите режим освещения купола неба:
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => setDayNightState('day')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 text-xs tracking-wider transition-all duration-300 border ${dayNightState === 'day' ? 'bg-[#DFB15B] text-black border-[#DFB15B]' : 'bg-transparent text-gray-400 border-neutral-800 hover:border-neutral-700'}`}
                    >
                      <Sun className="w-3.5 h-3.5" /> Дневной
                    </button>
                    <button 
                      onClick={() => setDayNightState('sunset')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 text-xs tracking-wider transition-all duration-300 border ${dayNightState === 'sunset' ? 'bg-orange-600 text-white border-orange-600' : 'bg-transparent text-gray-400 border-neutral-800 hover:border-neutral-700'}`}
                    >
                      <Sunset className="w-3.5 h-3.5" /> Закат
                    </button>
                    <button 
                      onClick={() => setDayNightState('night')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 text-xs tracking-wider transition-all duration-300 border ${dayNightState === 'night' ? 'bg-indigo-950 text-white border-indigo-950 shadow-[0_0_15px_rgba(30,41,59,0.5)]' : 'bg-transparent text-gray-400 border-neutral-800 hover:border-neutral-700'}`}
                    >
                      <Moon className="w-3.5 h-3.5" /> Ночной
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR TYPE 2: MATERIAL CONFIGURATOR (Interior Visualization) */}
            {service.demo.type === 'materials' && (
              <div className="space-y-6" id="demo-materials">
                <div className="relative aspect-[4/3] bg-neutral-900 border border-neutral-800 overflow-hidden">
                  <img 
                    src={service.bgImage} 
                    alt="Current material render"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700"
                    style={{
                      filter: selectedMaterial === 'Carrara Marble'
                        ? 'contrast(1.1) brightness(1.05) grayscale(0.2)' 
                        : selectedMaterial === 'Brushed Brass'
                        ? 'hue-rotate(-15deg) sepia(0.4) saturate(1.4) brightness(0.95)'
                        : selectedMaterial === 'Walnut Wood'
                        ? 'sepia(0.8) hue-rotate(-20deg) brightness(0.7) contrast(1.15)'
                        : 'hue-rotate(65deg) saturate(1.8) brightness(0.6) contrast(1.1)'
                    }}
                  />

                  {/* Dynamic Floating HUD */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/90 p-3 border-t border-neutral-800">
                    <p className="text-[10px] text-[#DFB15B] font-mono uppercase tracking-widest mb-1">
                      АКТИВНЫЙ МАТЕРИАЛ: {selectedMaterial}
                    </p>
                    <p className="text-[9px] text-gray-400 leading-normal">
                      {materialsList.find(m => m.name === selectedMaterial)?.info}
                    </p>
                  </div>
                </div>

                {/* Material Picker List */}
                <div className="space-y-3">
                  <div className="text-xs text-gray-400 font-mono tracking-wider uppercase text-center">
                    Интерактивный конфигуратор материалов отделки:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {materialsList.map((mat) => (
                      <button
                        key={mat.name}
                        onClick={() => setSelectedMaterial(mat.name)}
                        className={`flex items-center gap-2.5 px-3 py-2 text-left text-xs tracking-wider border rounded-none transition-all duration-300 ${selectedMaterial === mat.name ? 'border-[#DFB15B] bg-[#DFB15B]/10 text-[#DFB15B]' : 'border-neutral-800 text-gray-400 hover:border-neutral-700'}`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${mat.colorClass} border border-black/30 flex-shrink-0`} />
                        <span className="truncate">{mat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR TYPE 3: CAMERA SPEED/PATH TRACKER (Architectural Animation) */}
            {service.demo.type === 'camera' && (
              <div className="space-y-6" id="demo-camera">
                <div className="relative aspect-[4/3] bg-[#030303] border border-neutral-800 overflow-hidden flex items-center justify-center">
                  <img 
                    src={service.gallery[1] || service.bgImage} 
                    alt="Camera flyby mockup"
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      cameraView === 'orbit' 
                        ? 'animate-[pulse_12s_infinite]' 
                        : cameraView === 'drone' 
                        ? 'scale-110 translate-y-2' 
                        : 'scale-105 translate-x-4'
                    }`}
                  />
                  
                  {/* Mock camera HUD viewport overlays */}
                  <div className="absolute top-4 left-4 font-mono text-[9px] text-[#DFB15B]/90 flex items-center gap-1.5 bg-black/80 px-2 py-0.5 border border-neutral-800">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                    REC [CAM 01: {cameraView.toUpperCase()}]
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-between p-6 pointer-events-none">
                    {/* Crosshairs */}
                    <div className="border border-[#DFB15B]/10 w-24 h-24 rounded-full flex items-center justify-center">
                      <div className="w-[1px] h-6 bg-[#DFB15B]/30" />
                      <div className="w-6 h-[1px] bg-[#DFB15B]/30" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 font-mono text-[9px] text-gray-400 bg-black/80 p-2 border border-neutral-800">
                    SPEED multiplier: <span className="text-white font-bold">1.25x</span>
                  </div>
                </div>

                {/* Interactive Path Options */}
                <div className="space-y-3">
                  <div className="text-xs text-gray-400 font-mono tracking-wider uppercase text-center">
                    Переключить траекторию пролета камеры:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'orbit', label: 'Камера Орбита' },
                      { id: 'drone', label: 'Дрон-Вход' },
                      { id: 'pan', label: 'Панорама Медленно' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setCameraView(btn.id as any)}
                        className={`py-2 text-[10px] tracking-wider border rounded-none transition-all duration-300 ${cameraView === btn.id ? 'bg-[#DFB15B] text-black border-[#DFB15B] font-semibold' : 'bg-transparent text-gray-400 border-neutral-800 hover:border-neutral-700'}`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR TYPE 4: 360° SPHERE DRAGGER (Virtual Tours) */}
            {service.demo.type === 'tour-360' && (
              <div className="space-y-6" id="demo-tour-360">
                <div 
                  className="relative aspect-[4/3] bg-neutral-950 border border-neutral-800 overflow-hidden cursor-move"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                >
                  {/* Panoramic offset slider simulator */}
                  <div 
                    className="absolute inset-0 h-full flex transition-transform duration-100 ease-out"
                    style={{ 
                      width: '300%', 
                      transform: `translateX(-${(panAngle / 360) * 100}%)` 
                    }}
                  >
                    <img src={service.bgImage} className="w-1/3 h-full object-cover" alt="pan1" referrerPolicy="no-referrer" />
                    <img src={service.gallery[1] || service.bgImage} className="w-1/3 h-full object-cover" alt="pan2" referrerPolicy="no-referrer" />
                    <img src={service.bgImage} className="w-1/3 h-full object-cover" alt="pan3" referrerPolicy="no-referrer" />
                  </div>

                  {/* Click/Drag guides overlay */}
                  <div className="absolute inset-0 bg-black/25 pointer-events-none flex flex-col items-center justify-center text-center p-4">
                    <Maximize2 className="w-8 h-8 text-white/75 drop-shadow-[0_0_10px_black] opacity-60 animate-pulse mb-2" />
                    <p className="text-[10px] tracking-[0.2em] font-sans text-white/95 uppercase drop-shadow-[0_2px_4px_black]">
                      Зажмите и потяните мышь для обзора 360°
                    </p>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/80 px-2 py-1 border border-neutral-800 text-[8px] font-mono text-gray-400">
                    CAM ANGLE: {Math.round(panAngle)}° / FOV: 90°
                  </div>
                </div>

                <div className="text-center text-xs text-gray-400 font-mono flex items-center justify-center gap-1">
                  <Rotate3d className="w-4 h-4 text-[#DFB15B]" /> Имитация виртуальной прогулки со сшивкой сферических панорам.
                </div>
              </div>
            )}

            {/* SIMULATOR TYPE 5: ROTATABLE CAD WIREFRAME (Interactive 3D Models) */}
            {service.demo.type === 'model-rotate' && (
              <div className="space-y-6" id="demo-model-rotate">
                <div 
                  className="relative aspect-[4/3] bg-[#020202] border border-neutral-800 overflow-hidden cursor-move flex items-center justify-center"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                >
                  {/* SVG High-tech Wireframe CAD Grid drawing */}
                  <svg 
                    className="w-[240px] h-[240px] relative transition-transform duration-100 ease-out"
                    style={{ transform: `rotateY(${rotationDegrees}deg) rotateX(${rotationDegrees/4}3deg)` }}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Glowing circular orbital fields */}
                    <circle cx="50" cy="50" r="45" className="stroke-[#06B6D4]/30" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="35" className="stroke-[#06B6D4]/15" />

                    {/* Architectural block lines depending on modelMode */}
                    {modelMode === 'textured' ? (
                      // Stylized solid mesh wireframe
                      <>
                        <polygon points="50 15, 80 32, 80 68, 50 85, 20 68, 20 32" className="stroke-[#06B6D4] fill-[#06B6D4]/5" strokeWidth="1.5" />
                        <line x1="50" y1="15" x2="50" y2="85" className="stroke-[#06B6D4]/70" />
                        <line x1="20" y1="32" x2="80" y2="68" className="stroke-[#06B6D4]/70" />
                        <line x1="20" y1="68" x2="80" y2="32" className="stroke-[#06B6D4]/70" />
                      </>
                    ) : modelMode === 'wireframe' ? (
                      // Complex network grids
                      <>
                        <polygon points="50 5, 95 30, 95 70, 50 95, 5 70, 5 30" className="stroke-[#06B6D4] fill-none" strokeWidth="1" />
                        <polygon points="50 20, 80 37, 80 63, 50 80, 20 63, 20 37" className="stroke-[#06B6D4]/60 fill-none" strokeWidth="1" />
                        <line x1="50" y1="5" x2="50" y2="95" className="stroke-[#06B6D4]/30" />
                        <line x1="5" y1="30" x2="95" y2="70" className="stroke-[#06B6D4]/30" />
                        <line x1="5" y1="70" x2="95" y2="30" className="stroke-[#06B6D4]/30" />
                      </>
                    ) : (
                      // Exploded core details
                      <>
                        {/* Upper plate */}
                        <polygon points="50 10, 80 25, 50 40, 20 25" className="stroke-[#06B6D4] fill-[#06B6D4]/10" strokeWidth="1" />
                        {/* Core sphere */}
                        <circle cx="50" cy="50" r="8" className="stroke-cyan-400 fill-[#000000] animate-ping" />
                        <circle cx="50" cy="50" r="6" className="stroke-[#06B6D4] fill-cyan-400/80" />
                        {/* Lower plate */}
                        <polygon points="50 60, 80 75, 50 90, 20 75" className="stroke-[#06B6D4] fill-[#06B6D4]/10" strokeWidth="1" />
                        <line x1="50" y1="25" x2="50" y2="75" className="stroke-[#06B6D4]/40" strokeDasharray="2 2" />
                      </>
                    )}
                  </svg>

                  {/* Drag label */}
                  <div className="absolute top-4 right-4 bg-black/95 border border-cyan-500/35 px-2.5 py-1 text-cyan-400 font-mono text-[8px] uppercase tracking-widest gap-2 flex items-center">
                    <Rotate3d className="w-3.0 h-3.0 animate-spin" /> Drag mouse to Rotate
                  </div>

                  <div className="absolute bottom-3 left-3 font-mono text-[8px] text-gray-400">
                    POLYCOUNT: 2,450,200 Triangles | WebGL Core v2.0
                  </div>
                </div>

                {/* Sub configuration options */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'textured', label: 'Чертежный solid' },
                    { id: 'wireframe', label: 'Сетка каркаса' },
                    { id: 'exploded', label: 'Взрыв-схема' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setModelMode(m.id as any)}
                      className={`py-1.5 text-[9px] font-mono tracking-widest border transition-all duration-300 ${modelMode === m.id ? 'bg-[#06B6D4] text-black border-cyan-400' : 'bg-transparent text-gray-500 border-neutral-800 hover:border-neutral-700'}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIMULATOR TYPE 6: SPOTLIGHT COLOR SELECTOR (Concept Design / Digital Showrooms) */}
            {service.demo.type === 'concept-light' && (
              <div className="space-y-6" id="demo-concept-light">
                <div className="relative aspect-[4/3] bg-[#020202] border border-neutral-800 overflow-hidden">
                  <img 
                    src={service.bgImage} 
                    alt="Concept showroom design"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale transition-all duration-700 opacity-60"
                  />
                  
                  {/* Digital neon lighting beam overlays */}
                  <div 
                    className="absolute inset-0 pointer-events-none mix-blend-color transition-colors duration-1000 opacity-80"
                    style={{
                      background: `radial-gradient(ellipse at top, ${conceptLightColor}CC, transparent 75%)`
                    }}
                  />
                  <div 
                    className="absolute inset-0 pointer-events-none mix-blend-screen transition-colors duration-1000 opacity-20"
                    style={{
                      background: `linear-gradient(220deg, ${conceptLightColor} 0%, transparent 50%)`
                    }}
                  />

                  <div className="absolute bottom-4 left-4 flex flex-col pointer-events-none">
                    <div className="text-[9px] text-white tracking-[0.2em] font-sans font-semibold uppercase">
                      BRAND SPACE METAVERSE STAGE
                    </div>
                    <div className="text-[7.5px] text-gray-400 font-mono">
                      COLOR ID: <span className="text-white">{conceptLightColor}</span>
                    </div>
                  </div>
                </div>

                {/* Light select panel */}
                <div className="space-y-3">
                  <div className="text-xs text-gray-400 font-mono tracking-wider uppercase text-center">
                    Выбрать спектральный режим подсветки стенда:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { hex: '#DFB15B', name: 'Золотой' },
                      { hex: '#06B6D4', name: 'Неон-Циан' },
                      { hex: '#EF4444', name: 'Кибер-Красный' }
                    ].map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setConceptLightColor(color.hex)}
                        className="py-1.5 px-2 text-[10px] border border-neutral-800 flex items-center justify-center gap-1.5 hover:border-neutral-600 transition-colors"
                        style={{
                          color: conceptLightColor === color.hex ? color.hex : '#999999',
                          borderColor: conceptLightColor === color.hex ? color.hex : '#1F2937'
                        }}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color.hex }} />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Technical Summary Stats inside the simulator frame */}
          <div className="mt-6 pt-4 border-t border-neutral-800 grid grid-cols-3 text-center gap-2">
            <div>
              <p className="text-[9px] text-[#DFB15B] font-mono tracking-widest uppercase">Resolution</p>
              <p className="text-[11px] font-sans text-white font-medium">8K Ultra HD</p>
            </div>
            <div>
              <p className="text-[9px] text-[#DFB15B] font-mono tracking-widest uppercase">Engine</p>
              <p className="text-[11px] font-sans text-white font-medium">Octane / Corona</p>
            </div>
            <div>
              <p className="text-[9px] text-[#DFB15B] font-mono tracking-widest uppercase">Materials</p>
              <p className="text-[11px] font-sans text-white font-medium">Physical PBR</p>
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT: SERVICE DETAILED META PANELS */}
        <div className="w-full lg:w-[45%] p-6 lg:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Tab navigation within details */}
            <div className="flex border-b border-neutral-800 gap-6 pb-2">
              <button 
                onClick={() => setActiveTab('details')}
                className={`text-xs uppercase tracking-widest font-semibold pb-1.5 transition-colors border-b-2 ${activeTab === 'details' ? 'border-[#DFB15B] text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
              >
                Описание
              </button>
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`text-xs uppercase tracking-widest font-semibold pb-1.5 transition-colors border-b-2 ${activeTab === 'gallery' ? 'border-[#DFB15B] text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
              >
                Галерея ({service.gallery.length})
              </button>
            </div>

            {activeTab === 'details' ? (
              <div className="space-y-5 animate-fade-in" id="panel-details">
                {/* Titles */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-serif text-[#DFB15B] tracking-wide mb-1 leading-tight">
                    {service.titleRu}
                  </h3>
                  <p className="text-xs text-gray-400 tracking-wider">
                    {service.taglineRu}
                  </p>
                </div>

                {/* Primary Description */}
                <p className="text-xs leading-relaxed text-gray-300">
                  {service.descriptionRu}
                </p>

                {/* Premium Workflow Highlights */}
                <div className="pt-2">
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#DFB15B] mb-2 leading-none">
                    Что входит в стандарт разработки:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-gray-400 font-sans">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      Текстурирование по ТЗ (PBR)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      3 круга бесплатных правок
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      Сложный студийный свет
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      Интеграция уличных карт
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      Постобработка в DaVinci
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#DFB15B]/80 rounded-full" />
                      VR готовность к отправке
                    </li>
                  </ul>
                </div>

                {/* Pricing & Deadlines panels */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
                  <div className="flex gap-2.5 items-center">
                    <div className="p-2 border border-neutral-800 bg-neutral-900/50 flex-shrink-0 text-[#DFB15B]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-widest font-mono text-gray-500">Сроки сдачи</p>
                      <p className="text-[11px] font-sans text-gray-200 mt-0.5 font-medium">{service.durationRu}</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="p-2 border border-[#DFB15B]/20 bg-neutral-900/50 flex-shrink-0 text-[#DFB15B]">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-widest font-mono text-gray-500">Стоимость</p>
                      <p className="text-[11px] font-sans text-[#DFB15B] mt-0.5 font-semibold">{service.priceRu}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // GRAPHICS GALLERY PREVIEW
              <div className="space-y-4 animate-fade-in" id="panel-gallery">
                <div className="relative aspect-[16/10] bg-neutral-950 border border-neutral-800 overflow-hidden">
                  <img 
                    src={selectedGalleryImg} 
                    alt="Extended gallery preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>
                {/* Thumbnails list row */}
                <div className="grid grid-cols-4 gap-2">
                  {service.gallery.map((img, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedGalleryImg(img)}
                      className={`aspect-[4/3] cursor-pointer overflow-hidden border transition-all duration-300 ${selectedGalleryImg === img ? 'border-[#DFB15B] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`Thumb ${idx+1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* EST STAGE CTA ORDER BOX */}
          <div className="mt-8 pt-6 border-t border-neutral-900 space-y-4">
            <button 
              onClick={() => onOpenBooking(service.id)}
              className="w-full bg-[#DFB15B] hover:bg-white text-black py-4 px-6 text-[10px] font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-none"
              id="btn-order-modal-service"
            >
              Заказать визуализацию <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="text-[8px] text-gray-500 text-center font-mono uppercase tracking-[0.1em]">
              * Расчет индивидуального коммерческого предложения за 15 минут
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
