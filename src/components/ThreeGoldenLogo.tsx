import { useState, useEffect } from 'react';

export default function ThreeGoldenLogo() {
  const threeJsHtml = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <title>VO7SOT 3D Letters & Fireworks</title>
        <style>
            body {
                margin: 0;
                overflow: hidden;
                background-color: #000;
                font-family: sans-serif;
                user-select: none;
                -webkit-user-select: none;
            }
            canvas {
                display: block;
            }
            #ui {
                position: absolute;
                bottom: 20px;
                width: 100%;
                text-align: center;
                color: rgba(255, 255, 255, 0.7);
                font-size: 14px;
                pointer-events: none;
                letter-spacing: 1px;
                text-transform: uppercase;
            }
            #loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #ffd700;
                font-size: 20px;
                font-weight: bold;
                pointer-events: none;
                transition: opacity 0.5s;
            }
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
        <div id="loading">Идет загрузка 3D-шрифта...</div>
        <div id="ui">Крути сцену • Кликай по буквам для салюта</div>

        <script type="module">
            import * as THREE from 'three';
            import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
            import { FontLoader } from 'three/addons/loaders/FontLoader.js';
            import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

            // --- 1. СЦЕНА И КАМЕРА ---
            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x000000, 0.005);

            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 35;

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            document.body.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;

            // --- 2. СВЕТ ДЛЯ ЗОЛОТА ---
            const ambientLight = new THREE.AmbientLight(0x444444);
            scene.add(ambientLight);

            const dirLight1 = new THREE.DirectionalLight(0xffffff, 3); 
            dirLight1.position.set(20, 20, 20);
            scene.add(dirLight1);

            const dirLight2 = new THREE.DirectionalLight(0xffaa44, 2); 
            dirLight2.position.set(-20, -20, 10);
            scene.add(dirLight2);

            // --- 3. ГЕНЕРАЦИЯ ТЕКСТУРЫ ИСКРЫ ---
            function createSparkTexture() {
                const canvas = document.createElement('canvas');
                canvas.width = 16; canvas.height = 16;
                const ctx = canvas.getContext('2d');
                const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
                grad.addColorStop(0, 'rgba(255,255,255,1)');
                grad.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = grad; ctx.fillRect(0, 0, 16, 16);
                return new THREE.CanvasTexture(canvas);
            }
            const sparkTexture = createSparkTexture();

            // --- 4. ЗВЕЗДНЫЙ ФОН ---
            const starsCount = 2000;
            const starsGeometry = new THREE.BufferGeometry();
            const starsPositions = new Float32Array(starsCount * 3);
            for(let i = 0; i < starsCount * 3; i += 3) {
                starsPositions[i] = (Math.random() - 0.5) * 200;
                starsPositions[i+1] = (Math.random() - 0.5) * 200;
                starsPositions[i+2] = (Math.random() - 0.5) * 400;
            }
            starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
            const starsMaterial = new THREE.PointsMaterial({
                color: 0xffffff, size: 0.6, map: sparkTexture,
                transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
            });
            const starField = new THREE.Points(starsGeometry, starsMaterial);
            scene.add(starField);

            // --- 5. ОБЪЕМНЫЕ БУКВЫ VO7SOT ---
            let logoMesh;
            const loader = new FontLoader();
            
            // Загружаем шрифт из интернета
            loader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', function (font) {
                const textGeometry = new TextGeometry('VO7SOT', {
                    font: font,
                    size: 7,
                    height: 2.5, // Толщина букв
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.3,
                    bevelSize: 0.2,
                    bevelOffset: 0,
                    bevelSegments: 5
                });
                textGeometry.center(); // Центрируем

                // Настройка золота
                const goldMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffd700,      
                    metalness: 0.9,      
                    roughness: 0.2,      
                });

                logoMesh = new THREE.Mesh(textGeometry, goldMaterial);
                scene.add(logoMesh);

                document.getElementById('loading').style.opacity = 0; // Прячем загрузку
            });

            // --- 6. ЛОГИКА САЛЮТОВ ---
            const activeFireworks = [];

            function createFirework(position) {
                const particleCount = 150;
                const geometry = new THREE.BufferGeometry();
                const positions = new Float32Array(particleCount * 3);
                const velocities = new Float32Array(particleCount * 3);
                const colors = new Float32Array(particleCount * 3);

                // Случайный цвет взрыва (сочные цвета)
                const baseColor = new THREE.Color().setHSL(Math.random(), 1.0, 0.6);

                for (let i = 0; i < particleCount * 3; i += 3) {
                    // Стартуем из точки клика
                    positions[i] = position.x;
                    positions[i + 1] = position.y;
                    positions[i + 2] = position.z;

                    // Вектор разлета (сфера)
                    const u = Math.random();
                    const v = Math.random();
                    const theta = u * 2.0 * Math.PI;
                    const phi = Math.acos(2.0 * v - 1.0);
                    const speed = Math.random() * 15 + 5; 

                    velocities[i] = Math.sin(phi) * Math.cos(theta) * speed;
                    velocities[i + 1] = Math.sin(phi) * Math.sin(theta) * speed;
                    velocities[i + 2] = Math.cos(phi) * speed;

                    // Немного разбавляем цвета искр
                    const sparkColor = baseColor.clone().offsetHSL(0, 0, (Math.random() - 0.5) * 0.2);
                    colors[i] = sparkColor.r;
                    colors[i + 1] = sparkColor.g;
                    colors[i + 2] = sparkColor.b;
                }

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

                const material = new THREE.PointsMaterial({
                    size: 0.8, map: sparkTexture,
                    transparent: true, blending: THREE.AdditiveBlending,
                    vertexColors: true, depthWrite: false
                });

                const firework = new THREE.Points(geometry, material);
                firework.userData = { life: 1.5 }; // Живет 1.5 секунды
                scene.add(firework);
                activeFireworks.push(firework);
            }

            // --- 7. КЛИКИ ПО БУКВАМ ---
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();

            function checkIntersection(clientX, clientY) {
                mouse.x = (clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                if (logoMesh) {
                    const intersects = raycaster.intersectObject(logoMesh);
                    if (intersects.length > 0) {
                        createFirework(intersects[0].point); // Салют из точки попадания
                    }
                }
            }

            // Обработка мыши
            window.addEventListener('pointerdown', (e) => {
                if (e.isPrimary) checkIntersection(e.clientX, e.clientY);
            });

            // --- 8. АНИМАЦИЯ ---
            const clock = new THREE.Clock();

            function animate() {
                requestAnimationFrame(animate);
                const delta = clock.getDelta();
                controls.update();

                // Движение звезд
                const starPos = starField.geometry.attributes.position.array;
                for (let i = 2; i < starPos.length; i += 3) {
                    starPos[i] += 40 * delta; 
                    if (starPos[i] > 40) starPos[i] = -350;
                }
                starField.geometry.attributes.position.needsUpdate = true;

                // Легкое покачивание букв
                if (logoMesh && controls.state === -1) {
                    logoMesh.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
                    logoMesh.rotation.x = Math.cos(clock.getElapsedTime() * 0.3) * 0.05;
                }

                // Обновление салютов
                for (let i = activeFireworks.length - 1; i >= 0; i--) {
                    const fw = activeFireworks[i];
                    fw.userData.life -= delta;

                    if (fw.userData.life <= 0) {
                        scene.remove(fw);
                        fw.geometry.dispose();
                        fw.material.dispose();
                        activeFireworks.splice(i, 1);
                        continue;
                    }

                    const positions = fw.geometry.attributes.position.array;
                    const velocities = fw.geometry.attributes.velocity.array;

                    for (let j = 0; j < positions.length; j++) {
                        positions[j] += velocities[j] * delta;
                        velocities[j] *= 0.95; // Сопротивление воздуха (искры тормозят)
                    }
                    fw.geometry.attributes.position.needsUpdate = true;
                    fw.material.opacity = fw.userData.life / 1.5; // Затухание
                }

                renderer.render(scene, camera);
            }
            animate();

            // Ресайз
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        </script>
    </body>
    </html>
  `;

  return (
    <div 
      className="w-full max-w-[960px] h-[160px] sm:h-[243px] border border-[#DFB15B]/20 bg-black/80 relative overflow-hidden rounded shadow-[0_0_20px_rgba(0,0,0,0.9)] mt-6 group/logo mx-auto"
      id="threejs-logo-container"
    >
      {/* Golden accent glow corner lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#DFB15B]/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#DFB15B]/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#DFB15B]/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#DFB15B]/50" />
      
      {/* Interactive indicator hint */}
      <div className="absolute bottom-1.5 right-2.5 text-[8.5px] font-mono tracking-widest text-[#DFB15B]/30 group-hover/logo:text-[#DFB15B]/70 transition-all pointer-events-none select-none uppercase">
        3D • ROTATE
      </div>
      
      <iframe
        srcDoc={threeJsHtml}
        className="w-full h-full border-none block"
        title="VO7SOT 3D Golden Logo Space"
        scrolling="no"
        id="threejs-golden-logo-iframe"
      />
    </div>
  );
}
