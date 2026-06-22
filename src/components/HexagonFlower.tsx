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

  return (
    <div className="relative w-full max-w-[550px] aspect-[1/1] mx-auto select-none" id="hexagon-flower-stage">
      {/* Outer ambient soft light field that changes color depending on active hover */}
      <div 
        className="absolute inset-[15%] rounded-full blur-[80px] opacity-40 transition-all duration-1000 z-0"
        style={{
          background: hoveredId 
            ? hexNodes.find(n => n.id === hoveredId)?.glowColor 
            : 'rgba(223, 177, 91, 0.25)'
        }}
      />

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
            onClick={() => onSelectService(node.id)}
            id={`flower-node-${node.id}`}
          >
            {/* The Outer Frame / Glow Ring */}
            <div 
              className="w-full h-full relative transition-all duration-500 ease-out flex items-center justify-center"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
                filter: isHovered 
                  ? `drop-shadow(0 0 16px ${node.glowColor})`
                  : 'drop-shadow(0 0 6px rgba(0, 0, 0, 0.8))'
              }}
            >
              {/* Outer Hexagon Line SVG */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 115"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon 
                  points="50 3, 97 30, 97 85, 50 112, 3 85, 3 30" 
                  className="transition-all duration-500"
                  style={{
                    stroke: isHovered ? node.color : 'rgba(223, 177, 91, 0.45)',
                    strokeWidth: isHovered ? '3.5' : '2'
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
                    filter: isHovered 
                      ? 'scale(1.1) brightness(0.9) saturate(1.1)' 
                      : `scale(1.0) brightness(0.4) saturate(0.6) sepia(0.3) hue-rotate(${node.id === 'interior' ? '60deg' : node.id === 'animation' ? '240deg' : node.id === 'tours' ? '180deg' : node.id === 'models' ? '150deg' : '0deg'})`
                  }}
                />

                {/* Colorized radial overlay gradient */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500 opacity-60 mix-blend-color"
                  style={{
                    background: `radial-gradient(circle, ${node.color} 0%, rgba(0,0,0,0.8) 100%)`,
                    opacity: isHovered ? '0.35' : '0.75'
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
                        color: isHovered ? '#FFFFFF' : '#DFB15B',
                        transform: isHovered ? 'rotate(10deg)' : 'none'
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
                      maxHeight: isHovered ? '12px' : '0px',
                      opacity: isHovered ? '1' : '0'
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
