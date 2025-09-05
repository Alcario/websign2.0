/**
 * WebSign Portfolio - Easter Eggs Module
 * Author: Albano Caminos
 */

'use strict';

import { KONAMI_CODE } from '../config/constants.js';

// ===== EASTER EGGS MODULE =====
export const EasterEggs = {
    konamiCode: KONAMI_CODE,
    currentSequence: [],
    isKonamiActive: false,
    
    init() {
        this.bindKonamiCode();
        this.bindConsoleMessage();
        this.bindSecretCommands();
    },

    bindKonamiCode() {
        document.addEventListener('keydown', (e) => {
            this.currentSequence.push(e.code);
            
            if (this.currentSequence.length > this.konamiCode.length) {
                this.currentSequence.shift();
            }
            
            if (JSON.stringify(this.currentSequence) === JSON.stringify(this.konamiCode)) {
                this.activateKonamiCode();
                this.currentSequence = [];
            }
        });
    },

    async activateKonamiCode() {
        if (this.isKonamiActive) return;
        
        this.isKonamiActive = true;
        
        // Add rainbow effect to page
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Add CSS for rainbow effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Show notification
        const { NotificationSystem } = await import('./NotificationSystem.js');
        NotificationSystem.success('🎉 Konami Code activated! You found the secret!', 10000);
        
        // Remove effect after 10 seconds
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
            this.isKonamiActive = false;
        }, 10000);
    },

    bindConsoleMessage() {
        console.log(`
    ╔══════════════════════════════════════╗
    ║          🚀 WebSign Portfolio        ║
    ║                                      ║
    ║  Developed by: Albano Caminos        ║
    ║  Stack: React + Node.js + MongoDB    ║
    ║  Version: 2.0.0                      ║
    ║                                      ║
    ║  Looking for a developer? 📧         ║
    ║  albano_caminos@hotmail.com          ║
    ║                                      ║
    ║  🎮 Try the Konami Code!             ║
    ║  ↑↑↓↓←→←→BA                          ║
    ╚══════════════════════════════════════╝
        `);
    },

    bindSecretCommands() {
        // Secret command listener
        let commandBuffer = '';
        let commandTimeout;

        document.addEventListener('keydown', (e) => {
            // Only listen when not in form fields
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                return;
            }

            commandBuffer += e.key.toLowerCase();
            
            // Clear buffer after 3 seconds of inactivity
            clearTimeout(commandTimeout);
            commandTimeout = setTimeout(() => {
                commandBuffer = '';
            }, 3000);

            // Check for secret commands
            this.checkSecretCommands(commandBuffer);
        });
    },

    async checkSecretCommands(buffer) {
        const { NotificationSystem } = await import('./NotificationSystem.js');

        if (buffer.includes('websign')) {
            NotificationSystem.info('🎯 You found the WebSign command!');
            this.showDeveloperInfo();
        }

        if (buffer.includes('matrix')) {
            NotificationSystem.success('🟢 Entering the Matrix...');
            this.activateMatrixMode();
        }

        if (buffer.includes('coffee')) {
            NotificationSystem.warning('☕ Coffee mode activated! Developer fuel detected.');
            this.showCoffeeAnimation();
        }

        if (buffer.includes('debug')) {
            NotificationSystem.info('🐛 Debug mode activated');
            this.showDebugInfo();
        }
    },

    showDeveloperInfo() {
        console.group('👨‍💻 Developer Info');
        console.log('Name: Albano Caminos');
        console.log('Role: Full Stack Developer');
        console.log('Experience: 5+ years');
        console.log('Location: Córdoba, Argentina');
        console.log('Email: albano_caminos@hotmail.com');
        console.log('Phone: +54 9 352 141-0279');
        console.groupEnd();
    },

    activateMatrixMode() {
        // Create matrix rain effect overlay
        const matrixOverlay = document.createElement('div');
        matrixOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            background: rgba(0, 0, 0, 0.1);
        `;
        
        // Simple matrix effect
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        for (let i = 0; i < 20; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -100px;
                color: #00ff88;
                font-family: monospace;
                font-size: 14px;
                animation: matrixFall ${2 + Math.random() * 3}s linear infinite;
            `;
            column.textContent = Array(20).fill().map(() => 
                characters[Math.floor(Math.random() * characters.length)]
            ).join('\n');
            
            matrixOverlay.appendChild(column);
        }

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes matrixFall {
                to { transform: translateY(calc(100vh + 100px)); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(matrixOverlay);

        // Remove after 5 seconds
        setTimeout(() => {
            matrixOverlay.remove();
            style.remove();
        }, 5000);
    },

    showCoffeeAnimation() {
        // Create floating coffee emoji
        const coffee = document.createElement('div');
        coffee.textContent = '☕';
        coffee.style.cssText = `
            position: fixed;
            font-size: 3rem;
            z-index: 10000;
            pointer-events: none;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: coffeeFloat 3s ease-in-out;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes coffeeFloat {
                0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; }
                50% { transform: translate(-50%, -70%) scale(1.5) rotate(180deg); opacity: 1; }
                100% { transform: translate(-50%, -90%) scale(0.5) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(coffee);

        setTimeout(() => {
            coffee.remove();
            style.remove();
        }, 3000);
    },

    showDebugInfo() {
        console.group('🐛 Debug Information');
        console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
        console.log('User Agent:', navigator.userAgent);
        console.log('Current URL:', window.location.href);
        console.log('Scroll Position:', window.pageYOffset);
        console.log('Local Storage:', Object.keys(localStorage).length + ' items');
        console.log('Modules Loaded:', window.WebSign ? 'Yes' : 'No');
        console.groupEnd();
    },

    destroy() {
        this.currentSequence = [];
        this.isKonamiActive = false;
    }
};

export default EasterEggs;