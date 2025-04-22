/**
 * Particles.js - Background Particle System for Synapse: Latency Privacy Policy
 * Creates an interactive particle background effect
 * Implements performance optimizations and accessibility features
 */

// Steely grey color palette from source project
const particleColors = [
    'rgba(141, 141, 141, 0.7)',   // Medium grey
    'rgba(141, 141, 141, 0.4)',   // Medium grey (dimmer)
    'rgba(176, 176, 176, 0.7)',   // Light grey
    'rgba(176, 176, 176, 0.4)',   // Light grey (dimmer)
    'rgba(255, 255, 255, 0.7)',   // White
    'rgba(74, 74, 74, 0.5)'       // Dark grey
];

class ParticleBackground {
    constructor(options = {}) {
        // Check for reduced motion preference
        this.reducedMotion = AnimationConfig.accessibility.prefersReducedMotion();
        
        // Default options with device-specific adjustments
        this.options = {
            container: document.body,
            particleCount: AnimationConfig.device.isMobile() ? 30 : 60,
            // particleColor: '#5b0909', // Color is now selected randomly from particleColors array
            particleSize: [1, 3],
            particleOpacity: this.reducedMotion ? 0.4 : 0.6, // Use original opacity logic
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
        
        // Initialize the particle system
        this.init();
        
        // Listen for reduced motion preference changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
            this.reducedMotion = AnimationConfig.accessibility.prefersReducedMotion();
            this.updateSettings();
        });
    }

    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas styles
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        // Add accessibility attributes
        this.canvas.setAttribute('aria-hidden', 'true');
        this.canvas.setAttribute('role', 'presentation');
        
        // Add canvas to container
        this.options.container.appendChild(this.canvas);
        
        // Set canvas size
        this.resize();
        
        // Create particles
        this.createParticles();
        
        // Add event listeners
        if (this.options.interactive) {
            window.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
            window.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        }
        
        window.addEventListener('resize', this.debounce(this.resize.bind(this), 200), { passive: true });
        
        // Start animation loop
        this.animate();
    }

    createParticles() {
        this.particles = [];
        
        // Create particles using the defined red accent color
        for (let i = 0; i < this.options.particleCount; i++) {
            const size = this.random(this.options.particleSize[0], this.options.particleSize[1]);
            // Select a random color from the steely grey palette
            const color = particleColors[Math.floor(Math.random() * particleColors.length)];
            // Extract opacity from RGBA string if possible, otherwise use default logic
            let opacity;
            const rgbaMatch = color.match(/rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/);
            if (rgbaMatch && rgbaMatch[1]) {
                opacity = parseFloat(rgbaMatch[1]);
            } else {
                opacity = this.random(0.1, this.options.particleOpacity); // Fallback
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
        // Update settings based on reduced motion preference
        this.options.particleOpacity = this.reducedMotion ? 0.3 : 0.5;
        this.options.particleSpeed = this.reducedMotion ? 0.5 : 1;
        this.options.interactive = !this.reducedMotion;
        
        // Update particles
        this.particles.forEach(particle => {
            particle.opacity = this.random(0.1, this.options.particleOpacity);
            particle.speed = this.random(0.1, this.options.particleSpeed);
        });
    }

    resize() {
        // Get container dimensions
        const rect = this.options.container.getBoundingClientRect();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        // Set canvas size with device pixel ratio for retina displays
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        
        // Recreate particles when resizing
        this.createParticles();
    }

    animate() {
        if (!this.isActive) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Update and draw particles
        this.updateParticles();
        this.drawParticles();
        
        // Request next frame
        requestAnimationFrame(this.animate.bind(this));
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.directionX * particle.speed;
            particle.y += particle.directionY * particle.speed;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.width) {
                particle.directionX *= -1;
            }
            
            if (particle.y < 0 || particle.y > this.height) {
                particle.directionY *= -1;
            }
            
            // Interactive effect - particles react to mouse
            if (this.options.interactive) {
                const dx = particle.x - this.mouseX;
                const dy = particle.y - this.mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    // Calculate force (inverse of distance)
                    const force = (maxDistance - distance) / maxDistance;
                    
                    // Apply force to particle
                    particle.x += dx * force * 0.02;
                    particle.y += dy * force * 0.02;
                    
                    // Increase size based on proximity
                    particle.size = particle.originalSize * (1 + force * 0.5);
                } else {
                    // Reset size
                    particle.size = particle.originalSize;
                }
            }
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            // Use the particle's color directly (it's already RGBA)
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // Add glow effect
            // Use the particle's color for the shadow as well
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

    // Utility methods
    random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // hexToRgba function is no longer needed as colors are RGBA strings
    /*
    hexToRgba(hex, opacity) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    */

    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Clean up resources
    destroy() {
        this.isActive = false;
        
        // Remove event listeners
        if (this.options.interactive) {
            window.removeEventListener('mousemove', this.handleMouseMove);
            window.removeEventListener('touchmove', this.handleTouchMove);
        }
        
        window.removeEventListener('resize', this.resize);
        
        // Remove canvas
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        // Clear references
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
    }
}

// Initialize particle background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for AnimationConfig to load
    if (typeof AnimationConfig !== 'undefined') {
        const particleBackground = new ParticleBackground({
            container: document.body,
            particleCount: AnimationConfig.device.isMobile() ? 30 : 60
        });
    } else {
        console.error('AnimationConfig is not loaded. Particle background cannot be initialized.');
    }
});