// ===== PASSWORD PROTECTION =====
const CORRECT_PASSWORD = '68304';
let isUnlocked = false;

// ===== RELATIONSHIP START DATE =====
const relationshipStartDate = new Date('2022-02-14');

// ===== DOM ELEMENTS =====
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

// ===== AOS INIT =====
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

// ===== PASSWORD VALIDATION =====
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

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
  setTimeout(() => {
    errorMessage.classList.remove('show');
  }, 3000);
}

// ===== UNLOCK WEBSITE =====
function unlockWebsite() {
  isUnlocked = true;
  document.getElementById('passwordOverlay').classList.add('hidden');
  document.body.style.overflow = 'auto';

  // 🌹 Show apology first
  const apologyPage = document.getElementById('apologyPage');
  apologyPage.classList.remove('hidden');
  setTimeout(() => apologyPage.classList.add('show'), 100);

  document.getElementById('continueButton').addEventListener('click', () => {
    apologyPage.classList.remove('show');
    setTimeout(() => {
      apologyPage.style.display = 'none';
      initializeWebsite(); // ← your existing function that loads the main site
    }, 800);
  });
}


// ===== INITIALIZE WEBSITE =====
function initializeWebsite() {
  updateCounter();
  setInterval(updateCounter, 60000);
  loadImages();
  addTouchOptimizations();
  setTimeout(createFloatingHearts, 2000);

  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
}

// ===== COUNTER UPDATE =====
function updateCounter() {
  const now = new Date();
  const diff = now - relationshipStartDate;
  const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor((diff % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
  const days = Math.floor((diff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
  animateCounter(yearsElement, years);
  animateCounter(monthsElement, months);
  animateCounter(daysElement, days);
}

function animateCounter(element, targetValue) {
  const currentValue = parseInt(element.textContent) || 0;
  const increment = targetValue > currentValue ? 1 : -1;
  const duration = 1000;
  const steps = Math.abs(targetValue - currentValue);
  const stepDuration = duration / (steps || 1);
  let current = currentValue;
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current;
    if (current === targetValue) clearInterval(timer);
  }, stepDuration);
}

// ===== MUSIC TOGGLE =====
musicToggle.addEventListener('click', function() {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    this.innerHTML = '<i class="fas fa-music"></i>';
    this.style.background = 'rgba(255, 255, 255, 0.1)';
    isMusicPlaying = false;
  } else {
    backgroundMusic.play().catch(() => showMusicMessage());
    this.innerHTML = '<i class="fas fa-pause"></i>';
    this.style.background = 'rgba(255, 107, 157, 0.3)';
    isMusicPlaying = true;
  }
});

function showMusicMessage() {
  const msg = document.createElement('div');
  msg.style.cssText = `
    position: fixed; top: 100px; right: 20px;
    background: rgba(255, 107, 157, 0.9);
    color: white; padding: 1rem; border-radius: 10px;
    z-index: 1001; font-size: 0.9rem; max-width: 200px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  `;
  msg.textContent = 'Click the music button to enable background music';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 5000);
}

// ===== FLOATING HEARTS =====
function createFloatingHearts() {
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
    if (!document.getElementById('heartFloatStyle')) {
      const style = document.createElement('style');
      style.id = 'heartFloatStyle';
      style.textContent = `
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }, 3000);
}

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
    setTimeout(() => heart.remove(), 6000);
  }, 4000);
}

// ===== IMAGE LOADING =====
function loadImages() {
  const images = document.querySelectorAll('.moment-image img');
  images.forEach(img => {
    img.addEventListener('load', () => img.classList.add('loaded'));
    if (img.complete) img.classList.add('loaded');
  });
}

// ===== TOUCH OPTIMIZATIONS =====
function addTouchOptimizations() {
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) event.preventDefault();
    lastTouchEnd = now;
  }, false);
}

// ===== SCROLL + EFFECTS =====
window.addEventListener('scroll', throttle(handleParallax, 16));
window.addEventListener('resize', throttle(() => {}, 250));

function handleParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  if (hero && heroContent) {
    const rate = scrolled * -0.5;
    heroContent.style.transform = `translateY(${rate}px)`;
  }
}

// ===== THROTTLE FUNCTION =====
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ===== PASSWORD EVENTS =====
passwordInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') validatePassword();
});
unlockBtn.addEventListener('click', validatePassword);

// Prevent scroll while password overlay is active
document.body.style.overflow = 'hidden';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => passwordInput.focus(), 500);
  createPasswordHearts();
});

console.log('💖 Our Story in Moments - Love timeline loaded successfully! 💖');


