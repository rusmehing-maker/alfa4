import { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Video, 
  Compass, 
  Box, 
  Sparkles 
} from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';

interface HexagonFlowerProps {
  onSelectService: (serviceId: string) => void;
  isMuted?: boolean;
}

// Lazy loaded global AudioContext to bypass chrome autoplay checks safely
let globalAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return null;
    if (!globalAudioCtx) {
      globalAudioCtx = new AudioCtxClass();
    }
    if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume().catch(() => {});
    }
    return globalAudioCtx;
  } catch (error) {
    console.warn('AudioContext initialization or access blocked:', error);
    return null;
  }
}

// Sophinescent crystalline technological hover blip
function playHoverSound(isMuted?: boolean) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Clean futuristic beep
    osc.frequency.setValueAtTime(1100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1450, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.012, ctx.currentTime); // delicate volume
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch (error) {
    console.warn('Audio synthesis error:', error);
  }
}

// Lush ambient chord glide or release slide representation
function playCubeSound(isBecomingCube: boolean, isMuted?: boolean) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    if (isBecomingCube) {
      // E Major Chord (golden ratio harmonics: E, G#, B, E)
      const freqs = [329.63, 415.30, 493.88, 659.25];
      
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle'; // pure warm analog
        osc.frequency.setValueAtTime(freq, now + index * 0.015);
        
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.015, now + 0.04 + index * 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45 + index * 0.02);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.5);
      });
    } else {
      // Gentle sci-fi dematerialization down-sweep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.3);
      
      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (error) {
    console.warn('Audio synthesis error:', error);
  }
}

