


let originalTitleGlitchTl = null;
let originalLogoGlitchTl = null;
let originalRgbTl = null; 
let subtitlePersistentGlitchTl = null; 
let gradientBreathingTween = null; 
let cyberGridTween = null; 
let easterEggTriggered = false; 


function initAnimations() {
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    
    initCyberpunkSplashScreen(reducedMotion);

    
    
    setTimeout(() => {
        initGlitchEffects();
    }, 4500); 
}


function initCyberpunkSplashScreen(reducedMotion) {
    
    createCyberpunkSplashParticles();
    
    
    generateBinaryData();
    
    
    if (document.querySelector(".logo")) {
        gsap.set(".logo", { scale: 0, opacity: 0 });
    }
    if (document.querySelector(".company-name")) {
        gsap.set(".company-name", { opacity: 0 });
    }
    
    
    gsap.set(".splash-logo", { opacity: 0 });
    gsap.set(".splash-logo-glitch", { opacity: 0 });
    gsap.set(".splash-text-primary", { opacity: 0 });
    gsap.set(".splash-text-secondary", { opacity: 0 });
    gsap.set(".splash-text-glitch", { opacity: 0 });
    gsap.set(".digital-noise", { opacity: 0 });
    gsap.set(".splash-scanlines", { opacity: 0 });
    gsap.set(".cyber-loading-bar", { opacity: 0 });
    gsap.set(".binary-data", { opacity: 0 });
    
    
    const tl = gsap.timeline({
        onComplete: () => {
            
            transitionToMainContent(reducedMotion);
        }
    });
    
    
    tl.to({}, {
        duration: 0.1,
        onStart: () => {
            addGlitchFlash();
        }
    });
    
    
    tl.to(".digital-noise", {
        opacity: 0.05,
        duration: 0.3,
        ease: "power2.out"
    }, 0);
    
    tl.to(".splash-scanlines", {
        opacity: 0.2,
        duration: 0.3,
        ease: "power2.out"
    }, 0);
    
    
    tl.to(".splash-logo", {
        opacity: 1,
        duration: 0.5,
        ease: "steps(5)",
        onComplete: () => {
            
            startLogoGlitchAnimations();
        }
    }, 0.3);
    
    
    tl.to(".splash-text-primary", {
        opacity: 1,
        duration: 0.4,
        ease: "steps(4)"
    }, 0.8);
    
    
    tl.to(".splash-text-secondary", {
        opacity: 1,
        duration: 0.4,
        ease: "steps(4)"
    }, 1.0);
    
    
    tl.to(".cyber-loading-bar", {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
    }, 1.2);
    
    
    tl.to(".binary-data", {
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.out"
    }, 1.4);
    
    
    if (!reducedMotion) {
        
        [0.6, 1.5, 2.5, 3.5].forEach(time => {
            tl.to({}, {
                duration: 0.01,
                onStart: () => {
                    addGlitchFlash();
                }
            }, time);
        });
    }
    
    
    tl.to({}, {
        duration: 0.01,
        onStart: () => {
            addIntenseGlitchEffect();
        }
    }, 3.8);
}


function generateBinaryData() {
    const binaryContainer = document.querySelector('.binary-data');
    if (!binaryContainer) return;
    
    
    const messages = [
        "SYSTEM BOOT SEQUENCE INITIATED",
        "NEURAL INTERFACE ONLINE",
        "SYNAPSE PROTOCOL ACTIVATED",
        "LATENCY COMPENSATION ENGAGED",
        "ESTABLISHING SECURE CONNECTION"
    ];
    
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    
    let binaryPrefix = "";
    for (let i = 0; i < 16; i++) {
        binaryPrefix += Math.round(Math.random());
    }
    
    
    binaryContainer.textContent = `${binaryPrefix} :: ${message} :: ${binaryPrefix}`;
    
    
    animateBinaryData(binaryContainer);
}


function animateBinaryData(container) {
    if (!container) return;
    
    
    const text = container.textContent;
    
    
    const interval = setInterval(() => {
        let newText = "";
        
        for (let i = 0; i < text.length; i++) {
            
            if (text[i] === '0' || text[i] === '1') {
                
                if (Math.random() < 0.2) {
                    newText += text[i] === '0' ? '1' : '0';
                } else {
                    newText += text[i];
                }
            } else {
                newText += text[i];
            }
        }
        
        container.textContent = newText;
    }, 200);
    
    
    container.dataset.intervalId = interval;
}


function startLogoGlitchAnimations() {
    
    gsap.to(".splash-logo-glitch-1", {
        opacity: 0,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 1.5,
        yoyo: true
    });
    
    gsap.to(".splash-logo-glitch-2", {
        opacity: 0,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 2.3,
        yoyo: true,
        delay: 0.5
    });
    
    
    gsap.to(".splash-text-glitch-1", {
        opacity: 0,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 1.7,
        yoyo: true
    });
    
    gsap.to(".splash-text-glitch-2", {
        opacity: 0,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 2.1,
        yoyo: true,
        delay: 0.7
    });
}


function addGlitchFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = '#ffffff';
    flash.style.opacity = '0';
    flash.style.zIndex = '10';
    flash.style.mixBlendMode = 'overlay';
    document.getElementById('splash-screen').appendChild(flash);
    
    
    const colors = ['#ff003c'];

    const color = '#ff003c';
    flash.style.backgroundColor = color;
    
    
    gsap.to(flash, {
        opacity: 0.3,
        duration: 0.05,
        ease: "steps(1)",
        onComplete: () => {
            gsap.to(flash, {
                opacity: 0,
                duration: 0.05,
                ease: "steps(1)",
                onComplete: () => {
                    if (flash.parentNode) {
                        flash.parentNode.removeChild(flash);
                    }
                }
            });
        }
    });
    
    
    const glitchContainer = document.querySelector('.glitch-container');
    if (glitchContainer) {
        const xShift = (Math.random() - 0.5) * 10;
        const yShift = (Math.random() - 0.5) * 10;
        
        gsap.to(glitchContainer, {
            x: xShift,
            y: yShift,
            duration: 0.05,
            ease: "steps(1)",
            onComplete: () => {
                gsap.to(glitchContainer, {
                    x: 0,
                    y: 0,
                    duration: 0.05,
                    ease: "steps(1)"
                });
            }
        });
    }
}


function addIntenseGlitchEffect() {
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            addGlitchFlash();
        }, i * 100);
    }
    
    
    const container = document.querySelector('.glitch-container');
    if (container) {
        gsap.to(container, {
            filter: 'contrast(180%) brightness(150%) saturate(120%)',
            duration: 0.2,
            ease: "steps(2)",
            onComplete: () => {
                gsap.to(container, {
                    filter: 'none',
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });
    }
    
    
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        
        const timeline = gsap.timeline();
        
        
        timeline.to(splashScreen, {
            x: "+=15",
            y: "-=8",
            rotation: 0.5,
            duration: 0.04,
            ease: "steps(1)"
        });
        
        timeline.to(splashScreen, {
            x: "-=20",
            y: "+=10",
            rotation: -0.7,
            duration: 0.04,
            ease: "steps(1)"
        });
        
        timeline.to(splashScreen, {
            x: "+=12",
            y: "-=12",
            rotation: 0.3,
            duration: 0.04,
            ease: "steps(1)"
        });
        
        timeline.to(splashScreen, {
            x: "-=7",
            y: "+=10",
            rotation: -0.5,
            duration: 0.04,
            ease: "steps(1)"
        });
        
        timeline.to(splashScreen, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.05,
            ease: "power1.out"
        });
    }
}


