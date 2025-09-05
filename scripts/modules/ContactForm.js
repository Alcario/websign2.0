/**
 * WebSign Portfolio - Contact Form Module
 * Author: Albano Caminos
 */

'use strict';

import { CONFIG, FORM_VALIDATION } from '../config/constants.js';
import { Utils } from '../utils/helpers.js';

// ===== CONTACT FORM MODULE =====
export const ContactForm = {
    form: null,
    submitBtn: null,
    originalBtnContent: '',
    isSubmitting: false,

    init() {
        this.form = document.querySelector('#contactForm');
        if (!this.form) {
            console.warn('ContactForm: Form element not found');
            return;
        }

        this.submitBtn = this.form.querySelector('.terminal-submit, .terminal-submit-improved');
        
        if (this.submitBtn) {
            this.originalBtnContent = this.submitBtn.innerHTML;
        }

        this.bindEvents();
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    },

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        this.setSubmitState('loading');
        this.isSubmitting = true;

        try {
            await this.submitForm(data);
            this.setSubmitState('success');
            
            // Import NotificationSystem dynamically to avoid circular dependency
            const { NotificationSystem } = await import('./NotificationSystem.js');
            NotificationSystem.success('¡Mensaje enviado correctamente!');
            
            // Reset form after delay
            setTimeout(() => {
                this.form.reset();
                this.setSubmitState('normal');
                this.isSubmitting = false;
            }, 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.setSubmitState('error');
            
            const { NotificationSystem } = await import('./NotificationSystem.js');
            NotificationSystem.error('Error al enviar el mensaje. Inténtalo nuevamente.');
            
            setTimeout(() => {
                this.setSubmitState('normal');
                this.isSubmitting = false;
            }, 3000);
        }
    },

    validateForm(data) {
        let isValid = true;
        const errors = [];

        // Validate name
        if (!data.nombre || data.nombre.trim().length < FORM_VALIDATION.minNameLength) {
            errors.push(`El nombre debe tener al menos ${FORM_VALIDATION.minNameLength} caracteres`);
            isValid = false;
        }

        // Validate email
        if (!data.email || !FORM_VALIDATION.emailRegex.test(data.email)) {
            errors.push('Por favor ingresa un email válido');
            isValid = false;
        }

        // Validate project type
        if (!data.proyecto) {
            errors.push('Por favor selecciona un tipo de proyecto');
            isValid = false;
        }

        // Validate message
        if (!data.mensaje || data.mensaje.trim().length < FORM_VALIDATION.minMessageLength) {
            errors.push(`El mensaje debe tener al menos ${FORM_VALIDATION.minMessageLength} caracteres`);
            isValid = false;
        }

        if (!isValid) {
            this.showValidationErrors(errors);
        }

        return isValid;
    },

    async showValidationErrors(errors) {
        const { NotificationSystem } = await import('./NotificationSystem.js');
        NotificationSystem.error(errors.join('\n'));
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'text':
                if (field.name === 'nombre' && value.length < FORM_VALIDATION.minNameLength) {
                    isValid = false;
                    errorMessage = `El nombre debe tener al menos ${FORM_VALIDATION.minNameLength} caracteres`;
                }
                break;
            case 'email':
                if (!FORM_VALIDATION.emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor ingresa un email válido';
                }
                break;
            case 'select-one':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Por favor selecciona una opción';
                }
                break;
            default:
                if (field.tagName === 'TEXTAREA' && value.length < FORM_VALIDATION.minMessageLength) {
                    isValid = false;
                    errorMessage = `El mensaje debe tener al menos ${FORM_VALIDATION.minMessageLength} caracteres`;
                }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    },

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: var(--accent-error);
            font-size: 0.8rem;
            margin-top: 0.5rem;
            font-family: var(--font-mono);
        `;
        
        field.parentNode.appendChild(errorDiv);
    },

    clearFieldError(field) {
        field.classList.remove('error');
        
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    },

    setSubmitState(state) {
        if (!this.submitBtn) return;

        switch (state) {
            case 'loading':
                this.submitBtn.style.opacity = '0.7';
                this.submitBtn.style.cursor = 'not-allowed';
                this.submitBtn.disabled = true;
                
                const methodSpan = this.submitBtn.querySelector('.method');
                if (methodSpan) {
                    methodSpan.textContent = 'sending...';
                }
                break;

            case 'success':
                this.submitBtn.style.background = 'var(--accent-primary)';
                this.submitBtn.style.opacity = '1';
                
                const successMethodSpan = this.submitBtn.querySelector('.method');
                if (successMethodSpan) {
                    successMethodSpan.textContent = 'sent!';
                }
                break;

            case 'error':
                this.submitBtn.style.background = 'var(--accent-error)';
                this.submitBtn.style.opacity = '1';
                
                const errorMethodSpan = this.submitBtn.querySelector('.method');
                if (errorMethodSpan) {
                    errorMethodSpan.textContent = 'error';
                }
                break;

            case 'normal':
            default:
                this.submitBtn.innerHTML = this.originalBtnContent;
                this.submitBtn.disabled = false;
                this.submitBtn.style.background = '';
                this.submitBtn.style.opacity = '';
                this.submitBtn.style.cursor = '';
                break;
        }
    },

    async submitForm(data) {
        // Simulate API call - replace with actual implementation
        console.log('Form data:', data);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, CONFIG.FORM_SUBMISSION_DELAY));
        
        // Simulate random failure for testing (remove in production)
        if (Math.random() < 0.1) {
            throw new Error('Simulated network error');
        }
        
        return { success: true, message: 'Form submitted successfully' };
    }
};

export default ContactForm;