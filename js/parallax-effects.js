/**
 * Parallax Effects for Synapse: Latency
 * Creates advanced parallax effects for a more immersive cyberpunk experience
 */

// Initialize parallax effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only apply effects if reduced motion is not preferred
    if (!reducedMotion) {
        initParallaxEffects();
    }
});

/**
 * Initialize all parallax effects
 */
function initParallaxEffects() {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        createParallaxLayers();
        createFloatingElements();
        createScrollBasedGlitches();
    } else {
        console.error('GSAP or ScrollTrigger not loaded. Parallax effects cannot be initialized.');
    }
}

/**
 * Create parallax layers for depth effect
 */
function createParallaxLayers() {
    // Create container for parallax elements
    const parallaxContainer = document.createElement('div');
    parallaxContainer.className = 'parallax-container';
    parallaxContainer.style.position = 'fixed';
    parallaxContainer.style.top = '0';
    parallaxContainer.style.left = '0';
    parallaxContainer.style.width = '100%';
    parallaxContainer.style.height = '100%';
    parallaxContainer.style.zIndex = '-3';
    parallaxContainer.style.pointerEvents = 'none';
    parallaxContainer.style.overflow = 'hidden';
    
    // Append to body
    document.body.appendChild(parallaxContainer);
    
    // Create parallax layers
    const layerCount = 3;
    
    for (let i = 0; i < layerCount; i++) {
        // Create layer
        const layer = document.createElement('div');
        layer.className = `parallax-layer layer-${i}`;
        layer.style.position = 'absolute';
        layer.style.top = '0';
        layer.style.left = '0';
        layer.style.width = '100%';
        layer.style.height = '100%';
        layer.style.zIndex = `-${i + 1}`;
        
        // Add layer-specific styling
        switch (i) {
            case 0: // Front layer - small dots
                createParticlesInLayer(layer, 20, 2, 3, 0.4);
                break;
            case 1: // Middle layer - medium dots
                createParticlesInLayer(layer, 15, 3, 5, 0.3);
                break;
            case 2: // Back layer - large dots
                createParticlesInLayer(layer, 10, 5, 8, 0.2);
                break;
        }
        
        // Append to container
        parallaxContainer.appendChild(layer);
        
        // Create parallax effect
        gsap.to(layer, {
            y: `${(i + 1) * 10}%`,
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                ease: 'none'
            }
        });
    }
}

/**
 * Create particles within a layer
 */
function createParticlesInLayer(layer, count, minSize, maxSize, opacity) {
    for (let i = 0; i < count; i++) {
        // Create particle
        const particle = document.createElement('div');
        particle.className = 'parallax-particle';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = minSize + Math.random() * (maxSize - minSize);
        
        // Set styles
        particle.style.position = 'absolute';
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 0, 60, ' + opacity + ')';
        particle.style.boxShadow = `0 0 ${size * 2}px rgba(255, 0, 60, ${opacity / 2})`;
        
        // Append to layer
        layer.appendChild(particle);
    }
}

/**
 * Create floating elements that move on scroll
 */
function createFloatingElements() {
    // Create floating elements
    const floatingElements = [];
    const elementCount = 5;
    
    for (let i = 0; i < elementCount; i++) {
        // Create element
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random position
        const x = Math.random() * 90 + 5; // Keep away from edges
        const y = Math.random() * 70 + 15; // Keep away from top and bottom
        
        // Set styles
        element.style.position = 'fixed';
        element.style.left = `${x}%`;
        element.style.top = `${y}%`;
        element.style.width = '1px';
        element.style.height = '30px';
        element.style.backgroundColor = 'rgba(255, 0, 60, 0.5)';
        element.style.boxShadow = '0 0 10px rgba(255, 0, 60, 0.3)';
        element.style.zIndex = '-1';
        element.style.pointerEvents = 'none';
        element.style.transform = 'rotate(' + (Math.random() * 90 - 45) + 'deg)';
        
        // Append to body
        document.body.appendChild(element);
        
        // Store element
        floatingElements.push(element);
        
        // Create floating animation
        gsap.to(element, {
            y: `${(Math.random() * 40) - 20}`,
            x: `${(Math.random() * 40) - 20}`,
            rotation: Math.random() * 360,
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                ease: 'none'
            }
        });
    }
}

/**
 * Create glitch effects that trigger on scroll
 */
function createScrollBasedGlitches() {
    // Detect if console is open (console affects viewport dimensions)
    let lastGlitchTime = 0;
    const glitchCooldown = 1000; // Minimum 1 second between glitches
    
    function isConsoleOpen() {
        const threshold = 160;
        return window.outerHeight - window.innerHeight > threshold ||
               window.outerWidth - window.innerWidth > threshold;
    }
    
    // Create scroll-based glitch effect
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            // Trigger glitch effect at certain scroll positions
            const scrollPos = self.progress;
            const currentTime = Date.now();
            
            // Skip glitch effects if console is open to prevent headaches
            if (isConsoleOpen()) {
                return;
            }
            
            // Add cooldown to prevent rapid flickering
            if (currentTime - lastGlitchTime < glitchCooldown) {
                return;
            }
            
            // Create glitch at specific scroll positions or randomly (reduced frequency)
            if (scrollPos > 0.25 && scrollPos < 0.255 ||
                scrollPos > 0.5 && scrollPos < 0.505 ||
                scrollPos > 0.75 && scrollPos < 0.755 ||
                Math.random() > 0.998) { // Reduced from 0.995 to 0.998 for less frequent glitches
                
                lastGlitchTime = currentTime;
                createGlitchEffect();
            }
        }
    });
}

/**
 * Create a single glitch effect
 */
