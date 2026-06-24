import { useState, useEffect } from 'react';

export default function ThreeGoldenLogo() {
  const threeJsHtml = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VO7SOT 3D Golden Logo Space</title>
        <style>
            body {
                margin: 0;
                overflow: hidden;
                background-color: #000;
                font-family: monospace;
            }
            canvas {
                display: block;
                width: 100% !important;
                height: 100% !important;
            }
            #loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #DFB15B;
                font-size: 8px;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                pointer-events: none;
                transition: opacity 0.5s;
                text-align: center;
                white-space: nowrap;
                text-shadow: 0 0 10px rgba(223, 177, 91, 0.5);
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
        <div id="loading">ЗАГРУЗКА ЛОГОТИПА...</div>

        <script type="module">
            import * as THREE from 'three';
            import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
            import { FontLoader } from 'three/addons/loaders/FontLoader.js';
            import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x000000, 0.005);

            const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 21; // Adjusted closer so it fills the small logo box beautifully

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            document.body.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.enableZoom = false; // Disable zooming so it stays focused as a UI logo

            // --- ОСВЕЩЕНИЕ ---
            const ambientLight = new THREE.AmbientLight(0x555555);
            scene.add(ambientLight);

            const dirLight1 = new THREE.DirectionalLight(0xffffff, 4); 
            dirLight1.position.set(20, 20, 20);
            scene.add(dirLight1);

            const dirLight2 = new THREE.DirectionalLight(0xffaa44, 3); 
            dirLight2.position.set(-20, -20, 10);
            scene.add(dirLight2);

            // --- ЗВЕЗДЫ ---
            const starsCount = 1500; // Adjusted for smaller canvas performance
            const starsGeometry = new THREE.BufferGeometry();
            const starsPositions = new Float32Array(starsCount * 3);

            for(let i = 0; i < starsCount * 3; i += 3) {
                starsPositions[i] = (Math.random() - 0.5) * 150;
                starsPositions[i+1] = (Math.random() - 0.5) * 150;
                starsPositions[i+2] = (Math.random() - 0.5) * 300;
            }

            starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

            const pCanvas = document.createElement('canvas');
            pCanvas.width = 16;
            pCanvas.height = 16;
            const pCtx = pCanvas.getContext('2d');
            const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
            grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            pCtx.fillStyle = grad;
            pCtx.fillRect(0, 0, 16, 16);
            const starTexture = new THREE.CanvasTexture(pCanvas);

            const starsMaterial = new THREE.PointsMaterial({
                color: 0xffe0a0, // Warm starry glow matching gold
                size: 0.5,
                map: starTexture,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            const starField = new THREE.Points(starsGeometry, starsMaterial);
            scene.add(starField);

            // --- ЛОГОТИП VO7SOT ---
            let logoMesh;
            const loader = new FontLoader();
            
            loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
                
                const textGeometry = new TextGeometry('VO7SOT', {
                    font: font,
                    size: 4.8, // Slightly adjusted for perfect proportions
                    height: 1.6,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0.25,
                    bevelSize: 0.15,
                    bevelOffset: 0,
                    bevelSegments: 5
                });

                textGeometry.center();

                const goldMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffd700,
                    metalness: 0.95,
                    roughness: 0.15,
                    clearcoat: 1.0,
                    clearcoatRoughness: 0.1
                });

                logoMesh = new THREE.Mesh(textGeometry, goldMaterial);
                scene.add(logoMesh);

                const loaderEl = document.getElementById('loading');
                if (loaderEl) {
                  loaderEl.style.opacity = 0;
                  setTimeout(() => loaderEl.remove(), 500);
                }
            });

            // --- АНИМАЦИЯ ---
            const clock = new THREE.Clock();

            function animate() {
                requestAnimationFrame(animate);

                const delta = clock.getDelta();
                controls.update();

                // Stars flying
                const positions = starField.geometry.attributes.position.array;
                for (let i = 2; i < positions.length; i += 3) {
                    positions[i] += 40 * delta;
                    if (positions[i] > 30) {
                        positions[i] = -250;
                    }
                }
                starField.geometry.attributes.position.needsUpdate = true;

                // Continuous default rotation
                if (logoMesh) {
                    // Slow oscillation when user isn't dragging
                    const time = clock.getElapsedTime();
                    logoMesh.rotation.y = Math.sin(time * 0.4) * 0.25;
                    logoMesh.rotation.x = Math.cos(time * 0.25) * 0.08;
                }

                renderer.render(scene, camera);
            }

            animate();

            window.addEventListener('resize', onWindowResize, false);

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        </script>
    </body>
    </html>
  `;

  return (
    <div 
      className="border border-[#DFB15B]/20 bg-black/80 relative overflow-hidden rounded shadow-[0_0_20px_rgba(0,0,0,0.9)] mt-1.5 group/logo"
      id="threejs-logo-container"
      style={{ width: '188px', height: '95px' }}
    >
      {/* Golden accent glow corner lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#DFB15B]/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#DFB15B]/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#DFB15B]/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#DFB15B]/50" />
      
      {/* Interactive indicator hint */}
      <div className="absolute bottom-1 right-2 text-[7px] font-mono tracking-widest text-[#DFB15B]/30 group-hover/logo:text-[#DFB15B]/70 transition-all pointer-events-none select-none uppercase">
        3D • ROTATE
      </div>
      
      <iframe
        srcDoc={threeJsHtml}
        className="border-none block"
        style={{ width: '188px', height: '95px' }}
        title="VO7SOT 3D Golden Logo Space"
        scrolling="no"
        id="threejs-golden-logo-iframe"
      />
    </div>
  );
}
