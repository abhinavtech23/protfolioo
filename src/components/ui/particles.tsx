"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticlesProps {
  color?: string;
  particleCount?: number;
  particleSize?: number;
  animate?: boolean;
  className?: string;
}

export function Particles({
  color = "#ff3366",
  particleCount = 10000,
  particleSize = 35,
  animate = true,
  className = "",
}: ParticlesProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let material: THREE.PointsMaterial;
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const init = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      camera = new THREE.PerspectiveCamera(
        55,
        width / height,
        2,
        2000
      );
      camera.position.z = 1000;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.001);

      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];

      for (let i = 0; i < particleCount; i++) {
        vertices.push(
          2000 * Math.random() - 1000,
          2000 * Math.random() - 1000,
          2000 * Math.random() - 1000
        );
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const sprite = new THREE.TextureLoader().load("data:image/png;base64,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");
      material = new THREE.PointsMaterial({
        size: particleSize,
        sizeAttenuation: true,
        map: sprite,
        alphaTest: 0.5,
        transparent: true,
      });
      material.color.setStyle(color);

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      container.appendChild(renderer.domElement);
    };

    const handleResize = () => {
      if (!camera || !renderer || !container) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.isPrimary) {
        mouseX = event.clientX - window.innerWidth / 2;
        mouseY = event.clientY - window.innerHeight / 2;
      }
    };

    const animateScene = () => {
      if (!camera || !scene || !renderer || !material) return;

      if (animate) {
        const time = Date.now() * 0.00005;
        const h = ((360 * (1.0 + time)) % 360) / 360;
        material.color.setHSL(h, 0.5, 0.5);
      }

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateScene);
    };

    init();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    animateScene();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);

      if (renderer) {
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }

      if (material) material.dispose();
    };
  }, [color, particleCount, particleSize, animate]);

  return (
    <div
      ref={mountRef}
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}

export default Particles;
