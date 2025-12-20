
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BackgroundCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Sharp Starfield
    const starCount = 3000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 5000;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 5000;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 5000;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 3D Perspective Grid
    const gridHelper = new THREE.GridHelper(5000, 40, 0xF97316, 0x1e293b);
    gridHelper.position.y = -800;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.15;
    scene.add(gridHelper);

    // Sharp Speed Lines
    const lineCount = 80;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineCount * 6);
    for (let i = 0; i < lineCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 1000;
      const z = (Math.random() - 0.5) * 2000;
      linePositions[i * 6] = x;
      linePositions[i * 6 + 1] = y;
      linePositions[i * 6 + 2] = z;
      linePositions[i * 6 + 3] = x;
      linePositions[i * 6 + 4] = y + 400;
      linePositions[i * 6 + 5] = z;
    }
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xF97316, transparent: true, opacity: 0 });
    const speedLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(speedLines);

    // Tech Sphere (Planet)
    const planetGroup = new THREE.Group();
    const planetGeometry = new THREE.SphereGeometry(600, 40, 40);
    const planetMaterial = new THREE.MeshPhongMaterial({
      color: 0x020617,
      emissive: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planetGroup.add(planet);

    const coreGeometry = new THREE.SphereGeometry(580, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x010409 });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    planetGroup.add(core);

    planetGroup.position.y = -1400;
    scene.add(planetGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xFBBF24, 1.5);
    pointLight.position.set(1000, 1000, 1000);
    scene.add(pointLight);

    camera.position.z = 1200;

    const animate = () => {
      requestAnimationFrame(animate);
      const scrollY = window.scrollY;

      stars.rotation.y += 0.0003;
      planetGroup.rotation.y += 0.001;
      gridHelper.rotation.y += 0.0005;

      // Interaction
      if (scrollY < 2000) {
        speedLines.material.opacity = Math.min(scrollY / 1000, 0.4);
        speedLines.position.y = -(scrollY % 1000);
      } else {
        speedLines.material.opacity = 0;
      }

      camera.position.z = 1200 - scrollY * 0.5;
      planetGroup.position.y = -1400 + scrollY * 0.9;
      gridHelper.position.y = -800 + scrollY * 0.3;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-[-1]" />;
};

export default BackgroundCanvas;
