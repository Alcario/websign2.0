/**
 * WebSign Portfolio - Project Filter Module
 * Author: Albano Caminos
 */

'use strict';

import { CONFIG } from '../config/constants.js';

// ===== PROJECT FILTER MODULE =====
export const ProjectFilter = {
    filterBtns: [],
    projectCards: [],
    activeFilter: 'all',
    isAnimating: false,

    init() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        
        if (this.filterBtns.length === 0 || this.projectCards.length === 0) {
            console.warn('ProjectFilter: Filter buttons or project cards not found');
            return;
        }

        this.bindEvents();
        this.logAvailableCategories();
        this.initializeView();
    },

    bindEvents() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFilter(btn);
            });
        });

        // Keyboard navigation for filters
        document.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleKeyboardNavigation(e);
            }
        });
    },

    handleKeyboardNavigation(e) {
        const currentIndex = Array.from(this.filterBtns).indexOf(e.target);
        let newIndex;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : this.filterBtns.length - 1;
                this.filterBtns[newIndex].focus();
                break;
            case 'ArrowRight':
                e.preventDefault();
                newIndex = currentIndex < this.filterBtns.length - 1 ? currentIndex + 1 : 0;
                this.filterBtns[newIndex].focus();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                this.handleFilter(e.target);
                break;
        }
    },

    logAvailableCategories() {
        const categories = new Set();
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (category) {
                categories.add(category);
            }
        });
        console.log('📂 Available project categories:', Array.from(categories));
    },

    initializeView() {
        // Set initial state
        this.setActiveButton('all');
        this.showAllProjects();
    },

    async handleFilter(btn) {
        if (this.isAnimating || btn.classList.contains('processing')) {
            return;
        }

        // Mark as processing
        btn.classList.add('processing');
        this.isAnimating = true;

        // Update active button
        this.setActiveButton(btn.getAttribute('data-filter'));

        // Get filter value
        const filter = btn.getAttribute('data-filter');
        this.activeFilter = filter;

        console.log('🔍 Filtering projects by:', filter);

        // Filter projects with animation
        await this.filterProjects(filter);

        // Remove processing state
        btn.classList.remove('processing');
        this.isAnimating = false;

        // Show result notification
        this.showResultNotification(filter);
    },

    setActiveButton(filter) {
        this.filterBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
            
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            }
        });
    },

    async filterProjects(filter) {
        // First, hide all cards with animation
        const hidePromises = Array.from(this.projectCards).map((card, index) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    resolve();
                }, index * 30); // Staggered animation
            });
        });

        await Promise.all(hidePromises);

        // Then show/hide cards based on filter
        const showPromises = Array.from(this.projectCards).map((card, index) => {
            return new Promise(resolve => {
                const category = card.getAttribute('data-category');
                const shouldShow = this.shouldShowProject(category, filter);

                setTimeout(() => {
                    if (shouldShow) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                    resolve();
                }, index * 50); // Staggered animation
            });
        });

        await Promise.all(showPromises);
    },

    shouldShowProject(category, filter) {
        if (filter === 'all') {
            return true;
        }

        // Handle special cases
        if (filter === 'ecommerce') {
            return category === 'ecommerce';
        }

        if (filter === 'fullstack') {
            return category === 'fullstack';
        }

        if (filter === 'frontend') {
            return category === 'frontend';
        }

        // Default case
        return category === filter;
    },

    showAllProjects() {
        this.projectCards.forEach((card, index) => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = `all 0.3s ease ${index * 0.1}s`;
        });
    },

    async showResultNotification(filter) {
        const visibleCards = Array.from(this.projectCards).filter(card => {
            const category = card.getAttribute('data-category');
            return this.shouldShowProject(category, filter);
        });

        const count = visibleCards.length;
        console.log(`🎯 Showing ${count} projects for filter "${filter}"`);

        try {
            const { NotificationSystem } = await import('./NotificationSystem.js');
            
            const filterNames = {
                'all': 'todos los proyectos',
                'fullstack': 'proyectos Full Stack',
                'frontend': 'proyectos Frontend',
                'backend': 'proyectos Backend',
                'ecommerce': 'proyectos E-commerce'
            };
            
            const filterName = filterNames[filter] || filter;
            NotificationSystem.info(`Mostrando ${count} ${filterName}`, 2000);
        } catch (e) {
            console.warn('Could not show notification');
        }
    },

    getFilterStats() {
        const stats = {};
        
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category') || 'uncategorized';
            stats[category] = (stats[category] || 0) + 1;
        });

        return {
            total: this.projectCards.length,
            categories: stats,
            activeFilter: this.activeFilter
        };
    },

    resetFilters() {
        this.activeFilter = 'all';
        this.setActiveButton('all');
        this.showAllProjects();
        
        console.log('🔄 Project filters reset to show all');
    },

    filterByCategory(category) {
        const filterBtn = Array.from(this.filterBtns).find(btn => 
            btn.getAttribute('data-filter') === category
        );
        
        if (filterBtn) {
            this.handleFilter(filterBtn);
        } else {
            console.warn(`Filter button for category "${category}" not found`);
        }
    },

    // Advanced filtering methods
    filterByTechnology(technology) {
        const matchingCards = Array.from(this.projectCards).filter(card => {
            const techTags = card.querySelectorAll('.tech-tag');
            return Array.from(techTags).some(tag => 
                tag.textContent.toLowerCase().includes(technology.toLowerCase())
            );
        });

        this.showSpecificCards(matchingCards);
        console.log(`🔧 Filtered by technology: ${technology} (${matchingCards.length} results)`);
    },

    filterByStatus(status) {
        const matchingCards = Array.from(this.projectCards).filter(card => {
            const statusElement = card.querySelector('.project-status');
            if (!statusElement) return false;
            
            return statusElement.textContent.toLowerCase().includes(status.toLowerCase());
        });

        this.showSpecificCards(matchingCards);
        console.log(`📊 Filtered by status: ${status} (${matchingCards.length} results)`);
    },

    showSpecificCards(cardsToShow) {
        this.projectCards.forEach(card => {
            if (cardsToShow.includes(card)) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
            }
        });
    },

    searchProjects(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            this.resetFilters();
            return;
        }

        const term = searchTerm.toLowerCase().trim();
        const matchingCards = Array.from(this.projectCards).filter(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const techTags = Array.from(card.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.toLowerCase()).join(' ');

            return title.includes(term) || 
                   description.includes(term) || 
                   techTags.includes(term);
        });

        this.showSpecificCards(matchingCards);
        console.log(`🔍 Search results for "${searchTerm}": ${matchingCards.length} projects`);
        
        return matchingCards.length;
    },

    // Utility methods
    getCurrentFilter() {
        return this.activeFilter;
    },

    getVisibleProjects() {
        return Array.from(this.projectCards).filter(card => 
            card.style.display !== 'none' && 
            parseFloat(card.style.opacity || 1) > 0
        );
    },

    addProject(projectElement) {
        if (projectElement && projectElement.classList.contains('project-card')) {
            this.projectCards = [...this.projectCards, projectElement];
            console.log('➕ Project added to filter system');
        }
    },

    removeProject(projectElement) {
        const index = Array.from(this.projectCards).indexOf(projectElement);
        if (index > -1) {
            this.projectCards = Array.from(this.projectCards).filter(card => card !== projectElement);
            console.log('➖ Project removed from filter system');
        }
    },

    destroy() {
        // Remove event listeners
        this.filterBtns.forEach(btn => {
            btn.removeEventListener('click', this.handleFilter);
        });

        // Reset to default state
        this.resetFilters();

        // Clear references
        this.filterBtns = [];
        this.projectCards = [];
        this.isAnimating = false;

        console.log('💥 ProjectFilter destroyed');
    }
};

export default ProjectFilter;