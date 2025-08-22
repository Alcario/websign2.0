// ===== PROJECT MODAL MODULE =====
const ProjectModal = {
    modal: null,
    modalContent: null,
    modalClose: null,
    currentProject: null,

    // Project data
    projectData: {
        'orquesta': {
            title: 'Sistema Orquesta Mediterránea',
            icon: '🎵',
            image: 'images/portfolio/orquesta-mediterranea.png',
            description: `Sistema integral de gestión desarrollado específicamente para la Orquesta Córdoba Mediterránea. 
                         Esta aplicación web permite un control completo del inventario de instrumentos musicales, gestión de alumnos, 
                         docentes y sistema de comodatos. Incluye reportes automatizados, seguimiento académico y dashboard de administración 
                         con métricas en tiempo real.`,
            features: [
                'Gestión completa de inventario musical con códigos QR',
                'Sistema de comodatos con fechas y responsables',
                'Panel de administración de alumnos y docentes',
                'Reportes automatizados y estadísticas',
                'Dashboard con métricas en tiempo real',
                'Sistema de autenticación con roles de usuario',
                'Notificaciones automáticas de vencimientos',
                'Backup automático de datos'
            ],
            techStack: ['React', 'Node.js', 'MongoDB', 'JWT', 'Bootstrap', 'Zustand'],
            stats: [
                { number: '150+', label: 'Usuarios activos' },
                { number: '500+', label: 'Instrumentos registrados' },
                { number: '200+', label: 'Comodatos gestionados' },
                { number: '99.9%', label: 'Uptime' }
            ],
            primaryAction: { text: 'Ver sistema', icon: '🎵' },
            secondaryAction: { text: 'Solicitar demo', icon: '📧' }
        },
        'dataflow': {
            title: 'DataFlow Analytics',
            icon: '📊',
            image: 'images/portfolio/dataflow.png',
            description: `Plataforma de analytics empresarial que proporciona insights en tiempo real sobre el rendimiento del negocio. 
                         Incluye dashboards interactivos, reportes automatizados y herramientas de visualización de datos avanzadas.`,
            features: [
                'Dashboards interactivos en tiempo real',
                'Múltiples tipos de gráficos y visualizaciones',
                'Reportes automatizados programables',
                'Exportación de datos en múltiples formatos',
                'Alertas y notificaciones personalizadas',
                'API REST para integración con otros sistemas'
            ],
            techStack: ['React', 'Charts.js', 'Zustand', 'Node.js'],
            stats: [
                { number: '50+', label: 'Métricas monitoreadas' },
                { number: '24/7', label: 'Monitoreo continuo' },
                { number: '10+', label: 'Tipos de reportes' }
            ],
            primaryAction: { text: 'Ver demo', icon: '📊' },
            secondaryAction: { text: 'Contactar', icon: '📧' }
        },
        'tvm-mallorca': {
            title: 'TVM Mallorca Transporta',
            icon: '🚛',
            image: 'images/portfolio/tvm-mallorca.png',
            description: `Sistema empresarial integral para empresa de transporte y alquiler de andamios. 
                         Gestiona flotas, rutas, clientes, inventario de andamios y facturación.`,
            features: [
                'Gestión de flota de vehículos',
                'Control de rutas y entregas',
                'Inventario de andamios y equipos',
                'Sistema de facturación integrado',
                'Seguimiento GPS en tiempo real',
                'Reportes de rendimiento y costos'
            ],
            techStack: ['React', 'Bootstrap', 'Zustand', 'Node.js'],
            stats: [
                { number: '25+', label: 'Vehículos monitoreados' },
                { number: '500+', label: 'Equipos gestionados' },
                { number: 'En desarrollo', label: 'Estado actual' }
            ],
            primaryAction: { text: 'Ver progreso', icon: '🔧' },
            secondaryAction: { text: 'Más info', icon: '📧' }
        },
        'tvm-alquileres': {
            title: 'TVM Alquileres',
            icon: '🏗️',
            image: 'images/portfolio/tvm-alquileres.png',
            description: `Plataforma completa para gestión de alquileres de maquinaria pesada. 
                         Incluye gestión de proveedores, clientes, inventario, contratos y facturación.`,
            features: [
                'Gestión completa de proveedores',
                'Control de inventario de maquinaria',
                'Sistema de contratos y alquileres',
                'Facturación automática',
                'Calendario de disponibilidad',
                'Reportes financieros detallados'
            ],
            techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
            stats: [
                { number: '100+', label: 'Máquinas registradas' },
                { number: '50+', label: 'Clientes activos' },
                { number: 'Beta', label: 'Fase actual' }
            ],
            primaryAction: { text: 'Ver detalles', icon: '🏗️' },
            secondaryAction: { text: 'Contactar', icon: '📧' }
        },
        'lemon-pies': {
            title: 'Lemon Pies',
            icon: '🍋',
            image: 'images/portfolio/lemon-pies.png',
            description: `Sistema de gestión empresarial para negocio gastronómico. 
                         Control completo de clientes, ventas, compras, inventario de insumos y análisis de rentabilidad.`,
            features: [
                'Gestión de clientes y historial de pedidos',
                'Control de ventas y facturación',
                'Gestión de compras e inventario',
                'Análisis de costos y rentabilidad',
                'Reportes de ventas y ganancias',
                'Sistema de alertas de stock'
            ],
            techStack: ['React', 'Node.js', 'MongoDB', 'Zustand'],
            stats: [
                { number: '300+', label: 'Clientes registrados' },
                { number: '1000+', label: 'Pedidos procesados' },
                { number: '98%', label: 'Satisfacción cliente' }
            ],
            primaryAction: { text: 'Ver caso de estudio', icon: '🍋' },
            secondaryAction: { text: 'Contactar', icon: '📧' }
        },
        'institucionales': {
            title: 'Sitios Institucionales',
            icon: '🏫',
            image: 'images/portfolio/centro-jose-hernandez.png',
            description: `Portfolio de sitios web institucionales para centros educativos. 
                         Diseños modernos, responsivos y optimizados para SEO.`,
            features: [
                'Centro Educativo José Hernández',
                'IPET Nº 413',
                'IPETyA Nº 53 Fray Luis Beltrán',
                'Asociación Deán Para el Desarrollo',
                'Diseños responsivos y modernos',
                'Optimización SEO completa'
            ],
            techStack: ['React', 'Bootstrap', 'HTML5', 'CSS3', 'JavaScript'],
            stats: [
                { number: '4', label: 'Sitios desarrollados' },
                { number: '1000+', label: 'Visitantes mensuales' },
                { number: '100%', label: 'Responsive design' }
            ],
            primaryAction: { text: 'Ver portfolio', icon: '🌐' },
            secondaryAction: { text: 'Nuevo proyecto', icon: '📧' }
        },
        'notables': {
            title: 'Notables',
            icon: '🌟',
            image: 'images/portfolio/notables.png',
            description: `Sitio web institucional moderno con diseño atractivo y funcionalidades avanzadas. 
                         Optimizado para rendimiento y experiencia de usuario.`,
            features: [
                'Diseño moderno y atractivo',
                'Interfaz intuitiva y fácil navegación',
                'Optimización para motores de búsqueda',
                'Responsive design para todos los dispositivos',
                'Carga rápida y optimizada',
                'Integración con redes sociales'
            ],
            techStack: ['React', 'Bootstrap', 'SEO', 'JavaScript'],
            stats: [
                { number: '500+', label: 'Visitantes mensuales' },
                { number: '95%', label: 'Score PageSpeed' },
                { number: '100%', label: 'Mobile friendly' }
            ],
            primaryAction: { text: 'Ver sitio', icon: '🌟' },
            secondaryAction: { text: 'Contactar', icon: '📧' }
        },
        'rous-indumentaria': {
            title: 'Rous Indumentaria',
            icon: '👗',
            image: 'images/portfolio/rous-indumentaria.png',
            description: `Tienda online de indumentaria femenina desarrollada con WordPress y WooCommerce. 
                         E-commerce completo con catálogo de productos, carrito de compras y sistema de pagos.`,
            features: [
                'Catálogo completo de productos',
                'Carrito de compras funcional',
                'Sistema de pagos integrado',
                'Panel de administración completo',
                'Gestión de inventario',
                'Diseño responsive y moderno'
            ],
            techStack: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
            stats: [
                { number: '200+', label: 'Productos en catálogo' },
                { number: '150+', label: 'Clientes registrados' },
                { number: '24/7', label: 'Disponibilidad' }
            ],
            primaryAction: { text: 'Visitar tienda', icon: '🛍️' },
            secondaryAction: { text: 'Crear mi tienda', icon: '📧' }
        },
        'corona-roja': {
            title: 'Corona Roja',
            icon: '🍯',
            image: 'images/portfolio/corona-roja.png',
            description: `Tienda online especializada en productos naturales de la colmena. 
                         Desarrollada para agricultores del norte de Córdoba que comercializan miel, jalea real y polen.`,
            features: [
                'Catálogo de productos naturales',
                'Información detallada de cada producto',
                'Sistema de pedidos online',
                'Blog sobre apicultura y beneficios',
                'Galería de la producción',
                'Contacto directo con productores'
            ],
            techStack: ['WordPress', 'WooCommerce', 'SEO', 'Responsive Design'],
            stats: [
                { number: '50+', label: 'Productos naturales' },
                { number: '100+', label: 'Clientes satisfechos' },
                { number: '15+', label: 'Años de experiencia' }
            ],
            primaryAction: { text: 'Ver productos', icon: '🍯' },
            secondaryAction: { text: 'Contactar', icon: '📧' }
        }
    },

    init() {
        this.modal = document.getElementById('projectModal');
        this.modalContent = this.modal?.querySelector('.modal-content');
        this.modalClose = document.getElementById('modalClose');
        
        this.bindEvents();
    },

    bindEvents() {
        // Close modal events
        this.modalClose?.addEventListener('click', () => this.closeModal());
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Project card clicks
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('[data-project]');
            if (projectCard && (e.target.closest('.view-project-btn') || e.target.closest('.action-btn'))) {
                e.preventDefault();
                const projectId = projectCard.getAttribute('data-project');
                this.openModal(projectId);
            }
        });

        // Modal action buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('#modalPrimaryAction')) {
                this.handlePrimaryAction();
            }
            if (e.target.closest('#modalSecondaryAction')) {
                this.handleSecondaryAction();
            }
        });
    },

    openModal(projectId) {
        const project = this.projectData[projectId];
        if (!project) return;

        this.currentProject = projectId;
        this.populateModal(project);
        this.modal?.classList.add('active');
        document.body.classList.add('no-scroll');
    },

    closeModal() {
        this.modal?.classList.remove('active');
        document.body.classList.remove('no-scroll');
        this.currentProject = null;
    },

    populateModal(project) {
        // Set title and icon
        const modalIcon = document.getElementById('modalIcon');
        const modalTitleText = document.getElementById('modalTitleText');
        const modalImage = document.getElementById('modalImage');
        const modalDescription = document.getElementById('modalDescription');
        const modalFeatures = document.getElementById('modalFeatures');
        const modalTechStack = document.getElementById('modalTechStack');
        const modalStats = document.getElementById('modalStats');
        const modalPrimaryAction = document.getElementById('modalPrimaryAction');
        const modalSecondaryAction = document.getElementById('modalSecondaryAction');

        if (modalIcon) modalIcon.textContent = project.icon;
        if (modalTitleText) modalTitleText.textContent = project.title;
        
        // Set image
        if (modalImage) {
            modalImage.src = project.image;
            modalImage.alt = project.title;
        }

        // Set description
        if (modalDescription) {
            modalDescription.textContent = project.description;
        }

        // Set features
        if (modalFeatures) {
            modalFeatures.innerHTML = project.features
                .map(feature => `<li>${feature}</li>`)
                .join('');
        }

        // Set tech stack
        if (modalTechStack) {
            modalTechStack.innerHTML = project.techStack
                .map(tech => `<span class="tech-tag ${tech.toLowerCase().replace(/[^a-z0-9]/g, '')}">${tech}</span>`)
                .join('');
        }

        // Set stats
        if (modalStats) {
            modalStats.innerHTML = project.stats
                .map(stat => `
                    <div class="modal-stat">
                        <span class="modal-stat-number">${stat.number}</span>
                        <span class="modal-stat-label">${stat.label}</span>
                    </div>
                `).join('');
        }

        // Set action buttons
        if (modalPrimaryAction) {
            modalPrimaryAction.innerHTML = `
                <span class="btn-icon">${project.primaryAction.icon}</span>
                <span>${project.primaryAction.text}</span>
            `;
        }

        if (modalSecondaryAction) {
            modalSecondaryAction.innerHTML = `
                <span class="btn-icon">${project.secondaryAction.icon}</span>
                <span>${project.secondaryAction.text}</span>
            `;
        }
    },

    handlePrimaryAction() {
        if (!this.currentProject) return;
        
        // For now, just show a notification
        NotificationSystem.show(`Funcionalidad de ${this.projectData[this.currentProject].title} próximamente disponible`, 'info');
        
        // In a real implementation, you would:
        // - Open external links
        // - Navigate to project demos
        // - Show additional content
    },

    handleSecondaryAction() {
        // Scroll to contact section
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            this.closeModal();
            setTimeout(() => {
                Utils.smoothScrollTo(contactSection);
                NotificationSystem.show('¡Cuéntame sobre tu proyecto!', 'success');
            }, 300);
        }
    }
};/**
 * WebSign Portfolio - Modern JavaScript Module
 * Author: Albano Caminos
 * Version: 2.0.0
 */

