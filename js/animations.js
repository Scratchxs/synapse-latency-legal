/**
 * Animations.js - Enhanced animations for Synapse: Latency Privacy Policy
 * Uses GSAP for smooth animations and transitions
 * Implements performance optimizations and accessibility features
 */

class UIAnimations {
    constructor() {
        // Check for reduced motion preference
        this.reducedMotion = AnimationConfig.accessibility.prefersReducedMotion();
        
        // Initialize animation system
        this.init();
        
        // Listen for reduced motion preference changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
            this.reducedMotion = AnimationConfig.accessibility.prefersReducedMotion();
        });
    }

    init() {
        // Initialize animations when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.setupHeaderAnimation();
            this.setupContentAnimation();
            this.setupSectionAnimations();
            this.setupFooterAnimation();
        });
    }

    setupHeaderAnimation() {
        // Animate header elements
        const header = document.querySelector('header');
        const title = document.querySelector('h1');
        const lastUpdated = document.querySelector('p em');
        
        if (header && title) {
            // Prepare elements for animation
            AnimationConfig.performance.prepareElement(header);
            AnimationConfig.performance.prepareElement(title);
            if (lastUpdated) AnimationConfig.performance.prepareElement(lastUpdated);
            
            // Get appropriate duration based on user preference
            const duration = AnimationConfig.accessibility.getDuration(AnimationConfig.duration.slow);
            const distance = AnimationConfig.accessibility.getDistance(30);
            
            // Create a timeline for better sequencing
            const tl = gsap.timeline();
            
            // Header animation
            tl.from(header, { 
                y: -distance, 
                opacity: 0, 
                duration: duration, 
                ease: AnimationConfig.ease.strong,
                clearProps: "transform",
                onComplete: () => AnimationConfig.performance.cleanupElement(header)
            });
            
            // Title animation
            tl.from(title, { 
                y: -AnimationConfig.accessibility.getDistance(20), 
                opacity: 0, 
                duration: duration, 
                ease: AnimationConfig.ease.bounce,
                clearProps: "transform",
                onComplete: () => AnimationConfig.performance.cleanupElement(title)
            }, "-=0.4"); // Overlap with previous animation
            
            // Last updated animation
            if (lastUpdated) {
                tl.from(lastUpdated, { 
                    opacity: 0, 
                    duration: duration, 
                    ease: AnimationConfig.ease.smooth,
                    clearProps: "opacity",
                    onComplete: () => AnimationConfig.performance.cleanupElement(lastUpdated)
                }, "-=0.3"); // Overlap with previous animation
            }
        }
    }

    setupContentAnimation() {
        // Animate main content container
        const container = document.querySelector('.container');
        
        if (container) {
            // Prepare element for animation
            AnimationConfig.performance.prepareElement(container);
            
            // Get appropriate duration based on user preference
            const duration = AnimationConfig.accessibility.getDuration(AnimationConfig.duration.slow);
            const distance = AnimationConfig.accessibility.getDistance(30);
            
            // Main container animation
            gsap.from(container, { 
                y: distance, 
                opacity: 0, 
                duration: duration, 
                delay: 0.2, 
                ease: AnimationConfig.ease.strong,
                clearProps: "transform",
                onComplete: () => AnimationConfig.performance.cleanupElement(container)
            });
            
            // Skip hover effects if user prefers reduced motion
            if (!this.reducedMotion) {
                // Add hover effect to container using debounced event listeners
                let hoverTimeout;
                
                container.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                    AnimationConfig.performance.prepareElement(container);
                    
                    gsap.to(container, { 
                        y: -5, 
                        boxShadow: "0 10px 30px rgba(138, 43, 226, 0.3)", 
                        duration: AnimationConfig.duration.fast,
                        ease: AnimationConfig.ease.smooth
                    });
                });
                
                container.addEventListener('mouseleave', () => {
                    clearTimeout(hoverTimeout);
                    
                    gsap.to(container, { 
                        y: 0, 
                        boxShadow: "0 4px 20px rgba(138, 43, 226, 0.2)", 
                        duration: AnimationConfig.duration.fast,
                        ease: AnimationConfig.ease.smooth,
                        onComplete: () => {
                            // Cleanup after animation completes with a small delay
                            hoverTimeout = setTimeout(() => {
                                AnimationConfig.performance.cleanupElement(container);
                            }, 300);
                        }
                    });
                });
            }
        }
    }

    setupSectionAnimations() {
        // Animate sections with staggered effect
        const sections = document.querySelectorAll('h2');
        const paragraphs = document.querySelectorAll('p:not(p em)');
        const lists = document.querySelectorAll('ul');
        
        if (sections.length > 0) {
            // Create a timeline for better sequencing
            const tl = gsap.timeline();
            
            // Get appropriate durations and distances based on user preference
            const duration = AnimationConfig.accessibility.getDuration(AnimationConfig.duration.medium);
            const distance = AnimationConfig.accessibility.getDistance(20);
            const staggerTime = this.reducedMotion ? 0.03 : AnimationConfig.stagger.medium;
            
            // Prepare elements for animation
            sections.forEach(section => AnimationConfig.performance.prepareElement(section));
            
            // Sections staggered animation
            tl.from(sections, { 
                x: -distance, 
                opacity: 0, 
                duration: duration, 
                stagger: staggerTime, 
                ease: AnimationConfig.ease.strong,
                clearProps: "transform",
                onComplete: () => {
                    sections.forEach(section => AnimationConfig.performance.cleanupElement(section));
                }
            }, "+=0.2");
            
            // Prepare elements for animation
            paragraphs.forEach(paragraph => AnimationConfig.performance.prepareElement(paragraph));
            
            // Paragraphs staggered animation
            tl.from(paragraphs, { 
                y: distance, 
                opacity: 0, 
                duration: duration, 
                stagger: staggerTime * 0.5, 
                ease: AnimationConfig.ease.smooth,
                clearProps: "transform",
                onComplete: () => {
                    paragraphs.forEach(paragraph => AnimationConfig.performance.cleanupElement(paragraph));
                }
            }, "-=0.5");
            
            // Prepare elements for animation
            lists.forEach(list => AnimationConfig.performance.prepareElement(list));
            
            // Lists staggered animation
            tl.from(lists, { 
                x: distance, 
                opacity: 0, 
                duration: duration, 
                stagger: staggerTime, 
                ease: AnimationConfig.ease.smooth,
                clearProps: "transform",
                onComplete: () => {
                    lists.forEach(list => AnimationConfig.performance.cleanupElement(list));
                }
            }, "-=0.5");
            
            // Animate list items with staggered effect
            lists.forEach(list => {
                const items = list.querySelectorAll('li');
                
                if (items.length > 0) {
                    // Prepare elements for animation
                    items.forEach(item => AnimationConfig.performance.prepareElement(item));
                    
                    // Items staggered animation
                    gsap.from(items, { 
                        x: distance * 0.5, 
                        opacity: 0, 
                        duration: duration * 0.8, 
                        stagger: staggerTime * 0.3, 
                        ease: AnimationConfig.ease.smooth,
                        delay: 0.5, // Delay to ensure parent list is visible
                        clearProps: "transform",
                        onComplete: () => {
                            items.forEach(item => AnimationConfig.performance.cleanupElement(item));
                        }
                    });
                }
            });
        }
        
        // Add hover animations to links
        if (!this.reducedMotion) {
            const links = document.querySelectorAll('a');
            
            links.forEach(link => {
                // Use object pooling for event handlers
                const hoverHandler = () => {
                    AnimationConfig.performance.prepareElement(link);
                    gsap.to(link, { 
                        color: "#b44dff", 
                        scale: 1.05, 
                        duration: AnimationConfig.duration.fast,
                        ease: AnimationConfig.ease.smooth
                    });
                };
                
                const leaveHandler = () => {
                    gsap.to(link, { 
                        color: "#8A2BE2", 
                        scale: 1, 
                        duration: AnimationConfig.duration.fast,
                        ease: AnimationConfig.ease.smooth,
                        clearProps: "transform",
                        onComplete: () => AnimationConfig.performance.cleanupElement(link)
                    });
                };
                
                // Add event listeners
                link.addEventListener('mouseenter', hoverHandler);
                link.addEventListener('mouseleave', leaveHandler);
                link.addEventListener('focus', hoverHandler);
                link.addEventListener('blur', leaveHandler);
            });
        }
    }

    setupFooterAnimation() {
        // Animate footer elements
        const footer = document.querySelector('.footer');
        const smiley = document.querySelector('.smiley');
        
        if (footer) {
            // Prepare elements for animation
            AnimationConfig.performance.prepareElement(footer);
            if (smiley) AnimationConfig.performance.prepareElement(smiley);
            
            // Get appropriate duration based on user preference
            const duration = AnimationConfig.accessibility.getDuration(AnimationConfig.duration.medium);
            
            // Create a timeline for better sequencing
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footer,
                    start: "top bottom-=100",
                    toggleActions: "play none none none"
                }
            });
            
            // Footer animation
            tl.from(footer, { 
                y: AnimationConfig.accessibility.getDistance(20), 
                opacity: 0, 
                duration: duration, 
                ease: AnimationConfig.ease.smooth,
                clearProps: "transform",
                onComplete: () => AnimationConfig.performance.cleanupElement(footer)
            });
            
            // Smiley animation
            if (smiley && !this.reducedMotion) {
                tl.from(smiley, { 
                    scale: 0, 
                    rotation: -180, 
                    opacity: 0, 
                    duration: duration, 
                    ease: AnimationConfig.ease.elastic,
                    clearProps: "transform",
                    onComplete: () => {
                        AnimationConfig.performance.cleanupElement(smiley);
                        
                        // Add a subtle hover animation to smiley
                        gsap.to(smiley, {
                            y: -5,
                            duration: 1.5,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut"
                        });
                    }
                }, "-=0.2");
            } else if (smiley) {
                // Simple fade in for reduced motion
                tl.from(smiley, { 
                    opacity: 0, 
                    duration: duration, 
                    ease: AnimationConfig.ease.smooth,
                    clearProps: "opacity",
                    onComplete: () => AnimationConfig.performance.cleanupElement(smiley)
                }, "-=0.2");
            }
        }
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Wait for GSAP to load
    if (typeof gsap !== 'undefined') {
        new UIAnimations();
    } else {
        console.error('GSAP is not loaded. Animations cannot be initialized.');
    }
});