/**
 * Text Effects for Synapse: Latency
 * Adds cyberpunk-themed text animations and effects
 */

// Initialize text effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only apply effects if reduced motion is not preferred
    if (!reducedMotion) {
        initTextEffects();
    }
});

/**
 * Initialize all text effects
 */
function initTextEffects() {
    createSplitTextEffects();
    addHoverEffects();
    createTextGlitchEffects();
    addDataStreamEffect();
}

/**
 * Create split text effects for headings
 * Uses GSAP SplitText if available, otherwise falls back to simple effects
 */
function createSplitTextEffects() {
    // Check if SplitText is available
    if (typeof SplitText !== 'undefined') {
        // Apply to main heading
        const h1 = document.querySelector('h1');
        if (h1) {
            const split = new SplitText(h1, { type: "chars" });
            const chars = split.chars;
            
            gsap.from(chars, {
                opacity: 0,
                y: 20,
                rotationX: -90,
                stagger: 0.02,
                duration: 0.8,
                ease: "back.out(1.7)",
                onComplete: () => {
                    // Add subtle hover effect after animation completes
                    h1.classList.add('text-effect-ready');
                }
            });
        }
    } else {
        // Fallback for when SplitText is not available
        const h1 = document.querySelector('h1');
        if (h1) {
            gsap.from(h1, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "back.out(1.7)",
                onComplete: () => {
                    h1.classList.add('text-effect-ready');
                }
            });
        }
    }
}

/**
 * Add hover effects to text elements
 */
function addHoverEffects() {
    // Add hover effect to headings
    gsap.utils.toArray('h2').forEach(heading => {
        heading.addEventListener('mouseenter', () => {
            gsap.to(heading, {
                color: 'var(--highlight-color)',
                textShadow: '0 0 8px var(--highlight-glow)',
                duration: 0.3
            });
        });
        
        heading.addEventListener('mouseleave', () => {
            gsap.to(heading, {
                color: '',
                textShadow: '',
                duration: 0.3
            });
        });
    });
    
    // Add hover effect to links with glitch
    gsap.utils.toArray('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Create glitch effect
            const glitchTl = gsap.timeline();
            
            glitchTl.to(link, {
                skewX: 10,
                color: '#ff003c',
                textShadow: '0 0 5px rgba(255, 0, 60, 0.7)',
                duration: 0.1,
                ease: 'steps(1)'
            });
            
            glitchTl.to(link, {
                skewX: -5,
                color: 'var(--highlight-color)',
                textShadow: '0 0 8px var(--highlight-glow)',
                duration: 0.1,
                ease: 'steps(1)'
            });
            
            glitchTl.to(link, {
                skewX: 0,
                duration: 0.1,
                ease: 'power1.out'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                skewX: 0,
                color: '',
                textShadow: '',
                duration: 0.3
            });
        });
    });
}

/**
 * Create text glitch effects
 */