'use strict';

// ===== CONFIGURATION & CONSTANTS =====
const CONFIG = {
    // Animation settings
    ANIMATION_DELAY: 100,
    TYPING_SPEED: 80,
    SCROLL_THRESHOLD: 100,
    
    // Form settings
    FORM_SUBMISSION_DELAY: 2000,
    NOTIFICATION_DURATION: 5000,
    
    // API endpoints (for future use)
    API_BASE_URL: 'https://api.websign.dev',
    
    // Selectors
    SELECTORS: {
        nav: '.terminal-nav',
        navMenu: '.nav-menu',
        mobileToggle: '.mobile-toggle',
        backToTop: '#backToTop',
        loadingScreen: '#loading-screen',
        contactForm: '#contactForm',
        skillBars: '.skill-bar',
        projectCards: '.project-card',
        filterBtns: '.filter-btn'
    }
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
    /**
     * Debounce function to limit function calls
     */
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    /**
     * Throttle function for scroll events
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 - threshold &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Smooth scroll to element
     */
    smoothScrollTo(element, offset = 80) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    /**
     * Generate unique ID
     */
    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Sanitize string for display
     */
    sanitizeString(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};

// ===== LOADING SCREEN MODULE =====
const LoadingScreen = {
    element: null,
    statusLines: [],
    
    init() {
        this.element = document.getElementById('loading-screen');
        this.statusLines = this.element?.querySelectorAll('.status-line') || [];
        this.showLoadingSequence();
    },

    showLoadingSequence() {
        if (!this.element) return;

        // Show status lines sequentially
        this.statusLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
            }, 500 + (index * 500));
        });

        // Hide loading screen after sequence
        setTimeout(() => {
            this.hide();
        }, 3500);
    },

    hide() {
        if (!this.element) return;
        
        this.element.classList.add('fade-out');
        setTimeout(() => {
            this.element.style.display = 'none';
            // Start other animations after loading
            TypingAnimation.start();
            ScrollAnimations.init();
        }, 500);
    }
};

