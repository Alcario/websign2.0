/**
 * WebSign Portfolio - Configuration & Constants
 * Author: Albano Caminos
 */

'use strict';

// ===== MAIN CONFIGURATION =====
export const CONFIG = {
    // Animation settings
    ANIMATION_DELAY: 100,
    TYPING_SPEED: 80,
    SCROLL_THRESHOLD: 100,
    
    // Form settings
    FORM_SUBMISSION_DELAY: 2000,
    NOTIFICATION_DURATION: 5000,
    
    // API endpoints (for future use)
    API_BASE_URL: 'https://api.websign.dev',
    
    // Selectors
    SELECTORS: {
        nav: '.terminal-nav',
        navMenu: '.nav-menu',
        mobileToggle: '.mobile-toggle',
        backToTop: '#backToTop',
        loadingScreen: '#loading-screen',
        contactForm: '#contactForm',
        skillBars: '.skill-bar',
        projectCards: '.project-card',
        filterBtns: '.filter-btn'
    },

    // Performance settings
    PERFORMANCE: {
        SCROLL_THROTTLE: 100,
        RESIZE_DEBOUNCE: 250,
        TYPING_INTERVAL: 50
    },

    // Breakpoints
    BREAKPOINTS: {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
        wide: 1400
    }
};

// ===== TYPING COMMANDS =====
export const TYPING_COMMANDS = [
    'npm start',
    'git commit -m "feat: awesome portfolio"',
    'deploy --production',
    'echo "Ready to build amazing apps!"'
];

// ===== MATRIX CHARACTERS =====
export const MATRIX_CHARACTERS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

// ===== KEYBOARD SHORTCUTS =====
export const KEYBOARD_SHORTCUTS = {
    'h': 'inicio',
    's': 'skills', 
    'p': 'proyectos',
    'e': 'experiencia',
    'c': 'contacto'
};

// ===== KONAMI CODE =====
export const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

// ===== NOTIFICATION ICONS =====
export const NOTIFICATION_ICONS = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
};

// ===== TECH TAGS STYLES =====
export const TECH_TAG_STYLES = {
    react: { background: 'rgba(97, 218, 251, 0.2)', color: '#61dafb' },
    nodejs: { background: 'rgba(104, 160, 99, 0.2)', color: '#68a063' },
    mongodb: { background: 'rgba(76, 175, 80, 0.2)', color: '#4caf50' },
    auth: { background: 'rgba(255, 87, 34, 0.2)', color: '#ff5722' },
    bootstrap: { background: 'rgba(121, 82, 179, 0.2)', color: '#7952b3' },
    zustand: { background: 'rgba(255, 193, 7, 0.2)', color: '#ffc107' },
    wordpress: { background: 'rgba(33, 117, 155, 0.2)', color: '#21759b' },
    woocommerce: { background: 'rgba(150, 88, 138, 0.2)', color: '#96588a' }
};

// ===== ANIMATION CLASSES =====
export const ANIMATION_CLASSES = {
    fadeIn: 'fade-in',
    slideInLeft: 'slide-in-left',
    slideInRight: 'slide-in-right',
    typing: 'typing-animation'
};

// ===== CONTACT FORM VALIDATION =====
export const FORM_VALIDATION = {
    minNameLength: 2,
    minMessageLength: 10,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

export default CONFIG;