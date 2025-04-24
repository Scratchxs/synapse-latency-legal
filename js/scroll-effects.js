/**
 * Scroll Effects for Synapse: Latency
 * Enhances the cyberpunk theme with advanced scroll animations
 * Uses GSAP ScrollTrigger for scroll-based effects
 */

// Initialize scroll effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin if GSAP is available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Initialize all scroll effects
        initScrollEffects();
    } else {
        console.error('GSAP or ScrollTrigger not loaded. Scroll effects cannot be initialized.');
    }
});

/**
 * Initialize all scroll effects
 */
function initScrollEffects() {
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only apply advanced effects if reduced motion is not preferred
    if (!reducedMotion) {
        createScrollProgressIndicator();
        initParallaxEffects();
        initTextGlitchOnScroll();
        initSectionRevealEffects();
        createDynamicGrid();
        enhanceCursorInteractions();
    } else {
        // Apply minimal effects for reduced motion preference
        createSimpleScrollIndicator();
    }
}

/**
 * Create a cyberpunk-styled scroll progress indicator
 */
function createScrollProgressIndicator() {
    // Create scroll progress container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    progressContainer.style.position = 'fixed';
    progressContainer.style.top = '0';
    progressContainer.style.left = '0';
    progressContainer.style.width = '100%';
    progressContainer.style.height = '5px';
    progressContainer.style.zIndex = '1000';
    progressContainer.style.pointerEvents = 'none';
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.height = '100%';
    progressBar.style.width = '0%';
    progressBar.style.background = 'linear-gradient(90deg, #5b0909, #ff003c)';
    progressBar.style.boxShadow = '0 0 10px rgba(255, 0, 60, 0.7)';
    progressBar.style.transition = 'width 0.05s linear';
    
    // Add glitch effect to progress bar
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'scroll-progress-glitch';
    glitchOverlay.style.position = 'absolute';
    glitchOverlay.style.top = '0';
    glitchOverlay.style.right = '0';
    glitchOverlay.style.width = '10px';
    glitchOverlay.style.height = '100%';
    glitchOverlay.style.background = '#ffffff';
    glitchOverlay.style.opacity = '0';
    
    // Append elements
    progressContainer.appendChild(progressBar);
    progressBar.appendChild(glitchOverlay);
    document.body.appendChild(progressContainer);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollProgress}%`;
        
        // Add random glitch effect
        if (Math.random() > 0.95) {
            gsap.to(glitchOverlay, {
                opacity: 0.8,
                duration: 0.1,
                onComplete: () => {
                    gsap.to(glitchOverlay, {
                        opacity: 0,
                        duration: 0.1
                    });
                }
            });
        }
    });
}

/**
 * Create a simple scroll indicator for reduced motion preference
 */
function createSimpleScrollIndicator() {
    // Create scroll progress container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    progressContainer.style.position = 'fixed';
    progressContainer.style.top = '0';
    progressContainer.style.left = '0';
    progressContainer.style.width = '100%';
    progressContainer.style.height = '3px';
    progressContainer.style.zIndex = '1000';
    progressContainer.style.pointerEvents = 'none';
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.height = '100%';
    progressBar.style.width = '0%';
    progressBar.style.background = '#5b0909';
    progressBar.style.transition = 'width 0.3s ease';
    
    // Append elements
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollProgress}%`;
    });
}

/**
 * Initialize parallax effects for depth
 */
function initParallaxEffects() {
    // Create a subtle parallax effect for the bottom gradient
    gsap.to('.bottom-gradient', {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        },
        y: '20%',
        ease: 'none'
    });
    
    // Add parallax effect to headings
    gsap.utils.toArray('h1, h2').forEach(heading => {
        gsap.to(heading, {
            scrollTrigger: {
                trigger: heading,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: -20,
            ease: 'none'
        });
    });
}

/**
 * Initialize text glitch effects triggered by scrolling
 */
function initTextGlitchOnScroll() {
    // Add glitch effect to headings when they enter the viewport
    gsap.utils.toArray('h2').forEach(heading => {
        ScrollTrigger.create({
            trigger: heading,
            start: 'top 80%',
            onEnter: () => {
                // Create glitch timeline
                const glitchTl = gsap.timeline();
                
                // Add glitch effect
                glitchTl.to(heading, {
                    skewX: 20,
                    duration: 0.1,
                    ease: 'steps(1)'
                });
                
                glitchTl.to(heading, {
                    skewX: -15,
                    duration: 0.1,
                    ease: 'steps(1)'
                });
                
                glitchTl.to(heading, {
                    skewX: 0,
                    duration: 0.1,
                    ease: 'power1.out'
                });
                
                // Add color shift
                glitchTl.to(heading, {
                    color: '#ff003c',
                    textShadow: '0 0 5px rgba(255, 0, 60, 0.7)',
                    duration: 0.2,
                    ease: 'steps(1)',
                    onComplete: () => {
                        gsap.to(heading, {
                            color: '',
                            textShadow: '',
                            duration: 0.3,
                            ease: 'power1.out'
                        });
                    }
                }, '-=0.1');
            },
            once: true
        });
    });
}