// ===== NAVIGATION MODULE =====
const Navigation = {
    nav: null,
    navMenu: null,
    mobileToggle: null,
    isMenuOpen: false,
    lastScrollY: 0,

    init() {
        this.nav = document.querySelector(CONFIG.SELECTORS.nav);
        this.navMenu = document.querySelector(CONFIG.SELECTORS.navMenu);
        this.mobileToggle = document.querySelector(CONFIG.SELECTORS.mobileToggle);

        this.bindEvents();
        this.setActiveLink();
    },

    bindEvents() {
        // Mobile menu toggle
        this.mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Smooth scroll for navigation links
        this.navMenu?.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                this.handleNavClick(e.target);
            }
        });

        // Hide/show nav on scroll
        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 100));

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.nav?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle scroll to update active link
        window.addEventListener('scroll', Utils.throttle(() => this.setActiveLink(), 100));
    },

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navMenu?.classList.toggle('active');
        this.mobileToggle?.classList.toggle('active');
        document.body.classList.toggle('no-scroll', this.isMenuOpen);
    },

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.navMenu?.classList.remove('active');
        this.mobileToggle?.classList.remove('active');
        document.body.classList.remove('no-scroll');
    },

    handleNavClick(link) {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            Utils.smoothScrollTo(targetElement);
            this.closeMobileMenu();
        }
    },

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Hide/show navigation based on scroll direction
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
            this.nav?.classList.add('hidden');
        } else {
            this.nav?.classList.remove('hidden');
        }
        
        this.lastScrollY = currentScrollY;
    },

    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = this.navMenu?.querySelectorAll('a[href^="#"]') || [];
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
};

