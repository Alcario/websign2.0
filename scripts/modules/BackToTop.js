/**
 * WebSign Portfolio - Back To Top Module
 * Author: Albano Caminos
 */

'use strict';

// ===== BACK TO TOP MODULE =====
export const BackToTop = {
    button: null,
    scrollProgress: 0,
    threshold: 200,
    isVisible: false,
    
    init() {
        this.button = document.querySelector('#backToTop');
        
        if (!this.button) {
            this.createButton();
        }
        
        if (!this.button) {
            console.warn('BackToTop: Could not create or find button');
            return;
        }
        
        this.bindEvents();
        this.updateVisibility();
    },

    createButton() {
        this.button = document.createElement('button');
        this.button.id = 'backToTop';
        this.button.className = 'back-to-top';
        this.button.setAttribute('aria-label', 'Volver arriba');
        this.button.innerHTML = `
            <svg class="back-to-top-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
            </svg>
        `;
        
        // Add styles
        this.button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 56px;
            height: 56px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-normal);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(this.button);
    },

    bindEvents() {
        if (!this.button) return;
        
        // Click event
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });

        // Scroll event with throttle
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateVisibility();
                    this.updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Hover effects
        this.button.addEventListener('mouseenter', () => {
            this.button.style.transform = 'translateY(-3px)';
            this.button.style.boxShadow = '0 8px 25px rgba(0, 255, 136, 0.3)';
            this.button.style.borderColor = 'var(--accent-primary)';
        });

        this.button.addEventListener('mouseleave', () => {
            this.button.style.transform = '';
            this.button.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            this.button.style.borderColor = 'var(--border-color)';
        });
    },

    scrollToTop() {
        if (!this.button) return;
        
        // Visual feedback
        this.button.style.transform = 'scale(0.95)';
        
        // Smooth scroll
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Reset transform
        setTimeout(() => {
            if (this.button) {
                this.button.style.transform = '';
            }
        }, 200);
    },

    updateVisibility() {
        if (!this.button) return;
        
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const shouldBeVisible = scrollY > this.threshold;
        
        if (shouldBeVisible && !this.isVisible) {
            this.show();
        } else if (!shouldBeVisible && this.isVisible) {
            this.hide();
        }
    },

    show() {
        if (!this.button) return;
        
        this.button.style.opacity = '1';
        this.button.style.visibility = 'visible';
        this.isVisible = true;
    },

    hide() {
        if (!this.button) return;
        
        this.button.style.opacity = '0';
        this.button.style.visibility = 'hidden';
        this.isVisible = false;
    },

    updateProgress() {
        if (!this.button) return;
        
        // Calculate scroll progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        this.scrollProgress = Math.min(scrolled, 100);
    },

    setThreshold(newThreshold) {
        this.threshold = newThreshold;
    },

    destroy() {
        if (this.button && this.button.parentNode) {
            this.button.parentNode.removeChild(this.button);
        }
        this.button = null;
        this.isVisible = false;
    }
};

export default BackToTop;