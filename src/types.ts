export interface ServiceDemo {
  type: 'day-night' | 'materials' | 'camera' | 'tour-360' | 'model-rotate' | 'concept-light';
  options?: string[];
  initialValue?: string | number;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleRu: string;
  tagline: string;
  taglineRu: string;
  description: string;
  descriptionRu: string;
  colorName: string; // 'orange' | 'green' | 'purple' | 'blue' | 'teal' | 'yellow'
  colorHex: string;
  glowClass: string;
  iconName: 'Building2' | 'Armchair' | 'Clapperboard' | 'Compass' | 'Box' | 'Sparkles' | 'Tv';
  bgImage: string;
  demo: ServiceDemo;
  gallery: string[];
  duration: string;
  durationRu: string;
  price: string;
  priceRu: string;
}

export type ActiveTab = 'home' | 'portfolio' | 'about' | 'contact';
