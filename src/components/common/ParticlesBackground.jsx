import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let matrixColumns = [];
    let mouse = { x: -1000, y: -1000, radius: 180 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initMatrix();
      initParticles();
    };

    // Track mouse
    const handleMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Tech symbols to float around
    const techSymbols = [
      '</>', '/>', '{code}', '=>', '[]', '++', '&&', '||', '!=', '===',
      'async', 'await', 'fn()', 'API', '0101', '1010', 'React', 'Node',
      'const', 'import', 'CodeVia', 'Cloud', 'AI/ML', 'v1.0'
    ];

    // Binary matrix rain setup
    const initMatrix = () => {
      const columns = Math.floor(canvas.width / 26);
      matrixColumns = [];
      for (let i = 0; i < columns; i++) {
        matrixColumns.push({
          x: i * 26 + 13,
          y: Math.random() * -canvas.height,
          speed: Math.random() * 1.5 + 1,
          chars: ['0', '1', '0', '1', '<', '>', '/', '{', '}']
        });
      }
    };

    class TechParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
        this.size = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 0.9;
        this.speedY = (Math.random() - 1.2) * 0.7 - 0.3; // Moves upward
        this.opacity = Math.random() * 0.6 + 0.3;
        
        // 50% tech symbols, 50% glowing network nodes
        this.isSymbol = Math.random() > 0.5;
        this.symbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        
        const colors = ['#0066FF', '#00B4D8', '#3B82F6', '#0EA5E9', '#6366F1'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulseSpeed = Math.random() * 0.04 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.fontScale = Math.random() * 6 + 12; // 12px to 18px
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += this.pulseSpeed;
        
        // Mouse push interaction
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 3;
          this.y += Math.sin(angle) * force * 3;
        }

        // Screen boundary wrap
        if (this.y < -30 || this.x < -40 || this.x > canvas.width + 40) {
          this.reset(false);
        }
      }

      draw() {
        const currentOpacity = Math.min(1, Math.max(0.15, this.opacity + Math.sin(this.pulsePhase) * 0.25));
        ctx.globalAlpha = currentOpacity;

        if (this.isSymbol) {
          ctx.font = `600 ${this.fontScale}px 'Space Grotesk', monospace`;
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 8;
          ctx.fillText(this.symbol, this.x, this.y);
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        ctx.globalAlpha = 1;
      }
    }

    const initParticles = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 130);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new TechParticle());
      }
    };

    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw subtle binary matrix stream in background
      ctx.font = `12px monospace`;
      matrixColumns.forEach(col => {
        col.y += col.speed;
        if (col.y > canvas.height + 40) {
          col.y = -40;
        }
        const char = col.chars[Math.floor((col.y / 20) % col.chars.length)] || '1';
        ctx.fillStyle = 'rgba(0, 180, 216, 0.18)';
        ctx.fillText(char, col.x, col.y);
      });

      // 2. Draw laser connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = 0.25 * (1 - dist / 140);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 102, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 3. Update & render particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // 4. Interactive mouse glow spotlight ring
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        gradient.addColorStop(0, 'rgba(0, 180, 216, 0.15)');
        gradient.addColorStop(0.7, 'rgba(0, 102, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
    />
  );
};

export default ParticlesBackground;
