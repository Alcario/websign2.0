/**
 * WebSign Portfolio - Matrix Effect Module
 * Author: Albano Caminos
 */

'use strict';

import { MATRIX_CHARACTERS } from '../config/constants.js';

// ===== MATRIX EFFECT MODULE =====
export const MatrixEffect = {
    canvas: null,
    ctx: null,
    characters: MATRIX_CHARACTERS,
    drops: [],
    animationId: null,
    isActive: false,
    fontSize: 14,
    
    init() {
        this.createCanvas();
        this.setupMatrix();
        this.bindEvents();
        this.start();
    },

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'matrix-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            opacity: 0.03;
            background: transparent;
        `;
        
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        this.resizeCanvas();
    },

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        const columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(columns).fill(1);
        
        // Reset canvas context after resize
        this.setupCanvasStyle();
    },

    setupMatrix() {
        this.setupCanvasStyle();
    },

    setupCanvasStyle() {
        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = `${this.fontSize}px 'JetBrains Mono', 'Courier New', monospace`;
        this.ctx.textAlign = 'start';
        this.ctx.textBaseline = 'top';
    },

    bindEvents() {
        // Resize handler
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });

        // Visibility change handler
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });

        // Performance monitoring
        let frameCount = 0;
        let lastTime = performance.now();
        
        setInterval(() => {
            const currentTime = performance.now();
            const fps = Math.round(frameCount / (currentTime - lastTime) * 1000);
            frameCount = 0;
            lastTime = currentTime;
            
            // Adjust effect intensity based on performance
            if (fps < 30 && this.isActive) {
                this.reduceDensity();
            }
        }, 5000);
    },

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.animate();
        console.log('🟢 Matrix effect started');
    },

    pause() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    },

    resume() {
        if (!this.isActive && this.canvas) {
            this.start();
        }
    },

    stop() {
        this.pause();
        if (this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        console.log('🛑 Matrix effect stopped');
    },

    animate() {
        if (!this.isActive) return;

        // Semi-transparent black background for fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Matrix green color for characters
        this.ctx.fillStyle = '#00ff88';
        
        // Draw characters
        for (let i = 0; i < this.drops.length; i++) {
            // Random character from the set
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            
            // X position based on column
            const x = i * this.fontSize;
            
            // Y position based on drop progress
            const y = this.drops[i] * this.fontSize;
            
            // Draw the character
            this.ctx.fillText(char, x, y);
            
            // Reset drop to top when it reaches bottom or randomly
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            } else {
                this.drops[i]++;
            }
        }
        
        // Control animation speed
        setTimeout(() => {
            this.animationId = requestAnimationFrame(() => this.animate());
        }, 50); // ~20 FPS for performance
    },

    increaseDensity() {
        // Add more columns
        const newColumns = Math.floor(this.canvas.width / (this.fontSize * 0.8));
        if (newColumns > this.drops.length) {
            const additionalDrops = Array(newColumns - this.drops.length).fill(1);
            this.drops = this.drops.concat(additionalDrops);
        }
    },

    reduceDensity() {
        // Remove some columns for better performance
        if (this.drops.length > 20) {
            this.drops = this.drops.slice(0, Math.floor(this.drops.length * 0.8));
        }
    },

    setOpacity(opacity) {
        if (this.canvas) {
            this.canvas.style.opacity = Math.max(0, Math.min(1, opacity));
        }
    },

    setSpeed(speed) {
        // Adjust animation speed (lower = faster)
        this.animationSpeed = Math.max(10, Math.min(200, speed));
    },

    setCharacterSet(characters) {
        if (typeof characters === 'string' && characters.length > 0) {
            this.characters = characters;
        }
    },

    // Special effects
    activateHackerMode() {
        this.setOpacity(0.1);
        this.setCharacterSet('01');
        this.setSpeed(30);
        
        console.log('🔥 Hacker mode activated');
    },

    activateJapaneseMode() {
        this.setOpacity(0.05);
        this.setCharacterSet('アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン');
        this.setSpeed(60);
        
        console.log('🇯🇵 Japanese mode activated');
    },

    activateRainbowMode() {
        // Override draw method for rainbow effect
        const originalAnimate = this.animate.bind(this);
        let hue = 0;
        
        this.animate = () => {
            if (!this.isActive) return;

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Rainbow effect
            hue = (hue + 1) % 360;
            this.ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            
            for (let i = 0; i < this.drops.length; i++) {
                const char = this.characters[Math.floor(Math.random() * this.characters.length)];
                const x = i * this.fontSize;
                const y = this.drops[i] * this.fontSize;
                
                this.ctx.fillText(char, x, y);
                
                if (y > this.canvas.height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                } else {
                    this.drops[i]++;
                }
            }
            
            setTimeout(() => {
                this.animationId = requestAnimationFrame(() => this.animate());
            }, 50);
        };
        
        console.log('🌈 Rainbow mode activated');
    },

    resetToDefault() {
        this.setOpacity(0.03);
        this.setCharacterSet(MATRIX_CHARACTERS);
        this.setSpeed(50);
        
        // Reset animate method if it was overridden
        this.animate = MatrixEffect.animate.bind(this);
        
        console.log('🔄 Matrix effect reset to default');
    },

    // Performance monitoring
    getPerformanceStats() {
        return {
            isActive: this.isActive,
            columns: this.drops.length,
            canvasSize: {
                width: this.canvas?.width || 0,
                height: this.canvas?.height || 0
            },
            fontSize: this.fontSize,
            characterSet: this.characters.length + ' characters'
        };
    },

    destroy() {
        this.stop();
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        this.canvas = null;
        this.ctx = null;
        this.drops = [];
        this.isActive = false;
        
        console.log('💥 Matrix effect destroyed');
    }
};

export default MatrixEffect;