


function initCursorEffect() {
    
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        

        document.body.appendChild(cursorTrail);

        
        const cursorGlitch = document.createElement('div');
        cursorGlitch.className = 'cursor-glitch';
        

        document.body.appendChild(cursorGlitch);

        
        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;
        let glitchX = 0;
        let glitchY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            
            cursorTrail.style.opacity = '0.5';
            cursorGlitch.style.opacity = '0.7';

            
            if (Math.random() > 0.9) {
                glitchX = mouseX + (Math.random() * 20 - 10);
                glitchY = mouseY + (Math.random() * 20 - 10);
            } else {
                glitchX = mouseX;
                glitchY = mouseY;
            }
        });

        
        function animateCursor() {
            
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;

            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';

            cursorGlitch.style.left = glitchX + 'px';
            cursorGlitch.style.top = glitchY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        
        let inactivityTimer;
        function resetInactivityTimer() {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                cursorTrail.style.opacity = '0';
                cursorGlitch.style.opacity = '0';
            }, 3000);
        }

        document.addEventListener('mousemove', resetInactivityTimer);
        resetInactivityTimer();

        
        document.addEventListener('mousedown', function() {
            
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            

            ripple.style.left = mouseX + 'px'; 
            ripple.style.top = mouseY + 'px';  

            document.body.appendChild(ripple);

            
            if (typeof gsap !== 'undefined') {
                gsap.to(ripple, {
                    width: '50px',
                    height: '50px',
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => {
                        ripple.remove();
                    }
                });

                
                gsap.to(cursorGlitch, {
                    scale: 2,
                    opacity: 1,
                    duration: 0.1,
                    ease: 'steps(1)',
                    onComplete: () => {
                        gsap.to(cursorGlitch, {
                            scale: 1,
                            opacity: 0.7,
                            duration: 0.2,
                            ease: 'power2.out'
                        });
                    }
                });
            } else {
                
                ripple.style.transition = 'opacity 0.6s ease-out, width 0.6s ease-out, height 0.6s ease-out';
                requestAnimationFrame(() => {
                    ripple.style.width = '50px';
                    ripple.style.height = '50px';
                    ripple.style.opacity = '0';
                });
                setTimeout(() => ripple.remove(), 600);
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', initCursorEffect);
