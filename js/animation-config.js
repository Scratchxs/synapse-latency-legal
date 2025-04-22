/**
 * Animation Configuration for Synapse: Latency Privacy Policy
 * Centralizes animation settings for consistency across the application
 */

const AnimationConfig = {
    // Timing durations (in seconds)
    duration: {
        ultraFast: 0.1,    // Immediate feedback
        fast: 0.2,         // Quick transitions
        medium: 0.4,       // Standard transitions
        slow: 0.8,         // Emphasis animations
        extraSlow: 1.2     // Special animations
    },
    
    // Standard easing functions
    ease: {
        // Standard easings
        smooth: "power2.out",       // Smooth acceleration
        smoothInOut: "power2.inOut", // Smooth acceleration and deceleration
        bounce: "back.out(1.7)",    // Slight overshoot with bounce
        elastic: "elastic.out(1.2, 0.5)", // Elastic overshoot
        strong: "power3.out",       // More pronounced acceleration
        strongInOut: "power3.inOut", // More pronounced acceleration and deceleration
        expo: "expo.out",           // Exponential acceleration
        expoInOut: "expo.inOut",    // Exponential acceleration and deceleration
        
        // Custom brand-specific easings
        synapseBounce: "back.out(2)",
        synapseSmooth: "power2.out"
    },
    
    // Stagger timing for groups of elements
    stagger: {
        fast: 0.05,
        medium: 0.1,
        slow: 0.15
    },
    
    // Animation presets for common UI patterns
    presets: {
        // Fade in from transparent
        fadeIn: (element, options = {}) => ({
            opacity: 0,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.smooth
        }),
        
        // Fade in from below
        fadeInUp: (element, options = {}) => ({
            opacity: 0,
            y: options.distance || 20,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.smooth
        }),
        
        // Fade in from above
        fadeInDown: (element, options = {}) => ({
            opacity: 0,
            y: options.distance || -20,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.smooth
        }),
        
        // Fade in from left
        fadeInLeft: (element, options = {}) => ({
            opacity: 0,
            x: options.distance || -20,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.smooth
        }),
        
        // Fade in from right
        fadeInRight: (element, options = {}) => ({
            opacity: 0,
            x: options.distance || 20,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.smooth
        }),
        
        // Scale up from smaller size
        scaleIn: (element, options = {}) => ({
            opacity: 0,
            scale: options.scale || 0.9,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.bounce
        }),
        
        // Button hover effect
        buttonHover: (element, options = {}) => ({
            scale: options.scale || 1.02,
            duration: options.duration || AnimationConfig.duration.fast,
            ease: options.ease || AnimationConfig.ease.smooth
        }),
        
        // Button active/click effect
        buttonActive: (element, options = {}) => ({
            scale: options.scale || 0.98,
            duration: options.duration || AnimationConfig.duration.ultraFast,
            ease: options.ease || AnimationConfig.ease.smooth
        })
    },
    
    // Device-specific settings
    device: {
        // Detect if device is mobile/tablet
        isMobile: () => window.innerWidth < 768,
        
        // Get appropriate settings based on device
        getParticleCount: () => AnimationConfig.device.isMobile() ? 50 : 100,
        getAnimationDuration: (duration) => AnimationConfig.device.isMobile() ? duration * 0.8 : duration,
        getStaggerDuration: (duration) => AnimationConfig.device.isMobile() ? duration * 0.7 : duration
    },
    
    // Accessibility settings
    accessibility: {
        // Check if user prefers reduced motion
        prefersReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        
        // Get appropriate duration based on user preference
        getDuration: (duration) => {
            return AnimationConfig.accessibility.prefersReducedMotion() ? 
                Math.min(duration * 0.5, 0.3) : // Cap at 0.3s for reduced motion
                duration;
        },
        
        // Get appropriate distance based on user preference
        getDistance: (distance) => {
            return AnimationConfig.accessibility.prefersReducedMotion() ? 
                distance * 0.5 : 
                distance;
        }
    },
    
    // Performance optimization
    performance: {
        // Add will-change property to element before animation
        prepareElement: (element) => {
            if (!element) return;
            
            // Add will-change for properties that will be animated
            if (typeof element === 'string') {
                const elements = document.querySelectorAll(element);
                elements.forEach(el => {
                    el.style.willChange = 'transform, opacity';
                });
            } else if (element.style) {
                element.style.willChange = 'transform, opacity';
            }
        },
        
        // Reset will-change after animation completes
        cleanupElement: (element) => {
            if (!element) return;
            
            // Remove will-change after animation
            if (typeof element === 'string') {
                const elements = document.querySelectorAll(element);
                elements.forEach(el => {
                    el.style.willChange = 'auto';
                });
            } else if (element.style) {
                element.style.willChange = 'auto';
            }
        }
    }
};