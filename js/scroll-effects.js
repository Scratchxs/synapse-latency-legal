


document.addEventListener('DOMContentLoaded', () => {
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        
        initScrollEffects();
    } else {
        console.error('GSAP or ScrollTrigger not loaded. Scroll effects cannot be initialized.');
    }
});


function initScrollEffects() {
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    
    if (!reducedMotion) {
        createScrollProgressIndicator();
        initParallaxEffects();
        initTextGlitchOnScroll();
        initSectionRevealEffects();
        createDynamicGrid();
        enhanceCursorInteractions();
    } else {
        
        createSimpleScrollIndicator();
    }
}


function createScrollProgressIndicator() {
    
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    progressContainer.style.position = 'fixed';
    progressContainer.style.top = '0';
    progressContainer.style.left = '0';
    progressContainer.style.width = '100%';
    progressContainer.style.height = '5px';
    progressContainer.style.zIndex = '1000';
    progressContainer.style.pointerEvents = 'none';
    
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.height = '100%';
    progressBar.style.width = '0%';
    progressBar.style.background = 'linear-gradient(90deg, #5b0909, #ff003c)';
    progressBar.style.boxShadow = '0 0 10px rgba(255, 0, 60, 0.7)';
    progressBar.style.transition = 'width 0.05s linear';
    
    
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'scroll-progress-glitch';
    glitchOverlay.style.position = 'absolute';
    glitchOverlay.style.top = '0';
    glitchOverlay.style.right = '0';
    glitchOverlay.style.width = '10px';
    glitchOverlay.style.height = '100%';
    glitchOverlay.style.background = '#ffffff';
    glitchOverlay.style.opacity = '0';
    
    
    progressContainer.appendChild(progressBar);
    progressBar.appendChild(glitchOverlay);
    document.body.appendChild(progressContainer);
    
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollProgress}%`;
        
        
        function isConsoleOpen() {
            const threshold = 160;
            return window.outerHeight - window.innerHeight > threshold ||
                   window.outerWidth - window.innerWidth > threshold;
        }
        
        
        if (!isConsoleOpen() && Math.random() > 0.98) { 
            gsap.to(glitchOverlay, {
                opacity: 0.6, 
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


function createSimpleScrollIndicator() {
    
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress-container';
    progressContainer.style.position = 'fixed';
    progressContainer.style.top = '0';
    progressContainer.style.left = '0';
    progressContainer.style.width = '100%';
    progressContainer.style.height = '3px';
    progressContainer.style.zIndex = '1000';
    progressContainer.style.pointerEvents = 'none';
    
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.height = '100%';
    progressBar.style.width = '0%';
    progressBar.style.background = '#5b0909';
    progressBar.style.transition = 'width 0.3s ease';
    
    
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollProgress}%`;
    });
}


function initParallaxEffects() {
    
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


function initTextGlitchOnScroll() {
    
    gsap.utils.toArray('h2').forEach(heading => {
        ScrollTrigger.create({
            trigger: heading,
            start: 'top 80%',
            onEnter: () => {
                
                const glitchTl = gsap.timeline();
                
                
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


function initSectionRevealEffects() {
    
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
            delay: index * 0.05 % 0.2 
        });
    });
    
    
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


function createDynamicGrid() {
    
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
    
    
    document.body.appendChild(gridContainer);
    
    
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
    
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        
        const scrollSpeed = Math.abs(scrollTop - lastScrollTop);
        lastScrollTop = scrollTop;
        
        
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


function enhanceCursorInteractions() {
    
    if (!window.matchMedia('(pointer: fine)').matches) return;
    
    
    gsap.utils.toArray('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            
            const cursorTrail = document.querySelector('.cursor-trail');
            const cursorGlitch = document.querySelector('.cursor-glitch');
            
            if (cursorTrail && cursorGlitch) {
                
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
            
            const cursorTrail = document.querySelector('.cursor-trail');
            const cursorGlitch = document.querySelector('.cursor-glitch');
            
            if (cursorTrail && cursorGlitch) {
                
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
    
    
    gsap.utils.toArray('h1, h2').forEach(heading => {
        heading.addEventListener('mouseenter', () => {
            
            const cursorTrail = document.querySelector('.cursor-trail');
            const cursorGlitch = document.querySelector('.cursor-glitch');
            
            if (cursorTrail && cursorGlitch) {
                
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