function createGlitchEffect() {
    // Create glitch overlay
    const glitch = document.createElement('div');
    glitch.className = 'scroll-glitch';
    glitch.style.position = 'fixed';
    glitch.style.top = '0';
    glitch.style.left = '0';
    glitch.style.width = '100%';
    glitch.style.height = '100%';
    glitch.style.backgroundColor = 'transparent';
    glitch.style.zIndex = '9998';
    glitch.style.pointerEvents = 'none';
    glitch.style.mixBlendMode = 'overlay';
    
    // Append to body
    document.body.appendChild(glitch);
    
    // Create glitch timeline
    const glitchTl = gsap.timeline({
        onComplete: () => {
            glitch.remove();
        }
    });
    
    // Add glitch effect
    glitchTl.to(glitch, {
        duration: 0.05,
        opacity: 0.8,
        backgroundColor: '#ff003c',
        ease: 'steps(1)'
    });
    
    glitchTl.to(glitch, {
        duration: 0.05,
        opacity: 0,
        backgroundColor: 'transparent',
        ease: 'steps(1)'
    });
    
    // Add screen shift
    const xShift = (Math.random() - 0.5) * 20;
    const yShift = (Math.random() - 0.5) * 20;
    
    glitchTl.to('body', {
        x: xShift,
        y: yShift,
        duration: 0.05,
        ease: 'steps(1)'
    }, 0);
    
    glitchTl.to('body', {
        x: 0,
        y: 0,
        duration: 0.05,
        ease: 'power1.out'
    }, 0.05);
}

/**
 * Create a scroll-triggered RGB split effect
 */
function createRGBSplitEffect() {
    // Create RGB split elements
    const rgbContainer = document.createElement('div');
    rgbContainer.className = 'rgb-split-container';
    rgbContainer.style.position = 'fixed';
    rgbContainer.style.top = '0';
    rgbContainer.style.left = '0';
    rgbContainer.style.width = '100%';
    rgbContainer.style.height = '100%';
    rgbContainer.style.zIndex = '9997';
    rgbContainer.style.pointerEvents = 'none';
    rgbContainer.style.opacity = '0';
    
    // Create RGB layers
    const redLayer = document.createElement('div');
    redLayer.className = 'rgb-layer red-layer';
    redLayer.style.position = 'absolute';
    redLayer.style.top = '0';
    redLayer.style.left = '0';
    redLayer.style.width = '100%';
    redLayer.style.height = '100%';
    redLayer.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    redLayer.style.mixBlendMode = 'multiply';
    redLayer.style.transform = 'translateX(-5px)';
    
    const greenLayer = document.createElement('div');
    greenLayer.className = 'rgb-layer green-layer';
    greenLayer.style.position = 'absolute';
    greenLayer.style.top = '0';
    greenLayer.style.left = '0';
    greenLayer.style.width = '100%';
    greenLayer.style.height = '100%';
    greenLayer.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
    greenLayer.style.mixBlendMode = 'multiply';
    
    const blueLayer = document.createElement('div');
    blueLayer.className = 'rgb-layer blue-layer';
    blueLayer.style.position = 'absolute';
    blueLayer.style.top = '0';
    blueLayer.style.left = '0';
    blueLayer.style.width = '100%';
    blueLayer.style.height = '100%';
    blueLayer.style.backgroundColor = 'rgba(0, 0, 255, 0.5)';
    blueLayer.style.mixBlendMode = 'multiply';
    blueLayer.style.transform = 'translateX(5px)';
    
    // Append layers to container
    rgbContainer.appendChild(redLayer);
    rgbContainer.appendChild(greenLayer);
    rgbContainer.appendChild(blueLayer);
    
    // Append container to body
    document.body.appendChild(rgbContainer);
    
    // Create scroll-triggered effect
    let lastRgbTime = 0;
    const rgbCooldown = 500; // Minimum 500ms between RGB effects
    
    function isConsoleOpen() {
        const threshold = 160;
        return window.outerHeight - window.innerHeight > threshold ||
               window.outerWidth - window.innerWidth > threshold;
    }
    
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            // Skip RGB effects if console is open to prevent headaches
            if (isConsoleOpen()) {
                return;
            }
            
            // Trigger RGB split at certain scroll velocities
            const velocity = Math.abs(self.getVelocity() / 1000);
            const currentTime = Date.now();
            
            // Add cooldown to prevent rapid flickering
            if (currentTime - lastRgbTime < rgbCooldown) {
                return;
            }
            
            if (velocity > 1.5) { // Increased threshold from 1 to 1.5 to reduce sensitivity
                lastRgbTime = currentTime;
                const intensity = Math.min(velocity / 15, 0.3); // Reduced max intensity from 0.5 to 0.3
                const offset = Math.min(velocity * 1.5, 8); // Reduced multiplier and max offset
                
                gsap.to(rgbContainer, {
                    opacity: intensity,
                    duration: 0.2,
                    onComplete: () => {
                        gsap.to(rgbContainer, {
                            opacity: 0,
                            duration: 0.5
                        });
                    }
                });
                
                gsap.to(redLayer, {
                    x: -offset,
                    duration: 0.2,
                    onComplete: () => {
                        gsap.to(redLayer, {
                            x: -5,
                            duration: 0.5
                        });
                    }
                });
                
                gsap.to(blueLayer, {
                    x: offset,
                    duration: 0.2,
                    onComplete: () => {
                        gsap.to(blueLayer, {
                            x: 5,
                            duration: 0.5
                        });
                    }
                });
            }
        }
    });
}

// Call RGB split effect initialization
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only apply effects if reduced motion is not preferred
    if (!reducedMotion) {
        createRGBSplitEffect();
    }
});