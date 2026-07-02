import { useEffect, useRef } from 'react';

export default function Header3DLogo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const iframeSrcDoc = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>3D Logo</title>
    <style>
        body { margin: 0; overflow: hidden; background-color: transparent; }
        canvas { display: block; outline: none; }
    </style>
    <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
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
    <script type="module">
        import * as THREE from 'three';
        import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
        import { FontLoader } from 'three/addons/loaders/FontLoader.js';
        import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

        // --- 1. БАЗОВАЯ НАСТРОЙКА ---
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.set(0, 0, 35); // Adjust based on logo size

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
            
            function createWord(text, size, yPos) {
                const geometry = new TextGeometry(text, {
                    font: font,
                    size: size,
                    height: 1.0, 
                    curveSegments: 12,
                    bevelEnabled: true, 
                    bevelThickness: 0.1,
                    bevelSize: 0.05,
                    bevelOffset: 0,
                    bevelSegments: 3
                });
                
                geometry.computeBoundingBox();
                const centerOffset = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
                
                const mesh = new THREE.Mesh(geometry, goldMaterial);
                mesh.position.set(centerOffset, yPos, 0);
                return mesh;
            }

            const topText = createWord('3D VISUAL AP', 3.5, 1.5);
            logoGroup.add(topText);

            const bottomText = createWord('VO7SOT', 5.5, -5.5);
            logoGroup.add(bottomText);
        });

        // --- 4. КОМЕТА И ХВОСТ ЧАСТИЦ ---
        const cometGroup = new THREE.Group();
        cometGroup.position.z = -8; 
        scene.add(cometGroup);

        const cometHeadGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const cometHeadMat = new THREE.MeshBasicMaterial({ color: 0xffffee });
        const cometHead = new THREE.Mesh(cometHeadGeo, cometHeadMat);
        cometGroup.add(cometHead);

        const cometLight = new THREE.PointLight(0xffaa44, 100, 40);
        cometGroup.add(cometLight);

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
        let cometX = -40;
        const cometSpeed = 15;

        // Interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2);
            mouseY = (e.clientY - window.innerHeight / 2);
        });

        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;
            
            logoGroup.rotation.y += 0.05 * (targetX - logoGroup.rotation.y);
            logoGroup.rotation.x += 0.05 * (targetY - logoGroup.rotation.x);

            // Автоматическое дыхание (легкое, если мышь не двигается)
            camera.position.x = Math.sin(time * 0.3) * 1;
            camera.position.y = Math.cos(time * 0.2) * 0.5;
            camera.lookAt(scene.position);

            cometX += cometSpeed * delta;
            if (cometX > 40) cometX = -40; 

            cometGroup.position.x = cometX;
            cometGroup.position.y = Math.sin(cometX * 0.1) * 3 + 2; 

            for(let i = 0; i < 8; i++) {
                activeParticles.push({
                    x: cometGroup.position.x + (Math.random() - 0.5),
                    y: cometGroup.position.y + (Math.random() - 0.5),
                    z: cometGroup.position.z + (Math.random() - 0.5),
                    vx: -Math.random() * 0.2, 
                    vy: (Math.random() - 0.5) * 0.1, 
                    life: 1.0 
                });
            }

            let pIdx = 0;
            for(let i = activeParticles.length - 1; i >= 0; i--) {
                let p = activeParticles[i];
                p.life -= delta * 1.2; 
                
                p.x += p.vx;
                p.y += p.vy;

                if (p.life <= 0) {
                    activeParticles.splice(i, 1);
                } else {
                    if (pIdx < maxParticles) {
                        posArray[pIdx * 3] = p.x;
                        posArray[pIdx * 3 + 1] = p.y;
                        posArray[pIdx * 3 + 2] = p.z;
                        
                        colorArray[pIdx * 3] = p.life;               
                        colorArray[pIdx * 3 + 1] = p.life * 0.6;     
                        colorArray[pIdx * 3 + 2] = p.life * 0.1;     
                        
                        pIdx++;
                    }
                }
            }
            
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
      className="relative w-36 sm:w-48 h-14 sm:h-16 cursor-pointer overflow-hidden flex items-center justify-center -ml-2 sm:-ml-4"
      id="nav-logo"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <iframe 
        title="3D VISUAL AP - Gold Comet Logo"
        srcDoc={iframeSrcDoc}
        className="w-full h-full border-none pointer-events-none scale-[1.3] origin-center mix-blend-screen"
        sandbox="allow-scripts allow-same-origin"
        scrolling="no"
      />
    </div>
  );
}
