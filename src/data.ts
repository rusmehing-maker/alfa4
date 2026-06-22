import { ServiceItem } from './types';

// Let's import our generated image paths to display them in the portfolio/modals
import exteriorImage from './assets/images/portfolio_exterior_dusk_1782123154027.jpg';
import interiorImage from './assets/images/portfolio_interior_luxury_1782123170357.jpg';
import backgroundHero from './assets/images/luxury_dark_mansion_interior_1782123130408.jpg';

export { backgroundHero };

export const SERVICES: ServiceItem[] = [
  {
    id: 'exterior',
    title: 'Exterior Visualization',
    titleRu: 'Экстерьерная визуализация',
    tagline: 'High-end photorealistic architectural renders',
    taglineRu: 'Фотореалистичные рендеры загородных резиденций и жилых комплексов',
    description: 'We bring architectural blueprints to life with exquisite detail. From atmospheric lighting and seasonal landscaping to realistic textures of concrete, glass, and wood, we portray buildings exactly as they will look in reality.',
    descriptionRu: 'Создание кинематографичных изображений зданий в контексте окружения. Мы детально прорабатываем текстуры дерева, камня и стекла, выстраиваем естественное освещение под любое время суток, интегрируем ландшафтный дизайн премиум-класса.',
    colorName: 'orange',
    colorHex: '#FF7A00',
    glowClass: 'shadow-[0_0_30px_rgba(255,122,0,0.5)] border-[#FF7A00]/50 hover:border-[#FF7A00]',
    iconName: 'Building2',
    bgImage: exteriorImage,
    demo: {
      type: 'day-night',
      options: ['Daylight Glow', 'Golden Hour', 'Cinema Night'],
      initialValue: 1
    },
    gallery: [
      exteriorImage,
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    duration: '5 - 10 working days',
    durationRu: '5 - 10 рабочих дней',
    price: 'From $1,200',
    priceRu: 'от 95,000 ₽'
  },
  {
    id: 'interior',
    title: 'Interior Visualization',
    titleRu: 'Интерьерная визуализация',
    tagline: 'Immersive atmospheric details of luxury rooms',
    taglineRu: 'Фотореалистичные интерьеры высокого уровня детализации',
    description: 'Every fabric thread, light reflection on marble, and brush on brass is computed with meticulous physical accuracy. We create stunning and cozy environments that communicate materials, space, and prestige.',
    descriptionRu: 'Ювелирная проработка деталей: фактура тканей, блеск драгоценных металлов, преломление света в хрустальных люстрах и прожилки мрамора. Мы воссоздаем атмосферу уюта, роскоши и гармонии интерьеров элитного класса.',
    colorName: 'green',
    colorHex: '#10B981',
    glowClass: 'shadow-[0_0_30px_rgba(16,185,129,0.5)] border-[#10B981]/50 hover:border-[#10B981]',
    iconName: 'Armchair',
    bgImage: interiorImage,
    demo: {
      type: 'materials',
      options: ['Carrara Marble', 'Brushed Brass', 'Walnut Wood', 'Deep Green Velvet'],
      initialValue: 'Carrara Marble'
    },
    gallery: [
      interiorImage,
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    duration: '4 - 8 working days',
    durationRu: '4 - 8 рабочих дней',
    price: 'From $900',
    priceRu: 'от 75,000 ₽'
  },
  {
    id: 'animation',
    title: 'Architectural Animation',
    titleRu: 'Архитектурная анимация',
    tagline: 'Cinematic walk-through videos and flybys',
    taglineRu: 'Захватывающие кинематографичные 3D видео и видеооблёты',
    description: 'We orchestrate movie-like animations where lighting moves in real-time, fireplace smoke rises, and trees sway in the wind. Experience your project through emotional storytelling camera paths and drone flies.',
    descriptionRu: 'Оживите проект с помощью кинематографичных видеороликов. Динамичный свет, колыхание деревьев, огонь в камине и плывущие облака. Мы создаем художественный сюжет, подбираем музыку и настраиваем плавный пролет камеры.',
    colorName: 'purple',
    colorHex: '#A855F7',
    glowClass: 'shadow-[0_0_30px_rgba(168,85,247,0.5)] border-[#A855F7]/50 hover:border-[#A855F7]',
    iconName: 'Clapperboard',
    bgImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    demo: {
      type: 'camera',
      options: ['Orbit View', 'Drone Entrance', 'Cinematic Slow Pan'],
      initialValue: 'Orbit View'
    },
    gallery: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    duration: '10 - 20 working days',
    durationRu: '10 - 20 рабочих дней',
    price: 'From $2,500',
    priceRu: 'от 190,000 ₽'
  },
  {
    id: 'tours',
    title: '360° Virtual Tours',
    titleRu: 'Виртуальные туры 360°',
    tagline: 'Fully immersive interactive space walk-throughs',
    taglineRu: 'Эффект полного присутствия и виртуальные прогулки',
    description: 'Allow clients to stand in the coordinates of their future room or balcony, rotate their gaze, change rooms seamlessly, and interact with features. Fully optimized for VR headsets and tablets.',
    descriptionRu: 'Интерактивные сферические панорамы, объединенные в увлекательный тур. Клиент может осматривать помещения со всех ракурсов, переключать точки обзора, приближать детали. Поддерживается VR-режим.',
    colorName: 'blue',
    colorHex: '#3B82F6',
    glowClass: 'shadow-[0_0_30px_rgba(59,130,246,0.5)] border-[#3B82F6]/50 hover:border-[#3B82F6]',
    iconName: 'Compass',
    bgImage: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80',
    demo: {
      type: 'tour-360',
      options: ['Master Bed Suite', 'Luxury Lounge Pool', 'Chandelier Lounge'],
      initialValue: 0
    },
    gallery: [
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    duration: '7 - 14 working days',
    durationRu: '7 - 14 рабочих дней',
    price: 'From $1,500',
    priceRu: 'от 120,000 ₽'
  },
  {
    id: 'models',
    title: 'Interactive 3D Models',
    titleRu: 'Интерактивные 3D-модели',
    tagline: 'Meticulous 3D models with WebGL configurator config',
    taglineRu: 'Встраиваемые веб-конфигураторы и высокополигональные модели',
    description: 'We construct complex standalone 3D models of components, furniture, and complete residential clusters. These web-friendly components let you rotate and scale the buildings right in the web browser.',
    descriptionRu: 'Создание адаптивных 3D-моделей зданий и предметов для размещения на сайтах. Пользователи могут плавно вращать модели мышкой, приближать элементы, рассматривать разрезы этажей и планировки.',
    colorName: 'teal',
    colorHex: '#06B6D4',
    glowClass: 'shadow-[0_0_30px_rgba(6,182,212,0.5)] border-[#06B6D4]/50 hover:border-[#06B6D4]',
    iconName: 'Box',
    bgImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    demo: {
      type: 'model-rotate',
      options: ['Wireframe HUD', 'Textured Model', 'Exploded Core View'],
      initialValue: 0
    },
    gallery: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
    ],
    duration: '6 - 12 working days',
    durationRu: '6 - 12 рабочих дней',
    price: 'From $1,800',
    priceRu: 'от 140,000 ₽'
  },
  {
    id: 'concept',
    title: 'Concept Design',
    titleRu: 'Концептуальный дизайн',
    tagline: 'Futuristic digital showrooms and exhibition stands',
    taglineRu: 'Цифровые выставочные стенды и концепты шоурумов будущего',
    description: 'Perfect for experimental spaces, conceptual objects, digital galleries, and brand metaverse presentations. We design futuristic environments that transcend physical constraints while retaining realism.',
    descriptionRu: 'Разработка концепций футуристичных бренд-зон, виртуальных галерей и метаверс-локаций. Мы создаем архитектуру будущего, которая не скована земными законами физики, но выглядит пугающе реалистично.',
    colorName: 'yellow',
    colorHex: '#FACC15',
    glowClass: 'shadow-[0_0_30px_rgba(250,204,21,0.5)] border-[#FACC15]/50 hover:border-[#FACC15]',
    iconName: 'Sparkles',
    bgImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    demo: {
      type: 'concept-light',
      options: ['Cosmic Gold Glow', 'Neon Cyan Glow', 'Cyberpunk Red Sparkle'],
      initialValue: 'Cosmic Gold Glow'
    },
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
    ],
    duration: '8 - 15 working days',
    durationRu: '8 - 15 рабочих дней',
    price: 'From $1,600',
    priceRu: 'от 110,000 ₽'
  }
];

export const GENERAL_STATS = [
  { value: '7', labelEn: 'Directions', labelRu: 'Направлений визуализации' },
  { value: '100%', labelEn: 'Attention to details', labelRu: 'Внимания к деталям' },
  { value: '1', labelEn: 'Goal — Perfection', labelRu: 'Цель — Совершенство' }
];
