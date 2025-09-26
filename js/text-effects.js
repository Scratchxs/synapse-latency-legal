


document.addEventListener('DOMContentLoaded', () => {
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    
    if (!reducedMotion) {
        initTextEffects();
    }
});


function initTextEffects() {
    createSplitTextEffects();
    addHoverEffects();
    createTextGlitchEffects();
    addDataStreamEffect();
}


function createSplitTextEffects() {
    
    if (typeof SplitText !== 'undefined') {
        
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
                    
                    h1.classList.add('text-effect-ready');
                }
            });
        }
    } else {
        
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


function addHoverEffects() {
    
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
    
    
    gsap.utils.toArray('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            
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


function createTextGlitchEffects() {
    
    const footerText = document.querySelectorAll('.footer');
    
    if (footerText.length > 0) {
        
        setInterval(() => {
            
            if (Math.random() > 0.9) {
                const randomIndex = Math.floor(Math.random() * footerText.length);
                const element = footerText[randomIndex];
                
                
                const glitchTl = gsap.timeline();
                
                
                const originalText = element.textContent;
                const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/';
                
                
                let glitchedText = '';
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() > 0.8) {
                        glitchedText += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
                    } else {
                        glitchedText += originalText.charAt(i);
                    }
                }
                
                
                glitchTl.to(element, {
                    duration: 0.1,
                    ease: 'steps(1)',
                    onStart: () => {
                        element.textContent = glitchedText;
                    }
                });
                
                
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
    
    
    const smiley = document.querySelector('.smiley');
    if (smiley) {
        
        setInterval(() => {
            
            if (Math.random() > 0.7) {
                const glitchTl = gsap.timeline();
                
                
                const originalText = smiley.textContent;
                
                
                const glitchOptions = [':(', ':|', ':/', ':?', ':>', ':<', ':$', ':@'];
                const glitchedText = glitchOptions[Math.floor(Math.random() * glitchOptions.length)];
                
                
                glitchTl.to(smiley, {
                    duration: 0.1,
                    ease: 'steps(1)',
                    onStart: () => {
                        smiley.textContent = glitchedText;
                    }
                });
                
                
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


function addDataStreamEffect() {
    
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
    
    
    document.body.appendChild(streamContainer);
    
    
    setInterval(() => {
        
        if (Math.random() > 0.9) {
            
            createDataStream(streamContainer);
        }
    }, 8000);
}


function createDataStream(container) {
    
    const stream = document.createElement('div');
    stream.className = 'data-stream';
    stream.style.position = 'absolute';
    stream.style.top = '-100%';
    stream.style.right = `${Math.random() * 250}px`;
    stream.style.width = '1px';
    stream.style.height = '100px';
    stream.style.background = 'linear-gradient(to bottom, rgba(255,0,60,0), rgba(255,0,60,0.7), rgba(255,0,60,0))';
    stream.style.boxShadow = '0 0 8px rgba(255,0,60,0.5)';
    
    
    container.appendChild(stream);
    
    
    gsap.to(container, {
        opacity: 0.7,
        duration: 0.5
    });
    
    
    gsap.to(stream, {
        top: '100%',
        duration: 2 + Math.random() * 3,
        ease: 'none',
        onComplete: () => {
            
            stream.remove();
            
            
            if (container.children.length === 0) {
                
                gsap.to(container, {
                    opacity: 0,
                    duration: 0.5
                });
            }
        }
    });
    
    
    const bitCount = 5 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < bitCount; i++) {
        
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
        
        
        stream.appendChild(bit);
    }
}
