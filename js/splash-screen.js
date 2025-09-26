

class SplashScreen {
    constructor() {
        this.minDisplayTime = 2000; 
        this.startTime = Date.now();
        this.hasAnimatedOut = false; 
        
        
        this.reducedMotion = AnimationConfig.accessibility.prefersReducedMotion();
        
        
        this.init();
        
        
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
            this.reducedMotion = AnimationConfig.accessibility.prefersReducedMotion();
        });
    }

    init() {
        
        this.createSplashElements();
        
        
        this.animateIn();
        
        
        window.addEventListener('load', () => this.handlePageLoad());
        
        
        
        this.fallbackTimer = setTimeout(() => this.handlePageLoad(), 3000);
        
        
        if (this.splashContainer) {
            this.splashContainer.setAttribute('aria-label', 'Loading privacy policy');
            this.splashContainer.setAttribute('role', 'progressbar');
            this.splashContainer.setAttribute('aria-busy', 'true');
        }
    }
    
    handlePageLoad() {
        
        if (this.fallbackTimer) {
            clearTimeout(this.fallbackTimer);
            this.fallbackTimer = null;
        }
        
        
        if (this.hasAnimatedOut) return;
        
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minDisplayTime - elapsedTime);
        
        
        setTimeout(() => {
            this.hasAnimatedOut = true;
            this.animateOut();
        }, remainingTime);
    }

    createSplashElements() {
        
        this.splashContainer = document.createElement('div');
        this.splashContainer.className = 'splash-screen';
        
        
        this.logoContainer = document.createElement('div');
        this.logoContainer.className = 'splash-logo-container';
        
        
        this.logoContainer.innerHTML = `
           <div class="splash-logo">
               <img src="ANTHEM Logo.png" alt="ANTHEM Logo" width="120" height="120">
           </div>
            <div class="logo-text">
                <span class="logo-text-primary">Synapse</span>
                <span class="logo-text-secondary">Latency</span>
            </div>
        `;
        
        
        this.particlesContainer = document.createElement('div');
        this.particlesContainer.className = 'splash-particles';
        
        
        this.splashContainer.appendChild(this.particlesContainer);
        this.splashContainer.appendChild(this.logoContainer);
        
        
        document.body.appendChild(this.splashContainer);
    }

    animateIn() {
        
        if (this.reducedMotion) {
            this.animateInReducedMotion();
            return;
        }
        
        
        AnimationConfig.performance.prepareElement(".splash-logo");
        AnimationConfig.performance.prepareElement(".logo-text-primary");
        AnimationConfig.performance.prepareElement(".logo-text-secondary");
        AnimationConfig.performance.prepareElement(this.splashContainer);
        
        
        const tl = gsap.timeline();
        
        
        gsap.set(".splash-logo", { 
            scale: 0, 
            opacity: 0,
            transformOrigin: "center center"
        });
        
        
        gsap.set(".logo-text-primary", { 
            opacity: 0 
        });
        
        
        gsap.set(".logo-text-secondary", { 
            y: AnimationConfig.accessibility.getDistance(30), 
            opacity: 0 
        });
        
        
        tl.fromTo(this.splashContainer, 
            { opacity: 0, scale: 1.05 },
            { 
                opacity: 1, 
                scale: 1, 
                duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.slow), 
                ease: AnimationConfig.ease.smoothInOut,
                clearProps: "transform"
            }
        );
        
        
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = '#8d8d8d'; 
        flash.style.opacity = '0';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '3';
        this.splashContainer.appendChild(flash);
        
        
        tl.to(flash, {
            opacity: 0.3,
            duration: AnimationConfig.duration.ultraFast,
            ease: AnimationConfig.ease.smooth,
            onComplete: () => {
                gsap.to(flash, {
                    opacity: 0,
                    duration: AnimationConfig.duration.medium,
                    ease: AnimationConfig.ease.smooth,
                    onComplete: () => {
                        if (flash.parentNode) {
                            flash.parentNode.removeChild(flash);
                        }
                    }
                });
            }
        }, "-=0.1");
        
        
        tl.to(".splash-logo", {
            scale: 1,
            opacity: 1,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.slow),
            ease: AnimationConfig.ease.elastic,
            transformOrigin: "center center",
            clearProps: "transform",
            onComplete: () => AnimationConfig.performance.cleanupElement(".splash-logo")
        }, "-=0.4");
        
        
        tl.to(".logo-text-primary", {
            opacity: 1,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.slow),
            ease: AnimationConfig.ease.smooth,
            clearProps: "opacity",
            onComplete: () => AnimationConfig.performance.cleanupElement(".logo-text-primary")
        }, "-=0.2"); 
        
        
        tl.to(".logo-text-secondary", {
            y: 0,
            opacity: 1,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.medium),
            ease: AnimationConfig.ease.bounce,
            clearProps: "transform",
            onComplete: () => AnimationConfig.performance.cleanupElement(".logo-text-secondary")
        }, "-=0.5"); 
        
        
        tl.to(".splash-logo", {
            scale: 1.08,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.extraSlow),
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1
        }, "-=0.3");
        
        
        this.createParticles();
        
        
        return tl;
    }
    
    
    animateInReducedMotion() {
        
        const tl = gsap.timeline();
        
        
        gsap.set(".splash-logo", { opacity: 0 });
        gsap.set(".logo-text-primary", { opacity: 0 });
        gsap.set(".logo-text-secondary", { opacity: 0 });
        
        
        tl.to(this.splashContainer, { 
            opacity: 1, 
            duration: 0.3
        });
        
        
        tl.to(".splash-logo", { 
            opacity: 1, 
            duration: 0.3
        });
        
        tl.to([".logo-text-primary", ".logo-text-secondary"], { 
            opacity: 1, 
            duration: 0.3,
            stagger: 0.1
        });
        
        
        this.createMinimalParticles();
        
        return tl;
    }

    animateOut() {
        
        if (this.reducedMotion) {
            this.animateOutReducedMotion();
            return;
        }
        
        
        AnimationConfig.performance.prepareElement(".splash-logo");
        AnimationConfig.performance.prepareElement(".logo-text-primary");
        AnimationConfig.performance.prepareElement(".logo-text-secondary");
        AnimationConfig.performance.prepareElement(this.splashContainer);
        
        
        const tl = gsap.timeline({
            onComplete: () => {
                
                if (this.splashContainer && this.splashContainer.parentNode) {
                    this.splashContainer.parentNode.removeChild(this.splashContainer);
                }
                
                
                document.documentElement.classList.remove('loading');
                
                console.log("Splash screen animation completed and removed");
            }
        });
        
        
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = '#8d8d8d'; 
        flash.style.opacity = '0';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '3';
        this.splashContainer.appendChild(flash);
        
        
        tl.to(".splash-logo", {
            scale: 1.1,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.fast),
            ease: AnimationConfig.ease.smooth
        });
        
        
        tl.to(".splash-logo", {
            scale: 1.5,
            opacity: 0,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.medium),
            ease: AnimationConfig.ease.strong
        }, "-=0.2");
        
        
        tl.to(".logo-text-primary, .logo-text-secondary", {
            opacity: 0, 
            stagger: AnimationConfig.stagger.fast, 
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.medium),
            ease: AnimationConfig.ease.strong
        }, "-=0.3");
        
        
        tl.to(flash, {
            opacity: 0.3,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.fast),
            ease: AnimationConfig.ease.smooth
        }, "-=0.1");
        
        
        
        tl.to(this.splashContainer, {
            scale: 1.05,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.medium),
            ease: AnimationConfig.ease.strong
        }, "-=0.2");
        
        
        tl.to(this.splashContainer, {
            opacity: 0,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.slow),
            ease: AnimationConfig.ease.strongInOut,
            onStart: () => {
                
                gsap.to(flash, {
                    opacity: 0,
                    duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.fast),
                    ease: AnimationConfig.ease.smooth
                });
            }
        }, "-=0.2");
        
        return tl;
    }
    
    
    animateOutReducedMotion() {
        
        const tl = gsap.timeline({
            onComplete: () => {
                
                if (this.splashContainer && this.splashContainer.parentNode) {
                    this.splashContainer.parentNode.removeChild(this.splashContainer);
                }
                
                
                document.documentElement.classList.remove('loading');
                
                console.log("Splash screen animation completed and removed (reduced motion)");
            }
        });
        
        
        tl.to([".splash-logo", ".logo-text-primary", ".logo-text-secondary"], { 
            opacity: 0, 
            duration: 0.3
        });
        
        
        tl.to(this.splashContainer, { 
            opacity: 0, 
            duration: 0.3
        });
        
        return tl;
    }

    createParticles() {
        
        const particleCount = AnimationConfig.device.getParticleCount(); 

        
        const colors = [
            'rgba(141, 141, 141, 0.7)',
            'rgba(141, 141, 141, 0.4)',
            'rgba(176, 176, 176, 0.7)',
            'rgba(176, 176, 176, 0.4)',
            'rgba(74, 74, 74, 0.5)'
        ];

        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'splash-particle';
            
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            
            const size = Math.random() * 4 + 1;
            
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
            
            
            this.particlesContainer.appendChild(particle);
            
            
            const duration = Math.random() * 4 + 3;
            const delay = Math.random() * 2;
            const xMove = (Math.random() - 0.5) * 30;
            const yMove = (Math.random() - 0.5) * 30;
            
            
            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            
            
            tl.to(particle, {
                x: xMove,
                y: yMove,
                opacity: Math.random() * 0.7 + 0.3,
                duration: duration,
                delay: delay,
                ease: "sine.inOut"
            });
            
            
            gsap.to(particle, {
                scale: Math.random() * 1.5 + 0.5,
                duration: Math.random() * 2 + 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
        
        
        const orbCount = AnimationConfig.device.isMobile() ? 4 : 8;
        for (let i = 0; i < orbCount; i++) {
            const orb = document.createElement('div');
            orb.className = 'splash-particle';
            
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            
            const size = Math.random() * 15 + 10;
            
            
            orb.style.left = `${x}%`;
            orb.style.top = `${y}%`;
            orb.style.width = `${size}px`;
            orb.style.height = `${size}px`;
            orb.style.backgroundColor = 'rgba(141, 141, 141, 0.1)'; 
            orb.style.boxShadow = `0 0 ${size}px rgba(141, 141, 141, 0.3)`; 
            orb.style.borderRadius = '50%';
            orb.style.filter = 'blur(5px)';
            
            
            this.particlesContainer.appendChild(orb);
            
            
            gsap.to(orb, {
                x: (Math.random() - 0.5) * 50,
                y: (Math.random() - 0.5) * 50,
                scale: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                duration: Math.random() * 8 + 7,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }
    
    
    createMinimalParticles() {
        
        const particleCount = AnimationConfig.device.isMobile() ? 10 : 20;

        
        const colors = [
            'rgba(141, 141, 141, 0.7)',
            'rgba(141, 141, 141, 0.4)',
            'rgba(176, 176, 176, 0.7)',
            'rgba(176, 176, 176, 0.4)',
            'rgba(74, 74, 74, 0.5)'
        ];

        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'splash-particle';
            
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            
            const size = Math.random() * 3 + 1;
            
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size}px ${color}`;
            
            
            this.particlesContainer.appendChild(particle);
            
            
            gsap.to(particle, {
                opacity: Math.random() * 0.5 + 0.2,
                duration: Math.random() * 3 + 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    if (typeof gsap !== 'undefined') {
        
        setTimeout(() => {
            new SplashScreen();
        }, 100);
    } else {
        console.error('GSAP is not loaded. Splash screen cannot be initialized.');
    }
});


window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not detected, loading page without splash animation');
    }
});



window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const splashScreen = document.querySelector('.splash-screen');
        if (splashScreen && splashScreen.parentNode) {
            console.warn('Forcing splash screen removal after timeout');
            splashScreen.parentNode.removeChild(splashScreen);
        }
        
        
        document.documentElement.classList.remove('loading');
    }, 5000);
});