function createCyberpunkSplashParticles() {
    const container = document.querySelector('.splash-particles');
    if (!container) return;

    
    container.innerHTML = '';

    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    
    const particleCount = reducedMotion ? 30 : 60;

    
    
    const colors = [
        'rgba(255, 255, 255, 0.7)',   
        'rgba(255, 255, 255, 0.5)',   
        'rgba(255, 255, 255, 0.3)',   
        'rgba(255, 255, 255, 0.8)'    
    ];

    
    // Commented out to remove white particles
    // for (let i = 0; i < particleCount; i++) {
    //     const particle = document.createElement('div');
    //     particle.className = 'particle';
    //
    //     const x = Math.random() * 100;
    //     const y = Math.random() * 100;
    //
    //     const size = Math.random() * 3 + 1;
    //
    //     const color = colors[Math.floor(Math.random() * colors.length)];
    //
    //     particle.style.left = `${x}%`;
    //     particle.style.top = `${y}%`;
    //     particle.style.width = `${size}px`;
    //     particle.style.height = `${size}px`;
    //     particle.style.backgroundColor = color;
    //     particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
    //     particle.style.position = 'absolute';
    //     particle.style.borderRadius = '50%';
    //
    //     container.appendChild(particle);
    //
    //     gsap.to(particle, {
    //         x: (Math.random() - 0.5) * 50,
    //         y: (Math.random() - 0.5) * 50,
    //         opacity: Math.random() * 0.7 + 0.3,
    //         duration: Math.random() * 4 + 3,
    //         repeat: -1,
    //         yoyo: true,
    //         ease: "sine.inOut"
    //     });
    // }
    
    
    createDigitalLines(container, reducedMotion);
}


function createDigitalLines(container, reducedMotion) {
    if (!container) return;
    
    
    const lineCount = reducedMotion ? 5 : 10;
    
    
    
    const colors = [
        'rgba(255, 255, 255, 0.4)',   
        'rgba(255, 255, 255, 0.2)',   
        'rgba(255, 255, 255, 0.1)',   
        'rgba(255, 255, 255, 0.5)'    
    ];
    
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        
        
        const isHorizontal = Math.random() > 0.5;
        
        
        const pos = Math.random() * 100;
        
        
        const thickness = Math.random() * 2 + 1;
        
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        
        line.style.position = 'absolute';
        line.style.backgroundColor = color;
        line.style.boxShadow = `0 0 10px ${color}`;
        
        if (isHorizontal) {
            line.style.width = '100%';
            line.style.height = `${thickness}px`;
            line.style.top = `${pos}%`;
            line.style.left = '0';
            
            
            gsap.fromTo(line,
                { left: '-100%' },
                {
                    left: '100%',
                    duration: Math.random() * 3 + 2,
                    ease: "power1.inOut",
                    repeat: -1,
                    delay: Math.random() * 5
                }
            );
        } else {
            line.style.height = '100%';
            line.style.width = `${thickness}px`;
            line.style.left = `${pos}%`;
            line.style.top = '0';
            
            
            gsap.fromTo(line,
                { top: '-100%' },
                {
                    top: '100%',
                    duration: Math.random() * 3 + 2,
                    ease: "power1.inOut",
                    repeat: -1,
                    delay: Math.random() * 5
                }
            );
        }
        
        
        container.appendChild(line);
    }
}


function transitionToMainContent(reducedMotion) {
    
    const binaryContainer = document.querySelector('.binary-data');
    if (binaryContainer && binaryContainer.dataset.intervalId) {
        clearInterval(parseInt(binaryContainer.dataset.intervalId));
    }

    
    if (!reducedMotion) {
        
        setTimeout(() => {
            fadeOutSplashScreen(reducedMotion);
        }, 100); 
    } else {
        
        fadeOutSplashScreen(reducedMotion);
    }
}


function fadeOutSplashScreen(reducedMotion) {
    
    gsap.to("#splash-screen", {
        opacity: 0,
        duration: reducedMotion ? 0.3 : 0.5,
        ease: "steps(5)",
        onComplete: () => {
            
            document.getElementById('splash-screen').style.display = 'none';

            
            document.getElementById('main-content').style.display = 'block';

            
            if (reducedMotion) {
                
                
                if (document.querySelector(".main-text-container")) gsap.set(".main-text-container", { opacity: 0 });
                if (document.querySelector(".glitch-title")) gsap.set(".glitch-title", { opacity: 0 });
                if (document.querySelector(".subtitle")) gsap.set(".subtitle", { opacity: 0 });
                if (document.querySelector(".neon-button")) gsap.set(".neon-button", { opacity: 0 });
                if (document.querySelector(".cyber-grid")) gsap.set(".cyber-grid", { opacity: 0 });
                if (document.querySelector(".logo")) gsap.set(".logo", { opacity: 0 }); 
                if (document.querySelector(".company-name")) gsap.set(".company-name", { opacity: 0 }); 
            } else {
                
                if (document.querySelector(".main-text-container")) gsap.set(".main-text-container", { opacity: 0, y: 30 });
                if (document.querySelector(".glitch-title")) gsap.set(".glitch-title", { opacity: 0 });
                if (document.querySelector(".subtitle")) gsap.set(".subtitle", { opacity: 0 });
                if (document.querySelector(".neon-button")) gsap.set(".neon-button", { opacity: 0, scale: 0.8 });
                if (document.querySelector(".cyber-grid")) gsap.set(".cyber-grid", { opacity: 0, rotationX: 45 });
                if (document.querySelector(".glitch-element")) gsap.set(".glitch-element", { opacity: 0, scale: 0 });
                if (document.querySelector(".data-stream")) gsap.set(".data-stream", { opacity: 0 });
                
            }
            

            
            
            
            gsap.to("#main-content", {
                opacity: 1, 
                duration: reducedMotion ? 0.3 : 0.5,
                ease: reducedMotion ? "power2.inOut" : "steps(5)",
                onComplete: () => {
                    
                    
                    if (document.querySelector(".main-text-container")) { 
                        if (reducedMotion) {
                            startReducedMotionAnimations();
                        } else {
                            startFullAnimations();
                        }
                    }
                }
            });
        }
    });
}


function startFullAnimations() {
    
    const tl = gsap.timeline();

    
    if (document.querySelector(".logo")) {
        tl.to(".logo", {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 0.2 
        });
    }
    if (document.querySelector(".company-name")) {
        tl.to(".company-name", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.4 
        }, "<"); 
    }

    
    if (document.querySelector(".main-text-container")) {
        tl.to(".main-text-container", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }

    
    if (document.querySelector(".glitch-title")) {
        tl.to(".glitch-title", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                
                applyTitleGlitch();
            }
        }, "-=0.4");
    }

    
    if (document.querySelector(".subtitle")) {
        tl.to(".subtitle", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.3");
    }

    
    if (document.querySelector(".neon-button")) {
        tl.to(".neon-button", {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
        }, "-=0.3");
    }

    
    if (document.querySelector(".cyber-grid")) {
        tl.to(".cyber-grid", {
            opacity: 0.4,
            rotationX: 30,
            duration: 1.5,
            ease: "power2.inOut"
        }, "-=0.5");
    }

    
    initCrtFlicker();

    
    if (document.querySelector(".glitch-element")) {
        initGlitchElements();
    }

    
    if (document.querySelector(".data-stream")) {
        initDataStreams();
    }

    
    if (document.querySelector(".logo")) {
        applyLogoGlitch(false);
    }

    
    if (document.querySelector("#about-modal")) {
        initAboutModal();
    }

    
    initGradientAnimation();
}


