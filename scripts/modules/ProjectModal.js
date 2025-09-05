/**
 * WebSign Portfolio - Project Modal Module
 * Author: Albano Caminos
 */

'use strict';

import { PROJECT_DATA } from '../data/projectData.js';
import { Utils } from '../utils/helpers.js';

// ===== PROJECT MODAL MODULE =====
export const ProjectModal = {
    modal: null,
    modalContent: null,
    modalClose: null,
    currentProject: null,

    init() {
        this.modal = document.getElementById('projectModal');
        this.modalContent = this.modal?.querySelector('.modal-content');
        this.modalClose = document.getElementById('modalClose');
        
        if (!this.modal) {
            console.warn('ProjectModal: Modal element not found');
            return;
        }

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
        const project = PROJECT_DATA[projectId];
        if (!project) {
            console.warn(`ProjectModal: Project "${projectId}" not found`);
            return;
        }

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

    async handlePrimaryAction() {
        if (!this.currentProject) return;
        
        const { NotificationSystem } = await import('./NotificationSystem.js');
        NotificationSystem.info(`Funcionalidad de ${PROJECT_DATA[this.currentProject].title} próximamente disponible`);
    },

    async handleSecondaryAction() {
        // Scroll to contact section
        const contactSection = document.getElementById('contacto');
        if (contactSection) {
            this.closeModal();
            setTimeout(() => {
                Utils.smoothScrollTo(contactSection);
            }, 300);

            const { NotificationSystem } = await import('./NotificationSystem.js');
            NotificationSystem.success('¡Cuéntame sobre tu proyecto!');
        }
    }
};

export default ProjectModal;