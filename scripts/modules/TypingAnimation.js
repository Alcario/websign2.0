/**
 * WebSign Portfolio - Typing Animation Module
 * Author: Albano Caminos
 */

'use strict';

import { CONFIG, TYPING_COMMANDS } from '../config/constants.js';

// ===== TYPING ANIMATION MODULE =====
export const TypingAnimation = {
    commands: TYPING_COMMANDS,
    currentCommand: 0,
    currentChar: 0,
    isDeleting: false,
    element: null,
    intervalId: null,
    isActive: false,

    init() {
        this.element = document.querySelector('.command-text');
        
        if (!this.element) {
            console.warn('TypingAnimation: Element not found');
            return;
        }

        // Listen for loading complete event
        document.addEventListener('loadingComplete', () => {
            this.start();
        });
    },

    start() {
        if (!this.element || this.isActive) return;
        
        this.isActive = true;
        this.type();
    },

    stop() {
        this.isActive = false;
        if (this.intervalId) {
            clearTimeout(this.intervalId);
            this.intervalId = null;
        }
    },

    type() {
        if (!this.isActive) return;

        const current = this.commands[this.currentCommand];
        
        if (this.isDeleting) {
            this.element.textContent = current.substring(0, this.currentChar - 1);
            this.currentChar--;
        } else {
            this.element.textContent = current.substring(0, this.currentChar + 1);
            this.currentChar++;
        }

        let typeSpeed = this.isDeleting ? 50 : CONFIG.TYPING_SPEED;

        if (!this.isDeleting && this.currentChar === current.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentChar === 0) {
            this.isDeleting = false;
            this.currentCommand = (this.currentCommand + 1) % this.commands.length;
            typeSpeed = 500; // Pause before next command
        }

        this.intervalId = setTimeout(() => this.type(), typeSpeed);
    },

    setCommands(newCommands) {
        if (Array.isArray(newCommands) && newCommands.length > 0) {
            this.commands = newCommands;
            this.currentCommand = 0;
            this.currentChar = 0;
            this.isDeleting = false;
        }
    },

    addCommand(command) {
        if (typeof command === 'string' && command.trim()) {
            this.commands.push(command.trim());
        }
    },

    reset() {
        this.stop();
        this.currentCommand = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        
        if (this.element) {
            this.element.textContent = '';
        }
    },

    destroy() {
        this.stop();
        this.element = null;
        this.commands = [];
    }
};

export default TypingAnimation;