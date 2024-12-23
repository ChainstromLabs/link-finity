import React, { useEffect } from 'react';

const Particle: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('cosmosCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    // Type guard to ensure ctx is not null
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    // You can assert `ctx` is non-null after the check
    // Now TypeScript knows `ctx` is not null
    const canvasContext = ctx as CanvasRenderingContext2D;

    // Resize function
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      radius: number;
      speed: number;
      angle: number;

      constructor(x: number, y: number, radius: number, speed: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.angle = Math.PI - this.angle;
        if (this.y < 0 || this.y > canvas.height) this.angle = -this.angle;
      }

      draw() {
        // Safely use `canvasContext`, which we are sure is not null
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        canvasContext.fillStyle = 'rgba(255, 255, 255, 0.8)';
        canvasContext.fill();
      }
    }

    const particles: Particle[] = [];
    const numParticles = 250;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 4 + 1,
          Math.random() * 0.5 + 0.2
        )
      );
    }

    // Connect particles
    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dist = Math.hypot(
            particles[a].x - particles[b].x,
            particles[a].y - particles[b].y
          );

          if (dist < 120) {
            canvasContext.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 120})`;
            canvasContext.lineWidth = 0.7;
            canvasContext.beginPath();
            canvasContext.moveTo(particles[a].x, particles[a].y);
            canvasContext.lineTo(particles[b].x, particles[b].y);
            canvasContext.stroke();
          }
        }
      }
    }

    // Animation Loop
    function animate() {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    }

    // Start Animation
    animate();

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas id="cosmosCanvas" style={{ position: 'absolute', top: 0, left: 0 }}></canvas>;
};

export default Particle;
