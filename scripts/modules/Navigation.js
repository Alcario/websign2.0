/**
 * WebSign Portfolio - Navigation Module
 * Author: Albano Caminos
 */

'use strict';

import { CONFIG } from '../config/constants.js';
import { Utils } from '../utils/helpers.js';

// ===== NAVIGATION MODULE =====
export const Navigation = {
    nav: null,
    navMenu: null,
    mobileToggle: null,
    isMenuOpen: false,
    lastScrollY: 0,

    init() {
        this.nav = document.querySelector(CONFIG.SELECTORS.nav);
        this.navMenu = document.querySelector(CONFIG.SELECTORS.navMenu);
        this.mobileToggle = document.querySelector(CONFIG.SELECTORS.mobileToggle);

        if (!this.nav) {
            console.warn('Navigation: Nav element not found');
            return;
        }

        this.bindEvents();
        this.setActiveLink();
    },

    bindEvents() {
        // Mobile menu toggle
        this.mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Smooth scroll for navigation links
        this.navMenu?.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                this.handleNavClick(e.target);
            }
        });

        // Hide/show nav on scroll
        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), CONFIG.PERFORMANCE.SCROLL_THROTTLE));

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.nav?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle scroll to update active link
        window.addEventListener('scroll', Utils.throttle(() => this.setActiveLink(), CONFIG.PERFORMANCE.SCROLL_THROTTLE));

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    },

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navMenu?.classList.toggle('active');
        this.mobileToggle?.classList.toggle('active');
        document.body.classList.toggle('no-scroll', this.isMenuOpen);
    },

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.navMenu?.classList.remove('active');
        this.mobileToggle?.classList.remove('active');
        document.body.classList.remove('no-scroll');
    },

    handleNavClick(link) {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            Utils.smoothScrollTo(targetElement);
            this.closeMobileMenu();
        }
    },

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Hide/show navigation based on scroll direction
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
            this.nav?.classList.add('hidden');
        } else {
            this.nav?.classList.remove('hidden');
        }
        
        this.lastScrollY = currentScrollY;
    },

    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = this.navMenu?.querySelectorAll('a[href^="#"]') || [];
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
};

export default Navigation;