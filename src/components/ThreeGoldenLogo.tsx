export default function ThreeGoldenLogo() {
  const iframeSrcDoc = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>VO7SOT Space Flight & Fireworks</title>
    <style>
        body { margin: 0; overflow: hidden; background-color: #000; font-family: sans-serif; user-select: none; -webkit-user-select: none; }
        canvas { display: block; width: 100vw; height: 100vh; }
        #ui {
            position: absolute; bottom: 20px; width: 100%; text-align: center;
            color: rgba(255, 255, 255, 0.5); font-size: 11px; pointer-events: none;
            letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 2px 4px rgba(0,0,0,0.8);
            font-family: monospace;
        }
        #loading {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            color: #ffd700; font-size: 15px; font-weight: bold; pointer-events: none; transition: opacity 0.5s;
            font-family: monospace; letter-spacing: 2px;
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
    <div id="loading">ЗАПУСК ДВИГАТЕЛЕЙ...</div>
    <div id="ui">КРУТИ СЦЕНУ • КЛИКАЙ ПО ПЛАНЕТАМ ДЛЯ САЛЮТА</div>

    <script type="module">
        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { FontLoader } from 'three/addons/loaders/FontLoader.js';
        import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.003);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 40;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.body.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        const ambientLight = new THREE.AmbientLight(0x555555);
        scene.add(ambientLight);
        const dirLight1 = new THREE.DirectionalLight(0xffffff, 3.5);
        dirLight1.position.set(25, 30, 25);
        scene.add(dirLight1);
        const dirLight2 = new THREE.DirectionalLight(0xffdd88, 2.8);
        dirLight2.position.set(-20, -15, 20);
        scene.add(dirLight2);

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

        // === ЕЩЁ БОЛЕЕ РЕЛЬЕФНЫЕ МАТЕРИКИ ===
        function createProceduralPlanetTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            // Глубокие океаны
            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Крупные континенты
            ctx.fillStyle = '#e0e0e0';
            ctx.filter = 'blur(3px)';
            for (let i = 0; i < 520; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const equatorDist = Math.abs(y - canvas.height / 2) / (canvas.height / 2);
                const size = Math.random() * 72 + 18;

                if (Math.random() > equatorDist * 1.05) {
                    ctx.beginPath();
                    ctx.ellipse(x, y, size, size * (0.55 + Math.random() * 0.7), Math.random() * Math.PI * 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Средний рельеф
            ctx.filter = 'blur(1.5px)';
            for (let i = 0; i < 1100; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const r = Math.random() * 28 + 6;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }

            // Горные хребты и острова (очень резкие)
            ctx.filter = 'none';
            ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 2800; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 8.5 + 2;
                ctx.fillRect(x - size/2, y - size/2, size, size);
            }

            // Дополнительные острые пики
            for (let i = 0; i < 800; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                ctx.fillRect(x, y, 3, 3);
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            return texture;
        }

        const planetBumpTexture = createProceduralPlanetTexture();

        const planetMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.96,
            roughness: 0.28,
            bumpMap: planetBumpTexture,
            bumpScale: 1.15,           // ← Сильно увеличено
            envMapIntensity: 1.15
        });

        const goldTextMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.95,
            roughness: 0.15
        });

        let logoGroup = new THREE.Group();
        scene.add(logoGroup);
        let totalLogoWidth = 0;

        const loader = new FontLoader();
        loader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', function (font) {
            const textString = "VO7SOT";
            let currentX = 0;
            const letterSpacing = 0.8;

            for (let i = 0; i < textString.length; i++) {
                const char = textString[i];
                let mesh;
                let itemWidth = 0;

                if (char === 'O') {
                    const radius = 3.6;
                    const sphereGeo = new THREE.SphereGeometry(radius, 64, 64);
                    mesh = new THREE.Mesh(sphereGeo, planetMaterial);
                    mesh.position.set(currentX + radius, radius, 1.25);
                    mesh.userData.isPlanet = true;
                    mesh.userData.rotationSpeed = 0.28 + Math.random() * 0.22; // в 3+ раза быстрее
                    itemWidth = radius * 2;
                } else {
                    const textGeo = new TextGeometry(char, {
                        font: font, size: 7, height: 2.5,
                        curveSegments: 12,
                        bevelEnabled: true,
                        bevelThickness: 0.3, bevelSize: 0.2, bevelSegments: 5
                    });
                    textGeo.computeBoundingBox();
                    itemWidth = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
                    mesh = new THREE.Mesh(textGeo, goldTextMaterial);
                    mesh.position.set(currentX, 0, 0);
                }

                logoGroup.add(mesh);
                currentX += itemWidth + letterSpacing;
            }

            totalLogoWidth = currentX - letterSpacing;
            logoGroup.position.x = -totalLogoWidth / 2;
            logoGroup.position.y = -3.5;
            document.getElementById('loading').style.opacity = 0;
        });

        // Звёзды и салюты
        const starsCount = 4000;
        const starsGeometry = new THREE.BufferGeometry();
        const starsPositions = new Float32Array(starsCount * 3);
        const tunnelDepth = 1000;

        for (let i = 0; i < starsCount * 3; i += 3) {
            starsPositions[i]   = (Math.random() - 0.5) * 400;
            starsPositions[i+1] = (Math.random() - 0.5) * 400;
            starsPositions[i+2] = (Math.random() - 0.5) * tunnelDepth;
        }
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff, size: 1.2, map: sparkTexture,
            transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
        });

        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        const activeFireworks = [];
        function createFirework(position) {
            const particleCount = 150;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const velocities = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            const baseColor = new THREE.Color().setHSL(Math.random(), 1.0, 0.65);

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = position.x; positions[i+1] = position.y; positions[i+2] = position.z;

                const u = Math.random(), v = Math.random();
                const theta = u * 2 * Math.PI;
                const phi = Math.acos(2 * v - 1);
                const speed = Math.random() * 15 + 5;

                velocities[i]   = Math.sin(phi) * Math.cos(theta) * speed;
                velocities[i+1] = Math.sin(phi) * Math.sin(theta) * speed;
                velocities[i+2] = Math.cos(phi) * speed;

                const sparkColor = baseColor.clone().offsetHSL(0, 0, (Math.random() - 0.5) * 0.25);
                colors[i] = sparkColor.r; colors[i+1] = sparkColor.g; colors[i+2] = sparkColor.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.8, map: sparkTexture, transparent: true,
                blending: THREE.AdditiveBlending, vertexColors: true, depthWrite: false
            });

            const firework = new THREE.Points(geometry, material);
            firework.userData = { life: 1.5 };
            scene.add(firework);
            activeFireworks.push(firework);
        }

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        window.addEventListener('pointerdown', (e) => {
            if (!e.isPrimary) return;
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(logoGroup, true);
            if (intersects.length > 0) createFirework(intersects[0].point);
        });

        const clock = new THREE.Clock();
        const starFlightSpeed = 200;

        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();
            controls.update();

            const starPos = starField.geometry.attributes.position.array;
            for (let i = 2; i < starPos.length; i += 3) {
                starPos[i] += starFlightSpeed * delta;
                if (starPos[i] > 50) starPos[i] -= tunnelDepth;
            }
            starField.geometry.attributes.position.needsUpdate = true;

            if (logoGroup.children.length > 0) {
                logoGroup.children.forEach(child => {
                    if (child.userData.isPlanet) {
                        child.rotation.y += child.userData.rotationSpeed * delta; // теперь в 3 раза быстрее
                    }
                });

                logoGroup.position.y = Math.sin(time * 2.5) * 0.6 - 3.5;
                logoGroup.position.x = Math.cos(time * 1.5) * 0.4 - totalLogoWidth / 2;

                logoGroup.rotation.z = Math.sin(time * 2) * 0.05;
                logoGroup.rotation.x = Math.sin(time * 1.5) * 0.08;
                logoGroup.rotation.y = Math.cos(time * 1.2) * 0.05;
            }

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
                for (let j = 0; j < positions.length; j += 3) {
                    positions[j]   += velocities[j]   * delta;
                    positions[j+1] += velocities[j+1] * delta;
                    positions[j+2] += velocities[j+2] * delta;

                    velocities[j] *= 0.95; velocities[j+1] *= 0.95; velocities[j+2] *= 0.95;
                    positions[j+2] += (starFlightSpeed * 0.2) * delta;
                }
                fw.geometry.attributes.position.needsUpdate = true;
                fw.material.opacity = fw.userData.life / 1.5;
            }

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>`;

  return (
    <div 
      className="relative w-full max-w-[960px] h-[300px] sm:h-[420px] rounded mt-6 border border-[#DFB15B]/20 bg-black overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.9)] group/logo mx-auto transition-all duration-500 ease-in-out"
      id="threejs-logo-container"
    >
      {/* Golden accent glow corner lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#DFB15B]/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#DFB15B]/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#DFB15B]/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#DFB15B]/50" />
      
      {/* Interactive indicator hint */}
      <div className="absolute bottom-1.5 left-2.5 text-[8.5px] font-mono tracking-widest text-[#DFB15B]/30 group-hover/logo:text-[#DFB15B]/70 transition-all pointer-events-none select-none uppercase">
        3D • FLIGHT • FIREWORKS • drag to rotate
      </div>
      
      {/* Target iframe for the native ThreeJS WebGL elements */}
      <iframe 
        title="ThreeJS Space Flight"
        srcDoc={iframeSrcDoc}
        className="w-full h-full border-0 block"
        allow="fullscreen"
      />
    </div>
  );
}