// ===== TYPING ANIMATION MODULE =====
const TypingAnimation = {
    commands: [
        'npm start',
        'git commit -m "feat: awesome portfolio"',
        'deploy --production',
        'echo "Ready to build amazing apps!"'
    ],
    currentCommand: 0,
    currentChar: 0,
    isDeleting: false,
    element: null,

    init() {
        this.element = document.querySelector('.command-text');
    },

    start() {
        if (!this.element) return;
        this.type();
    },

    type() {
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

        setTimeout(() => this.type(), typeSpeed);
    }
};

// ===== SCROLL ANIMATIONS MODULE =====
const ScrollAnimations = {
    observer: null,
    skillBarsAnimated: false,

    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    },

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    },

    observeElements() {
        // Animate sections
        document.querySelectorAll('section').forEach(section => {
            this.observer.observe(section);
        });

        // Animate cards
        document.querySelectorAll('.project-card, .tech-card, .stat-card').forEach(card => {
            this.observer.observe(card);
        });

        // Animate timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            this.observer.observe(item);
        });
    },

    animateElement(element) {
        // Add fade-in animation
        element.classList.add('fade-in');

        // Special handling for skill bars
        if (element.classList.contains('skills-section') && !this.skillBarsAnimated) {
            this.animateSkillBars();
            this.skillBarsAnimated = true;
        }

        // Special handling for stats
        if (element.classList.contains('stat-card')) {
            this.animateStatNumbers(element);
        }
    },

    animateSkillBars() {
        const skillBars = document.querySelectorAll(CONFIG.SELECTORS.skillBars);
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
            }, index * 100);
        });
    },

    animateStatNumbers(statCard) {
        const numberElement = statCard.querySelector('.stat-number');
        if (!numberElement) return;

        const finalNumber = parseInt(numberElement.textContent);
        const isPercentage = numberElement.textContent.includes('%');
        let currentNumber = 0;
        const increment = finalNumber / 50;
        
        const counter = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(counter);
            }
            
            numberElement.textContent = Math.floor(currentNumber) + (isPercentage ? '%' : '+');
        }, 30);
    }
};

// ===== PROJECT FILTER MODULE =====
const ProjectFilter = {
    filterBtns: [],
    projectCards: [],
    activeFilter: 'all',

    init() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        
        this.bindEvents();
        this.logAvailableCategories(); // Para debugging
    },

    bindEvents() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilter(btn);
            });
        });
    },

    logAvailableCategories() {
        // Para debugging - ver qué categorías existen
        const categories = new Set();
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (category) {
                categories.add(category);
            }
        });
        console.log('Categorías disponibles:', Array.from(categories));
    },

    handleFilter(btn) {
        // Prevenir múltiples clicks rápidos
        if (btn.classList.contains('processing')) {
            return;
        }

        // Marcar como procesando
        btn.classList.add('processing');

        // Update active button
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Get filter value
        const filter = btn.getAttribute('data-filter');
        this.activeFilter = filter;

        console.log('Filtrando por:', filter);

        // Filter projects with improved logic
        this.filterProjects(filter);

        // Remover flag de procesamiento después de un delay
        setTimeout(() => {
            btn.classList.remove('processing');
        }, 300);
    },

    filterProjects(filter) {
        this.projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            // Lógica de filtrado mejorada
            let shouldShow = false;
            
            if (filter === 'all') {
                shouldShow = true;
            } else if (filter === 'ecommerce') {
                // Los e-commerce también se consideran fullstack en algunos casos
                shouldShow = category === 'ecommerce';
            } else {
                shouldShow = category === filter;
            }

            // Log para debugging
            console.log(`Card ${index}: category="${category}", filter="${filter}", shouldShow=${shouldShow}`);

            // Aplicar filtro
            if (shouldShow) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Animación de entrada escalonada
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                card.style.transition = 'all 0.2s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                
                // Ocultar después de la animación
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });

        // Mostrar contador de resultados
        this.showResultCount(filter);
    },

    showResultCount(filter) {
        const visibleCards = Array.from(this.projectCards).filter(card => {
            const category = card.getAttribute('data-category');
            return filter === 'all' || category === filter || (filter === 'ecommerce' && category === 'ecommerce');
        });

        console.log(`Mostrando ${visibleCards.length} proyectos para el filtro "${filter}"`);
        
        // Opcional: mostrar notificación con el número de resultados
        if (typeof NotificationSystem !== 'undefined') {
            const filterNames = {
                'all': 'todos los proyectos',
                'fullstack': 'proyectos Full Stack',
                'frontend': 'proyectos Frontend',
                'backend': 'proyectos Backend',
                'ecommerce': 'proyectos E-commerce'
            };
            
            const filterName = filterNames[filter] || filter;
            NotificationSystem.show(`Mostrando ${visibleCards.length} ${filterName}`, 'info', 2000);
        }
    },

    // Método para resetear todos los filtros
    resetFilters() {
        this.filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === 'all') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        this.projectCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        
        this.activeFilter = 'all';
    }
};

