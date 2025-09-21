let grassBlades = [];
let firefly = null;
let mouseX = 0;
let mouseY = 0;

// Canvas variables for meteors
let canvas, starCtx;
let width, height;
let shootingStars = [];

// Ambient fireflies array
let ambientFireflies = [];

// Create hundreds of grass blades
function createGrassField() {
    const grassContainer = document.querySelector('.grass');
    
    // Clear any existing grass
    grassContainer.innerHTML = '';
    grassBlades = [];
    
    // Create 1500 grass blades
    for (let i = 0; i < 1500; i++) {
        const blade = document.createElement('div');
        blade.className = 'grass-blade';
        
        // Random position across the width
        const leftPos = Math.random() * 100;
        
        // Random small size
        const width = Math.random() * 2.5 + 0.8; // 0.8-3.3px width
        const height = Math.random() * 20 + 6; // 6-26px height
        
        // Random green colors for gradient
        const hue = 120 + (Math.random() - 0.5) * 40; // Green hues
        const baseLightness = Math.random() * 15 + 8; // 8-23%
        const tipLightness = baseLightness + Math.random() * 25 + 15; // +15-40%
        
        const baseColor = `hsl(${hue}, 70%, ${baseLightness}%)`;
        const tipColor = `hsl(${hue}, 60%, ${tipLightness}%)`;
        
        // Random animation delay
        const delay = Math.random() * 8;
        
        // Apply all styles
        blade.style.position = 'absolute';
        blade.style.bottom = '0';
        blade.style.left = leftPos + '%';
        blade.style.width = width + 'px';
        blade.style.height = height*1.8 + 'px';
        blade.style.background = `linear-gradient(to top, ${baseColor} 0%, ${tipColor} 100%)`;
        blade.style.borderRadius = '50% 50% 0 0';
        blade.style.transformOrigin = 'bottom center';
        blade.style.animation = 'grassSway 5s ease-in-out infinite';
        blade.style.animationDelay = delay + 's';
        
        grassContainer.appendChild(blade);
        
        // Store blade data for interaction
        grassBlades.push({
            element: blade,
            x: (leftPos / 100) * window.innerWidth,
            y: window.innerHeight - height,
            width: width,
            height: height,
            isShaking: false
        });
    }
}

// Initialize firefly
function initFirefly() {
    firefly = document.getElementById('firefly');
    if (!firefly) {
        console.error('Firefly element not found');
        return;
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update firefly position with slight delay for natural movement
        if (firefly) {
            firefly.style.left = (mouseX - 6) + 'px';
            firefly.style.top = (mouseY - 6) + 'px';
        }
        
        // Check grass interaction
        checkGrassInteraction(mouseX, mouseY);
        
        // Check firefly scatter interaction
        updateFireflyScatter(mouseX, mouseY);
    });
}

function checkGrassInteraction(fireflyX, fireflyY) {
    const interactionRadius = 80; // Distance for interaction
    
    grassBlades.forEach(blade => {
        const distance = Math.sqrt(
            Math.pow(fireflyX - blade.x, 2) + 
            Math.pow(fireflyY - blade.y, 2)
        );
        
        if (distance < interactionRadius && !blade.isShaking) {
            // Trigger grass shake
            shakeGrass(blade);
        } else if (distance >= interactionRadius && blade.isShaking) {
            // Return to normal sway
            resetGrass(blade);
        }
    });
}

function shakeGrass(blade) {
    blade.isShaking = true;
    
    // Choose random shake direction
    const shakeTypes = ['grassShakeLeft', 'grassShakeRight', 'grassShakeWild'];
    const randomShake = shakeTypes[Math.floor(Math.random() * shakeTypes.length)];
    
    // Apply shake animation
    blade.element.style.animation = `${randomShake} 0.8s ease-in-out infinite`;
    
    // Also brighten the grass slightly
    blade.element.style.filter = 'brightness(1.3)';
}

function resetGrass(blade) {
    blade.isShaking = false;
    
    // Return to normal sway
    blade.element.style.animation = 'grassSway 5s ease-in-out infinite';
    blade.element.style.animationDelay = Math.random() * 8 + 's';
    blade.element.style.filter = 'brightness(1)';
}

// Create stars function
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        const size = Math.random() < 0.1 ? Math.random() * 2 + 2 : Math.random() * 1.5 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

