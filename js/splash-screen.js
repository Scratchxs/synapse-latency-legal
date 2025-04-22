/**
 * Splash Screen Animation for Synapse: Latency Privacy Policy
 * Creates a smooth loading animation with the Synapse logo
 * Uses GSAP for animations with performance optimizations and accessibility features
 */

class SplashScreen {
    constructor() {
        this.minDisplayTime = 2000; // Minimum display time in milliseconds
        this.startTime = Date.now();
        this.hasAnimatedOut = false; // Flag to prevent multiple animations out
        
        // Check for reduced motion preference
        this.reducedMotion = AnimationConfig.accessibility.prefersReducedMotion();
        
        // Initialize splash screen
        this.init();
        
        // Listen for reduced motion preference changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
            this.reducedMotion = AnimationConfig.accessibility.prefersReducedMotion();
        });
    }

    init() {
        // Create splash screen elements
        this.createSplashElements();
        
        // Start animation sequence
        this.animateIn();
        
        // Listen for page load
        window.addEventListener('load', () => this.handlePageLoad());
        
        // Fallback timer in case the load event doesn't fire
        // This ensures the splash screen will always transition out
        this.fallbackTimer = setTimeout(() => this.handlePageLoad(), 3000);
        
        // Add accessibility attributes
        if (this.splashContainer) {
            this.splashContainer.setAttribute('aria-label', 'Loading privacy policy');
            this.splashContainer.setAttribute('role', 'progressbar');
            this.splashContainer.setAttribute('aria-busy', 'true');
        }
    }
    
    handlePageLoad() {
        // Clear fallback timer if it exists
        if (this.fallbackTimer) {
            clearTimeout(this.fallbackTimer);
            this.fallbackTimer = null;
        }
        
        // Only proceed if we haven't already animated out
        if (this.hasAnimatedOut) return;
        
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minDisplayTime - elapsedTime);
        
        // Ensure splash screen shows for at least minDisplayTime
        setTimeout(() => {
            this.hasAnimatedOut = true;
            this.animateOut();
        }, remainingTime);
    }

    createSplashElements() {
        // Create splash container
        this.splashContainer = document.createElement('div');
        this.splashContainer.className = 'splash-screen';
        
        // Create logo container
        this.logoContainer = document.createElement('div');
        this.logoContainer.className = 'splash-logo-container';
        
        // Create Synapse logo
        this.logoContainer.innerHTML = `
           <div class="splash-logo">
               <img src="ANTHEM Logo.png" alt="ANTHEM Logo" width="120" height="120">
           </div>
            <div class="logo-text">
                <span class="logo-text-primary">Synapse</span>
                <span class="logo-text-secondary">Latency</span>
            </div>
        `;
        
        // Add particles container for background effect
        this.particlesContainer = document.createElement('div');
        this.particlesContainer.className = 'splash-particles';
        
        // Append elements to splash container
        this.splashContainer.appendChild(this.particlesContainer);
        this.splashContainer.appendChild(this.logoContainer);
        
        // Add to document
        document.body.appendChild(this.splashContainer);
    }

    animateIn() {
        // Skip complex animations if user prefers reduced motion
        if (this.reducedMotion) {
            this.animateInReducedMotion();
            return;
        }
        
        // Prepare elements for animation
        AnimationConfig.performance.prepareElement(".splash-logo");
        AnimationConfig.performance.prepareElement(".logo-text-primary");
        AnimationConfig.performance.prepareElement(".logo-text-secondary");
        AnimationConfig.performance.prepareElement(this.splashContainer);
        
        // Create timeline for splash animation with enhanced effects
        const tl = gsap.timeline();
        
        // Initial setup - prepare elements for animation
        gsap.set(".splash-logo", { 
            scale: 0, 
            opacity: 0,
            transformOrigin: "center center"
        });
        
        // Set initial state for primary text (fade-in)
        gsap.set(".logo-text-primary", { 
            opacity: 0 
        });
        
        // Set initial state for secondary text (slide-up)
        gsap.set(".logo-text-secondary", { 
            y: AnimationConfig.accessibility.getDistance(30), 
            opacity: 0 
        });
        
        // Animate background with a subtle zoom effect
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
        
        // Create a flash effect (skip if reduced motion)
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = '#8A2BE2';
        flash.style.opacity = '0';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '3';
        this.splashContainer.appendChild(flash);
        
        // Add flash effect
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
        
        // Animate logo with enhanced bounce
        tl.to(".splash-logo", {
            scale: 1,
            opacity: 1,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.slow),
            ease: AnimationConfig.ease.elastic,
            transformOrigin: "center center",
            clearProps: "transform",
            onComplete: () => AnimationConfig.performance.cleanupElement(".splash-logo")
        }, "-=0.4");
        
        // Animate primary logo text (fade-in)
        tl.to(".logo-text-primary", {
            opacity: 1,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.slow),
            ease: AnimationConfig.ease.smooth,
            clearProps: "opacity",
            onComplete: () => AnimationConfig.performance.cleanupElement(".logo-text-primary")
        }, "-=0.2"); // Start slightly after logo animation
        
        // Animate secondary logo text (slide-up), delayed slightly more
        tl.to(".logo-text-secondary", {
            y: 0,
            opacity: 1,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.medium),
            ease: AnimationConfig.ease.bounce,
            clearProps: "transform",
            onComplete: () => AnimationConfig.performance.cleanupElement(".logo-text-secondary")
        }, "-=0.5"); // Adjust timing relative to primary text fade-in
        
        // Add a more sophisticated pulse animation to logo
        tl.to(".splash-logo", {
            scale: 1.08,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.extraSlow),
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1
        }, "-=0.3");
        
        // Create particles for background
        this.createParticles();
        
        // Return the timeline for potential chaining
        return tl;
    }
    
    // Simplified animation for users who prefer reduced motion
    animateInReducedMotion() {
        // Create a simple timeline
        const tl = gsap.timeline();
        
        // Set initial states
        gsap.set(".splash-logo", { opacity: 0 });
        gsap.set(".logo-text-primary", { opacity: 0 });
        gsap.set(".logo-text-secondary", { opacity: 0 });
        
        // Simple fade in for container
        tl.to(this.splashContainer, { 
            opacity: 1, 
            duration: 0.3
        });
        
        // Simple fade in for logo and text (no motion)
        tl.to(".splash-logo", { 
            opacity: 1, 
            duration: 0.3
        });
        
        tl.to([".logo-text-primary", ".logo-text-secondary"], { 
            opacity: 1, 
            duration: 0.3,
            stagger: 0.1
        });
        
        // Create minimal particles (fewer and less movement)
        this.createMinimalParticles();
        
        return tl;
    }

    animateOut() {
        // Skip complex animations if user prefers reduced motion
        if (this.reducedMotion) {
            this.animateOutReducedMotion();
            return;
        }
        
        // Prepare elements for animation
        AnimationConfig.performance.prepareElement(".splash-logo");
        AnimationConfig.performance.prepareElement(".logo-text-primary");
        AnimationConfig.performance.prepareElement(".logo-text-secondary");
        AnimationConfig.performance.prepareElement(this.splashContainer);
        
        // Create a more dramatic exit animation
        const tl = gsap.timeline({
            onComplete: () => {
                // Remove splash screen when animation completes
                if (this.splashContainer && this.splashContainer.parentNode) {
                    this.splashContainer.parentNode.removeChild(this.splashContainer);
                }
                
                // Remove loading class to show content
                document.documentElement.classList.remove('loading');
                
                console.log("Splash screen animation completed and removed");
            }
        });
        
        // Create a flash effect for transition
        const flash = document.createElement('div');
        flash.style.position = 'absolute';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = '#8A2BE2';
        flash.style.opacity = '0';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '3';
        this.splashContainer.appendChild(flash);
        
        // Scale up logo slightly before animating out
        tl.to(".splash-logo", {
            scale: 1.1,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.fast),
            ease: AnimationConfig.ease.smooth
        });
        
        // Animate logo out
        tl.to(".splash-logo", {
            scale: 1.5,
            opacity: 0,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.medium),
            ease: AnimationConfig.ease.strong
        }, "-=0.2");
        
        // Animate logo text out (adjust stagger if needed)
        tl.to(".logo-text-primary, .logo-text-secondary", {
            opacity: 0, // Fade out both
            stagger: AnimationConfig.stagger.fast, // Adjust stagger timing
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.medium),
            ease: AnimationConfig.ease.strong
        }, "-=0.3");
        
        // Add flash effect
        tl.to(flash, {
            opacity: 0.3,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.fast),
            ease: AnimationConfig.ease.smooth
        }, "-=0.1");
        
        // Animate background out with a more sophisticated effect
        // First scale it slightly
        tl.to(this.splashContainer, {
            scale: 1.05,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.medium),
            ease: AnimationConfig.ease.strong
        }, "-=0.2");
        
        // Then wipe it out
        tl.to(this.splashContainer, {
            height: 0,
            duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.slow),
            ease: AnimationConfig.ease.strongInOut,
            onStart: () => {
                // Change transform origin for the wipe effect
                gsap.set(this.splashContainer, { transformOrigin: "center top" });
                
                // Fade out flash
                gsap.to(flash, {
                    opacity: 0,
                    duration: AnimationConfig.accessibility.getDuration(AnimationConfig.duration.fast),
                    ease: AnimationConfig.ease.smooth
                });
            }
        }, "-=0.2");
        
        return tl;
    }
    
    // Simplified exit animation for users who prefer reduced motion
    animateOutReducedMotion() {
        // Create a simple timeline
        const tl = gsap.timeline({
            onComplete: () => {
                // Remove splash screen when animation completes
                if (this.splashContainer && this.splashContainer.parentNode) {
                    this.splashContainer.parentNode.removeChild(this.splashContainer);
                }
                
                // Remove loading class to show content
                document.documentElement.classList.remove('loading');
                
                console.log("Splash screen animation completed and removed (reduced motion)");
            }
        });
        
        // Simple fade out for all elements together
        tl.to([".splash-logo", ".logo-text-primary", ".logo-text-secondary"], { 
            opacity: 0, 
            duration: 0.3
        });
        
        // Fade out container
        tl.to(this.splashContainer, { 
            opacity: 0, 
            duration: 0.3
        });
        
        return tl;
    }

    createParticles() {
        // Create enhanced particles with GSAP animations
        const particleCount = AnimationConfig.device.getParticleCount(); // Use device-specific count
        
        // Updated particle colors based on dark purple theme
        const colors = [
            'rgba(255, 255, 255, 0.7)', // White with opacity
            'rgba(255, 255, 255, 0.5)', // White with opacity
            'rgba(138, 43, 226, 0.6)',  // BlueViolet with opacity
            'rgba(138, 43, 226, 0.4)',  // BlueViolet with opacity
            'rgba(75, 0, 130, 0.5)'     // Indigo with opacity
        ];
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'splash-particle';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size (smaller particles look better)
            const size = Math.random() * 4 + 1;
            
            // Random color from palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Set particle styles
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
            
            // Add to particles container
            this.particlesContainer.appendChild(particle);
            
            // Create random animation parameters
            const duration = Math.random() * 4 + 3;
            const delay = Math.random() * 2;
            const xMove = (Math.random() - 0.5) * 30;
            const yMove = (Math.random() - 0.5) * 30;
            
            // Create GSAP timeline for this particle
            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            
            // Add animations to timeline
            tl.to(particle, {
                x: xMove,
                y: yMove,
                opacity: Math.random() * 0.7 + 0.3,
                duration: duration,
                delay: delay,
                ease: "sine.inOut"
            });
            
            // Add subtle scale animation
            gsap.to(particle, {
                scale: Math.random() * 1.5 + 0.5,
                duration: Math.random() * 2 + 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
        
        // Create a few larger glowing orbs that move slowly
        const orbCount = AnimationConfig.device.isMobile() ? 4 : 8;
        for (let i = 0; i < orbCount; i++) {
            const orb = document.createElement('div');
            orb.className = 'splash-particle';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Larger size for orbs
            const size = Math.random() * 15 + 10;
            
            // Set orb styles
            orb.style.left = `${x}%`;
            orb.style.top = `${y}%`;
            orb.style.width = `${size}px`;
            orb.style.height = `${size}px`;
            orb.style.backgroundColor = 'rgba(138, 43, 226, 0.1)';
            orb.style.boxShadow = `0 0 ${size}px rgba(138, 43, 226, 0.3)`;
            orb.style.borderRadius = '50%';
            orb.style.filter = 'blur(5px)';
            
            // Add to particles container
            this.particlesContainer.appendChild(orb);
            
            // Animate orb with GSAP
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
    
    // Create minimal particles for reduced motion preference
    createMinimalParticles() {
        // Use fewer particles
        const particleCount = AnimationConfig.device.isMobile() ? 10 : 20;
        
        // Updated particle colors based on dark purple theme
        const colors = [
            'rgba(255, 255, 255, 0.5)', // White with opacity
            'rgba(138, 43, 226, 0.4)',  // BlueViolet with opacity
            'rgba(75, 0, 130, 0.3)'     // Indigo with opacity
        ];
        
        // Create particles with minimal movement
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'splash-particle';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size (smaller particles look better)
            const size = Math.random() * 3 + 1;
            
            // Random color from palette
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Set particle styles
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 ${size}px ${color}`;
            
            // Add to particles container
            this.particlesContainer.appendChild(particle);
            
            // Create minimal animation - just opacity changes, no movement
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

// Initialize splash screen immediately
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to load
    if (typeof gsap !== 'undefined') {
        // Add a small delay to ensure all resources are properly loaded
        setTimeout(() => {
            new SplashScreen();
        }, 100);
    } else {
        console.error('GSAP is not loaded. Splash screen cannot be initialized.');
    }
});

// Add a fallback for older browsers
window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not detected, loading page without splash animation');
    }
});

// Force the splash screen to close if it's still visible after 5 seconds
// This is a safety mechanism to ensure the user can always access the app
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const splashScreen = document.querySelector('.splash-screen');
        if (splashScreen && splashScreen.parentNode) {
            console.warn('Forcing splash screen removal after timeout');
            splashScreen.parentNode.removeChild(splashScreen);
        }
        
        // Ensure content is shown even if splash screen fails
        document.documentElement.classList.remove('loading');
    }, 5000);
});