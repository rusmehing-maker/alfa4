export default function ThreeGoldenLogo() {
  const iframeSrcDoc = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>3D VISUAL AP - Golden Comet</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-color: #030303;
            font-family: sans-serif;
            user-select: none;
            -webkit-user-select: none;
        }
        canvas {
            display: block;
        }
        #loading {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            color: #ffd700;
            font-size: 18px;
            letter-spacing: 2px;
            pointer-events: none;
            transition: opacity 0.5s;
            font-family: monospace;
        }
    </style>
    <script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
          "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
        }
      }
    </script>
</head>
<body>
    <div id="loading">ОТЛИВКА ЗОЛОТА...</div>

    <script type="module">
        import * as THREE from 'three';
        import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
        import { FontLoader } from 'three/addons/loaders/FontLoader.js';
        import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

        // --- 1. БАЗОВАЯ НАСТРОЙКА ---
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x030303, 0.015);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.set(0, 0, 35);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        document.body.appendChild(renderer.domElement);

        // --- 2. СВЕТ И ОТРАЖЕНИЯ (Золото) ---
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffddaa, 1.0);
        dirLight.position.set(10, 10, 10);
        scene.add(dirLight);

        // --- 3. ГЕНЕРАЦИЯ ОБЪЕМНОГО ТЕКСТА ---
        const logoGroup = new THREE.Group();
        scene.add(logoGroup);

        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,      // Золотой цвет
            metalness: 1.0,       // 100% металл
            roughness: 0.15,      // Гладкий, но не как зеркало
            envMapIntensity: 2.0  // Сильные отражения окружения
        });

        const loader = new FontLoader();
        loader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', function (font) {
            
            // Функция для создания 3D слова
            function createWord(text, size, yPos) {
                const geometry = new TextGeometry(text, {
                    font: font,
                    size: size,
                    height: 1.5, // Толщина букв (глубина)
                    curveSegments: 12,
                    bevelEnabled: true, // Фаска для красивых бликов по краям
                    bevelThickness: 0.2,
                    bevelSize: 0.1,
                    bevelOffset: 0,
                    bevelSegments: 5
                });
                
                geometry.computeBoundingBox();
                const centerOffset = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
                
                const mesh = new THREE.Mesh(geometry, goldMaterial);
                mesh.position.set(centerOffset, yPos, 0);
                return mesh;
            }

            // Верхняя строка
            const topText = createWord('3D VISUAL AP', 3.5, 1.5);
            logoGroup.add(topText);

            // Нижняя строка (крупная, как просили)
            const bottomText = createWord('VO7SOT', 5.5, -5.5);
            logoGroup.add(bottomText);

            document.getElementById('loading').style.opacity = 0;
        });

        // --- 4. КОМЕТА И ХВОСТ ЧАСТИЦ ---
        const cometGroup = new THREE.Group();
        cometGroup.position.z = -8; // Помещаем комету ЗА буквами
        scene.add(cometGroup);

        // Ядро кометы (светящийся шарик)
        const cometHeadGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const cometHeadMat = new THREE.MeshBasicMaterial({ color: 0xffffee });
        const cometHead = new THREE.Mesh(cometHeadGeo, cometHeadMat);
        cometGroup.add(cometHead);

        // Свет от кометы (будет красиво подсвечивать золото сзади)
        const cometLight = new THREE.PointLight(0xffaa44, 100, 40);
        cometGroup.add(cometLight);

        // Система частиц для хвоста
        const maxParticles = 2000;
        const tailGeo = new THREE.BufferGeometry();
        const posArray = new Float32Array(maxParticles * 3);
        const colorArray = new Float32Array(maxParticles * 3);
        
        tailGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        tailGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const tailMat = new THREE.PointsMaterial({
            size: 0.8,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false
        });
        const tailPoints = new THREE.Points(tailGeo, tailMat);
        scene.add(tailPoints);

        const activeParticles = [];

        // --- 5. АНИМАЦИЯ ---
        const clock = new THREE.Clock();
        
        // Начальная позиция кометы
        let cometX = -40;
        const cometSpeed = 15;

        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            // 5.1 Автоматическое "дыхание" камеры (замена OrbitControls)
            camera.position.x = Math.sin(time * 0.3) * 3;
            camera.position.y = Math.cos(time * 0.2) * 1.5;
            camera.lookAt(scene.position);

            logoGroup.rotation.y = Math.sin(time * 0.5) * 0.05;
            logoGroup.rotation.x = Math.cos(time * 0.4) * 0.02;

            // 5.2 Движение кометы слева направо по дуге
            cometX += cometSpeed * delta;
            if (cometX > 40) cometX = -40; // Сброс позиции

            cometGroup.position.x = cometX;
            // Легкая синусоида по Y для красивой траектории
            cometGroup.position.y = Math.sin(cometX * 0.1) * 3 + 2; 

            // 5.3 Генерация новых частиц хвоста
            for(let i = 0; i < 8; i++) {
                activeParticles.push({
                    x: cometGroup.position.x + (Math.random() - 0.5),
                    y: cometGroup.position.y + (Math.random() - 0.5),
                    z: cometGroup.position.z + (Math.random() - 0.5),
                    vx: -Math.random() * 0.2, // Сносит влево
                    vy: (Math.random() - 0.5) * 0.1, // Легкий разброс
                    life: 1.0 // Продолжительность жизни
                });
            }

            // 5.4 Обновление частиц
            let pIdx = 0;
            for(let i = activeParticles.length - 1; i >= 0; i--) {
                let p = activeParticles[i];
                p.life -= delta * 1.2; // Скорость затухания
                
                p.x += p.vx;
                p.y += p.vy;

                if (p.life <= 0) {
                    activeParticles.splice(i, 1);
                } else {
                    if (pIdx < maxParticles) {
                        posArray[pIdx * 3] = p.x;
                        posArray[pIdx * 3 + 1] = p.y;
                        posArray[pIdx * 3 + 2] = p.z;
                        
                        // Цвет хвоста: от ярко-золотого к темно-красному
                        colorArray[pIdx * 3] = p.life;               // Red
                        colorArray[pIdx * 3 + 1] = p.life * 0.6;     // Green
                        colorArray[pIdx * 3 + 2] = p.life * 0.1;     // Blue
                        
                        pIdx++;
                    }
                }
            }
            
            // Обновляем буферы геометрии
            tailGeo.setDrawRange(0, pIdx);
            tailGeo.attributes.position.needsUpdate = true;
            tailGeo.attributes.color.needsUpdate = true;

            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    </script>
</body>
</html>`;

  return (
    <div 
      className="relative w-full max-w-[960px] h-[300px] sm:h-[420px] rounded mt-6 border border-[#DFB15B]/20 bg-[#030303] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.9)] group/logo mx-auto transition-all duration-500 ease-in-out"
      id="threejs-logo-container"
    >
      {/* Golden accent glow corner lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#DFB15B]/50 z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#DFB15B]/50 z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#DFB15B]/50 z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#DFB15B]/50 z-10 pointer-events-none" />
      
      {/* Target iframe for the native ThreeJS WebGL elements */}
      <iframe 
        title="3D VISUAL AP - Golden Comet"
        srcDoc={iframeSrcDoc}
        className="w-full h-full border-none block bg-[#030303]"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
