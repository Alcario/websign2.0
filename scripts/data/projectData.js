/**
 * WebSign Portfolio - Project Data
 * Author: Albano Caminos
 */

'use strict';

// ===== PROJECT DATA =====
export const PROJECT_DATA = {
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
};

export default PROJECT_DATA;