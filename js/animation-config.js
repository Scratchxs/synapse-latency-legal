const AnimationConfig = {
    duration: {
        ultraFast: 0.1,
        fast: 0.2,
        medium: 0.4,
        slow: 0.8,
        extraSlow: 1.2
    },

    ease: {
        smooth: "power2.out",
        smoothInOut: "power2.inOut",
        bounce: "back.out(1.7)",
        elastic: "elastic.out(1.2, 0.5)",
        strong: "power3.out",
        strongInOut: "power3.inOut",
        expo: "expo.out",
        expoInOut: "expo.inOut",

        synapseBounce: "back.out(2)",
        synapseSmooth: "power2.out"
    },

    stagger: {
        fast: 0.05,
        medium: 0.1,
        slow: 0.15
    },

    presets: {
        fadeIn: (element, options = {}) => ({
            opacity: 0,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.smooth
        }),

        fadeInUp: (element, options = {}) => ({
            opacity: 0,
            y: options.distance || 20,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.smooth
        }),

        fadeInDown: (element, options = {}) => ({
            opacity: 0,
            y: options.distance || -20,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.smooth
        }),

        fadeInLeft: (element, options = {}) => ({
            opacity: 0,
            x: options.distance || -20,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.smooth
        }),

        fadeInRight: (element, options = {}) => ({
            opacity: 0,
            x: options.distance || 20,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.smooth
        }),

        scaleIn: (element, options = {}) => ({
            opacity: 0,
            scale: options.scale || 0.9,
            duration: options.duration || AnimationConfig.duration.medium,
            ease: options.ease || AnimationConfig.ease.bounce
        }),

        buttonHover: (element, options = {}) => ({
            scale: options.scale || 1.02,
            duration: options.duration || AnimationConfig.duration.fast,
            ease: options.ease || AnimationConfig.ease.smooth
        }),

        buttonActive: (element, options = {}) => ({
            scale: options.scale || 0.98,
            duration: options.duration || AnimationConfig.duration.ultraFast,
            ease: options.ease || AnimationConfig.ease.smooth
        })
    },

    device: {
        isMobile: () => window.innerWidth < 768,

        getParticleCount: () => AnimationConfig.device.isMobile() ? 50 : 100,
        getAnimationDuration: (duration) => AnimationConfig.device.isMobile() ? duration * 0.8 : duration,
        getStaggerDuration: (duration) => AnimationConfig.device.isMobile() ? duration * 0.7 : duration
    },

    accessibility: {
        prefersReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,

        getDuration: (duration) => {
            return AnimationConfig.accessibility.prefersReducedMotion() ?
                Math.min(duration * 0.5, 0.3) :
                duration;
        },

        getDistance: (distance) => {
            return AnimationConfig.accessibility.prefersReducedMotion() ?
                distance * 0.5 :
                distance;
        }
    },

    performance: {
        prepareElement: (element) => {
            if (!element) return;

            if (typeof element === 'string') {
                const elements = document.querySelectorAll(element);
                elements.forEach(el => {
                    el.style.willChange = 'transform, opacity';
                });
            } else if (element.style) {
                element.style.willChange = 'transform, opacity';
            }
        },

        cleanupElement: (element) => {
            if (!element) return;

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