// Enhanced ambient fireflies with scatter effect
function createAmbientFireflies() {
    // Create container for ambient fireflies if it doesn't exist
    let firefliesContainer = document.querySelector('.ambient-fireflies');
    if (!firefliesContainer) {
        firefliesContainer = document.createElement('div');
        firefliesContainer.className = 'ambient-fireflies';
        document.body.appendChild(firefliesContainer);
    }
    
    // Clear existing fireflies
    firefliesContainer.innerHTML = '';
    ambientFireflies = [];
    
    // Create 15-25 random fireflies
    const fireflyCount = Math.floor(Math.random() * 50) + 15;
    
    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'ambient-firefly';
        
        // Random position above grass (bottom 20% to 40% of screen)
        const leftPos = Math.random() * 100;
        const bottomPos = Math.random() * 30 + 10; // 10-40% from bottom
        
        // Random animation delay and duration for variety
        const animDelay = Math.random() * 10;
        const animDuration = 3 + Math.random() * 3; // 3-7 seconds
        const glowDelay = Math.random() * 5;
        const glowDuration = 2 + Math.random() * 4; // 2-5 seconds
        
        // Random size (smaller than cursor firefly)
        const size = 3 + Math.random() * 3; // 3-7px
        
        firefly.style.left = leftPos + '%';
        firefly.style.bottom = bottomPos + '%';
        firefly.style.width = size + 'px';
        firefly.style.height = size + 'px';
        
        // Store original position
        const originalLeft = (leftPos / 100) * window.innerWidth;
        const originalBottom = (bottomPos / 100) * window.innerHeight;
        
        // Apply animations
        firefly.style.animation = `
            floatFirefly ${animDuration}s ${animDelay}s ease-in-out infinite, pulseGlow ${glowDuration}s ${glowDelay}s ease-in-out infinite`;
        
        // Add transition for smooth scatter effect
        firefly.style.transition = 'transform 20.3s cubic-bezier(13.25, 7.46, 22.45, 1.94)';
        
        firefliesContainer.appendChild(firefly);
        
        // Store firefly data for interaction - SIMPLIFIED
        ambientFireflies.push({
            element: firefly,
            isScattered: false,
            floatAnimation: `floatFirefly ${animDuration}s ${animDelay}s ease-in-out infinite`,
            glowAnimation: `pulseGlow ${glowDuration}s ${glowDelay}s ease-in-out infinite`
        });
    }
}

// COMPLETELY NEW SCATTER FUNCTION
function updateFireflyScatter(mouseX, mouseY) {
    const scatterRadius = 60;
    
    ambientFireflies.forEach((firefly, index) => {
        const rect = firefly.element.getBoundingClientRect();
        const fireflyX = rect.left + rect.width / 2;
        const fireflyY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - fireflyX, 2) + 
            Math.pow(mouseY - fireflyY, 2)
        );
        
        if (distance < scatterRadius && !firefly.isScattered) {
            firefly.isScattered = true;
            
            // UNIQUE random direction for EACH firefly
            const angle = Math.random() * Math.PI * 3;
            const dist = 180 + Math.random() * 60; // 180-300px
            
            const moveX = Math.cos(angle) * dist;
            const moveY = Math.sin(angle) * dist;
            
            // Random color for each
            const hue = Math.random() * 360;
            
            // Apply movement and color
            firefly.element.style.transition = 'all 1.5s ease-out';
            firefly.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            firefly.element.style.filter = `brightness(2.5) hue-rotate(${hue}deg) saturate(2)`;
            
            // Fast pulse
            firefly.element.style.animation = 'pulseGlow 15s ease-in-out infinite';
            
        } else if (distance >= scatterRadius && firefly.isScattered) {
            firefly.isScattered = false;
            
            // Return home
            firefly.element.style.transition = 'all 5s ease-in-out';
            firefly.element.style.transform = 'translate(0px, 0px)';
            firefly.element.style.filter = 'brightness(1) hue-rotate(0deg) saturate(1)';
            
            // Restore animation
            firefly.element.style.animation = `${firefly.floatAnimation}, ${firefly.glowAnimation}`;
        }
    });
}

// Shooting star class (Perseid meteors)
function ShootingStar() {
    this.reset();
}

