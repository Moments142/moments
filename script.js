// Password protection
const CORRECT_PASSWORD = '68304';
let isUnlocked = false;

// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Relationship start date
const relationshipStartDate = new Date('2022-02-14');

// DOM Elements
const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const passwordOverlay = document.getElementById('passwordOverlay');
const passwordInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const errorMessage = document.getElementById('errorMessage');
let isMusicPlaying = false;

// Password validation functions
function validatePassword() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === CORRECT_PASSWORD) {
        unlockWebsite();
        return true;
    } else {
        showErrorMessage('Incorrect code. Please try again.');
        passwordInput.value = '';
        passwordInput.focus();
        return false;
    }
}
// ======= Full Image Modal Functionality =======
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalQuote = document.getElementById('modalQuote');
const closeModalBtn = document.querySelector('.close-modal');

document.querySelectorAll('.moment').forEach(moment => {
  const img = moment.querySelector('.moment-image img');
  const quote = moment.querySelector('.moment-text blockquote');
  
  img.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalQuote.textContent = quote.textContent;
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  });
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});


function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
}

function unlockWebsite() {
    isUnlocked = true;
    
    // Hide password overlay with animation
    passwordOverlay.classList.add('hidden');
    
    // Enable body scroll
    document.body.style.overflow = 'auto';
    
    // Start the main website functionality
    setTimeout(() => {
        initializeWebsite();
        passwordOverlay.style.display = 'none';
    }, 800);
}

function initializeWebsite() {
    // Initial counter update
    updateCounter();
    
    // Update counter every minute
    setInterval(updateCounter, 60000);
    
    // Load images
    loadImages();
    
    // Add touch optimizations
    addTouchOptimizations();
    
    // Start floating hearts animation
    setTimeout(createFloatingHearts, 2000);
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        const moments = document.querySelectorAll('.moment');
        moments.forEach((moment, index) => {
            setTimeout(() => {
                moment.style.opacity = '0';
                moment.style.transform = 'translateY(50px)';
            }, index * 100);
        });
    });
}

// Password event listeners
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        validatePassword();
    }
});

unlockBtn.addEventListener('click', validatePassword);

// Prevent scrolling when password overlay is active
document.body.style.overflow = 'hidden';

// Update counter function
function updateCounter() {
    const now = new Date();
    const timeDiff = now - relationshipStartDate;
    
    // Calculate years, months, and days
    const years = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor((timeDiff % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const days = Math.floor((timeDiff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    
    // Animate counter updates
    animateCounter(yearsElement, years);
    animateCounter(monthsElement, months);
    animateCounter(daysElement, days);
}

// Animate counter numbers
function animateCounter(element, targetValue) {
    const currentValue = parseInt(element.textContent) || 0;
    const increment = targetValue > currentValue ? 1 : -1;
    const duration = 1000;
    const steps = Math.abs(targetValue - currentValue);
    const stepDuration = duration / steps;
    
    if (steps === 0) return;
    
    let current = currentValue;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if (current === targetValue) {
            clearInterval(timer);
        }
    }, stepDuration);
}

// Music toggle functionality
musicToggle.addEventListener('click', function() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        this.innerHTML = '<i class="fas fa-music"></i>';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
        isMusicPlaying = false;
    } else {
        backgroundMusic.play().catch(error => {
            console.log('Autoplay prevented:', error);
            // Fallback: show a message to user
            showMusicMessage();
        });
        this.innerHTML = '<i class="fas fa-pause"></i>';
        this.style.background = 'rgba(255, 107, 157, 0.3)';
        isMusicPlaying = true;
    }
});

// Show music message when autoplay is prevented
function showMusicMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 107, 157, 0.9);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        z-index: 1001;
        font-size: 0.9rem;
        max-width: 200px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    message.textContent = 'Click the music button to enable background music';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Intersection Observer for timeline animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation delay for multiple moments
            const moments = document.querySelectorAll('.moment');
            moments.forEach((moment, index) => {
                if (moment === entry.target) {
                    moment.style.animationDelay = `${index * 0.2}s`;
                }
            });
        }
    });
}, observerOptions);

// Observe all moment elements
document.querySelectorAll('.moment').forEach(moment => {
    observer.observe(moment);
});

// Image lazy loading with fade-in effect
function loadImages() {
    const images = document.querySelectorAll('.moment-image img');
    
    images.forEach((img, index) => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}

// Parallax effect for hero section
function handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
}

// Smooth scroll for navigation
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add scroll event listener for parallax
window.addEventListener('scroll', handleParallax);

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.9)';
    }
});

// Heart animation enhancement
function createFloatingHearts() {
    const hero = document.querySelector('.hero');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: fixed;
            top: 100vh;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random() * 0.5 + 0.5};
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 8s linear forwards;
        `;
        
        // Add CSS animation if not already added
        if (!document.getElementById('heartFloatStyle')) {
            const style = document.createElement('style');
            style.id = 'heartFloatStyle';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 3000);
}

// Create floating hearts for password screen
function createPasswordHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: fixed;
            top: 100vh;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 15 + 8}px;
            opacity: ${Math.random() * 0.3 + 0.3};
            pointer-events: none;
            z-index: 10001;
            animation: floatUp 6s linear forwards;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 4000);
}

// Touch and mobile optimizations
function addTouchOptimizations() {
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(handleParallax, 16));
window.addEventListener('scroll', throttle(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.9)';
    }
}, 16));

// Initialize password protection when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Focus on password input
    setTimeout(() => {
        passwordInput.focus();
    }, 500);
    
    // Add some floating hearts to the password screen
    createPasswordHearts();
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', throttle(function() {
    // Recalculate layout if needed
    const moments = document.querySelectorAll('.moment');
    moments.forEach(moment => {
        const content = moment.querySelector('.moment-content');
        if (window.innerWidth <= 768) {
            content.style.gridTemplateColumns = '1fr';
        } else {
            content.style.gridTemplateColumns = '1fr 1fr';
        }
    });
}, 250));

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Pause music if playing
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            musicToggle.style.background = 'rgba(255, 255, 255, 0.1)';
            isMusicPlaying = false;
        }
    }
});

// Add click-to-scroll functionality for scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', function() {
    const timeline = document.querySelector('.timeline');
    smoothScrollTo(timeline);
});

// Add hover effects for moment images
document.querySelectorAll('.moment-image').forEach(imageContainer => {
    imageContainer.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    imageContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Error handling for images
document.querySelectorAll('.moment-image img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 400px;
            background: linear-gradient(45deg, rgba(255, 107, 157, 0.1), rgba(254, 202, 87, 0.1));
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.5);
            font-size: 1.2rem;
            border-radius: 15px;
        `;
        placeholder.textContent = 'Image not found';
        this.parentNode.appendChild(placeholder);
    });
});

console.log('💖 Our Story in Moments - Love timeline loaded successfully! 💖');
