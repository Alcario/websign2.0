/**
 * WebSign Portfolio - Services Module (COMPLETO)
 * Author: Albano Caminos
 */

'use strict';

import { Utils } from '../utils/helpers.js';

// ===== SERVICES MODULE =====
export const ServicesModule = {
    serviceButtons: [],
    ctaButton: null,
    
    init() {
        this.bindServiceButtons();
        this.bindCTAButton();
        this.setupModalStyles();
    },

    bindServiceButtons() {
        this.serviceButtons = document.querySelectorAll('.service-btn');
        
        this.serviceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const buttonText = button.textContent.trim();
                const serviceCard = button.closest('.service-card');
                this.handleServiceAction(buttonText, button, serviceCard);
            });
        });
    },

    bindCTAButton() {
        this.ctaButton = document.querySelector('.cta-btn');
        if (this.ctaButton) {
            this.ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToContact('proyecto-personalizado');
            });
        }
    },

    handleServiceAction(buttonText, buttonElement, serviceCard) {
        const serviceTitle = serviceCard?.querySelector('h3')?.textContent || 'Servicio';
        
        switch (buttonText) {
            case 'Solicitar cotización':
                this.requestQuote('fullstack', serviceTitle);
                break;
            case 'Más información':
                this.showMoreInfo('sistemas-gestion');
                break;
            case 'Ver ejemplos':
                this.showExamples('ecommerce');
                break;
            case 'Ver portfolio':
                this.showPortfolio('institucionales');
                break;
            case 'Consultar planes':
                this.showHostingPlans();
                break;
            case 'Reservar clase':
                this.bookClass();
                break;
            default:
                this.scrollToContact('consulta-general');
        }
    },

    async requestQuote(serviceType, serviceTitle) {
        this.scrollToContact(serviceType);
        
        setTimeout(() => {
            this.prefillContactForm({
                project: 'fullstack',
                message: `Hola! Me interesa solicitar una cotización para ${serviceTitle}. Mi proyecto consiste en: `
            });
        }, 500);

        try {
            const { NotificationSystem } = await import('./NotificationSystem.js');
            NotificationSystem.info('Formulario preparado para solicitar cotización', 3000);
        } catch (e) {
            console.warn('Could not show notification');
        }
    },

    showMoreInfo(serviceType) {
        const serviceData = {
            title: 'Sistemas de Gestión',
            icon: '📊',
            description: 'Desarrollo software personalizado para automatizar y optimizar los procesos de tu negocio.',
            features: [
                'Control completo de inventario con alertas de stock',
                'Gestión integral de clientes y historial',
                'Seguimiento de ventas y análisis de rentabilidad',
                'Reportes automáticos y dashboard ejecutivo',
                'Sistema de roles y permisos',
                'Backup automático y seguridad de datos',
                'Integración con sistemas existentes',
                'Soporte técnico y capacitación incluida'
            ],
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Bootstrap'],
            examples: [
                'Sistema Orquesta Mediterránea - 500+ instrumentos gestionados',
                'Lemon Pies - Control de insumos y ganancias',
                'TVM Alquileres - Gestión de maquinaria pesada'
            ],
            priceRange: '$600 - $1,500 USD',
            deliveryTime: '4-8 semanas'
        };

        this.showServiceModal(serviceData);
    },

    async showExamples(serviceType) {
        const projectsSection = document.getElementById('proyectos');
        if (projectsSection) {
            Utils.smoothScrollTo(projectsSection);
            
            setTimeout(() => {
                const ecommerceFilter = document.querySelector('[data-filter="ecommerce"]');
                if (ecommerceFilter) {
                    ecommerceFilter.click();
                }
            }, 500);

            try {
                const { NotificationSystem } = await import('./NotificationSystem.js');
                NotificationSystem.info('Mostrando ejemplos de E-Commerce', 2000);
            } catch (e) {
                console.warn('Could not show notification');
            }
        }
    },

    async showPortfolio(serviceType) {
        const projectsSection = document.getElementById('proyectos');
        if (projectsSection) {
            Utils.smoothScrollTo(projectsSection);
            
            setTimeout(() => {
                const frontendFilter = document.querySelector('[data-filter="frontend"]');
                if (frontendFilter) {
                    frontendFilter.click();
                }
            }, 500);

            try {
                const { NotificationSystem } = await import('./NotificationSystem.js');
                NotificationSystem.info('Mostrando portfolio de sitios institucionales', 2000);
            } catch (e) {
                console.warn('Could not show notification');
            }
        }
    },

    showHostingPlans() {
        const serviceData = {
            title: 'Planes de Hosting y SSL',
            icon: '🔧',
            description: 'Alojamiento web profesional con certificados SSL y soporte técnico especializado.',
            features: [
                'Certificado SSL incluido (valor 50 U$D/año)',
                'Backup automático diario',
                'Panel de control cPanel',
                'Soporte técnico 24/7 en español',
                'Migración gratuita desde otro hosting',
                'Garantía de uptime 99.9%'
            ],
            plans: [
                {
                    name: 'Plan Básico',
                    price: '$8 USD/mes',
                    features: ['1 sitio web', '5GB almacenamiento', '50GB transferencia', 'SSL incluido']
                },
                {
                    name: 'Plan Profesional',
                    price: '$15 USD/mes',
                    features: ['5 sitios web', '20GB almacenamiento', '200GB transferencia', 'SSL incluido', 'Backup premium']
                },
                {
                    name: 'Plan Empresarial',
                    price: '$25 USD/mes',
                    features: ['Sitios ilimitados', '50GB almacenamiento', 'Transferencia ilimitada', 'SSL incluido', 'Soporte prioritario']
                }
            ]
        };

        this.showServiceModal(serviceData);
    },

    async bookClass() {
        this.scrollToContact('capacitacion');
        
        setTimeout(() => {
            this.prefillContactForm({
                project: 'capacitacion',
                message: `Hola! Me interesa reservar clases de programación. Quisiera aprender sobre: 

- Nivel actual: (principiante/intermedio/avanzado)
- Tecnología de interés: 
- Modalidad preferida: (presencial/online)
- Días y horarios disponibles: `
            });
        }, 500);

        try {
            const { NotificationSystem } = await import('./NotificationSystem.js');
            NotificationSystem.info('Formulario preparado para reservar clases', 3000);
        } catch (e) {
            console.warn('Could not show notification');
        }
    },

    scrollToContact(serviceType) {
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            Utils.smoothScrollTo(contactSection);
        }
    },

    prefillContactForm(data) {
        if (data.project) {
            const projectSelect = document.querySelector('select[name="proyecto"]');
            if (projectSelect) {
                projectSelect.value = data.project;
                projectSelect.dispatchEvent(new Event('change'));
            }
        }
        
        if (data.message) {
            const messageTextarea = document.querySelector('textarea[name="mensaje"]');
            if (messageTextarea) {
                messageTextarea.value = data.message;
                messageTextarea.focus();
                messageTextarea.setSelectionRange(messageTextarea.value.length, messageTextarea.value.length);
            }
        }
    },

    showServiceModal(serviceData) {
        const modal = this.createServiceModal(serviceData);
        document.body.appendChild(modal);
        document.body.classList.add('no-scroll');

        // Animate in
        setTimeout(() => {
            modal.classList.add('active');
        }, 50);

        // Bind events
        this.bindModalEvents(modal);
    },

    createServiceModal(serviceData) {
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        
        modal.innerHTML = `
            <div class="service-modal-content">
                <div class="service-modal-header">
                    <h2>
                        <span class="service-modal-icon">${serviceData.icon}</span>
                        ${serviceData.title}
                    </h2>
                    <button class="service-modal-close">&times;</button>
                </div>
                <div class="service-modal-body">
                    <p class="service-description">${serviceData.description}</p>
                    
                    ${serviceData.features ? `
                        <div class="service-modal-section">
                            <h4>🚀 Características incluidas:</h4>
                            <ul class="service-features-list">
                                ${serviceData.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${serviceData.technologies ? `
                        <div class="service-modal-section">
                            <h4>⚙️ Tecnologías utilizadas:</h4>
                            <div class="service-tech-tags">
                                ${serviceData.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${serviceData.plans ? `
                        <div class="service-modal-section">
                            <h4>💼 Planes disponibles:</h4>
                            <div class="hosting-plans">
                                ${serviceData.plans.map(plan => `
                                    <div class="hosting-plan">
                                        <h5>${plan.name}</h5>
                                        <div class="plan-price">${plan.price}</div>
                                        <ul class="plan-features">
                                            ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                                        </ul>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${serviceData.examples ? `
                        <div class="service-modal-section">
                            <h4>🎯 Casos de éxito:</h4>
                            <ul class="service-examples">
                                ${serviceData.examples.map(example => `<li>${example}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${serviceData.priceRange ? `
                        <div class="service-modal-section">
                            <div class="service-pricing">
                                <div class="pricing-item">
                                    <strong>💰 Rango de inversión:</strong> ${serviceData.priceRange}
                                </div>
                                ${serviceData.deliveryTime ? `
                                    <div class="pricing-item">
                                        <strong>⏱️ Tiempo de entrega:</strong> ${serviceData.deliveryTime}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="service-modal-footer">
                    <button class="service-modal-btn primary" data-action="quote">
                        Solicitar cotización
                    </button>
                    <button class="service-modal-btn" data-action="close">
                        Cerrar
                    </button>
                </div>
            </div>
        `;

        return modal;
    },

    bindModalEvents(modal) {
        // Close button
        const closeBtn = modal.querySelector('.service-modal-close');
        closeBtn.addEventListener('click', () => this.closeServiceModal(modal));

        // Action buttons
        const quoteBtn = modal.querySelector('[data-action="quote"]');
        const closeActionBtn = modal.querySelector('[data-action="close"]');

        quoteBtn?.addEventListener('click', () => {
            this.closeServiceModal(modal);
            this.scrollToContact('consulta-servicio');
        });

        closeActionBtn?.addEventListener('click', () => {
            this.closeServiceModal(modal);
        });

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeServiceModal(modal);
            }
        });

        // Escape key to close
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeServiceModal(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    },

    closeServiceModal(modal = null) {
        const modalToClose = modal || document.querySelector('.service-modal');
        if (modalToClose) {
            modalToClose.classList.remove('active');
            setTimeout(() => {
                modalToClose.remove();
                document.body.classList.remove('no-scroll');
            }, 300);
        }
    },

    setupModalStyles() {
        if (document.getElementById('service-modal-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'service-modal-styles';
        styles.textContent = `
            .service-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .service-modal.active {
                opacity: 1;
            }
            
            .service-modal-content {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: 16px;
                max-width: 90vw;
                max-height: 90vh;
                width: 700px;
                overflow: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .service-modal.active .service-modal-content {
                transform: scale(1);
            }
            
            .service-modal-header {
                padding: 2rem;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-card));
            }
            
            .service-modal-header h2 {
                color: var(--text-primary);
                margin: 0;
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .service-modal-close {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                color: var(--text-muted);
                cursor: pointer;
                font-size: 1.5rem;
                padding: 0.5rem;
                border-radius: 8px;
                transition: all var(--transition-fast);
            }
            
            .service-modal-close:hover {
                color: var(--text-primary);
                background: var(--accent-error);
            }
            
            .service-modal-body {
                padding: 2rem;
            }
            
            .service-description {
                color: var(--text-secondary);
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 2rem;
            }
            
            .service-modal-section {
                margin-bottom: 2rem;
            }
            
            .service-modal-section h4 {
                color: var(--accent-primary);
                margin-bottom: 1rem;
            }
            
            .service-features-list, .service-examples {
                list-style: none;
                padding: 0;
            }
            
            .service-features-list li, .service-examples li {
                color: var(--text-secondary);
                padding: 0.5rem 0;
                padding-left: 1.5rem;
                position: relative;
            }
            
            .service-features-list li::before, .service-examples li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--accent-primary);
                font-weight: bold;
            }
            
            .service-tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .hosting-plans {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }
            
            .hosting-plan {
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 1.5rem;
                text-align: center;
            }
            
            .hosting-plan h5 {
                color: var(--text-primary);
                margin-bottom: 1rem;
            }
            
            .plan-price {
                color: var(--accent-primary);
                font-size: 1.3rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }
            
            .plan-features {
                list-style: none;
                padding: 0;
                text-align: left;
            }
            
            .plan-features li {
                color: var(--text-secondary);
                padding: 0.3rem 0;
                font-size: 0.9rem;
            }
            
            .service-pricing {
                background: var(--bg-secondary);
                border-radius: 12px;
                padding: 1.5rem;
            }
            
            .pricing-item {
                color: var(--text-secondary);
                margin-bottom: 0.5rem;
            }
            
            .service-modal-footer {
                padding: 2rem;
                border-top: 1px solid var(--border-color);
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .service-modal-btn {
                background: var(--bg-secondary);
                color: var(--text-primary);
                border: 1px solid var(--border-color);
                padding: 1rem 2rem;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all var(--transition-fast);
            }
            
            .service-modal-btn:hover {
                background: var(--bg-tertiary);
                border-color: var(--accent-primary);
            }
            
            .service-modal-btn.primary {
                background: var(--accent-primary);
                color: var(--bg-primary);
                border-color: var(--accent-primary);
            }
            
            .service-modal-btn.primary:hover {
                background: var(--accent-secondary);
            }
            
            @media (max-width: 768px) {
                .service-modal-content {
                    width: 95vw;
                    margin: 1rem;
                }
                
                .service-modal-header, .service-modal-body, .service-modal-footer {
                    padding: 1.5rem;
                }
                
                .hosting-plans {
                    grid-template-columns: 1fr;
                }
                
                .service-modal-footer {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(styles);
    },

    destroy() {
        // Remove event listeners
        this.serviceButtons.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        });

        if (this.ctaButton) {
            const newCTAButton = this.ctaButton.cloneNode(true);
            this.ctaButton.parentNode.replaceChild(newCTAButton, this.ctaButton);
        }

        // Close any open modals
        this.closeServiceModal();

        // Remove styles
        const styles = document.getElementById('service-modal-styles');
        if (styles) {
            styles.remove();
        }

        this.serviceButtons = [];
        this.ctaButton = null;

        console.log('💥 ServicesModule destroyed');
    }
};

export default ServicesModule;