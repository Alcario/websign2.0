/**
 * WebSign Portfolio - Main Application Entry Point
 * Author: Albano Caminos
 * Version: 2.0.0
 */

'use strict';

// ===== IMPORTS =====
import { CONFIG } from './config/constants.js';
import { Utils } from './utils/helpers.js';
import { LoadingScreen } from './modules/LoadingScreen.js';
import { Navigation } from './modules/Navigation.js';
import { TypingAnimation } from './modules/TypingAnimation.js';
import { NotificationSystem } from './modules/NotificationSystem.js';
import { ContactForm } from './modules/ContactForm.js';
import { ProjectModal } from './modules/ProjectModal.js';
import { BackToTop } from './modules/BackToTop.js';

// ===== MAIN APPLICATION =====
class WebSignApp {
    constructor() {
        this.modules = new Map();
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        if (this.isInitialized) {
            console.warn('WebSignApp: Already initialized');
            return;
        }

        console.log('🚀 Initializing WebSign Portfolio...');

        try {
            // Wait for DOM to be ready
            await this.waitForDOM();
            
            // Register modules
            this.registerModules();
            
            // Initialize core modules first
            await this.initializeCoreModules();
            
            // Initialize remaining modules
            await this.initializeAllModules();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            // Expose API
            this.exposeAPI();
            
            this.isInitialized = true;
            console.log('✅ WebSign Portfolio initialized successfully!');
            
        } catch (error) {
            console.error('❌ Error initializing application:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Wait for DOM to be ready
     */
    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    /**
     * Register all modules
     */
    registerModules() {
        const moduleList = [
            { name: 'LoadingScreen', module: LoadingScreen, priority: 1 },
            { name: 'NotificationSystem', module: NotificationSystem, priority: 1 },
            { name: 'Navigation', module: Navigation, priority: 2 },
            { name: 'TypingAnimation', module: TypingAnimation, priority: 3 },
            { name: 'ContactForm', module: ContactForm, priority: 4 },
            { name: 'ProjectModal', module: ProjectModal, priority: 4 },
            { name: 'BackToTop', module: BackToTop, priority: 5 }
        ];

        moduleList.forEach(({ name, module, priority }) => {
            this.modules.set(name, { module, priority, initialized: false });
        });
    }

    /**
     * Initialize core modules first
     */
    async initializeCoreModules() {
        const coreModules = Array.from(this.modules.entries())
            .filter(([, config]) => config.priority <= 2)
            .sort((a, b) => a[1].priority - b[1].priority);

        for (const [name, config] of coreModules) {
            await this.initializeModule(name, config);
        }
    }

    /**
     * Initialize all modules
     */
    async initializeAllModules() {
        const remainingModules = Array.from(this.modules.entries())
            .filter(([, config]) => !config.initialized)
            .sort((a, b) => a[1].priority - b[1].priority);

        for (const [name, config] of remainingModules) {
            await this.initializeModule(name, config);
        }
    }

    /**
     * Initialize a single module
     */
    async initializeModule(name, config) {
        try {
            if (config.module && typeof config.module.init === 'function') {
                await config.module.init();
                config.initialized = true;
                console.log(`✅ ${name} initialized`);
            }
        } catch (error) {
            console.error(`❌ Error initializing ${name}:`, error);
        }
    }

    /**
     * Setup global event listeners
     */
    setupGlobalEvents() {
        // Global error handling
        window.addEventListener('error', this.handleGlobalError.bind(this));
        window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));

        // Performance monitoring
        this.setupPerformanceMonitoring();

        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    /**
     * Handle global JavaScript errors
     */
    handleGlobalError(event) {
        console.error('Global Error:', event.error);
        
        // In development, show user-friendly error
        if (this.isDevelopment()) {
            const notificationSystem = this.getModule('NotificationSystem');
            if (notificationSystem) {
                notificationSystem.error(`Development Error: ${event.error.message}`);
            }
        }
    }

    /**
     * Handle unhandled promise rejections
     */
    handleUnhandledRejection(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Log performance metrics after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.logPerformanceMetrics();
            }, 2000);
        });
    }

    /**
     * Log performance metrics
     */
    logPerformanceMetrics() {
        if (typeof performance !== 'undefined') {
            const metrics = {
                loadTime: performance.now(),
                navigation: performance.getEntriesByType('navigation')[0],
                paint: performance.getEntriesByType('paint')
            };

            console.group('🚀 WebSign Performance Metrics');
            console.log('📊 Load Time:', `${metrics.loadTime.toFixed(2)}ms`);
            if (metrics.navigation) {
                console.log('📄 DOM Content Loaded:', `${metrics.navigation.domContentLoadedEventEnd.toFixed(2)}ms`);
            }
            if (metrics.paint.length) {
                metrics.paint.forEach(entry => {
                    console.log(`🎨 ${entry.name}:`, `${entry.startTime.toFixed(2)}ms`);
                });
            }
            console.groupEnd();
        }
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        const shortcuts = {
            'h': () => this.scrollToSection('inicio'),
            's': () => this.scrollToSection('skills'),
            'p': () => this.scrollToSection('proyectos'),
            'e': () => this.scrollToSection('experiencia'),
            'c': () => this.scrollToSection('contacto')
        };

        document.addEventListener('keydown', (e) => {
            // Only trigger if not typing in form elements
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                return;
            }

            const key = e.key.toLowerCase();
            if (shortcuts[key]) {
                e.preventDefault();
                shortcuts[key]();
            }
        });
    }

    /**
     * Scroll to section helper
     */
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            Utils.smoothScrollTo(element);
        }
    }

    /**
     * Get module instance
     */
    getModule(name) {
        const moduleConfig = this.modules.get(name);
        return moduleConfig?.module || null;
    }

    /**
     * Handle initialization errors
     */
    handleInitializationError(error) {
        // Fallback error display
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 2rem;
            border-radius: 8px;
            z-index: 10000;
            text-align: center;
            font-family: monospace;
        `;
        errorDiv.innerHTML = `
            <h3>Error de Inicialización</h3>
            <p>Hubo un problema al cargar la aplicación.</p>
            <button onclick="location.reload()" style="
                background: white;
                color: #ff4444;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 1rem;
            ">Recargar Página</button>
        `;
        document.body.appendChild(errorDiv);
    }

    /**
     * Check if in development mode
     */
    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.protocol === 'file:';
    }

    /**
     * Expose public API
     */
    exposeAPI() {
        window.WebSign = {
            scrollTo: this.scrollToSection.bind(this),
            showNotification: (message, type) => {
                const notificationSystem = this.getModule('NotificationSystem');
                return notificationSystem?.show(message, type);
            },
            getModule: this.getModule.bind(this),
            version: '2.0.0'
        };
    }

    /**
     * Destroy the application
     */
    destroy() {
        // Destroy all modules
        this.modules.forEach((config, name) => {
            if (config.module && typeof config.module.destroy === 'function') {
                config.module.destroy();
            }
        });

        this.modules.clear();
        this.isInitialized = false;
        
        // Clean up global references
        delete window.WebSign;
    }
}

// ===== INITIALIZE APPLICATION =====
const app = new WebSignApp();
app.init();

// ===== EXPORT FOR TESTING =====
export default WebSignApp;