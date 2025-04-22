/**
 * Custom Cursor Effect for Synapse: Latency
 * Creates a glitchy cursor trail effect
 * Adapted from source project's qol.js
 */

/**
 * Initialize custom cursor effect
 * Creates a glitchy cursor trail effect
 */
function initCursorEffect() {
    // Only initialize on devices with pointer support (not touch-only)
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        // Styles are applied via css/main.css now

        document.body.appendChild(cursorTrail);

        // Create glitch effect for cursor
        const cursorGlitch = document.createElement('div');
        cursorGlitch.className = 'cursor-glitch';
        // Styles are applied via css/main.css now

        document.body.appendChild(cursorGlitch);

        // Track mouse movement
        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;
        let glitchX = 0;
        let glitchY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Show cursor elements when mouse moves
            cursorTrail.style.opacity = '0.5';
            cursorGlitch.style.opacity = '0.7';

            // Add random glitch offset occasionally
            if (Math.random() > 0.9) {
                glitchX = mouseX + (Math.random() * 20 - 10);
                glitchY = mouseY + (Math.random() * 20 - 10);
            } else {
                glitchX = mouseX;
                glitchY = mouseY;
            }
        });

        // Animate cursor elements
        function animateCursor() {
            // Smooth trail following
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;

            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';

            cursorGlitch.style.left = glitchX + 'px';
            cursorGlitch.style.top = glitchY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Hide cursor after period of inactivity
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

        // Add glitch effect on click
        document.addEventListener('mousedown', function() {
            // Create click ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            // Styles are applied via css/main.css now

            ripple.style.left = mouseX + 'px'; // Set position dynamically
            ripple.style.top = mouseY + 'px';  // Set position dynamically

            document.body.appendChild(ripple);

            // Animate ripple using GSAP if available, otherwise fallback
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

                // Add glitch effect to cursor
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
                // Fallback animation if GSAP is not loaded (simple fade out)
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

// Initialize the cursor effect when the DOM is ready
document.addEventListener('DOMContentLoaded', initCursorEffect);