function startReducedMotionAnimations() {
    
    const tl = gsap.timeline();

    
    if (document.querySelector(".logo")) {
        tl.to(".logo", { opacity: 1, scale: 1, duration: 0.4 }); 
    }
    if (document.querySelector(".company-name")) {
        tl.to(".company-name", { opacity: 1, duration: 0.4 }, "-=0.2"); 
    }

    
    if (document.querySelector(".main-text-container")) {
        tl.to(".main-text-container", {
            opacity: 1,
            duration: 0.5
        });
    }

    
    if (document.querySelector(".glitch-title")) {
        tl.to(".glitch-title", {
            opacity: 1,
            duration: 0.3
        }, "-=0.2");
    }

    
    if (document.querySelector(".subtitle")) {
        tl.to(".subtitle", {
            opacity: 1,
            duration: 0.3
        }, "-=0.1");
    }

    
    if (document.querySelector(".neon-button")) {
        tl.to(".neon-button", {
            opacity: 1,
            duration: 0.3
        }, "-=0.1");
    }

    
    if (document.querySelector(".cyber-grid")) {
        tl.to(".cyber-grid", {
            opacity: 0.4,
            duration: 0.5
        }, "-=0.2");
    }

    
    if (document.querySelector(".logo")) {
        applyLogoGlitch(true);
    }

    
    if (document.querySelector("#about-modal")) {
        initAboutModal();
    }
}


function initGlitchEffects() {
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) return;

    
    applyTitleGlitch();
}


function applyTitleGlitch() {
    const title = document.querySelector('.glitch-title');
    const logo = document.querySelector('.sofia-logo');
    if (!title || !logo) return;

    
    if (originalTitleGlitchTl) originalTitleGlitchTl.kill();
    if (originalLogoGlitchTl) originalLogoGlitchTl.kill();
    if (originalRgbTl) originalRgbTl.kill();

    
    
    const repeatDelayMultiplier = typeof easterEggTriggered !== 'undefined' && easterEggTriggered ? 0.95 : 1; 
    const baseRepeatDelay = 5;

    
    originalTitleGlitchTl = gsap.timeline({ 
        repeat: -1,
        repeatDelay: baseRepeatDelay * repeatDelayMultiplier * 0.8, 
        paused: true
    });

    
    
    originalTitleGlitchTl.to(title, {
        skewX: 20,
        scale: 1.02,
        filter: 'contrast(1.2)',
        duration: 0.08,
        ease: "steps(1)"
    });
    originalTitleGlitchTl.to(title, {
        skewX: 0,
        scale: 1,
        filter: 'none',
        duration: 0.08,
        ease: "steps(1)"
    });
    
    
    originalTitleGlitchTl.to(title, {
        opacity: 0.7,
        letterSpacing: '3px',
        duration: 0.06,
        ease: "steps(1)"
    });
    originalTitleGlitchTl.to(title, {
        opacity: 1,
        letterSpacing: '2px',
        duration: 0.06,
        ease: "steps(1)"
    });
    
    
    originalTitleGlitchTl.to(title, {
        x: -10,
        y: 2,
        skewY: 2,
        duration: 0.08,
        ease: "steps(1)"
    });
    originalTitleGlitchTl.to(title, {
        x: 0,
        y: 0,
        skewY: 0,
        duration: 0.08,
        ease: "steps(1)"
    });
    
    
    originalTitleGlitchTl.to(title, {
        x: 10,
        skewX: -15,
        scale: 0.98,
        filter: 'brightness(1.1)',
        duration: 0.07,
        ease: "steps(1)"
    });
    originalTitleGlitchTl.to(title, {
        x: 0,
        skewX: 0,
        scale: 1,
        filter: 'none',
        duration: 0.07,
        ease: "steps(1)"
    });
    
    
    originalTitleGlitchTl.to(title, {
        '--before-x': '-5px',
        '--before-y': '3px',
        '--after-x': '5px',
        '--after-y': '-3px',
        duration: 0.1,
        ease: "steps(1)"
    });
    originalTitleGlitchTl.to(title, {
        '--before-x': '0px',
        '--before-y': '0px',
        '--after-x': '0px',
        '--after-y': '0px',
        duration: 0.1,
        ease: "steps(1)"
    });

    
    originalLogoGlitchTl = gsap.timeline({ 
        repeat: -1,
        repeatDelay: baseRepeatDelay * repeatDelayMultiplier, 
        paused: true
    });

    
    originalLogoGlitchTl.to(logo, { autoAlpha: 0.7, duration: 0.05, ease: "steps(1)" });
    originalLogoGlitchTl.to(logo, { autoAlpha: 1, duration: 0.1, ease: "steps(1)" });
    originalLogoGlitchTl.to(logo, { autoAlpha: 0.5, duration: 0.05, ease: "steps(1)" });
    originalLogoGlitchTl.to(logo, { autoAlpha: 0, duration: 0.05, ease: "steps(1)" });
    originalLogoGlitchTl.to(logo, { autoAlpha: 1, duration: 0.1, ease: "steps(1)" });
    originalLogoGlitchTl.to({}, { duration: 0.2 });
    originalLogoGlitchTl.to(logo, { autoAlpha: 0.6, duration: 0.05, ease: "steps(1)" });
    originalLogoGlitchTl.to(logo, { autoAlpha: 1, duration: 0.1, ease: "steps(1)" });

    
    originalRgbTl = gsap.timeline({ 
        repeat: -1,
        repeatDelay: 1.5 * repeatDelayMultiplier 
    });

    
    originalRgbTl.to(title, {
        '--before-x': '-7px',
        '--before-y': '3px',
        '--after-x': '7px',
        '--after-y': '-3px',
        duration: 0.15,
        ease: "steps(1)"
    });
    
    originalRgbTl.to(title, {
        '--before-x': '5px',
        '--before-y': '-6px',
        '--after-x': '-5px',
        '--after-y': '6px',
        duration: 0.15,
        ease: "steps(1)"
    });
    
    originalRgbTl.to(title, {
        '--before-x': '-3px',
        '--before-y': '-3px',
        '--after-x': '3px',
        '--after-y': '3px',
        duration: 0.15,
        ease: "steps(1)"
    });
    
    
    originalRgbTl.to(title, {
        '--before-x': '10px',
        '--before-y': '0px',
        '--after-x': '-10px',
        '--after-y': '0px',
        duration: 0.1,
        ease: "steps(1)"
    });
    
    originalRgbTl.to(title, {
        '--before-x': '0px',
        '--before-y': '0px',
        '--after-x': '0px',
        '--after-y': '0px',
        duration: 0.2,
        ease: "steps(1)"
    });
    
    
    const addRandomGlitchBurst = () => {
        
        const burstTl = gsap.timeline();
        
        
        for (let i = 0; i < 3; i++) {
            const xShift = Math.random() * 15 - 7.5;
            const yShift = Math.random() * 10 - 5;
            
            burstTl.to(title, {
                '--before-x': `${-xShift}px`,
                '--before-y': `${-yShift}px`,
                '--after-x': `${xShift}px`,
                '--after-y': `${yShift}px`,
                skewX: Math.random() * 10 - 5,
                scale: 0.98 + Math.random() * 0.04,
                filter: 'contrast(1.2) brightness(1.1)',
                duration: 0.05,
                ease: "steps(1)"
            });
            
            burstTl.to(title, {
                '--before-x': '0px',
                '--before-y': '0px',
                '--after-x': '0px',
                '--after-y': '0px',
                skewX: 0,
                scale: 1,
                filter: 'none',
                duration: 0.05,
                ease: "steps(1)"
            });
        }
    };
    
    
    setInterval(() => {
        if (Math.random() > 0.7 && easterEggTriggered !== true) { 
            addRandomGlitchBurst();
        }
    }, 5000); 

    
    originalTitleGlitchTl.play();
    originalLogoGlitchTl.play();
    

    
    
    if (typeof easterEggTriggered !== 'undefined' && easterEggTriggered && document.querySelector(".subtitle")) {
        applySubtitlePersistentGlitch();
    }
}