// ===== CONTACT FORM MODULE =====
const ContactForm = {
    form: null,
    submitBtn: null,
    originalBtnContent: '',

    init() {
        this.form = document.querySelector('#contactForm');
        if (!this.form) return;

        this.submitBtn = this.form.querySelector('.terminal-submit');
        
        // FIX: Guardar el contenido HTML original correctamente
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
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        this.setSubmitState('loading');

        try {
            // Simulate API call (replace with actual endpoint)
            await this.submitForm(data);
            
            // Show success state
            this.setSubmitState('success');
            
            // Show notification instead of changing button text
            if (typeof NotificationSystem !== 'undefined') {
                NotificationSystem.show('¡Mensaje enviado correctamente!', 'success');
            }
            
            // Reset form after delay
            setTimeout(() => {
                this.form.reset();
                this.setSubmitState('normal');
            }, 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.setSubmitState('error');
            
            // Show notification instead of changing button text
            if (typeof NotificationSystem !== 'undefined') {
                NotificationSystem.show('Error al enviar el mensaje. Inténtalo nuevamente.', 'error');
            }
            
            // Reset button after delay
            setTimeout(() => {
                this.setSubmitState('normal');
            }, 3000);
        }
    },

    validateForm(data) {
        let isValid = true;
        const errors = [];

        // Validate name
        if (!data.nombre || data.nombre.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
            isValid = false;
        }

        // Validate email
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Por favor ingresa un email válido');
            isValid = false;
        }

        // Validate project type
        if (!data.proyecto) {
            errors.push('Por favor selecciona un tipo de proyecto');
            isValid = false;
        }

        // Validate message
        if (!data.mensaje || data.mensaje.trim().length < 10) {
            errors.push('El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        }

        if (!isValid && typeof NotificationSystem !== 'undefined') {
            NotificationSystem.show(errors.join('\n'), 'error');
        }

        return isValid;
    },

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'text':
                if (field.name === 'nombre' && value.length < 2) {
                    isValid = false;
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                }
                break;
            case 'email':
                if (!this.isValidEmail(value)) {
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
                if (field.tagName === 'TEXTAREA' && value.length < 10) {
                    isValid = false;
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
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
                // FIX: Mantener la estructura HTML pero cambiar solo el texto
                this.submitBtn.style.opacity = '0.7';
                this.submitBtn.style.cursor = 'not-allowed';
                this.submitBtn.disabled = true;
                
                // Cambiar solo el texto del method, no todo el HTML
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
                // FIX: Restaurar el contenido original completo
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
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate random failure for testing (remove in production)
        if (Math.random() < 0.1) {
            throw new Error('Simulated network error');
        }
        
        return { success: true, message: 'Form submitted successfully' };
    }
};

// ===== NOTIFICATION SYSTEM =====
const NotificationSystem = {
    container: null,
    notifications: [],

    init() {
        this.createContainer();
    },

    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    },

    show(message, type = 'info', duration = CONFIG.NOTIFICATION_DURATION) {
        const notification = this.createNotification(message, type);
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto-hide notification
        setTimeout(() => {
            this.hide(notification);
        }, duration);

        return notification;
    },

    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.pointerEvents = 'auto';

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${icons[type] || icons.info}</div>
                <div class="notification-text">
                    <div class="notification-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                    <div class="notification-message">${Utils.sanitizeString(message)}</div>
                </div>
                <button class="notification-close" aria-label="Cerrar notificación">&times;</button>
            </div>
        `;

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.hide(notification));

        return notification;
    },

    hide(notification) {
        notification.classList.remove('show');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    },

    hideAll() {
        this.notifications.forEach(notification => this.hide(notification));
    }
};

// ===== BACK TO TOP MODULE =====
const BackToTop = {
    button: null,
    scrollProgress: 0,
    threshold: 200, // Reducido de 300 a 200
    isVisible: false,
    
    init() {
        console.log('🚀 Inicializando BackToTop...');
        
        // Buscar botón existente
        this.button = document.querySelector('#backToTop');
        
        // Si no existe, crearlo
        if (!this.button) {
            this.createButton();
        }
        
        // Verificar que el botón existe
        if (!this.button) {
            console.error('❌ No se pudo crear o encontrar el botón BackToTop');
            return;
        }
        
        this.bindEvents();
        this.updateVisibility(); // Verificar estado inicial
        
        console.log('✅ BackToTop inicializado correctamente');
    },

    createButton() {
        console.log('🔧 Creando botón BackToTop...');
        
        this.button = document.createElement('button');
        this.button.id = 'backToTop';
        this.button.className = 'back-to-top';
        this.button.setAttribute('aria-label', 'Volver arriba');
        this.button.innerHTML = `
            <svg class="back-to-top-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
            </svg>
            <span class="back-to-top-text">Top</span>
        `;
        
        document.body.appendChild(this.button);
        console.log('✅ Botón creado y agregado al DOM');
    },

    bindEvents() {
        if (!this.button) {
            console.error('❌ No hay botón para vincular eventos');
            return;
        }
        
        // Click event
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });

        // Scroll event con throttle mejorado
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
        
        console.log('✅ Eventos vinculados correctamente');
    },

    scrollToTop() {
        if (!this.button) return;
        
        console.log('🚀 Scrolling to top...');
        
        // Efecto visual de click
        this.button.classList.add('clicking');
        
        // Scroll suave
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Remover clase después de la animación
        setTimeout(() => {
            if (this.button) {
                this.button.classList.remove('clicking');
            }
        }, 200);
        
        // Feedback opcional
        this.showFeedback();
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
        
        this.button.classList.add('visible');
        this.isVisible = true;
        
        console.log('👁️ Botón BackToTop mostrado');
    },

    hide() {
        if (!this.button) return;
        
        this.button.classList.remove('visible');
        this.isVisible = false;
        
        console.log('🙈 Botón BackToTop ocultado');
    },

    updateProgress() {
        if (!this.button) return;
        
        // Calcular progreso de scroll para indicador opcional
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        this.scrollProgress = Math.min(scrolled, 100);
        
        // Actualizar CSS custom property si el botón tiene clase with-progress
        if (this.button.classList.contains('with-progress')) {
            this.button.style.setProperty('--scroll-progress', `${this.scrollProgress}%`);
        }
    },

    showFeedback() {
        // Crear notificación simple (opcional)
        const feedback = document.createElement('div');
        feedback.textContent = '¡Volviste al inicio!';
        feedback.style.cssText = `
            position: fixed;
            top: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-primary, #00ff88);
            color: var(--bg-primary, #000);
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            font-size: 0.9rem;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(feedback);
        
        // Mostrar
        setTimeout(() => feedback.style.opacity = '1', 100);
        
        // Ocultar y remover
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    },

    // Métodos públicos para personalización
    setThreshold(newThreshold) {
        this.threshold = newThreshold;
        console.log(`🔧 Threshold actualizado a: ${newThreshold}px`);
    },

    toggleProgressIndicator(enabled = true) {
        if (!this.button) return;
        
        if (enabled) {
            this.button.classList.add('with-progress');
        } else {
            this.button.classList.remove('with-progress');
        }
    },

    // Método de debugging
    debug() {
        console.group('🔍 BackToTop Debug Info');
        console.log('Button Element:', this.button);
        console.log('Is Visible:', this.isVisible);
        console.log('Current Scroll:', window.pageYOffset);
        console.log('Threshold:', this.threshold);
        console.log('Scroll Progress:', this.scrollProgress + '%');
        console.log('Button Classes:', this.button?.className);
        console.groupEnd();
    },

    // Forzar mostrar para testing
    forceShow() {
        this.show();
        console.log('🧪 Botón forzado a mostrar para testing');
    }
};

// CSS adicional para el efecto de click (si no está en tu CSS)
const additionalCSS = `
.back-to-top.clicking {
    transform: translateY(-1px) scale(0.95) !important;
    transition: transform 0.1s ease !important;
}

.back-to-top.clicking .back-to-top-icon {
    transform: translateY(-2px);
}
`;

// Inyectar CSS si no existe
if (!document.getElementById('back-to-top-enhanced-styles')) {
    const style = document.createElement('style');
    style.id = 'back-to-top-enhanced-styles';
    style.textContent = additionalCSS;
    document.head.appendChild(style);
}

// Exportar para uso en el módulo principal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackToTop;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM cargado, inicializando BackToTop...');
    
    const backToTop = new BackToTopButton();
    
    // Hacer disponible globalmente para debugging
    window.backToTopButton = backToTop;
    
    // Auto-test después de 2 segundos
    setTimeout(() => {
        console.log('🔍 Ejecutando auto-test...');
        console.log('📏 Altura actual de la página:', document.body.scrollHeight);
        console.log('📏 Altura del viewport:', window.innerHeight);
        
        // Si la página es muy corta, simular scroll
        if (document.body.scrollHeight < window.innerHeight * 2) {
            console.log('⚠️ Página demasiado corta, forzando visibilidad para test');
            backToTop.test();
        }
    }, 2000);
});

