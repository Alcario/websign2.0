/**
 * WebSign Portfolio - Keyboard Shortcuts Module
 * Author: Albano Caminos
 */

'use strict';

import { KEYBOARD_SHORTCUTS } from '../config/constants.js';
import { Utils } from '../utils/helpers.js';

// ===== KEYBOARD SHORTCUTS MODULE =====
export const KeyboardShortcuts = {
    shortcuts: {},
    isEnabled: true,
    helpVisible: false,

    init() {
        this.setupDefaultShortcuts();
        this.bindEvents();
        this.showInitialHelp();
    },

    setupDefaultShortcuts() {
        // Navigation shortcuts
        Object.entries(KEYBOARD_SHORTCUTS).forEach(([key, sectionId]) => {
            this.shortcuts[key] = () => this.navigateToSection(sectionId);
        });

        // Additional shortcuts
        this.shortcuts['t'] = () => this.scrollToTop();
        this.shortcuts['?'] = () => this.toggleHelp();
        this.shortcuts['Escape'] = () => this.handleEscape();
        this.shortcuts['/'] = () => this.focusSearch();
        this.shortcuts['m'] = () => this.toggleMobileMenu();
    },

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if (!this.isEnabled) return;

            // Don't trigger shortcuts when typing in form elements
            if (this.isTypingInInput(e.target)) return;

            // Don't trigger when modifier keys are pressed (except for specific combos)
            if (e.ctrlKey || e.metaKey || e.altKey) return;

            const key = e.key.toLowerCase();
            
            if (this.shortcuts[key]) {
                e.preventDefault();
                this.shortcuts[key]();
                this.showShortcutFeedback(key);
            }
        });

        // Show help on first visit
        this.showHelpOnFirstVisit();
    },

    isTypingInInput(element) {
        const inputElements = ['INPUT', 'TEXTAREA', 'SELECT'];
        return inputElements.includes(element.tagName) || 
               element.contentEditable === 'true';
    },

    navigateToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            Utils.smoothScrollTo(element);
            
            // Update navigation active state
            this.updateNavigationState(sectionId);
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    async toggleHelp() {
        if (this.helpVisible) {
            this.hideHelp();
        } else {
            await this.showHelp();
        }
    },

    async showHelp() {
        if (this.helpVisible) return;

        const helpModal = this.createHelpModal();
        document.body.appendChild(helpModal);
        document.body.classList.add('no-scroll');
        
        this.helpVisible = true;

        // Animate in
        setTimeout(() => {
            helpModal.classList.add('active');
        }, 50);

        // Show notification
        try {
            const { NotificationSystem } = await import('./NotificationSystem.js');
            NotificationSystem.info('Use ? to toggle keyboard shortcuts help', 3000);
        } catch (e) {
            console.warn('Could not load NotificationSystem for help');
        }
    },

    hideHelp() {
        const helpModal = document.querySelector('.keyboard-help-modal');
        if (helpModal) {
            helpModal.classList.remove('active');
            setTimeout(() => {
                helpModal.remove();
                document.body.classList.remove('no-scroll');
            }, 300);
        }
        this.helpVisible = false;
    },

    createHelpModal() {
        const modal = document.createElement('div');
        modal.className = 'keyboard-help-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.3s ease;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: var(--bg-card, #1e1e1e);
            border: 1px solid var(--border-color, #333);
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        content.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="color: var(--text-primary, #fff); margin: 0;">⌨️ Keyboard Shortcuts</h3>
                <button class="help-close" style="background: none; border: none; color: var(--text-muted, #666); cursor: pointer; font-size: 1.5rem;">×</button>
            </div>
            
            <div style="color: var(--text-secondary, #b0b0b0); line-height: 1.6;">
                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--accent-primary, #00ff88);">Navigation:</strong>
                </div>
                <div style="display: grid; gap: 0.5rem; font-family: monospace; font-size: 0.9rem;">
                    <div><kbd>H</kbd> → Home</div>
                    <div><kbd>S</kbd> → Skills</div>
                    <div><kbd>P</kbd> → Projects</div>
                    <div><kbd>E</kbd> → Experience</div>
                    <div><kbd>C</kbd> → Contact</div>
                </div>
                
                <div style="margin: 1.5rem 0 1rem;">
                    <strong style="color: var(--accent-secondary, #0088ff);">Actions:</strong>
                </div>
                <div style="display: grid; gap: 0.5rem; font-family: monospace; font-size: 0.9rem;">
                    <div><kbd>T</kbd> → Back to Top</div>
                    <div><kbd>M</kbd> → Toggle Mobile Menu</div>
                    <div><kbd>/</kbd> → Focus Search</div>
                    <div><kbd>?</kbd> → Toggle this Help</div>
                    <div><kbd>ESC</kbd> → Close Modals</div>
                </div>
                
                <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-secondary, #111); border-radius: 8px; font-size: 0.8rem;">
                    💡 <strong>Tip:</strong> Shortcuts work anywhere except when typing in form fields.
                </div>
            </div>
        `;

        // Add click handlers
        content.querySelector('.help-close').addEventListener('click', () => {
            this.hideHelp();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideHelp();
            }
        });

        // Add animation class when active
        modal.classList.add = function(className) {
            Element.prototype.classList.add.call(this, className);
            if (className === 'active') {
                this.style.opacity = '1';
                content.style.transform = 'scale(1)';
            }
        };

        modal.appendChild(content);
        return modal;
    },

    handleEscape() {
        // Close any open modals or menus
        if (this.helpVisible) {
            this.hideHelp();
            return;
        }

        // Close project modal if open
        const projectModal = document.querySelector('.project-modal.active');
        if (projectModal) {
            projectModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
            return;
        }

        // Close mobile menu
        this.closeMobileMenu();
    },

    focusSearch() {
        // Focus on search input if it exists
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]');
        if (searchInput) {
            searchInput.focus();
        }
    },

    toggleMobileMenu() {
        // Try to get Navigation module and toggle menu
        try {
            if (window.WebSign && window.WebSign.getModule) {
                const navigation = window.WebSign.getModule('Navigation');
                if (navigation && navigation.toggleMobileMenu) {
                    navigation.toggleMobileMenu();
                }
            }
        } catch (e) {
            console.warn('Could not toggle mobile menu via shortcuts');
        }
    },

    closeMobileMenu() {
        try {
            if (window.WebSign && window.WebSign.getModule) {
                const navigation = window.WebSign.getModule('Navigation');
                if (navigation && navigation.closeMobileMenu) {
                    navigation.closeMobileMenu();
                }
            }
        } catch (e) {
            console.warn('Could not close mobile menu via shortcuts');
        }
    },

    async showShortcutFeedback(key) {
        // Show brief feedback for used shortcut
        const keyDisplay = key.toUpperCase();
        const feedback = document.createElement('div');
        
        feedback.style.cssText = `
            position: fixed;
            top: 2rem;
            left: 2rem;
            background: var(--accent-primary, #00ff88);
            color: var(--bg-primary, #000);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-family: monospace;
            font-weight: bold;
            z-index: 10001;
            font-size: 0.9rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.2s ease;
            pointer-events: none;
        `;
        
        feedback.textContent = `Key: ${keyDisplay}`;
        document.body.appendChild(feedback);

        // Animate in
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        }, 50);

        // Remove after delay
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(-10px)';
            setTimeout(() => feedback.remove(), 200);
        }, 1500);
    },

    updateNavigationState(sectionId) {
        // Update active navigation link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    },

    showInitialHelp() {
        console.group('⌨️ Keyboard Shortcuts');
        console.log('H - Go to Home');
        console.log('S - Go to Skills');
        console.log('P - Go to Projects');
        console.log('E - Go to Experience');
        console.log('C - Go to Contact');
        console.log('T - Back to Top');
        console.log('M - Toggle Mobile Menu');
        console.log('? - Show/Hide Help');
        console.log('ESC - Close Modals');
        console.groupEnd();
    },

    showHelpOnFirstVisit() {
        // Show help hint on first visit
        const hasSeenHelp = localStorage.getItem('websign-keyboard-help-seen');
        if (!hasSeenHelp) {
            setTimeout(async () => {
                try {
                    const { NotificationSystem } = await import('./NotificationSystem.js');
                    NotificationSystem.info('💡 Press ? to see keyboard shortcuts', 5000);
                    localStorage.setItem('websign-keyboard-help-seen', 'true');
                } catch (e) {
                    console.log('💡 Press ? to see keyboard shortcuts');
                }
            }, 3000);
        }
    },

    addShortcut(key, callback, description) {
        this.shortcuts[key] = callback;
        console.log(`⌨️ Added shortcut: ${key} - ${description}`);
    },

    removeShortcut(key) {
        delete this.shortcuts[key];
        console.log(`⌨️ Removed shortcut: ${key}`);
    },

    enable() {
        this.isEnabled = true;
        console.log('⌨️ Keyboard shortcuts enabled');
    },

    disable() {
        this.isEnabled = false;
        console.log('⌨️ Keyboard shortcuts disabled');
    },

    destroy() {
        this.shortcuts = {};
        this.isEnabled = false;
        this.hideHelp();
    }
};

export default KeyboardShortcuts;