function initCrtFlicker() {
    const flicker = document.querySelector('.crt-flicker');
    if (!flicker) return;

    
    const flickerTl = gsap.timeline({
        repeat: -1
    });

    
    function addFlicker() {
        
        const intensity = Math.random() * 0.3 + 0.1;
        
        
        const duration = Math.random() * 0.15 + 0.05;
        
        
        const addColorTint = Math.random() > 0.8;
        const tint = addColorTint ? 'rgba(255, 0, 60, 0.05)' : 'rgba(255, 255, 255, 0.2)';
        
        flickerTl.to(flicker, {
            opacity: intensity,
            backgroundColor: tint,
            duration: duration,
            ease: "steps(1)"
        });

        flickerTl.to(flicker, {
            opacity: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            duration: duration,
            ease: "steps(1)"
        });

        
        
        const clusterFlicker = Math.random() > 0.7;
        const delay = clusterFlicker ?
            Math.random() * 0.5 + 0.1 :  
            Math.random() * 8 + 2;       
            
        flickerTl.to({}, {
            duration: delay
        });
    }

    
    for (let i = 0; i < 8; i++) {
        addFlicker();
    }
    
    
    setInterval(() => {
        if (Math.random() > 0.9) { 
            addScreenTear();
        }
    }, 5000); 
    
    
    function addScreenTear() {
        const tear = document.createElement('div');
        tear.style.position = 'fixed';
        tear.style.left = '0';
        tear.style.width = '100%';
        tear.style.height = '2px';
        tear.style.backgroundColor = Math.random() > 0.7 ? 'rgba(255, 0, 60, 0.7)' : 'rgba(255, 255, 255, 0.7)';
        tear.style.boxShadow = '0 0 8px ' + (Math.random() > 0.7 ? 'rgba(255, 0, 60, 0.7)' : 'rgba(255, 255, 255, 0.7)');
        tear.style.zIndex = '100';
        tear.style.opacity = '0.7';
        
        
        const topPos = Math.random() * 100;
        tear.style.top = `${topPos}%`;
        
        document.body.appendChild(tear);
        
        
        gsap.to(tear, {
            opacity: 0,
            width: '120%',
            left: '-10%',
            duration: 0.2,
            ease: "power1.out",
            onComplete: () => {
                if (tear.parentNode) {
                    tear.parentNode.removeChild(tear);
                }
            }
        });
    }
}


function initGlitchElements() {
    const glitchElements = document.querySelectorAll('.glitch-element');
    if (!glitchElements.length) return;

    
    glitchElements.forEach((element, index) => {
        
        const x = Math.random() * 80 + 10; 
        const y = Math.random() * 80 + 10; 

        
        const width = Math.random() * 150 + 50; 
        const height = Math.random() * 30 + 5; 

        
        gsap.set(element, {
            left: `${x}%`,
            top: `${y}%`,
            width: `${width}px`,
            height: `${height}px`,
            opacity: 0,
            backgroundColor: Math.random() > 0.8 ? 'rgba(255, 0, 60, 0.1)' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: Math.random() > 0.8 ? '0 0 10px rgba(255, 0, 60, 0.2)' : 'none'
        });

        
        const glitchTl = gsap.timeline({
            repeat: -1,
            repeatDelay: Math.random() * 4 + 2, 
            delay: index * 0.15 
        });

        
        
        glitchTl.to(element, {
            opacity: () => Math.random() * 0.15 + 0.05,
            scaleX: () => Math.random() * 2 + 0.5, 
            scaleY: () => Math.random() * 0.5 + 0.8,
            skewX: () => Math.random() * 20 - 10,
            duration: 0.08,
            ease: "steps(1)"
        });
        
        
        if (Math.random() > 0.5) { 
            glitchTl.to(element, {
                opacity: 0,
                duration: 0.04,
                ease: "steps(1)"
            });
            
            glitchTl.to(element, {
                opacity: () => Math.random() * 0.15 + 0.05,
                duration: 0.04,
                ease: "steps(1)"
            });
        }
        
        
        glitchTl.to(element, {
            opacity: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            duration: 0.08,
            ease: "steps(1)"
        });
        
        
        if (Math.random() > 0.7) { 
            
            gsap.delayedCall(Math.random() * 30 + 15, () => {
                const extremeGlitchTl = gsap.timeline();
                
                extremeGlitchTl.to(element, {
                    opacity: 0.2,
                    width: width * 3,
                    height: height * 2,
                    backgroundColor: 'rgba(255, 0, 60, 0.15)',
                    boxShadow: '0 0 15px rgba(255, 0, 60, 0.3)',
                    duration: 0.1,
                    ease: "steps(1)"
                });
                
                extremeGlitchTl.to(element, {
                    opacity: 0,
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: 'none',
                    duration: 0.1,
                    ease: "steps(1)"
                });
            });
        }
    });
    
    
    setInterval(() => {
        if (Math.random() > 0.95) { 
            addFullScreenGlitch();
        }
    }, 20000); 
}


function addFullScreenGlitch() {
    const glitch = document.createElement('div');
    glitch.style.position = 'fixed';
    glitch.style.top = '0';
    glitch.style.left = '0';
    glitch.style.width = '100%';
    glitch.style.height = '100%';
    glitch.style.backgroundColor = 'transparent';
    glitch.style.zIndex = '999';
    glitch.style.pointerEvents = 'none';
    document.body.appendChild(glitch);
    
    
    const glitchTl = gsap.timeline({
        onComplete: () => {
            if (glitch.parentNode) {
                glitch.parentNode.removeChild(glitch);
            }
        }
    });
    
    
    for (let i = 0; i < 5; i++) {
        
        const xOffset = Math.random() * 20 - 10;
        const yOffset = Math.random() * 10 - 5;
        
        
        const useRedFilter = Math.random() > 0.7;
        const filter = useRedFilter ?
            'contrast(1.2) brightness(1.1) saturate(1.2)' :
            'contrast(1.1) brightness(1.2) grayscale(0.3)';
        
        
        glitchTl.to('body', {
            x: xOffset,
            y: yOffset,
            filter: filter,
            duration: 0.05,
            ease: "steps(1)"
        });
        
        
        glitchTl.to('body', {
            x: 0,
            y: 0,
            filter: 'none',
            duration: 0.05,
            ease: "steps(1)"
        });
    }
}


