'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TuTienBackgroundProps {
  density?: number;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
}

export default function TuTienBackground({
  density = 50,
  interactive = true,
}: TuTienBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1, // Slight upward drift
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, [density]);

  // Draw particle
  const drawParticle = useCallback(
    (ctx: CanvasRenderingContext2D, particle: Particle, time: number) => {
      const pulse = Math.sin(time * 2 + particle.phase) * 0.3 + 0.7;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity * pulse})`;
      ctx.fill();
    },
    []
  );

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const time = Date.now() / 1000;

    // Clear with slight fade for trail effect
    ctx.fillStyle = 'rgba(26, 21, 16, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Mouse interaction
      if (interactive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          particle.vx -= dx * 0.0001;
          particle.vy -= dy * 0.0001;
        }
      }

      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Draw
      drawParticle(ctx, particle, time);
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [interactive, drawParticle]);

  // Handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  // Handle mouse move
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Start animation
  useEffect(() => {
    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Mist/fog overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(45, 36, 24, 0.5) 0%, transparent 70%)',
        }}
      />
      
      {/* Mountain silhouette */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 opacity-10"
        style={{
          background: 'linear-gradient(to top, #1a1510 0%, transparent 100%)',
        }}
      />
      
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        aria-hidden="true"
      />
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(26, 21, 16, 0.8) 100%)',
        }}
      />
    </motion.div>
  );
}
