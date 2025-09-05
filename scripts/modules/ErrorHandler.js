/**
 * WebSign Portfolio - Error Handler Module
 * Author: Albano Caminos
 */

'use strict';

// ===== ERROR HANDLER MODULE =====
export const ErrorHandler = {
    errorCount: 0,
    maxErrors: 10,
    isDevelopment: false,
    errorLog: [],

    init() {
        this.isDevelopment = this.checkDevelopmentMode();
        this.setupGlobalErrorHandlers();
        this.setupConsoleErrorCapture();
        this.logInitialization();
    },

    checkDevelopmentMode() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.protocol === 'file:' ||
               window.location.search.includes('debug=true');
    },

    setupGlobalErrorHandlers() {
        // JavaScript errors
        window.addEventListener('error', (event) => {
            this.handleError({
                type: 'JavaScript Error',
                message: event.error?.message || event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack,
                timestamp: new Date().toISOString()
            });
        });

        // Promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: 'Unhandled Promise Rejection',
                message: event.reason?.message || event.reason,
                stack: event.reason?.stack,
                timestamp: new Date().toISOString()
            });
        });

        // Resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleError({
                    type: 'Resource Loading Error',
                    message: `Failed to load: ${event.target.src || event.target.href}`,
                    element: event.target.tagName,
                    timestamp: new Date().toISOString()
                });
            }
        }, true);
    },

    setupConsoleErrorCapture() {
        // Capture console errors in development
        if (this.isDevelopment) {
            const originalError = console.error;
            console.error = (...args) => {
                this.handleError({
                    type: 'Console Error',
                    message: args.join(' '),
                    timestamp: new Date().toISOString()
                });
                originalError.apply(console, args);
            };
        }
    },

    async handleError(errorInfo) {
        this.errorCount++;
        this.errorLog.push(errorInfo);

        // Prevent error spam
        if (this.errorCount > this.maxErrors) {
            console.warn('ErrorHandler: Maximum error limit reached, suppressing further errors');
            return;
        }

        // Log error details
        this.logError(errorInfo);

        // Show user notification in development
        if (this.isDevelopment && this.errorCount <= 3) {
            await this.showDevelopmentError(errorInfo);
        }

        // Send to error tracking service (production)
        if (!this.isDevelopment) {
            this.reportError(errorInfo);
        }

        // Take recovery actions
        this.attemptRecovery(errorInfo);
    },

    logError(errorInfo) {
        console.group(`🚨 ${errorInfo.type}`);
        console.error('Message:', errorInfo.message);
        
        if (errorInfo.filename) {
            console.error('File:', errorInfo.filename);
            console.error('Line:', errorInfo.lineno, 'Column:', errorInfo.colno);
        }
        
        if (errorInfo.stack) {
            console.error('Stack:', errorInfo.stack);
        }
        
        console.error('Timestamp:', errorInfo.timestamp);
        console.error('Error Count:', this.errorCount);
        console.groupEnd();
    },

    async showDevelopmentError(errorInfo) {
        try {
            const { NotificationSystem } = await import('./NotificationSystem.js');
            
            const shortMessage = errorInfo.message.length > 100 
                ? errorInfo.message.substring(0, 100) + '...'
                : errorInfo.message;

            NotificationSystem.error(
                `Development Error: ${shortMessage}`,
                8000
            );
        } catch (e) {
            // Fallback if NotificationSystem fails
            this.showFallbackError(errorInfo);
        }
    },

    showFallbackError(errorInfo) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: #ff4444;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10001;
            max-width: 400px;
            font-family: monospace;
            font-size: 0.9rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        errorDiv.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 0.5rem;">
                🚨 ${errorInfo.type}
            </div>
            <div style="margin-bottom: 0.5rem;">
                ${errorInfo.message.substring(0, 150)}
            </div>
            <button onclick="this.parentElement.remove()" style="
                background: rgba(255,255,255,0.2);
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.8rem;
            ">Close</button>
        `;

        document.body.appendChild(errorDiv);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 10000);
    },

    reportError(errorInfo) {
        // In production, send errors to tracking service
        // Example: Sentry, LogRocket, Rollbar, etc.
        
        // For now, just log to a hypothetical endpoint
        if (navigator.onLine) {
            fetch('/api/errors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...errorInfo,
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                })
            }).catch(() => {
                // Silently fail if error reporting fails
                console.warn('Failed to report error to tracking service');
            });
        }
    },

    attemptRecovery(errorInfo) {
        // Attempt automatic recovery based on error type
        switch (errorInfo.type) {
            case 'Resource Loading Error':
                this.handleResourceError(errorInfo);
                break;
                
            case 'JavaScript Error':
                this.handleJavaScriptError(errorInfo);
                break;
                
            case 'Unhandled Promise Rejection':
                this.handlePromiseError(errorInfo);
                break;
        }
    },

    handleResourceError(errorInfo) {
        // Try to reload failed resources
        if (errorInfo.message.includes('.css')) {
            console.warn('CSS loading failed, attempting to reload');
            // Could implement CSS retry logic here
        }
        
        if (errorInfo.message.includes('.js')) {
            console.warn('JavaScript loading failed, critical error');
            // Could show fallback UI
        }
    },

    handleJavaScriptError(errorInfo) {
        // Reset specific modules if they fail
        if (errorInfo.message.includes('Navigation')) {
            console.warn('Navigation error detected, attempting reset');
            // Could try to reinitialize navigation
        }
    },

    handlePromiseError(errorInfo) {
        // Log promise rejections for debugging
        console.warn('Promise rejection handled by ErrorHandler');
    },

    logInitialization() {
        console.log('🛡️ ErrorHandler initialized');
        console.log('📊 Development mode:', this.isDevelopment);
        console.log('🎯 Max errors before suppression:', this.maxErrors);
    },

    getErrorStats() {
        return {
            totalErrors: this.errorCount,
            errorTypes: this.errorLog.reduce((acc, error) => {
                acc[error.type] = (acc[error.type] || 0) + 1;
                return acc;
            }, {}),
            recentErrors: this.errorLog.slice(-5)
        };
    },

    clearErrorLog() {
        this.errorLog = [];
        this.errorCount = 0;
        console.log('🧹 Error log cleared');
    },

    destroy() {
        this.errorLog = [];
        this.errorCount = 0;
        // Note: Can't remove global error listeners as they might be shared
    }
};

export default ErrorHandler;