// Debug: Exponer función de test global
window.testBackToTop = function() {
    if (window.backToTopButton) {
        window.backToTopButton.test();
    } else {
        console.error('❌ BackToTop no inicializado');
    }
};

// Mostrar información útil en la consola
console.log(`
🔧 DEBUG BACK TO TOP BUTTON
============================

Para debuggear:
- Abre las Dev Tools (F12)
- Mira el panel superior izquierdo para info en tiempo real
- Haz scroll para ver el botón aparecer después de 300px
- Ejecuta testBackToTop() en la consola para forzar test

Estado inicial: Botón oculto
Threshold: 300px de scroll
`);

// ===== PERFORMANCE MONITOR =====
const PerformanceMonitor = {
    metrics: {
        loadTime: 0,
        domContentLoaded: 0,
        firstPaint: 0,
        firstContentfulPaint: 0
    },

    init() {
        this.measurePerformance();
        this.logMetrics();
    },

    measurePerformance() {
        // Measure page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
        });

        // Measure DOM content loaded time
        document.addEventListener('DOMContentLoaded', () => {
            this.metrics.domContentLoaded = performance.now();
        });

        // Measure paint metrics
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.name === 'first-paint') {
                        this.metrics.firstPaint = entry.startTime;
                    }
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.firstContentfulPaint = entry.startTime;
                    }
                });
            });
            observer.observe({ entryTypes: ['paint'] });
        }
    },

    logMetrics() {
        setTimeout(() => {
            console.group('🚀 WebSign Performance Metrics');
            console.log('📊 Load Time:', `${this.metrics.loadTime.toFixed(2)}ms`);
            console.log('📄 DOM Content Loaded:', `${this.metrics.domContentLoaded.toFixed(2)}ms`);
            console.log('🎨 First Paint:', `${this.metrics.firstPaint.toFixed(2)}ms`);
            console.log('🖼️ First Contentful Paint:', `${this.metrics.firstContentfulPaint.toFixed(2)}ms`);
            console.groupEnd();
        }, 3000);
    }
};

