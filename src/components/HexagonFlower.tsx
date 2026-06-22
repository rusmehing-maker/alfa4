import { useState } from 'react';
import { 
  Building2, 
  Armchair, 
  Clapperboard, 
  Compass, 
  Box, 
  Sparkles 
} from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';

interface HexagonFlowerProps {
  onSelectService: (serviceId: string) => void;
}

export default function HexagonFlower({ onSelectService }: HexagonFlowerProps) {
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
      icon: Clapperboard,
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
      icon: Armchair,
    },
  ];

  const isAnyActive = hoveredId !== null || cubifiedIds.length > 0;

  return (
    <div className="relative w-full max-w-[550px] aspect-[1/1] mx-auto select-none" id="hexagon-flower-stage">
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
        className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-[2] w-full h-full pointer-events-none transition-all duration-700 ease-out"
        style={{
          transform: isAnyActive ? 'scale(1.02)' : 'scale(1.0)',
        }}
        id="enclosing-grand-hexagon"
      >
        <div className="w-full h-full relative flex items-center justify-center">
          {/* Faint luxury glass backdrop under the entire network */}
          <div 
            className="absolute inset-0 bg-[#060606]/35 transition-colors duration-700"
            style={{
              clipPath: 'polygon(50% 1.5%, 92% 25.8%, 92% 74.2%, 50% 98.5%, 8% 74.2%, 8% 25.8%)',
              background: isAnyActive 
                ? 'radial-gradient(circle, rgba(223, 177, 91, 0.12) 0%, rgba(6, 6, 6, 0.6) 100%)'
                : 'radial-gradient(circle, rgba(24, 24, 24, 0.1) 0%, rgba(6, 6, 6, 0.45) 100%)',
            }}
          />
          
          {/* Radial grid linking and target alignment markings */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.15] transition-opacity duration-700" viewBox="0 0 100 100">
            {/* Symmetrical line tracks from central core to corner vertices */}
            <line x1="50" y1="50" x2="50" y2="5" stroke="#DFB15B" strokeWidth="0.8" strokeDasharray="3 4" />
            <line x1="50" y1="50" x2="89" y2="27.5" stroke="#DFB15B" strokeWidth="0.8" strokeDasharray="3 4" />
            <line x1="50" y1="50" x2="89" y2="72.5" stroke="#DFB15B" strokeWidth="0.8" strokeDasharray="3 4" />
            <line x1="50" y1="50" x2="50" y2="95" stroke="#DFB15B" strokeWidth="0.8" strokeDasharray="3 4" />
            <line x1="50" y1="50" x2="11" y2="72.5" stroke="#DFB15B" strokeWidth="0.8" strokeDasharray="3 4" />
            <line x1="50" y1="50" x2="11" y2="27.5" stroke="#DFB15B" strokeWidth="0.8" strokeDasharray="3 4" />
            
            {/* Concentric orbital circles */}
            <circle cx="50" cy="50" r="15" stroke="#DFB15B" strokeWidth="0.5" fill="none" opacity="0.35" />
            <circle cx="50" cy="50" r="32" stroke="#DFB15B" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="2 3" />
          </svg>

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
              className="transition-all duration-700"
              style={{
                stroke: isAnyActive ? '#DFB15B' : 'rgba(223, 177, 91, 0.3)',
                strokeWidth: isAnyActive ? '1.5' : '1.0',
                strokeDasharray: isAnyActive ? 'none' : '4, 4',
                filter: isAnyActive ? 'drop-shadow(0 0 10px rgba(223, 177, 91, 0.45))' : 'none'
              }}
            />
            
            {/* Fine secondary out-rig frame */}
            <polygon 
              points="50 1.5, 92 25.8, 92 74.2, 50 98.5, 8 74.2, 8 25.8" 
              className="transition-all duration-700"
              style={{
                stroke: isAnyActive ? 'rgba(223, 177, 91, 0.45)' : 'rgba(223, 177, 91, 0.15)',
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
                r={isAnyActive ? '1.2' : '0.8'}
                className="fill-[#DFB15B] transition-all duration-700"
                style={{
                  filter: isAnyActive ? 'drop-shadow(0 0 5px rgba(223, 177, 91, 0.8))' : 'none',
                }}
              />
            ))}
          </svg>
          
          {/* Subtle branding coordinates label inside the enclosing frame margin */}
          <div className="absolute bottom-[2%] text-center px-4 font-mono z-10 transition-all duration-500 opacity-40 hover:opacity-100">
            <span 
              className="text-[6px] tracking-[0.4em] font-bold block uppercase transition-colors duration-500"
              style={{ color: isAnyActive ? '#DFB15B' : 'rgba(255, 255, 255, 0.3)' }}
            >
              КОМПЛЕКСНАЯ ИНТЕГРАЦИЯ СРЕДЫ
            </span>
            <span className="text-[8px] font-sans font-light text-white tracking-[0.25em] block mt-0.5 uppercase">
              7 SOT SYSTEM • 3D MATRIX ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* CENTRAL LUXURY GOLD LOGO HEXAGON */}
      <div 
        className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 w-[170px] xs:w-[190px] md:w-[210px] aspect-[0.866] transition-transform duration-700"
        style={{
          filter: 'drop-shadow(0 0 25px rgba(223, 177, 91, 0.3))'
        }}
        id="center-logo-hexagon"
      >
        {/* Polygon clipping for clean backdrop */}
        <div 
          className="w-full h-full bg-[#080808]/90 border-2 border-[#DFB15B]/90 relative flex flex-col items-center justify-center p-3 text-center"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          {/* Subtle inner lines */}
          <div className="absolute inset-2 border border-[#DFB15B]/20 pointer-events-none" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
          
          <span className="text-[10px] uppercase font-medium tracking-[0.25em] text-gray-400 font-sans mt-2">
            3D VISUAL
          </span>
          <span className="text-4xl md:text-5xl font-serif font-light text-transparent bg-clip-text bg-gradient-to-b from-white via-[#DFB15B] to-[#9E7B31] py-1 drop-shadow-[0_2px_8px_rgba(223,177,91,0.4)] tracking-wide">
            AP
          </span>
          <span className="text-[9px] uppercase tracking-[0.6em] text-amber-500/80 font-mono pl-1">
            V07SOT
          </span>
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
            className="absolute -translate-x-[50%] -translate-y-[50%] z-10 w-[115px] xs:w-[130px] md:w-[145px] aspect-[0.866] cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            onMouseEnter={() => setHoveredId(node.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              setCubifiedIds(prev => 
                prev.includes(node.id) 
                  ? prev.filter(id => id !== node.id) 
                  : [...prev, node.id]
              );
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