ShootingStar.prototype.reset = function() {
    this.x = Math.random() * width;
    this.y = Math.random() * height * 0.1;
    this.len = (Math.random() * 120) + 40; // Longer tails
    this.speed = (Math.random() * 5) + 4;
    this.size = (Math.random() * 3) + 1; // Bigger head
    this.waitTime = new Date().getTime() + (Math.random() * 7000) + 1000;
    this.active = false;
    
    // Random colors for the meteor
    this.colors = [
        '#ffffff', '#ffffaa', '#aaffff', '#ffaaaa', 
        '#aaffaa', '#ffaaff', '#ffddaa', '#aaddff'
    ];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    
    // Random disappearance point (not just edges)
    this.disappearX = this.x - (Math.random() * width * 0.3 + width * 0.2);
    this.disappearY = this.y + (Math.random() * height * 0.3 + height * 0.2);
}

ShootingStar.prototype.update = function() {
    if (this.active) {
        this.x -= this.speed;
        this.y += this.speed;
        
        // Check if reached disappearance point OR screen edges
        if (this.x < this.disappearX || this.y > this.disappearY || this.x < 0 || this.y >= height) {
            this.reset();
        } else {
            // Draw glowing head
            starCtx.shadowBlur = 15;
            starCtx.shadowColor = this.color;
            starCtx.fillStyle = this.color;
            starCtx.beginPath();
            starCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            starCtx.fill();
            
            // Draw fading tail
            this.drawTail();
            
            // Reset shadow
            starCtx.shadowBlur = 0;
        }
    } else {
        if (this.waitTime < new Date().getTime()) {
            this.active = true;
        }			
    }
}

ShootingStar.prototype.drawTail = function() {
    let tailSegments = 20; // Number of segments for smooth fade
    
    for (let i = 0; i < tailSegments; i++) {
        let ratio = i / tailSegments;
        let segmentLen = this.len / tailSegments;
        
        // Calculate position along the tail
        let tailX = this.x + (ratio * this.len * 0.7); // 0.7 for diagonal
        let tailY = this.y - (ratio * this.len * 0.7);
        
        // Fade opacity from 1 to 0
        let opacity = 1 - (ratio * ratio); // Quadratic fade for more natural look
        
        // Create gradient for this segment
        let gradient = starCtx.createLinearGradient(
            tailX, tailY,
            tailX + segmentLen * 0.7, tailY - segmentLen * 0.7
        );
        
        // Extract RGB from hex color
        let r = parseInt(this.color.slice(1, 3), 16);
        let g = parseInt(this.color.slice(3, 5), 16);
        let b = parseInt(this.color.slice(5, 7), 16);
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`);
        
        starCtx.strokeStyle = gradient;
        starCtx.lineWidth = this.size * (1 - ratio * 0.8); // Tail gets thinner
        starCtx.lineCap = 'round';
        
        starCtx.beginPath();
        starCtx.moveTo(tailX, tailY);
        starCtx.lineTo(tailX + segmentLen * 0.7, tailY - segmentLen * 0.7);
        starCtx.stroke();
    }
}

// Initialize meteor shower
function initMeteorShower() {
    canvas = document.getElementById('starCanvas');
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }
    
    starCtx = canvas.getContext('2d');
    
    // Set canvas size
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Create shooting stars
    shootingStars = [];
    for (let i = 0; i < 8; i++) { // 8 concurrent meteors
        shootingStars.push(new ShootingStar());
    }
    
    // Start animation
    animateMeteors();
}

// Animation loop
function animateMeteors() {
    // Clear canvas
    starCtx.clearRect(0, 0, width, height);
    
    // Update and draw stars
    for (let i = 0; i < shootingStars.length; i++) {
        shootingStars[i].update();
    }
    
    requestAnimationFrame(animateMeteors);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    createGrassField();
    initFirefly();
    createStars();
    initMeteorShower();
    createAmbientFireflies();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading
} else {
    // DOM is already loaded
    createGrassField();
    initFirefly();
    createStars();
    initMeteorShower();
    createAmbientFireflies();
}

// Update on resize
window.addEventListener('resize', () => {
    // Update canvas size
    if (canvas) {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    // Update grass positions
    grassBlades.forEach((blade, index) => {
        const leftPercent = parseFloat(blade.element.style.left);
        blade.x = (leftPercent / 100) * window.innerWidth;
    });
});