import { 
  Building2, 
  Layers, 
  Video, 
  Compass, 
  Box, 
  Sparkles, 
  Tv,
  Mail,
  Menu,
  X
} from 'lucide-react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import Header3DLogo from './Header3DLogo';

interface NavigationProps {
  onSelectService: (serviceId: string) => void;
  onOpenBooking: () => void;
  activeServiceId?: string;
}

export default function Navigation({ onSelectService, onOpenBooking, activeServiceId }: NavigationProps) {
  // Let's define the navigation items matching the request
  const navItems = [
    { id: 'exterior', label: 'EXTERIOR\nVISUALIZATION', icon: Building2, color: '#FF7A00' },
    { id: 'interior', label: 'INTERIOR\nVISUALIZATION', icon: Layers, color: '#10B981' },
    { id: 'animation', label: 'ARCHITECTURAL\nANIMATION', icon: Video, color: '#A855F7' },
    { id: 'tours', label: '360°\nVIRTUAL TOURS', icon: Compass, color: '#3B82F6' },
    { id: 'models', label: 'INTERACTIVE\n3D MODELS', icon: Box, color: '#06B6D4' },
    { id: 'concept', label: 'CONCEPT\nDESIGN', icon: Sparkles, color: '#FACC15' },
    // Custom item or mapping Concept Design/Digital Showrooms
    { id: 'concept', label: 'DIGITAL\nSHOWROOMS', icon: Tv, color: '#EAB308' },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-gradient-to-b from-[#060606]/90 via-[#060606]/40 to-transparent pt-4 pb-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Logo & Interactive 3D */}
        <div className="flex flex-col items-start gap-1" id="nav-logo-area">
          <Header3DLogo />
        </div>

        {/* Center: Horizontal Honeycomb Navigation */}
        <nav className="hidden xl:flex items-center gap-1" id="nav-horizontal-menu">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isSelected = activeServiceId === item.id;
            
            return (
              <div 
                key={index}
                onClick={() => onSelectService(item.id)}
                className="group flex flex-col items-center cursor-pointer relative w-24"
                id={`nav-item-${item.id}-${index}`}
              >
                {/* Micro hexagonal outline shell */}
                <div className="relative w-11 h-12 flex items-center justify-center transition-all duration-500 hover:scale-110">
                  {/* Hexagon Background Frame */}
                  <svg 
                    className={`absolute inset-0 w-full h-full text-transparent transition-all duration-300 ${
                      isSelected 
                        ? 'drop-shadow-[0_0_8px_rgba(223,177,91,0.75)]' 
                        : 'drop-shadow-[0_0_4px_rgba(223,177,91,0.2)] group-hover:drop-shadow-[0_0_8px_rgba(223,177,91,0.6)]'
                    }`}
                    viewBox="0 0 100 115"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon 
                      points="50 3, 97 30, 97 85, 50 112, 3 85, 3 30" 
                      className={`transition-all duration-500 fill-black/60 ${
                        isSelected 
                          ? 'stroke-[#DFB15B] stroke-[6px]' 
                          : 'stroke-[#DFB15B]/40 group-hover:stroke-[#DFB15B]'
                      }`}
                      strokeWidth="5"
                    />
                  </svg>
                  
                  {/* Icon */}
                  <IconComponent 
                    className={`w-5 h-5 transition-all duration-300 z-10 ${
                      isSelected ? 'text-white' : 'text-[#DFB15B]/70 group-hover:text-white'
                    }`} 
                    style={{ filter: `drop-shadow(0 0 4px ${item.color}40)` }}
                  />
                </div>

                {/* Vertical Separator Connector Thread */}
                <div className={`w-[1px] h-2 transition-colors ${
                  isSelected ? 'bg-[#DFB15B]' : 'bg-[#DFB15B]/20 group-hover:bg-[#DFB15B]/60'
                }`} />

                {/* Sub-label */}
                <div className={`text-[7.5px] leading-[1.3] font-sans tracking-wider text-center whitespace-pre-wrap transition-all duration-300 min-h-[22px] h-auto mt-1 pb-1 px-1 ${
                  isSelected 
                    ? 'text-[#DFB15B] font-bold' 
                    : 'text-[#A3A3A3] group-hover:text-[#DFB15B] font-medium'
                }`}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right Side: E-mail, Action Box & Hamburger Menu */}
        <div className="flex items-center gap-6" id="nav-right-actions">
          {/* E-mail Address */}
          <a 
            href="mailto:vo7sot@gmail.com"
            className="hidden sm:flex items-center gap-2 group text-xs tracking-widest text-[#E5E5E5] hover:text-[#DFB15B] transition-all duration-300 select-none font-light"
          >
            <Mail className="w-3.5 h-3.5 text-[#DFB15B]/80 group-hover:drop-shadow-[0_0_6px_rgba(223,177,91,0.8)]" />
            <span className="font-mono">vo7sot@gmail.com</span>
          </a>

          {/* Luxury consultation CTA */}
          <button 
            onClick={onOpenBooking}
            className="border border-[#DFB15B]/50 hover:border-[#DFB15B] px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-[#DFB15B] hover:text-black hover:bg-[#DFB15B] transition-all duration-500 shadow-[0_0_15px_rgba(223,177,91,0.1)] hover:shadow-[0_0_25px_rgba(223,177,91,0.35)] rounded-none"
            id="btn-fast-consult"
          >
            Заказать
          </button>
        </div>
      </div>
    </header>
  );
}
