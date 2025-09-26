


document.addEventListener('DOMContentLoaded', () => {
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    
    if (!reducedMotion) {
        initParallaxEffects();
    }
});


function initParallaxEffects() {
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        createParallaxLayers();
        createFloatingElements();
        createScrollBasedGlitches();
    } else {
        console.error('GSAP or ScrollTrigger not loaded. Parallax effects cannot be initialized.');
    }
}


function createParallaxLayers() {
    
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
    
    
    document.body.appendChild(parallaxContainer);
    
    
    const layerCount = 3;
    
    for (let i = 0; i < layerCount; i++) {
        
        const layer = document.createElement('div');
        layer.className = `parallax-layer layer-${i}`;
        layer.style.position = 'absolute';
        layer.style.top = '0';
        layer.style.left = '0';
        layer.style.width = '100%';
        layer.style.height = '100%';
        layer.style.zIndex = `-${i + 1}`;
        
        
        switch (i) {
            case 0: 
                createParticlesInLayer(layer, 20, 2, 3, 0.4);
                break;
            case 1: 
                createParticlesInLayer(layer, 15, 3, 5, 0.3);
                break;
            case 2: 
                createParticlesInLayer(layer, 10, 5, 8, 0.2);
                break;
        }
        
        
        parallaxContainer.appendChild(layer);
        
        
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


function createParticlesInLayer(layer, count, minSize, maxSize, opacity) {
    for (let i = 0; i < count; i++) {
        
        const particle = document.createElement('div');
        particle.className = 'parallax-particle';
        
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        
        const size = minSize + Math.random() * (maxSize - minSize);
        
        
        particle.style.position = 'absolute';
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(255, 0, 60, ' + opacity + ')';
        particle.style.boxShadow = `0 0 ${size * 2}px rgba(255, 0, 60, ${opacity / 2})`;
        
        
        layer.appendChild(particle);
    }
}


function createFloatingElements() {
    
    const floatingElements = [];
    const elementCount = 5;
    
    for (let i = 0; i < elementCount; i++) {
        
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        
        const x = Math.random() * 90 + 5; 
        const y = Math.random() * 70 + 15; 
        
        
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
        
        
        document.body.appendChild(element);
        
        
        floatingElements.push(element);
        
        
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


function createScrollBasedGlitches() {
    
    let lastGlitchTime = 0;
    const glitchCooldown = 1000; 
    
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
            
            const scrollPos = self.progress;
            const currentTime = Date.now();
            
            
            if (isConsoleOpen()) {
                return;
            }
            
            
            if (currentTime - lastGlitchTime < glitchCooldown) {
                return;
            }
            
            
            if (scrollPos > 0.25 && scrollPos < 0.255 ||
                scrollPos > 0.5 && scrollPos < 0.505 ||
                scrollPos > 0.75 && scrollPos < 0.755 ||
                Math.random() > 0.998) { 
                
                lastGlitchTime = currentTime;
                createGlitchEffect();
            }
        }
    });
}


function createGlitchEffect() {
    
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
    
    
    document.body.appendChild(glitch);
    
    
    const glitchTl = gsap.timeline({
        onComplete: () => {
            glitch.remove();
        }
    });
    
    
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


function createRGBSplitEffect() {
    
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
    
    
    rgbContainer.appendChild(redLayer);
    rgbContainer.appendChild(greenLayer);
    rgbContainer.appendChild(blueLayer);
    
    
    document.body.appendChild(rgbContainer);
    
    
    let lastRgbTime = 0;
    const rgbCooldown = 500; 
    
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
            
            if (isConsoleOpen()) {
                return;
            }
            
            
            const velocity = Math.abs(self.getVelocity() / 1000);
            const currentTime = Date.now();
            
            
            if (currentTime - lastRgbTime < rgbCooldown) {
                return;
            }
            
            if (velocity > 1.5) { 
                lastRgbTime = currentTime;
                const intensity = Math.min(velocity / 15, 0.3); 
                const offset = Math.min(velocity * 1.5, 8); 
                
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


document.addEventListener('DOMContentLoaded', () => {
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    
    if (!reducedMotion) {
        createRGBSplitEffect();
    }
});
