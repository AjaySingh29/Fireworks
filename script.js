    /**
     * Creates particle effects at the given (x, y) coordinates.
     * @param {number} x - The x-coordinate of the particle effect.
     * @param {number} y - The y-coordinate of the particle effect.
     */
    function particleActive(x, y) {
        const radius = 100; // Particles move within 100px radius
        const particleCount = 5; // Number of particles per effect

        for (let i = 0; i < particleCount; i++) { 
            const particle = document.createElement('div');
            particle.classList.add('particle');
            document.body.appendChild(particle);

            // Random angle and distance for movement within a circular area
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * radius;
            
            const moveX = Math.cos(angle) * distance + "px";  
            const moveY = Math.sin(angle) * distance + "px";  

            // Set movement values as CSS variables
            particle.style.setProperty('--moveX', moveX);
            particle.style.setProperty('--moveY', moveY);
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            // Remove the particle after animation ends
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }

    let lastTime = 0; // Stores the last event timestamp to throttle execution

    /**
     * Throttles particle creation to avoid performance issues.
     * @param {Event} e - The mouse or touch event.
     */
    function throttledParticles(e) {
        const now = Date.now();
        if (now - lastTime > 10) { // Limit updates to every 10ms
            const x = e.clientX || e.touches[0].clientX;
            const y = e.clientY || e.touches[0].clientY;
            particleActive(x, y);
            lastTime = now;
        }
    }

    // Attach event listeners for mouse and touch movements
    window.addEventListener('mousemove', throttledParticles);
    window.addEventListener('touchmove', throttledParticles);
    window.addEventListener('touchstart', throttledParticles);