function createTextGlitchEffects() {
    // Add random glitch effect to footer text
    const footerText = document.querySelectorAll('.footer');
    
    if (footerText.length > 0) {
        // Create interval for random glitches
        setInterval(() => {
            // Only trigger occasionally
            if (Math.random() > 0.9) {
                const randomIndex = Math.floor(Math.random() * footerText.length);
                const element = footerText[randomIndex];
                
                // Create glitch timeline
                const glitchTl = gsap.timeline();
                
                // Store original text
                const originalText = element.textContent;
                const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/';
                
                // Create glitched text
                let glitchedText = '';
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() > 0.8) {
                        glitchedText += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
                    } else {
                        glitchedText += originalText.charAt(i);
                    }
                }
                
                // Apply glitch
                glitchTl.to(element, {
                    duration: 0.1,
                    ease: 'steps(1)',
                    onStart: () => {
                        element.textContent = glitchedText;
                    }
                });
                
                // Restore original text
                glitchTl.to(element, {
                    duration: 0.1,
                    ease: 'steps(1)',
                    onStart: () => {
                        element.textContent = originalText;
                    }
                });
            }
        }, 3000);
    }
    
    // Add glitch effect to smiley
    const smiley = document.querySelector('.smiley');
    if (smiley) {
        // Create interval for random glitches
        setInterval(() => {
            // Only trigger occasionally
            if (Math.random() > 0.7) {
                const glitchTl = gsap.timeline();
                
                // Store original text
                const originalText = smiley.textContent;
                
                // Create glitched text options
                const glitchOptions = [':(', ':|', ':/', ':?', ':>', ':<', ':$', ':@'];
                const glitchedText = glitchOptions[Math.floor(Math.random() * glitchOptions.length)];
                
                // Apply glitch
                glitchTl.to(smiley, {
                    duration: 0.1,
                    ease: 'steps(1)',
                    onStart: () => {
                        smiley.textContent = glitchedText;
                    }
                });
                
                // Restore original text
                glitchTl.to(smiley, {
                    duration: 0.1,
                    ease: 'steps(1)',
                    onStart: () => {
                        smiley.textContent = originalText;
                    }
                });
            }
        }, 5000);
    }
}

/**
 * Add data stream effect to the page
 * Creates a cyberpunk-style data stream that appears occasionally
 */
function addDataStreamEffect() {
    // Create data stream container
    const streamContainer = document.createElement('div');
    streamContainer.className = 'data-stream-container';
    streamContainer.style.position = 'fixed';
    streamContainer.style.top = '0';
    streamContainer.style.right = '0';
    streamContainer.style.width = '300px';
    streamContainer.style.height = '100%';
    streamContainer.style.pointerEvents = 'none';
    streamContainer.style.zIndex = '5';
    streamContainer.style.overflow = 'hidden';
    streamContainer.style.opacity = '0';
    
    // Append to body
    document.body.appendChild(streamContainer);
    
    // Create interval for random data streams
    setInterval(() => {
        // Only trigger occasionally
        if (Math.random() > 0.9) {
            // Create data stream
            createDataStream(streamContainer);
        }
    }, 8000);
}

/**
 * Create a single data stream instance
 */
function createDataStream(container) {
    // Create stream element
    const stream = document.createElement('div');
    stream.className = 'data-stream';
    stream.style.position = 'absolute';
    stream.style.top = '-100%';
    stream.style.right = `${Math.random() * 250}px`;
    stream.style.width = '1px';
    stream.style.height = '100px';
    stream.style.background = 'linear-gradient(to bottom, rgba(255,0,60,0), rgba(255,0,60,0.7), rgba(255,0,60,0))';
    stream.style.boxShadow = '0 0 8px rgba(255,0,60,0.5)';
    
    // Append to container
    container.appendChild(stream);
    
    // Show container
    gsap.to(container, {
        opacity: 0.7,
        duration: 0.5
    });
    
    // Animate stream
    gsap.to(stream, {
        top: '100%',
        duration: 2 + Math.random() * 3,
        ease: 'none',
        onComplete: () => {
            // Remove stream
            stream.remove();
            
            // Check if container is empty
            if (container.children.length === 0) {
                // Hide container
                gsap.to(container, {
                    opacity: 0,
                    duration: 0.5
                });
            }
        }
    });
    
    // Add data bits to stream
    const bitCount = 5 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < bitCount; i++) {
        // Create data bit
        const bit = document.createElement('div');
        bit.className = 'data-bit';
        bit.style.position = 'absolute';
        bit.style.width = '3px';
        bit.style.height = '3px';
        bit.style.borderRadius = '50%';
        bit.style.backgroundColor = '#ff003c';
        bit.style.boxShadow = '0 0 5px rgba(255,0,60,0.7)';
        bit.style.top = `${i * (100 / bitCount)}%`;
        bit.style.right = '-1px';
        
        // Append to stream
        stream.appendChild(bit);
    }
}