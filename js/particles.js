



const particleColors = [
    'rgba(255, 255, 255, 0.7)',   
    'rgba(255, 255, 255, 0.5)',   
    'rgba(255, 255, 255, 0.3)',   
    'rgba(255, 255, 255, 0.8)'    
];

class ParticleBackground {
    constructor(options = {}) {
        
        this.reducedMotion = AnimationConfig.accessibility.prefersReducedMotion();
        
        
        this.options = {
            container: document.body,
            particleCount: AnimationConfig.device.isMobile() ? 30 : 60,
            
            particleSize: [1, 3],
            particleOpacity: this.reducedMotion ? 0.4 : 0.6, 
            particleSpeed: this.reducedMotion ? 0.5 : 1,
            interactive: !this.reducedMotion,
            ...options
        };

        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.width = 0;
        this.height = 0;
        this.dpr = window.devicePixelRatio || 1;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isActive = true;
        
        
        this.init();
        
        
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
            this.reducedMotion = AnimationConfig.accessibility.prefersReducedMotion();
            this.updateSettings();
        });
    }

    init() {
        
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        this.ctx = this.canvas.getContext('2d');
        
        
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        
        this.canvas.setAttribute('aria-hidden', 'true');
        this.canvas.setAttribute('role', 'presentation');
        
        
        this.options.container.appendChild(this.canvas);
        
        
        this.resize();
        
        
        this.createParticles();
        
        
        if (this.options.interactive) {
            window.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
            window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        }
        
        window.addEventListener('resize', this.debounce(this.resize.bind(this), 200), { passive: true });
        
        
        this.animate();
    }

    createParticles() {
        this.particles = [];
        
        
        for (let i = 0; i < this.options.particleCount; i++) {
            const size = this.random(this.options.particleSize[0], this.options.particleSize[1]);
            
            const color = particleColors[Math.floor(Math.random() * particleColors.length)];
            
            let opacity;
            const rgbaMatch = color.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/);
            if (rgbaMatch && rgbaMatch[1]) {
                opacity = parseFloat(rgbaMatch[1]);
            } else {
                opacity = this.random(0.1, this.options.particleOpacity); 
            }


            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: size,
                color: color,
                opacity: opacity,
                speed: this.random(0.1, this.options.particleSpeed),
                directionX: this.random(-1, 1),
                directionY: this.random(-1, 1),
                originalSize: size
            });
        }
    }

    updateSettings() {
        
        this.options.particleOpacity = this.reducedMotion ? 0.3 : 0.5;
        this.options.particleSpeed = this.reducedMotion ? 0.5 : 1;
        this.options.interactive = !this.reducedMotion;
        
        
        this.particles.forEach(particle => {
            particle.opacity = this.random(0.1, this.options.particleOpacity);
            particle.speed = this.random(0.1, this.options.particleSpeed);
        });
    }

    resize() {
        
        const rect = this.options.container.getBoundingClientRect();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        
        
        this.createParticles();
    }

    animate() {
        if (!this.isActive) return;
        
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        
        this.updateParticles();
        this.drawParticles();
        
        
        requestAnimationFrame(this.animate.bind(this));
    }

    updateParticles() {
        this.particles.forEach(particle => {
            
            particle.x += particle.directionX * particle.speed;
            particle.y += particle.directionY * particle.speed;
            
            
            if (particle.x < 0 || particle.x > this.width) {
                particle.directionX *= -1;
            }
            
            if (particle.y < 0 || particle.y > this.height) {
                particle.directionY *= -1;
            }
            
            
            if (this.options.interactive) {
                const dx = particle.x - this.mouseX;
                const dy = particle.y - this.mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    
                    const force = (maxDistance - distance) / maxDistance;
                    
                    
                    particle.x += dx * force * 0.02;
                    particle.y += dy * force * 0.02;
                    
                    
                    particle.size = particle.originalSize * (1 + force * 0.5);
                } else {
                    
                    particle.size = particle.originalSize;
                }
            }
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            
            
            this.ctx.shadowBlur = particle.size * 2;
            this.ctx.shadowColor = particle.color;
        });
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    handleTouchMove(e) {
        if (e.touches.length > 0) {
            this.mouseX = e.touches[0].clientX;
            this.mouseY = e.touches[0].clientY;
        }
    }

    
    random(min, max) {
        return Math.random() * (max - min) + min;
    }

    
    

    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    
    destroy() {
        this.isActive = false;
        
        
        if (this.options.interactive) {
            window.removeEventListener('mousemove', this.handleMouseMove);
            window.removeEventListener('touchmove', this.handleTouchMove);
        }
        
        window.removeEventListener('resize', this.resize);
        
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
    }
}


// Commented out to remove white particles entirely
// document.addEventListener('DOMContentLoaded', () => {
//
//     if (typeof AnimationConfig !== 'undefined') {
//         const particleBackground = new ParticleBackground({
//             container: document.body,
//             particleCount: AnimationConfig.device.isMobile() ? 30 : 60
//         });
//     } else {
//         console.error('AnimationConfig is not loaded. Particle background cannot be initialized.');
//     }
// });