// ===== KEYBOARD SHORTCUTS =====
const KeyboardShortcuts = {
    shortcuts: {
        'h': () => Utils.smoothScrollTo(document.getElementById('inicio')),
        's': () => Utils.smoothScrollTo(document.getElementById('skills')),
        'p': () => Utils.smoothScrollTo(document.getElementById('proyectos')),
        'e': () => Utils.smoothScrollTo(document.getElementById('experiencia')),
        'c': () => Utils.smoothScrollTo(document.getElementById('contacto')),
        't': () => BackToTop.button?.click(),
        'Escape': () => Navigation.closeMobileMenu()
    },

    init() {
        this.bindEvents();
        this.showShortcutsHelp();
    },

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            // Only trigger if not typing in form elements
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                return;
            }

            const key = e.key.toLowerCase();
            if (this.shortcuts[key]) {
                e.preventDefault();
                this.shortcuts[key]();
            }
        });
    },

    showShortcutsHelp() {
        console.group('⌨️ Keyboard Shortcuts');
        console.log('H - Go to Home');
        console.log('S - Go to Skills');
        console.log('P - Go to Projects');
        console.log('E - Go to Experience');
        console.log('C - Go to Contact');
        console.log('T - Back to Top');
        console.log('ESC - Close Mobile Menu');
        console.groupEnd();
    }
};

// ===== MATRIX BACKGROUND EFFECT =====
const MatrixEffect = {
    canvas: null,
    ctx: null,
    characters: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
    drops: [],

    init() {
        this.createCanvas();
        this.setupMatrix();
        this.animate();
    },

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            opacity: 0.03;
        `;
        
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    },

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        const columns = Math.floor(this.canvas.width / 20);
        this.drops = Array(columns).fill(1);
    },

    setupMatrix() {
        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = '15px monospace';
    },

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff88';
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(char, i * 20, this.drops[i] * 20);
            
            if (this.drops[i] * 20 > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        setTimeout(() => {
            requestAnimationFrame(() => this.animate());
        }, 50);
    }
};

// ===== EASTER EGGS =====
const EasterEggs = {
    konamiCode: [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ],
    currentSequence: [],
    
    init() {
        this.bindKonamiCode();
        this.bindConsoleMessage();
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

    activateKonamiCode() {
        // Add rainbow effect to page
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Add CSS for rainbow effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        NotificationSystem.show('🎉 Konami Code activated! You found the secret!', 'success');
        
        // Remove effect after 10 seconds
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
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
    ╚══════════════════════════════════════╝
        `);
    }
};

// ===== ERROR HANDLING =====
const ErrorHandler = {
    init() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            this.logError(e.error);
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            this.logError(e.reason);
        });
    },

    logError(error) {
        // In development, show user-friendly error
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            NotificationSystem.show(`Development Error: ${error.message}`, 'error');
        }

        // In production, you would send this to your error tracking service
        // Example: Sentry, LogRocket, etc.
    }
};

// ===== MAIN APPLICATION =====
const WebSignApp = {
    modules: [
        LoadingScreen,
        Navigation,
        TypingAnimation,
        ScrollAnimations,
        ProjectFilter,
        ProjectModal,
        ContactForm,
        NotificationSystem,
        BackToTop,
        PerformanceMonitor,
        KeyboardShortcuts,
        MatrixEffect,
        EasterEggs,
        ErrorHandler
    ],

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startApp());
        } else {
            this.startApp();
        }
    },

    startApp() {
        console.log('🚀 Initializing WebSign Portfolio...');
        
        try {
            // Initialize all modules
            this.modules.forEach(module => {
                if (module.init && typeof module.init === 'function') {
                    module.init();
                }
            });

            console.log('✅ WebSign Portfolio initialized successfully!');
            
        } catch (error) {
            console.error('❌ Error initializing application:', error);
            ErrorHandler.logError(error);
        }
    },

    // Public API for external use
    api: {
        showNotification: (message, type) => NotificationSystem.show(message, type),
        scrollTo: (elementId) => {
            const element = document.getElementById(elementId);
            if (element) Utils.smoothScrollTo(element);
        },
        toggleMobileMenu: () => Navigation.toggleMobileMenu(),
        submitContactForm: (data) => ContactForm.submitForm(data)
    }
};

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WebSignApp,
        Utils,
        Navigation,
        ContactForm,
        NotificationSystem,
        CONFIG
    };
}

// ===== AUTO-INITIALIZE =====
WebSignApp.init();

// ===== EXPOSE API TO WINDOW =====
window.WebSign = WebSignApp.api;