/**
 * Initialize section reveal effects
 */
function initSectionRevealEffects() {
    // Add reveal effect to paragraphs
    gsap.utils.toArray('p').forEach((paragraph, index) => {
        gsap.from(paragraph, {
            scrollTrigger: {
                trigger: paragraph,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.05 % 0.2 // Stagger but reset every 4 paragraphs
        });
    });
    
    // Add reveal effect to list items with stagger
    gsap.utils.toArray('ul').forEach(list => {
        const items = list.querySelectorAll('li');
        
        gsap.from(items, {
            scrollTrigger: {
                trigger: list,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
}

/**
 * Create a dynamic grid background that reacts to scrolling
 */
function createDynamicGrid() {
    // Create grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'dynamic-grid';
    gridContainer.style.position = 'fixed';
    gridContainer.style.top = '0';
    gridContainer.style.left = '0';
    gridContainer.style.width = '100%';
    gridContainer.style.height = '100%';
    gridContainer.style.zIndex = '-2';
    gridContainer.style.pointerEvents = 'none';
    gridContainer.style.backgroundImage = 'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(to right, var(--grid-color) 1px, transparent 1px)';
    gridContainer.style.backgroundSize = '40px 40px';
    gridContainer.style.opacity = '0.15';
    
    // Append to body
    document.body.appendChild(gridContainer);
    
    // Create grid animation
    gsap.to(gridContainer, {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        },
        backgroundPosition: '0 -100px',
        ease: 'none'
    });
    
    // Add pulse effect on scroll
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Detect scroll direction and speed
        const scrollSpeed = Math.abs(scrollTop - lastScrollTop);
        lastScrollTop = scrollTop;
        
        // Apply pulse effect based on scroll speed
        if (scrollSpeed > 15) {
            gsap.to(gridContainer, {
                opacity: 0.25,
                duration: 0.3,
                onComplete: () => {
                    gsap.to(gridContainer, {
                        opacity: 0.15,
                        duration: 0.5
                    });
                }
            });
        }
    });
}

/**
 * Enhance cursor interactions with content
 */
function enhanceCursorInteractions() {
    // Only apply to devices with pointer support
    if (!window.matchMedia('(pointer: fine)').matches) return;
    
    // Add hover effect to links
    gsap.utils.toArray('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Get cursor elements
            const cursorTrail = document.querySelector('.cursor-trail');
            const cursorGlitch = document.querySelector('.cursor-glitch');
            
            if (cursorTrail && cursorGlitch) {
                // Scale up cursor elements
                gsap.to(cursorTrail, {
                    scale: 1.5,
                    borderColor: '#ff003c',
                    duration: 0.3
                });
                
                gsap.to(cursorGlitch, {
                    backgroundColor: '#ff003c',
                    scale: 1.5,
                    duration: 0.3
                });
            }
        });
        
        link.addEventListener('mouseleave', () => {
            // Get cursor elements
            const cursorTrail = document.querySelector('.cursor-trail');
            const cursorGlitch = document.querySelector('.cursor-glitch');
            
            if (cursorTrail && cursorGlitch) {
                // Reset cursor elements
                gsap.to(cursorTrail, {
                    scale: 1,
                    borderColor: 'var(--highlight-color)',
                    duration: 0.3
                });
                
                gsap.to(cursorGlitch, {
                    backgroundColor: 'var(--highlight-color)',
                    scale: 1,
                    duration: 0.3
                });
            }
        });
    });
    
    // Add hover effect to headings
    gsap.utils.toArray('h1, h2').forEach(heading => {
        heading.addEventListener('mouseenter', () => {
            // Get cursor elements
            const cursorTrail = document.querySelector('.cursor-trail');
            const cursorGlitch = document.querySelector('.cursor-glitch');
            
            if (cursorTrail && cursorGlitch) {
                // Create glitch effect
                gsap.to(cursorGlitch, {
                    opacity: 0.9,
                    scale: 2,
                    duration: 0.2,
                    ease: 'steps(1)',
                    repeat: 2,
                    yoyo: true
                });
            }
        });
    });
}