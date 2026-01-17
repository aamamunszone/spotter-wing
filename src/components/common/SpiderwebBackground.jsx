import { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

/**
 * Enhanced Spiderweb Background Effect with Fireworks Animation
 * Creates an interactive particle network with explosion effects on mouse interaction
 * Adapts to light/dark theme automatically with high performance
 */
const SpiderwebBackground = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const explosionParticlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size with device pixel ratio for crisp rendering
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    // Particle configuration - adaptive based on screen size
    const config = {
      particleCount: Math.min(100, Math.floor((width * height) / 12000)),
      particleSpeed: 0.4,
      lineDistance: 160,
      mouseDistance: 200,
      explosionDistance: 80, // Distance to trigger explosion
      explosionParticleCount: 8, // Particles per explosion
    };

    // Theme-based colors (enhanced visibility)
    const getColors = () => {
      if (theme.palette.mode === 'light') {
        return {
          particle: 'rgba(0, 0, 0, 0.15)',
          line: 'rgba(0, 0, 0, 0.1)',
          mouseParticle: 'rgba(37, 99, 235, 0.25)',
          mouseLine: 'rgba(37, 99, 235, 0.15)',
          explosion: 'rgba(0, 0, 0, 0.3)',
        };
      } else {
        return {
          particle: 'rgba(255, 255, 255, 0.15)',
          line: 'rgba(255, 255, 255, 0.1)',
          mouseParticle: 'rgba(59, 130, 246, 0.3)',
          mouseLine: 'rgba(59, 130, 246, 0.2)',
          explosion: 'rgba(255, 255, 255, 0.4)',
        };
      }
    };

    // Main Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.particleSpeed;
        this.vy = (Math.random() - 0.5) * config.particleSpeed;
        this.radius = Math.random() * 2 + 1;
        this.hasExploded = false;
        this.explosionCooldown = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Keep within bounds
        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));

        // Decrease explosion cooldown
        if (this.explosionCooldown > 0) {
          this.explosionCooldown--;
        }
      }

      draw(colors) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
      }

      // Check if mouse is near and trigger explosion
      checkMouseProximity(mouseX, mouseY, colors) {
        if (mouseX === null || mouseY === null || this.explosionCooldown > 0) {
          return;
        }

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.explosionDistance) {
          this.createExplosion(colors);
          this.explosionCooldown = 60; // Cooldown frames
        }
      }

      createExplosion(colors) {
        for (let i = 0; i < config.explosionParticleCount; i++) {
          const angle = (Math.PI * 2 * i) / config.explosionParticleCount;
          const speed = Math.random() * 2 + 1;
          explosionParticlesRef.current.push(
            new ExplosionParticle(this.x, this.y, angle, speed, colors),
          );
        }
      }
    }

    // Explosion Particle class (fireworks effect)
    class ExplosionParticle {
      constructor(x, y, angle, speed, colors) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = Math.random() * 1.5 + 0.5;
        this.life = 1.0; // Opacity from 1 to 0
        this.decay = 0.02 + Math.random() * 0.02;
        this.color = colors.explosion;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95; // Friction
        this.vy *= 0.95;
        this.life -= this.decay;
      }

      draw() {
        if (this.life <= 0) return;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/, `${this.life * 0.4})`);
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/, `${this.life * 0.15})`);
        ctx.fill();
      }

      isDead() {
        return this.life <= 0;
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < config.particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Draw lines between particles (optimized)
    const drawLines = (colors) => {
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.lineDistance) {
            const opacity = 1 - distance / config.lineDistance;
            ctx.beginPath();
            ctx.strokeStyle = colors.line.replace(
              /[\d.]+\)$/,
              `${opacity * 0.1})`,
            );
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Draw lines to mouse with enhanced effect
    const drawMouseLines = (colors) => {
      if (mouseRef.current.x === null || mouseRef.current.y === null) return;

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const dx = particles[i].x - mouseRef.current.x;
        const dy = particles[i].y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseDistance) {
          const opacity = 1 - distance / config.mouseDistance;
          ctx.beginPath();
          ctx.strokeStyle = colors.mouseLine.replace(
            /[\d.]+\)$/,
            `${opacity * 0.2})`,
          );
          ctx.lineWidth = 1.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();

          // Subtle attraction to mouse
          const force = (1 - distance / config.mouseDistance) * 0.05;
          particles[i].vx -= (dx / distance) * force;
          particles[i].vy -= (dy / distance) * force;
        }
      }

      // Draw mouse particle with glow
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = colors.mouseParticle;
      ctx.fill();

      // Glow effect
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = colors.mouseParticle.replace(/[\d.]+\)$/, '0.1)');
      ctx.fill();
    };

    // Update and draw explosion particles
    const updateExplosions = () => {
      explosionParticlesRef.current = explosionParticlesRef.current.filter(
        (particle) => {
          particle.update();
          particle.draw();
          return !particle.isDead();
        },
      );
    };

    // Animation loop with FPS throttling
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);

        const colors = getColors();

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particlesRef.current.forEach((particle) => {
          particle.update();
          particle.draw(colors);
          particle.checkMouseProximity(
            mouseRef.current.x,
            mouseRef.current.y,
            colors,
          );
        });

        // Draw connections
        drawLines(colors);
        drawMouseLines(colors);

        // Update and draw explosions
        updateExplosions();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler with throttling
    let mouseMoveTimeout;
    const handleMouseMove = (e) => {
      if (mouseMoveTimeout) return;

      mouseMoveTimeout = setTimeout(() => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
        mouseMoveTimeout = null;
      }, 16); // ~60fps
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    // Resize handler with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        initParticles();
      }, 250);
    };

    // Event listeners with passive flag for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Initialize and start animation
    initParticles();
    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout);
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, [theme.palette.mode]); // Re-initialize when theme changes

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default SpiderwebBackground;
