/**
 * WebSign Portfolio - Scroll Animations Module
 * Author: Albano Caminos
 */

'use strict';

import { CONFIG } from '../config/constants.js';
import { Utils } from '../utils/helpers.js';

// ===== SCROLL ANIMATIONS MODULE =====
export const ScrollAnimations = {
    observer: null,
    skillBarsAnimated: false,
    animatedElements: new Set(),
    
    init() {
        // Check if user prefers reduced motion
        if (Utils.prefersReducedMotion()) {
            console.log('⚠️ Reduced motion preferred, skipping scroll animations');
            return;
        }

        this.setupIntersectionObserver();
        this.observeElements();
        this.bindScrollEvents();
        
        // Listen for loading complete to start animations
        document.addEventListener('loadingComplete', () => {
            this.startInitialAnimations();
        });
    },

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                    
                    // Don't observe this element anymore unless it's repeatable
                    if (!entry.target.hasAttribute('data-animate-repeat')) {
                        this.observer.unobserve(entry.target);
                    }
                }
            });
        }, options);
    },

    observeElements() {
        // Sections
        document.querySelectorAll('section').forEach(section => {
            this.observer.observe(section);
        });

        // Cards and interactive elements
        document.querySelectorAll('.project-card, .tech-card, .stat-card, .service-card').forEach(card => {
            this.observer.observe(card);
        });

        // Timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            this.observer.observe(item);
        });

        // Other animatable elements
        document.querySelectorAll('[data-animate]').forEach(element => {
            this.observer.observe(element);
        });
    },

    bindScrollEvents() {
        // Parallax effects for hero section
        window.addEventListener('scroll', Utils.throttle(() => {
            this.updateParallaxEffects();
            this.updateProgressIndicators();
        }, 16)); // ~60fps

        // Update skill bars on skills section visibility
        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            this.observer.observe(skillsSection);
        }
    },

    animateElement(element) {
        // Add base animation class
        element.classList.add('fade-in');

        // Special handling for different element types
        if (element.classList.contains('skills-section') && !this.skillBarsAnimated) {
            this.animateSkillBars();
            this.skillBarsAnimated = true;
        }

        if (element.classList.contains('stat-card')) {
            this.animateStatNumbers(element);
        }

        if (element.classList.contains('timeline-item')) {
            this.animateTimelineItem(element);
        }

        if (element.classList.contains('project-card')) {
            this.animateProjectCard(element);
        }

        if (element.classList.contains('tech-card')) {
            this.animateTechCard(element);
        }

        // Custom animation based on data attribute
        const customAnimation = element.getAttribute('data-animate');
        if (customAnimation) {
            this.applyCustomAnimation(element, customAnimation);
        }
    },

    animateSkillBars() {
        const skillBars = document.querySelectorAll(CONFIG.SELECTORS.skillBars);
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.getAttribute('data-level');
                if (level) {
                    bar.style.transition = 'width 1s ease-out';
                    bar.style.width = level + '%';
                }
            }, index * 150); // Staggered animation
        });
    },

    animateStatNumbers(statCard) {
        const numberElement = statCard.querySelector('.stat-number');
        if (!numberElement) return;

        const finalText = numberElement.textContent;
        const finalNumber = parseInt(finalText.replace(/\D/g, ''));
        
        if (isNaN(finalNumber)) return;

        const isPercentage = finalText.includes('%');
        const hasPlus = finalText.includes('+');
        
        let currentNumber = 0;
        const increment = Math.max(1, Math.ceil(finalNumber / 50));
        const duration = 2000; // 2 seconds
        const interval = duration / (finalNumber / increment);
        
        const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(counter);
            }
            
            let displayText = currentNumber.toString();
            if (isPercentage) displayText += '%';
            if (hasPlus && currentNumber === finalNumber) displayText += '+';
            
            numberElement.textContent = displayText;
        }, interval);
    },

    animateTimelineItem(item) {
        const direction = item.getBoundingClientRect().left > window.innerWidth / 2 ? 'right' : 'left';
        item.classList.add(`slide-in-${direction}`);
        
        // Animate marker
        const marker = item.querySelector('.timeline-marker');
        if (marker) {
            setTimeout(() => {
                marker.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    marker.style.transform = 'scale(1)';
                }, 300);
            }, 300);
        }
    },

    animateProjectCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);

        // Animate tech tags
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.animation = 'fadeInUp 0.4s ease forwards';
            }, 600 + (index * 100));
        });
    },

    animateTechCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 100);

        // Animate skill bar if present
        const skillBar = card.querySelector('.skill-bar');
        if (skillBar) {
            setTimeout(() => {
                const level = skillBar.getAttribute('data-level');
                if (level) {
                    skillBar.style.width = level + '%';
                }
            }, 500);
        }
    },

    applyCustomAnimation(element, animationType) {
        const animations = {
            'fadeIn': () => {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.transition = 'opacity 0.6s ease';
                    element.style.opacity = '1';
                }, 100);
            },
            
            'slideUp': () => {
                element.style.transform = 'translateY(50px)';
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease';
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                }, 100);
            },
            
            'slideLeft': () => {
                element.style.transform = 'translateX(-50px)';
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease';
                    element.style.transform = 'translateX(0)';
                    element.style.opacity = '1';
                }, 100);
            },
            
            'scale': () => {
                element.style.transform = 'scale(0.8)';
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    element.style.transform = 'scale(1)';
                    element.style.opacity = '1';
                }, 100);
            },
            
            'rotate': () => {
                element.style.transform = 'rotate(-10deg)';
                element.style.opacity = '0';
                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease';
                    element.style.transform = 'rotate(0deg)';
                    element.style.opacity = '1';
                }, 100);
            }
        };

        if (animations[animationType]) {
            animations[animationType]();
        }
    },

    updateParallaxEffects() {
        const scrollTop = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            const scrollPercent = Math.min(scrollTop / heroHeight, 1);
            
            // Parallax effect for matrix background
            const matrixBg = heroSection.querySelector('.matrix-bg');
            if (matrixBg) {
                matrixBg.style.transform = `translateY(${scrollPercent * 50}px)`;
                matrixBg.style.opacity = 1 - scrollPercent * 0.5;
            }
            
            // Parallax effect for hero content
            const heroContainer = heroSection.querySelector('.hero-container');
            if (heroContainer) {
                heroContainer.style.transform = `translateY(${scrollPercent * 30}px)`;
            }
        }
    },

    updateProgressIndicators() {
        const progressElements = document.querySelectorAll('[data-progress]');
        
        progressElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = Math.max(0, Math.min(1, 
                    1 - (rect.top / windowHeight)
                ));
                
                element.style.setProperty('--scroll-progress', progress);
            }
        });
    },

    startInitialAnimations() {
        // Animate elements that are already in view
        const elementsInView = document.querySelectorAll('section, .stat-card, .hero-container');
        
        elementsInView.forEach(element => {
            if (Utils.isInViewport(element, 100)) {
                this.animateElement(element);
                this.animatedElements.add(element);
            }
        });
    },

    // Public methods
    animateElementManually(element, animationType = 'fadeIn') {
        if (element && !this.animatedElements.has(element)) {
            this.applyCustomAnimation(element, animationType);
            this.animatedElements.add(element);
        }
    },

    resetElementAnimation(element) {
        if (element) {
            this.animatedElements.delete(element);
            element.style.opacity = '';
            element.style.transform = '';
            element.style.transition = '';
            element.classList.remove('fade-in', 'slide-in-left', 'slide-in-right');
        }
    },

    pauseAnimations() {
        if (this.observer) {
            this.observer.disconnect();
        }
        console.log('⏸️ Scroll animations paused');
    },

    resumeAnimations() {
        if (this.observer) {
            this.observeElements();
        }
        console.log('▶️ Scroll animations resumed');
    },

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        this.animatedElements.clear();
        this.skillBarsAnimated = false;
        
        console.log('💥 ScrollAnimations destroyed');
    }
};

export default ScrollAnimations;