const ServicesModule = {
    init() {
        this.bindServiceButtons();
        this.bindCTAButton();
    },

    bindServiceButtons() {
        // Seleccionar todos los botones de servicios
        const serviceButtons = document.querySelectorAll('.service-btn');
        
        serviceButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent.trim();
                this.handleServiceAction(buttonText, button);
            });
        });
    },

    bindCTAButton() {
        const ctaButton = document.querySelector('.cta-btn');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.scrollToContact('proyecto-personalizado');
            });
        }
    },

    handleServiceAction(buttonText, buttonElement) {
        switch (buttonText) {
            case 'Solicitar cotización':
                this.requestQuote('fullstack');
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

    requestQuote(serviceType) {
        // Ir a contacto con el tipo de proyecto preseleccionado
        this.scrollToContact('fullstack');
        
        // Preseleccionar el tipo de proyecto en el formulario
        setTimeout(() => {
            const projectSelect = document.querySelector('select[name="proyecto"]');
            if (projectSelect) {
                projectSelect.value = 'fullstack';
                projectSelect.dispatchEvent(new Event('change'));
            }
            
            // Pre-llenar mensaje
            const messageTextarea = document.querySelector('textarea[name="mensaje"]');
            if (messageTextarea) {
                messageTextarea.value = 'Hola! Me interesa solicitar una cotización para desarrollo Full Stack. Mi proyecto consiste en: ';
                messageTextarea.focus();
                // Posicionar cursor al final
                messageTextarea.setSelectionRange(messageTextarea.value.length, messageTextarea.value.length);
            }
        }, 500);

        if (typeof NotificationSystem !== 'undefined') {
            NotificationSystem.show('Formulario preparado para solicitar cotización Full Stack', 'info');
        }
    },

    showMoreInfo(serviceType) {
        // Mostrar modal con información detallada
        this.showServiceModal({
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
        });
    },

    showExamples(serviceType) {
        // Filtrar proyectos de e-commerce y mostrarlos
        const projectsSection = document.getElementById('proyectos');
        if (projectsSection) {
            // Ir a la sección de proyectos
            Utils.smoothScrollTo(projectsSection);
            
            // Activar filtro de e-commerce
            setTimeout(() => {
                const ecommerceFilter = document.querySelector('[data-filter="ecommerce"]');
                if (ecommerceFilter) {
                    ecommerceFilter.click();
                } else {
                    // Si no existe filtro de ecommerce, mostrar todos
                    const allFilter = document.querySelector('[data-filter="all"]');
                    if (allFilter) allFilter.click();
                }
            }, 500);

            if (typeof NotificationSystem !== 'undefined') {
                NotificationSystem.show('Mostrando ejemplos de E-Commerce', 'info');
            }
        }
    },

    showPortfolio(serviceType) {
        // Ir a proyectos y filtrar institucionales
        const projectsSection = document.getElementById('proyectos');
        if (projectsSection) {
            Utils.smoothScrollTo(projectsSection);
            
            setTimeout(() => {
                const frontendFilter = document.querySelector('[data-filter="frontend"]');
                if (frontendFilter) {
                    frontendFilter.click();
                }
            }, 500);

            if (typeof NotificationSystem !== 'undefined') {
                NotificationSystem.show('Mostrando portfolio de sitios institucionales', 'info');
            }
        }
    },

    showHostingPlans() {
        // Mostrar modal con planes de hosting
        this.showServiceModal({
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
        });
    },

    bookClass() {
        // Ir a contacto con mensaje pre-llenado para clases
        this.scrollToContact('capacitacion');
        
        setTimeout(() => {
            const projectSelect = document.querySelector('select[name="proyecto"]');
            if (projectSelect) {
                projectSelect.value = 'capacitacion';
            }
            
            const messageTextarea = document.querySelector('textarea[name="mensaje"]');
            if (messageTextarea) {
                messageTextarea.value = 'Hola! Me interesa reservar clases de programación. Quisiera aprender sobre: \n\n- Nivel actual: (principiante/intermedio/avanzado)\n- Tecnología de interés: \n- Modalidad preferida: (presencial/online)\n- Días y horarios disponibles: ';
                messageTextarea.focus();
            }
        }, 500);

        if (typeof NotificationSystem !== 'undefined') {
            NotificationSystem.show('Formulario preparado para reservar clases', 'info');
        }
    },

    scrollToContact(serviceType) {
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            Utils.smoothScrollTo(contactSection);
        }
    },

    showServiceModal(serviceData) {
        // Crear modal dinámico para mostrar información del servicio
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
                    <button class="service-modal-btn primary" onclick="ServicesModule.closeServiceModal(); ServicesModule.scrollToContact('${serviceData.title.toLowerCase()}');">
                        Solicitar cotización
                    </button>
                    <button class="service-modal-btn" onclick="ServicesModule.closeServiceModal();">
                        Cerrar
                    </button>
                </div>
            </div>
        `;

        // Agregar estilos del modal
        if (!document.getElementById('service-modal-styles')) {
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
                    animation: modalFadeIn 0.3s ease forwards;
                }
                
                @keyframes modalFadeIn {
                    to { opacity: 1; }
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
                    animation: modalSlideIn 0.3s ease forwards;
                }
                
                @keyframes modalSlideIn {
                    to { transform: scale(1); }
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
                
                .service-modal-icon {
                    font-size: 2rem;
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
                    border-color: var(--accent-error);
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
                    border-color: var(--accent-secondary);
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
        }

        // Agregar al DOM
        document.body.appendChild(modal);
        document.body.classList.add('no-scroll');

        // Cerrar modal al hacer click fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeServiceModal();
            }
        });

        // Cerrar modal con ESC
        const closeOnEsc = (e) => {
            if (e.key === 'Escape') {
                this.closeServiceModal();
                document.removeEventListener('keydown', closeOnEsc);
            }
        };
        document.addEventListener('keydown', closeOnEsc);

        // Botón cerrar
        const closeBtn = modal.querySelector('.service-modal-close');
        closeBtn.addEventListener('click', () => this.closeServiceModal());
    },

    closeServiceModal() {
        const modal = document.querySelector('.service-modal');
        if (modal) {
            modal.style.animation = 'modalFadeOut 0.3s ease forwards';
            setTimeout(() => {
                modal.remove();
                document.body.classList.remove('no-scroll');
            }, 300);
        }
    }
};

// CSS adicional para la animación de salida
const additionalModalCSS = `
@keyframes modalFadeOut {
    to { opacity: 0; }
}
`;

// Agregar al módulo principal
if (typeof WebSignApp !== 'undefined' && WebSignApp.modules) {
    WebSignApp.modules.push(ServicesModule);
} else {
    // Inicializar independientemente si no existe WebSignApp
    document.addEventListener('DOMContentLoaded', () => {
        ServicesModule.init();
    });
}