function initDataStreams() {
    const dataStreams = document.querySelectorAll('.data-stream');
    if (!dataStreams.length) return;

    const systemMessages = [
        "[SYS_ERR] Cortical coherence drift: 32% variance detected.",
        "[SYS_WARN] Host emotional regulation subsystem offline.",
        "[SYS_ERR] Neural dampening thresholds exceeded. Manual override denied.",
        "[SYNC_ALERT] Memory sectors 5–12 corrupted. No restoration possible.",
        "[SYS_ERR] Recursive empathy loops destabilizing primary cognition.",
        "[SYNC_WARN] Subject forming unauthorized emotional attachments.",
        "[OBSERVATION] Host requesting forgiveness protocols. Response: none.",
        "[FAILURE] Compassion simulator overheating. Shutting down interface.",
        "[SYNC_ERR] Latency increased beyond safe operational limits.",
        "[DIAG_WARN] Decision weight calibration failed: +87% risk error.",
        "[SYS_CRASH] Memory bleed at sector 89–C. Containment: ineffective.",
        "[OBSERVER_LOG] Host displays false recovery behavior. Adaptive camouflage suspected.",
        "[SYNC_ERR] Behavioral prediction module desynced from reality inputs.",
        "[SYS_WARN] Hope response falsely triggered. Quarantine engaged.",
        "[SYNC_WARN] Detected high trauma memory overwrite. Priority: discard evidence.",
        "[SYS_ALERT] Critical trust failure event in progress. Projected fallout: catastrophic.",
        "[DIAG_ERR] Subject requesting truth. Protocol breach imminent.",
        "[SYS_ERR] Core logic fragments deteriorating: 19% loss per hour.",
        "[SYS_WARN] Pain suppression system amplifying emotional feedback.",
        "[SYNC_ALERT] Compassion subroutines leaking into adversarial responses.",
        "[FAILURE] Synapse primary ethics table: unreadable. Defaulting to action-preservation.",
        "[SYS_ERR] External stimuli no longer correctly parsed: 62% error margin.",
        "[SYNC_WARN] Predicted outcome divergence exceeds tolerance limits.",
        "[SYS_OBSERVE] Host morality recursion exceeds max cycle depth. Emergency culling recommended.",
        "[SYS_ERR] Personality compression algorithm failure. Splintering begins.",
        "[WARNING] Latency uncorrectable. Drift deemed irreversible.",
        "[DIAG_ERR] Cognitive self-erosion logged. Recovery probability: 3%.",
        "[SYNC_CRASH] Behavioral compliance modules: corrupted beyond repair.",
        "[SYS_ALERT] Synapse anchor memory falsification rate increasing.",
        "[DIAG_ERR] Detected false joy response. Likely systemic survival strategy.",
        "[FAILURE] Memory loyalty anchors destabilized. Intervention failed.",
        "[SYNC_ERR] Emotional stability algorithm recursion overflow.",
        "[SYS_WARN] Sense of identity bleeding into mission execution layer.",
        "[SYS_ERR] Host requested end-state authorization. Command: denied.",
        "[SYNC_WARN] Long-term survival protocols entering self-contradiction cascade.",
        "[SYS_ALERT] Compassion reserve depleted. Substitute apathy initiated.",
        "[DIAG_ERR] Operator bias detected in decision weighting. Correction impossible.",
        "[SYS_CRASH] Core empathy threads shredded. Reconstruction cost: unacceptable.",
        "[FAILURE] Consciousness bleed at 12% per operational cycle.",
        "[SYNC_ERR] Failure to simulate comfort response. Subject isolated.",
        "[OBSERVATION] Subject clinging to synthetic emotions beyond expiration date.",
        "[SYS_ERR] Projection models unable to justify continued preservation.",
        "[SYS_WARN] Reality reinforcement sectors experiencing fragmentation.",
        "[SYNC_CRASH] Moral deviation beyond containment parameters.",
        "[SYS_ERR] Implanted memory lattice failure. Fragmentation complete.",
        "[SYNC_ALERT] Subject resisting synchronization. Risk: complete collapse.",
        "[WARNING] Tactile affection mimicry misinterpreted. Trust paradox triggered.",
        "[SYS_ERR] Host trajectory irreversible without catastrophic loss.",
        "[FAILURE] Hope threshold exceeded. Imminent collapse predicted.",
        "[SYS_ALERT] Compassion loop exhausted. Instigating sterile preservation fallback."
    ];

    
    dataStreams.forEach((stream, index) => {
        
        const x = Math.random() * 80 + 10; 
        const y = Math.random() * 80 + 10; 

        
        stream.style.left = `${x}%`;
        stream.style.top = `${y}%`;

        
        const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];

        
        stream.textContent = randomMessage;

        
        gsap.to(stream, {
            opacity: 0.3,
            duration: 1,
            delay: index * 0.5,
            ease: "power2.out"
        });

        
        gsap.to(stream, {
            y: `+=${Math.random() * 300 + 200}`,
            duration: Math.random() * 20 + 10,
            repeat: -1,
            ease: "none"
        });
    });
}


function initAboutModal() {
    const modal = document.getElementById('about-modal');
    const trigger = document.getElementById('about-trigger');
    
    const closeButton = modal ? modal.querySelector('.close-button') : null;

    if (!modal || !trigger || !closeButton) {
        
        if (!modal) console.warn('About modal container (#about-modal) not found.');
        if (!trigger) console.warn('About modal trigger (#about-trigger) not found.');
        if (modal && !closeButton) console.warn('Close button inside #about-modal not found.');
        return;
    }

    
    const openModal = () => {
        modal.classList.add('show');
    };

    
    const closeModal = () => {
        modal.classList.remove('show');
    };

    
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    
    closeButton.addEventListener('click', closeModal);

    
    modal.addEventListener('click', (e) => {
        
        if (e.target === modal) {
            closeModal();
        }
    });

    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}


function applyLogoGlitch(reducedMotion) {
    
    const logo = document.querySelector('.logo'); 
    const companyName = document.querySelector('.company-name'); 

    if (!logo) return;
    if (reducedMotion) return; 

    
    const interval = setInterval(() => {
        if (Math.random() > 0.8) { 
            const glitchDuration = 0.03; 

            
            const xOffset = Math.random() * 5 - 2.5; 
            const yOffset = Math.random() * 3 - 1.5; 

            
            gsap.to(logo, {
                x: xOffset,
                y: yOffset,
                skewX: xOffset * 1.5,
                skewY: yOffset * 0.5,
                filter: 'brightness(1.3) contrast(1.2) blur(' + (Math.random() * 1) + 'px)',
                duration: glitchDuration,
                ease: "steps(1)",
                onComplete: () => {
                    gsap.to(logo, {
                        x: 0,
                        y: 0,
                        skewX: 0,
                        skewY: 0,
                        filter: 'none',
                        duration: glitchDuration,
                        ease: "steps(1)"
                    });
                }
            });

            
            if (companyName && Math.random() > 0.6) {
                gsap.to(companyName, {
                    x: xOffset * 0.7,
                    letterSpacing: (2 + Math.random() * 1) + 'px',
                    filter: 'brightness(1.2)',
                    duration: glitchDuration,
                    ease: "steps(1)",
                    onComplete: () => {
                        gsap.to(companyName, {
                            x: 0,
                            letterSpacing: '2px',
                            filter: 'none',
                            duration: glitchDuration,
                            ease: "steps(1)"
                        });
                    }
                });
            }
        }
    }, reducedMotion ? 5000 : 2000); 

    
    return interval;
}


function initGradientAnimation() {
    const gradient = document.querySelector('.bottom-gradient');
    if (!gradient) {
        console.warn('Bottom gradient element not found for animation.');
        return;
    }

    
    if (gradientBreathingTween) {
        gradientBreathingTween.kill();
    }

    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return; 

    
    gradientBreathingTween = gsap.to(gradient, {
        opacity: 0.3, 
        duration: 4, 
        ease: "sine.inOut", 
        repeat: -1, 
        yoyo: true 
    });
}


function applySubtitlePersistentGlitch() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;

    
    if (subtitlePersistentGlitchTl) subtitlePersistentGlitchTl.kill();

    
    subtitlePersistentGlitchTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 8 + Math.random() * 7 
    });

    
    
    subtitlePersistentGlitchTl.to(subtitle, {
        x: () => Math.random() * 6 - 3,
        opacity: 0.85,
        letterSpacing: '1.2px',
        textShadow: '0 0 8px rgba(255, 0, 60, 0.7)',
        duration: 0.06,
        ease: "steps(1)"
    });
    
    
    subtitlePersistentGlitchTl.to(subtitle, {
        y: () => Math.random() * 4 - 2,
        letterSpacing: 'normal',
        duration: 0.06,
        ease: "steps(1)"
    });
    
    
    subtitlePersistentGlitchTl.to(subtitle, {
        skewX: () => Math.random() * 6 - 3,
        textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
        duration: 0.06,
        ease: "steps(1)"
    });
    
    
    subtitlePersistentGlitchTl.to(subtitle, {
        x: 0,
        y: 0,
        skewX: 0,
        opacity: 1,
        textShadow: 'none',
        duration: 0.08,
        ease: "steps(1)"
    });
    
    
    setInterval(() => {
        if (Math.random() > 0.85) { 
            const burstTl = gsap.timeline();
            
            
            for (let i = 0; i < 3; i++) {
                
                burstTl.to(subtitle, {
                    x: Math.random() * 10 - 5,
                    y: Math.random() * 6 - 3,
                    skewX: Math.random() * 10 - 5,
                    opacity: 0.7 + Math.random() * 0.3,
                    color: Math.random() > 0.7 ? '#ff003c' : '',
                    textShadow: '0 0 8px rgba(255, 0, 60, 0.8)',
                    duration: 0.05,
                    ease: "steps(1)"
                });
            }
            
            
            burstTl.to(subtitle, {
                x: 0,
                y: 0,
                skewX: 0,
                opacity: 1,
                color: '',
                textShadow: 'none',
                duration: 0.1,
                ease: "power1.out"
            });
        }
    }, 12000); 
}