export default function HexagonFlower({ onSelectService, isMuted = true }: HexagonFlowerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cubifiedIds, setCubifiedIds] = useState<string[]>([]);

  // Map the services to their trigonometric nodes around the center
  // Positions are calculated as { x, y } in percentages within a 100% relative frame
  const hexNodes = [
    {
      id: 'exterior',
      service: SERVICES.find(s => s.id === 'exterior')!,
      x: 50,
      y: 19,
      color: 'rgba(255, 122, 0, 0.85)',
      glowColor: 'rgba(255, 122, 0, 0.65)',
      icon: Building2,
    },
    {
      id: 'animation',
      service: SERVICES.find(s => s.id === 'animation')!,
      x: 76,
      y: 34,
      color: 'rgba(168, 85, 247, 0.85)',
      glowColor: 'rgba(168, 85, 247, 0.65)',
      icon: Video,
    },
    {
      id: 'models',
      service: SERVICES.find(s => s.id === 'models')!,
      x: 76,
      y: 66,
      color: 'rgba(6, 182, 212, 0.85)',
      glowColor: 'rgba(6, 182, 212, 0.65)',
      icon: Box,
    },
    {
      id: 'concept',
      service: SERVICES.find(s => s.id === 'concept')!,
      x: 50,
      y: 81,
      color: 'rgba(250, 204, 21, 0.85)',
      glowColor: 'rgba(250, 204, 21, 0.65)',
      icon: Sparkles,
    },
    {
      id: 'tours',
      service: SERVICES.find(s => s.id === 'tours')!,
      x: 24,
      y: 66,
      color: 'rgba(59, 130, 246, 0.85)',
      glowColor: 'rgba(59, 130, 246, 0.65)',
      icon: Compass,
    },
    {
      id: 'interior',
      service: SERVICES.find(s => s.id === 'interior')!,
      x: 24,
      y: 34,
      color: 'rgba(16, 185, 129, 0.85)',
      glowColor: 'rgba(16, 185, 129, 0.65)',
      icon: Layers,
    },
  ];

  const isAnyActive = hoveredId !== null || cubifiedIds.length > 0;

  return (
    <div className="relative w-full max-w-[680px] aspect-[1/1] mx-auto select-none" id="hexagon-flower-stage">
      {/* Outer ambient soft light field that changes color depending on active hover */}
      <div 
        className="absolute inset-[10%] rounded-full blur-[90px] opacity-40 transition-all duration-1000 z-0"
        style={{
          background: hoveredId 
            ? hexNodes.find(n => n.id === hoveredId)?.glowColor 
            : 'rgba(223, 177, 91, 0.25)'
        }}
      />

      {/* GRAND GOLDEN ENCLOSING HEXAGON FOR ALL 6+1 CELLS */}
      <div 
        className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-[2] w-full h-full pointer-events-none"
        id="enclosing-grand-hexagon"
      >
        <div className="w-full h-full relative flex items-center justify-center">
          {/* Faint luxury glass backdrop under the entire network */}
          <div 
            className="absolute inset-0 bg-[#060606]/35"
            style={{
              clipPath: 'polygon(50% 1.5%, 92% 25.8%, 92% 74.2%, 50% 98.5%, 8% 74.2%, 8% 25.8%)',
              background: 'radial-gradient(circle, rgba(223, 177, 91, 0.08) 0%, rgba(6, 6, 6, 0.5) 100%)',
            }}
          />
          
          {/* Hexagonal double line border outline */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Massive inner main golden frame */}
            <polygon 
              points="50 5, 89 27.5, 89 72.5, 50 95, 11 72.5, 11 27.5" 
              style={{
                stroke: 'rgba(223, 177, 91, 0.35)',
                strokeWidth: '1.0',
              }}
            />
            
            {/* Fine secondary out-rig frame */}
            <polygon 
              points="50 1.5, 92 25.8, 92 74.2, 50 98.5, 8 74.2, 8 25.8" 
              style={{
                stroke: 'rgba(223, 177, 91, 0.15)',
                strokeWidth: '0.7',
              }}
            />

            {/* Glowing corner tech beads */}
            {[
              { cx: 50, cy: 5 },
              { cx: 89, cy: 27.5 },
              { cx: 89, cy: 72.5 },
              { cx: 50, cy: 95 },
              { cx: 11, cy: 72.5 },
              { cx: 11, cy: 27.5 }
            ].map((pt, idx) => (
              <circle 
                key={idx}
                cx={pt.cx}
                cy={pt.cy}
                r="0.8"
                className="fill-[#DFB15B]/40"
              />
            ))}
          </svg>
          
          {/* Subtle branding coordinates label inside the enclosing frame margin */}
          <div className="absolute bottom-[2%] text-center px-4 font-mono z-10 opacity-35">
            <span 
              className="text-[6px] tracking-[0.4em] font-bold block uppercase text-white/40"
            >
              КОМПЛЕКСНАЯ ИНТЕГРАЦИЯ СРЕДЫ
            </span>
            <span className="text-[8px] font-sans font-light text-white/30 tracking-[0.25em] block mt-0.5 uppercase">
              7 SOT SYSTEM • 3D MATRIX ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* CENTRAL LUXURY GOLD LOGO HEXAGON WITH RICH 3D EXTRUSION & PARALLAX HOVER */}
      <div 
        className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 w-[26.5%] aspect-[0.866] cursor-pointer group"
        style={{
          filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.6)) drop-shadow(0 0 12px rgba(223, 177, 91, 0.22))',
          perspective: '1200px'
        }}
        id="center-logo-hexagon"
      >
        {/* Revolving Core wrapper containing multiple physical 3D depths/shelves */}
        <div 
          className="w-full h-full relative transition-[transform] duration-[1200ms] ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(360deg)]"
        >
          {/* LAYER 1: Deep shadow & Golden ambient back-glow */}
          <div 
            className="absolute inset-0 bg-[#DFB15B]/15 pointer-events-none blur-md rounded-full transition-opacity duration-500 opacity-60 group-hover:opacity-100"
            style={{
              transform: 'translateZ(-16px) scale(0.9)',
            }}
          />

          {/* LAYER 2: Back Gold Extruded Rim (Bevel backplane) */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#59441B] via-[#91712C] to-[#59441B] border border-[#2b1f06] pointer-events-none"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              transform: 'translateZ(-6px)',
            }}
          />

          {/* LAYER 3: Middle Gold Extruded Edge (Thick metal side bevel) */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#DFB15B] via-[#FFF5E0] to-[#DFB15B] pointer-events-none"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              transform: 'translateZ(-3px)',
            }}
          />

          {/* LAYER 4: Dark Slate Core Body (Base interior) */}
          <div 
            className="absolute inset-0 bg-[#141414] pointer-events-none"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              transform: 'translateZ(-1px)',
            }}
          />

          {/* LAYER 5: Main Front Face Plate (0px index) */}
          <div 
            className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center p-2 text-center pointer-events-none"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'radial-gradient(circle at 50% 35%, rgba(223, 177, 91, 0.22) 0%, #050505 85%)',
              border: '1.5px solid rgba(223, 177, 91, 0.85)',
              transform: 'translateZ(0px)',
            }}
          >
            {/* Symmetrical framing lines (inner hex border nested inside) */}
            <div 
              className="absolute inset-[4.5%] border border-[#DFB15B]/35 pointer-events-none" 
              style={{ 
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' 
              }} 
            />
            
            {/* High-fidelity light flare reflection sweep */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/12 via-transparent to-transparent pointer-events-none" />

            {/* Radiant ground reflection trace */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-[50%] w-[65%] h-[1px] bg-gradient-to-r from-transparent via-[#DFB15B]/50 to-transparent blur-[0.5px] pointer-events-none" />
          </div>

          {/* LAYER 6: Forward Projected Holographic Text Container (Suspended in space) */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{
              transform: 'translateZ(14px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="flex flex-col items-center justify-center z-10 select-none mt-1" style={{ transform: 'translateZ(8px)' }}>
              {/* AP Logo cast high-contrast drop-shadow */}
              <span 
                className="text-4xl xs:text-5xl md:text-5.5xl font-sans font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5E0] via-[#DFB15B] to-[#91712C] leading-none"
                style={{ filter: 'drop-shadow(0 4px 5px rgba(0,0,0,0.85))' }}
              >
                AP
              </span>
              
              {/* VO7SOT */}
              <span 
                className="text-[7.5px] xs:text-[8px] md:text-[9.5px] uppercase tracking-[0.25em] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D4] to-[#DFB15B] font-sans mt-0.5 leading-none"
                style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.95))' }}
              >
                VO7SOT
              </span>
              
              {/* 3D VISUALIZATION */}
              <span 
                className="text-[5px] xs:text-[5.5px] md:text-[6.5px] uppercase tracking-[0.12em] font-bold text-[#fdfdff]/90 bg-[#050505]/75 border border-[#DFB15B]/25 px-1 py-0.5 rounded-[2px] font-sans mt-1.5 leading-none"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.9))' }}
              >
                3D VISUALIZATION
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 SURROUNDING COMPOSITIONS */}
      {hexNodes.map((node) => {
        const IconComponent = node.icon;
        const isHovered = hoveredId === node.id;
        const isCubified = cubifiedIds.includes(node.id);
        const isCubeActive = isHovered || isCubified;
        const s = node.service;

        return (
          <div
            key={node.id}
            className="absolute -translate-x-[50%] -translate-y-[50%] z-10 w-[26.5%] aspect-[0.866] cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            onMouseEnter={() => {
              setHoveredId(node.id);
              playHoverSound(isMuted);
            }}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              const isCurrentlyCubified = cubifiedIds.includes(node.id);
              setCubifiedIds(prev => 
                prev.includes(node.id) 
                  ? prev.filter(id => id !== node.id) 
                  : [...prev, node.id]
              );
              // Play immersive 3D materialization / dematerialization synthesis
              playCubeSound(!isCurrentlyCubified, isMuted);
              onSelectService(node.id);
            }}
            id={`flower-node-${node.id}`}
          >
            {/* The Outer Frame / Glow Ring */}
            <div 
              className="w-full h-full relative transition-all duration-500 ease-out flex items-center justify-center"
              style={{
                transform: isCubeActive ? 'scale(1.08) translateY(-4px)' : 'scale(1.0)',
                filter: isCubeActive 
                  ? `drop-shadow(0 10px 20px ${node.glowColor})`
                  : 'drop-shadow(0 0 6px rgba(0, 0, 0, 0.8))'
              }}
            >
              {/* Outer Hexagon Line SVG with Internal 3D isometric edges */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 100 115"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon 
                  points="50 3, 97 30, 97 85, 50 112, 3 85, 3 30" 
                  className="transition-all duration-500"
                  style={{
                    stroke: isCubeActive ? node.color : 'rgba(223, 177, 91, 0.45)',
                    strokeWidth: isCubeActive ? '3.5' : '2'
                  }}
                />
                
                {/* 3D Isometric Cube Internal Edges: center (50, 57.5) to Bottom-Mid, Top-Left, Top-Right */}
                <line 
                  x1="50" 
                  y1="57.5" 
                  x2="50" 
                  y2="112" 
                  stroke={node.color}
                  strokeWidth="2.5"
                  strokeDasharray="55"
                  strokeDashoffset={isCubeActive ? 0 : 55}
                  style={{
                    opacity: isCubeActive ? 1 : 0,
                    transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out'
                  }}
                />
                <line 
                  x1="50" 
                  y1="57.5" 
                  x2="3" 
                  y2="30" 
                  stroke={node.color}
                  strokeWidth="2.5"
                  strokeDasharray="55"
                  strokeDashoffset={isCubeActive ? 0 : 55}
                  style={{
                    opacity: isCubeActive ? 1 : 0,
                    transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out'
                  }}
                />
                <line 
                  x1="50" 
                  y1="57.5" 
                  x2="97" 
                  y2="30" 
                  stroke={node.color}
                  strokeWidth="2.5"
                  strokeDasharray="55"
                  strokeDashoffset={isCubeActive ? 0 : 55}
                  style={{
                    opacity: isCubeActive ? 1 : 0,
                    transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out'
                  }}
                />
              </svg>

              {/* Clipped Inner Content Showcase */}
              <div 
                className="w-[94%] h-[94%] bg-[#101010] relative overflow-hidden transition-all duration-500"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
              >
                {/* Background rendering image */}
                <img 
                  src={s.bgImage} 
                  alt={s.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
                  style={{
                    filter: isCubeActive 
                      ? 'scale(1.1) brightness(0.9) saturate(1.1)' 
                      : `scale(1.0) brightness(0.4) saturate(0.6) sepia(0.3) hue-rotate(${node.id === 'interior' ? '60deg' : node.id === 'animation' ? '240deg' : node.id === 'tours' ? '180deg' : node.id === 'models' ? '150deg' : '0deg'})`
                  }}
                />

                {/* Colorized radial overlay gradient */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500 opacity-60 mix-blend-color"
                  style={{
                    background: `radial-gradient(circle, ${node.color} 0%, rgba(0,0,0,0.8) 100%)`,
                    opacity: isCubeActive ? '0.35' : '0.75'
                  }}
                />

                {/* 3D Isometric Face Shading Overlays (Drawn when hovered or clicked) */}
                {/* Top Face Light Source Overlay */}
                <div 
                  className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-10"
                  style={{
                    clipPath: 'polygon(50% 50%, 0% 25%, 50% 0%, 100% 25%)',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.03) 100%)',
                    opacity: isCubeActive ? 1 : 0,
                  }}
                />
                {/* Left Face Shading Overlay */}
                <div 
                  className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-10"
                  style={{
                    clipPath: 'polygon(50% 50%, 0% 25%, 0% 75%, 50% 100%)',
                    background: 'linear-gradient(225deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.55) 100%)',
                    opacity: isCubeActive ? 1 : 0,
                  }}
                />
                {/* Right Face Shading Overlay (Deep Shadow) */}
                <div 
                  className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-10"
                  style={{
                    clipPath: 'polygon(50% 50%, 100% 25%, 100% 75%, 50% 100%)',
                    background: 'linear-gradient(315deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.8) 100%)',
                    opacity: isCubeActive ? 1 : 0,
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Icon & Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center z-10">
                  <div 
                    className="p-1 px-1.5 rounded-full transition-all duration-500 mb-1"
                    style={{
                      textShadow: `0 0 10px ${node.color}`
                    }}
                  >
                    <IconComponent 
                      className="w-5 h-5 transition-transform duration-500"
                      style={{
                        color: isCubeActive ? '#FFFFFF' : '#DFB15B',
                        transform: isCubeActive ? 'rotate(10deg)' : 'none'
                      }}
                    />
                  </div>
                  
                  {/* Subtle dynamic label description */}
                  <span className="text-[7.5px] font-sans font-semibold tracking-wider text-gray-300 group-hover:text-white uppercase line-clamp-2 max-w-[85px]">
                    {s.titleRu.split(' ')[0]}
                  </span>
                  
                  {/* Extra hover reveal tag */}
                  <div 
                    className="overflow-hidden transition-all duration-500 max-h-0 text-[6px] text-[#DFB15B] tracking-widest font-mono uppercase mt-0.5"
                    style={{
                      maxHeight: isCubeActive ? '12px' : '0px',
                      opacity: isCubeActive ? '1' : '0'
                    }}
                  >
                    Перейти →
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