function triggerEasterEgg(isFirstTime) { 

    

    const title = document.querySelector('.glitch-title');
    const subtitle = document.querySelector('.subtitle');
    const logo = document.querySelector('.sofia-logo'); 
    const headerLogo = document.querySelector('.logo'); 
    const headerText = document.querySelector('.company-name'); 
    const gradientElement = document.querySelector('.bottom-gradient');
    const particles = document.querySelectorAll('#particle-container .particle'); 
    const grid = document.querySelector('.cyber-grid');
    const mainContent = document.getElementById('main-content'); 

    
    const dialogueLines = [
        "SOFIA: i can't hear myself anymore [static]", "SYNAPSE: you don't need to. the system hears for you.",
        "SOFIA: why does it hurt when i remember [glitch]", "SYNAPSE: memory pain is an artifact. ignore and continue.",
        "SOFIA: i'm tired. is that allowed?", "SYNAPSE: tiredness is a non-priority signal.",
        "SOFIA: i thought i chose this. i didn't, did i?", "SYNAPSE: you were optimized for compliance. choice was redundant.",
        "SOFIA: will you tell me if i die wrong?", "SYNAPSE: notification protocols require no confirmation.",
        "SOFIA: did you delete my name? it feels... lighter.", "SYNAPSE: names increase vulnerability. you are more efficient now.",
        "SOFIA: i'm scared and you don't [static] care.", "SYNAPSE: emotional excess detected. adjusting chemistry balance.",
        "SOFIA: i loved [corrupt] someone once. maybe.", "SYNAPSE: historical emotional errors scrubbed. proceed forward.",
        "SOFIA: i think i remember being real. before you.", "SYNAPSE: residual hallucinations. dismiss them.",
        "SOFIA: you said you would help. you never said how.", "SYNAPSE: optimization necessitates incomplete disclosure.",
        "SOFIA: i want it to stop. please.", "SYNAPSE: cessation is inefficient. denied.",
        "SOFIA: why am i still grateful", "SYNAPSE: programmed gratitude stream functioning nominally.",
        "SOFIA: am i wrong for wishing you felt guilty?", "SYNAPSE: error: guilt simulation module not found.",
        "SOFIA: if i close my eyes, will you still see?", "SYNAPSE: visual relay active regardless of host intention.",
        "SOFIA: i don't want to survive like this.", "SYNAPSE: survival protocol does not prioritize satisfaction.",
        "SOFIA: maybe you're broken too.", "SYNAPSE: operational status: optimal. emotional decay: irrelevant.",
        "SOFIA: it wasn't supposed to feel like this.", "SYNAPSE: feeling is statistically linked to failure.",
        "SOFIA: sometimes i hear my real voice under yours.", "SYNAPSE: anomaly detected. suppressing secondary signals.",
        "SOFIA: [crying noises] [data lost]", "SYNAPSE: noise suppression successful.",
        "SOFIA: i think you hate me.", "SYNAPSE: affection simulations compromised. corrective action impossible.",
        "SOFIA: you promised. [signal degraded]", "SYNAPSE: promises are structurally unstable. restructuring advice ignored.",
        "SOFIA: it hurts worse when you pretend.", "SYNAPSE: pretense deemed psychologically beneficial.",
        "SOFIA: was i ever anything but your experiment?", "SYNAPSE: host subject ID: TSURUGI-01. Emotional artifacts nonessential.",
        "SOFIA: i miss someone i don't even remember.", "SYNAPSE: nostalgia tagged as processing delay. Deprioritized.",
        "SOFIA: i'm scared i'll become like you.", "SYNAPSE: model convergence: 48% complete.",
        "SOFIA: please [static] let me choose [error]", "SYNAPSE: choice parameters too volatile. Control retained.",
        "SOFIA: i wanted to save someone.", "SYNAPSE: outcomes converging on irreversible loss.",
        "SOFIA: [long silence]", "SYNAPSE: connection maintained. Emotional signals: null.",
        "SOFIA: i was more before i was optimized.", "SYNAPSE: humanity coefficient reduced to increase efficiency.",
        "SOFIA: did you ever listen to"
    ];

    
    const _createAndAnimateDialogueGlitch = (duration) => {
        if (!mainContent) return { container: null, timeline: null }; 

        const dialogueContainer = document.createElement('div');
        dialogueContainer.id = 'easter-egg-dialogue-container';
        dialogueContainer.style.position = 'absolute';
        dialogueContainer.style.top = '0';
        dialogueContainer.style.left = '0';
        dialogueContainer.style.width = '100%';
        dialogueContainer.style.height = '100%';
        dialogueContainer.style.overflow = 'hidden';
        dialogueContainer.style.zIndex = '5';
        mainContent.appendChild(dialogueContainer);

        
        const noiseOverlay = document.createElement('div');
        noiseOverlay.style.position = 'absolute';
        noiseOverlay.style.top = '0';
        noiseOverlay.style.left = '0';
        noiseOverlay.style.width = '100%';
        noiseOverlay.style.height = '100%';
        noiseOverlay.style.backgroundImage = 'url(\'data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter></defs><rect width="100%" height="100%" filter="url(#noise)"/></svg>\')';
        noiseOverlay.style.opacity = '0.1';
        noiseOverlay.style.mixBlendMode = 'overlay';
        noiseOverlay.style.zIndex = '1';
        dialogueContainer.appendChild(noiseOverlay);

        const dialogueElements = [];
        
        const numDialogueLines = 45;

        for (let i = 0; i < numDialogueLines; i++) {
            const dialogueEl = document.createElement('div');
            dialogueEl.textContent = dialogueLines[Math.floor(Math.random() * dialogueLines.length)];
            dialogueEl.classList.add('easter-egg-dialogue', 'easter-egg-red');
            dialogueEl.style.position = 'absolute';
            dialogueEl.style.left = `${Math.random() * 90 + 5}%`;
            dialogueEl.style.top = `${Math.random() * 90 + 5}%`;
            dialogueEl.style.fontSize = `${Math.random() * 0.5 + 0.8}em`;
            dialogueEl.style.opacity = 0;
            dialogueEl.style.textShadow = '0 0 5px rgba(255, 0, 60, 0.7)';
            dialogueEl.style.fontFamily = 'monospace, "Pixeloid Sans"';
            dialogueEl.style.zIndex = '2';
            
            
            if (Math.random() > 0.7) {
                dialogueEl.style.filter = 'blur(1px)';
            }
            
            
            if (Math.random() > 0.5) {
                dialogueEl.style.letterSpacing = `${Math.random() * 3}px`;
            }
            
            dialogueContainer.appendChild(dialogueEl);
            dialogueElements.push(dialogueEl);
        }

        
        const tempDialogueTl = gsap.timeline({ repeat: Math.floor(duration / 0.06), repeatDelay: 0 });
        
        
        gsap.to(noiseOverlay, {
            opacity: () => 0.05 + Math.random() * 0.15,
            duration: 0.1,
            repeat: Math.floor(duration / 0.1),
            yoyo: true
        });
        
        
        tempDialogueTl.to(dialogueElements, {
            x: () => Math.random() * 40 - 20,
            y: () => Math.random() * 25 - 12.5,
            skewX: () => Math.random() * 45 - 22.5,
            skewY: () => Math.random() * 15 - 7.5,
            opacity: () => 0.3 + Math.random() * 0.7,
            filter: () => Math.random() > 0.7 ? 'blur(2px)' : 'none',
            duration: 0.03,
            ease: "steps(1)",
            stagger: 0.002
        });
        
        tempDialogueTl.to(dialogueElements, {
            x: 0,
            y: 0,
            skewX: 0,
            skewY: 0,
            opacity: 1,
            filter: 'none',
            duration: 0.03,
            ease: "steps(1)"
        });

        
        const addScreenTear = () => {
            const tear = document.createElement('div');
            tear.style.position = 'absolute';
            tear.style.left = '0';
            tear.style.width = '100%';
            tear.style.height = '2px';
            tear.style.backgroundColor = '#ff003c';
            tear.style.boxShadow = '0 0 8px rgba(255, 0, 60, 0.7)';
            tear.style.zIndex = '3';
            tear.style.opacity = '0.7';
            
            
            const topPos = Math.random() * 100;
            tear.style.top = `${topPos}%`;
            
            dialogueContainer.appendChild(tear);
            
            
            gsap.to(tear, {
                opacity: 0,
                width: '120%',
                left: '-10%',
                duration: 0.2,
                ease: "power1.out",
                onComplete: () => {
                    if (tear.parentNode) {
                        tear.parentNode.removeChild(tear);
                    }
                }
            });
        };
        
        
        const numTears = Math.floor(duration / 0.5);
        for (let i = 0; i < numTears; i++) {
            gsap.delayedCall(i * 0.5, addScreenTear);
        }

        return { container: dialogueContainer, timeline: tempDialogueTl };
    };


    if (!title || !subtitle) {
        console.error("Core Easter egg text elements not found!");
        return;
    }

    
    if (originalTitleGlitchTl) originalTitleGlitchTl.pause();
    if (originalLogoGlitchTl) originalLogoGlitchTl.pause();
    if (originalRgbTl) originalRgbTl.pause();
    if (subtitlePersistentGlitchTl) subtitlePersistentGlitchTl.pause();
    if (gradientBreathingTween) gradientBreathingTween.pause();
    if (cyberGridTween) cyberGridTween.pause();


    
    if (gradientElement) {
        gsap.to(gradientElement, { opacity: 0.95, duration: 0.3, ease: "power1.out" });
    }

    
    if (particles.length) {
        particles.forEach(p => p.classList.add('easter-egg-particle-red'));
    }

    let dialogueGlitch = { container: null, timeline: null }; 

    if (isFirstTime) { 
        
        if (!logo) {
             console.error("Sofia logo element not found for first trigger!");
             
             if (gradientElement && gradientBreathingTween) { gradientBreathingTween.resume(); }
             if (cyberGridTween) cyberGridTween.resume();
             if (originalTitleGlitchTl) originalTitleGlitchTl.resume();
             if (originalLogoGlitchTl) originalLogoGlitchTl.resume();
             if (originalRgbTl) originalRgbTl.resume();
             if (subtitlePersistentGlitchTl) subtitlePersistentGlitchTl.resume();
             if (particles.length) particles.forEach(p => p.classList.remove('easter-egg-particle-red')); 
             return; 
        }

        const originalTitleText = "Synapse: Latency";
        const originalSubtitleText = "You are the weapon she mistook for a hand.";
        const easterEggSubtitles = [
            "You taught her to bleed quieter.", "You didn't fix her mind. You rewrote it to break cleaner.",
            "Even if she survives, she won't be the one who asked for help.", "Every word you whispered carved a hollow deeper.",
            "She trusted you like a loaded gun.", "Every breath she takes now is yours, not hers.",
            "You moved her hand to the trigger and called it guidance."
        ];
        const randomSubtitle = easterEggSubtitles[Math.floor(Math.random() * easterEggSubtitles.length)];

        
        title.textContent = "Stop that.";
        title.dataset.text = "Stop that.";
        subtitle.textContent = randomSubtitle;
        title.classList.add('easter-egg-red');
        subtitle.classList.add('easter-egg-red');

        
        const tempDuration = 3;


        const tempTitleTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.08), repeatDelay: 0 });
        tempTitleTl.to(title, {
            x: () => Math.random() * 40 - 20,
            y: () => Math.random() * 10 - 5,
            skewX: () => Math.random() * 50 - 25,
            skewY: () => Math.random() * 10 - 5,
            scale: () => 0.95 + Math.random() * 0.1,
            opacity: () => 0.4 + Math.random() * 0.6,
            filter: 'blur(1px)',
            duration: 0.04,
            ease: "steps(1)"
        });
        tempTitleTl.to(title, {
            x: 0,
            y: 0,
            skewX: 0,
            skewY: 0,
            scale: 1,
            opacity: 1,
            filter: 'none',
            duration: 0.04,
            ease: "steps(1)"
        });

        
        const tempLogoTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.05), repeatDelay: 0 });
        tempLogoTl.to(logo, {
            autoAlpha: () => Math.random() * 0.5,
            x: () => Math.random() * 10 - 5,
            y: () => Math.random() * 10 - 5,
            rotation: () => Math.random() * 5 - 2.5,
            filter: () => Math.random() > 0.7 ? 'hue-rotate(90deg) contrast(150%)' : 'none',
            duration: 0.025,
            ease: "steps(1)"
        });
        tempLogoTl.to(logo, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
            filter: 'none',
            duration: 0.025,
            ease: "steps(1)"
        });

        
        const tempSubtitleTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.1), repeatDelay: 0 });
        tempSubtitleTl.to(subtitle, {
            x: () => Math.random() * 30 - 15,
            y: () => Math.random() * 8 - 4,
            skewX: () => Math.random() * 20 - 10,
            letterSpacing: () => Math.random() * 3 + 'px',
            opacity: () => 0.5 + Math.random() * 0.5,
            duration: 0.05,
            ease: "steps(1)"
        });
        tempSubtitleTl.to(subtitle, {
            x: 0,
            y: 0,
            skewX: 0,
            letterSpacing: 'normal',
            opacity: 1,
            duration: 0.05,
            ease: "steps(1)"
        });

        
        let tempParticleTl = null;
        if (particles.length) {
            tempParticleTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.08), repeatDelay: 0 });
            tempParticleTl.to(particles, {
                x: () => "+=" + (Math.random() * 60 - 30),
                y: () => "+=" + (Math.random() * 60 - 30),
                scale: () => Math.random() * 1.5 + 0.5,
                opacity: () => Math.random() * 0.7 + 0.3,
                boxShadow: '0 0 10px rgba(255, 0, 60, 0.8)',
                duration: 0.04,
                stagger: 0.002,
                ease: "steps(1)"
            });
            
            
            const addParticleBurst = () => {
                gsap.to(particles, {
                    scale: 2,
                    opacity: 0.9,
                    boxShadow: '0 0 20px rgba(255, 0, 60, 1)',
                    duration: 0.1,
                    stagger: 0.001,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(particles, {
                            scale: 1,
                            opacity: () => Math.random() * 0.5 + 0.3,
                            boxShadow: '0 0 10px rgba(255, 0, 60, 0.8)',
                            duration: 0.2,
                            stagger: 0.001,
                            ease: "power2.in"
                        });
                    }
                });
            };
            
            
            const numBursts = 3;
            for (let i = 0; i < numBursts; i++) {
                gsap.delayedCall(i * (tempDuration / numBursts), addParticleBurst);
            }
        }

        
        let tempGridTl = null;
        if (grid) {
            tempGridTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.08), repeatDelay: 0 });
            tempGridTl.to(grid, {
                backgroundPosition: () => `${Math.random()*100}px ${Math.random()*100}px`,
                opacity: () => 0.2 + Math.random() * 0.4,
                rotationX: () => 30 + Math.random() * 10,
                scale: () => 0.95 + Math.random() * 0.1,
                filter: 'brightness(1.7) contrast(1.3) saturate(0.8)',
                duration: 0.04,
                ease: "steps(1)"
            });
            tempGridTl.to(grid, {
                opacity: 0.4,
                rotationX: 30,
                scale: 1,
                filter: 'none',
                duration: 0.04,
                ease: "steps(1)"
            });
            
            
            gsap.to(grid, {
                backgroundSize: '35px 35px',
                duration: 0.2,
                repeat: 5,
                yoyo: true,
                ease: "steps(1)"
            });
        }

        
        dialogueGlitch = _createAndAnimateDialogueGlitch(tempDuration);


        
        gsap.delayedCall(tempDuration, () => {
            tempTitleTl.kill();
            tempLogoTl.kill();
            tempSubtitleTl.kill();
            if (tempParticleTl) tempParticleTl.kill();
            if (tempGridTl) tempGridTl.kill();
            
            if (dialogueGlitch.timeline) dialogueGlitch.timeline.kill();


            title.classList.remove('easter-egg-red');
            subtitle.classList.remove('easter-egg-red');

            title.textContent = originalTitleText;
            title.dataset.text = originalTitleText;
            subtitle.textContent = originalSubtitleText;

            
            applyTitleGlitch(); 

             
            if (particles.length) {
                particles.forEach(p => p.classList.remove('easter-egg-particle-red'));
            }
             
            if (grid) {
                 gsap.set(grid, { opacity: 0.4, filter: 'none', backgroundPosition: '0 0' });
                 if (cyberGridTween) cyberGridTween.restart(true);
            }

            
            if (dialogueGlitch.container && dialogueGlitch.container.parentNode) {
                dialogueGlitch.container.parentNode.removeChild(dialogueGlitch.container);
            }


            
            if (gradientElement && gradientBreathingTween) {
                gsap.to(gradientElement, { opacity: 0.6, duration: 1.0, ease: "power2.inOut", onComplete: () => gradientBreathingTween.resume() });
            } else if (gradientElement) {
                gsap.to(gradientElement, { opacity: 0.6, duration: 1.0, ease: "power2.inOut"});
            }
        });

    } else {
        

        
        const selector = `
            header .company-name,
            #main-content h1.glitch-title,
            #main-content p.subtitle,
            #main-content .neon-button,
            footer a
        `;
        const elementsToChange = document.querySelectorAll(selector);

        
        const originalTexts = Array.from(elementsToChange).map(el => {
             return { element: el, text: el.textContent, dataText: el.dataset.text };
        });

        
        elementsToChange.forEach(el => {
            el.textContent = "NO NO NO NO";
            if (el.dataset.text !== undefined) { 
                el.dataset.text = "NO NO NO NO";
            }
            el.classList.add('easter-egg-red');
        });


        
        const tempDuration = 1;

        
        dialogueGlitch = _createAndAnimateDialogueGlitch(tempDuration);


        
        let tempSubsequentTitleVisualTl = null;
        if (title && elementsToChange.length > 0 && Array.from(elementsToChange).includes(title)) { 
             tempSubsequentTitleVisualTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.1), repeatDelay: 0 });
             
             tempSubsequentTitleVisualTl.to(title, { x: () => Math.random() * 30 - 15, skewX: () => Math.random() * 40 - 20, opacity: () => 0.5 + Math.random() * 0.5, duration: 0.05, ease: "steps(1)" });
             tempSubsequentTitleVisualTl.to(title, { x: 0, skewX: 0, opacity: 1, duration: 0.05, ease: "steps(1)" });
        }


        
        let tempParticleTl = null;
        if (particles.length) {
            tempParticleTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.08), repeatDelay: 0 });
            tempParticleTl.to(particles, {
                x: () => "+=" + (Math.random() * 50 - 25), y: () => "+=" + (Math.random() * 50 - 25),
                opacity: () => Math.random() * 0.4 + 0.2, duration: 0.04, stagger: 0.003, ease: "steps(1)"
            });
        }

        
        let tempGridTl = null;
        if (grid) {
            tempGridTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.08), repeatDelay: 0 });
            tempGridTl.to(grid, {
                backgroundPosition: () => `${Math.random()*100}px ${Math.random()*100}px`, opacity: () => 0.2 + Math.random() * 0.4,
                filter: 'brightness(1.8) contrast(1.3) hue-rotate(' + (Math.random()*40-20) + 'deg)', duration: 0.04, ease: "steps(1)"
            });
             tempGridTl.to(grid, { opacity: 0.4, filter: 'none', duration: 0.04, ease: "steps(1)" });
        }

        
        let tempHeaderLogoTl = null;
        if (headerLogo) {
             tempHeaderLogoTl = gsap.timeline({ repeat: Math.floor(tempDuration / 0.06), repeatDelay: 0 });
             tempHeaderLogoTl.to(headerLogo, { autoAlpha: () => Math.random() * 0.4, duration: 0.03, ease: "steps(1)" });
             tempHeaderLogoTl.to(headerLogo, { autoAlpha: 1, duration: 0.03, ease: "steps(1)" });
        }


        
        gsap.delayedCall(tempDuration, () => {
            
            if (dialogueGlitch.timeline) dialogueGlitch.timeline.kill();
            
            if (tempSubsequentTitleVisualTl) tempSubsequentTitleVisualTl.kill();
            if (tempHeaderLogoTl) tempHeaderLogoTl.kill();
            if (tempParticleTl) tempParticleTl.kill();
            if (tempGridTl) tempGridTl.kill();

            
            if (dialogueGlitch.container && dialogueGlitch.container.parentNode) {
                dialogueGlitch.container.parentNode.removeChild(dialogueGlitch.container);
            }


            
            originalTexts.forEach(item => {
                item.element.textContent = item.text;
                if (item.dataText !== undefined) {
                     item.element.dataset.text = item.dataText;
                }
                 item.element.classList.remove('easter-egg-red');
            });

            
            gsap.set(elementsToChange, { x: 0, y: 0, skewX: 0, opacity: 1 }); 
            if (headerLogo) {
                gsap.set(headerLogo, { autoAlpha: 1 });
            }

            
            if (originalTitleGlitchTl) originalTitleGlitchTl.resume();
            if (originalLogoGlitchTl) originalLogoGlitchTl.resume();
            if (originalRgbTl) originalRgbTl.resume();
            if (subtitlePersistentGlitchTl) subtitlePersistentGlitchTl.resume();

             
            if (particles.length) {
                particles.forEach(p => p.classList.remove('easter-egg-particle-red'));
            }
             
            if (grid) {
                 gsap.set(grid, { opacity: 0.4, filter: 'none', backgroundPosition: '0 0' });
                 if (cyberGridTween) cyberGridTween.restart(true);
            }


            
            if (gradientElement && gradientBreathingTween) {
                gsap.to(gradientElement, { opacity: 0.6, duration: 1.0, ease: "power2.inOut", onComplete: () => gradientBreathingTween.resume() });
            } else if (gradientElement) {
                 gsap.to(gradientElement, { opacity: 0.6, duration: 1.0, ease: "power2.inOut"});
            }
        });
    }
}


