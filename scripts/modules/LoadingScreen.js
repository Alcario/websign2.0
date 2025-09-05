/**
 * WebSign Portfolio - Loading Screen Module
 * Author: Albano Caminos
 */

'use strict';

import { CONFIG } from '../config/constants.js';

// ===== LOADING SCREEN MODULE =====
export const LoadingScreen = {
    element: null,
    statusLines: [],
    isVisible: false,
    
    init() {
        this.element = document.getElementById('loading-screen');
        this.statusLines = this.element?.querySelectorAll('.status-line') || [];
        
        if (!this.element) {
            console.warn('LoadingScreen: Element not found');
            return;
        }

        this.isVisible = true;
        this.showLoadingSequence();
    },

    showLoadingSequence() {
        if (!this.element || !this.isVisible) return;

        // Show status lines sequentially
        this.statusLines.forEach((line, index) => {
            setTimeout(() => {
                if (this.isVisible) {
                    line.style.opacity = '1';
                }
            }, 500 + (index * 500));
        });

        // Hide loading screen after sequence
        setTimeout(() => {
            this.hide();
        }, 3500);
    },

    hide() {
        if (!this.element || !this.isVisible) return;
        
        this.isVisible = false;
        this.element.classList.add('fade-out');
        
        setTimeout(() => {
            this.element.style.display = 'none';
            this.onHideComplete();
        }, 500);
    },

    onHideComplete() {
        // Trigger events after loading screen is hidden
        document.dispatchEvent(new CustomEvent('loadingComplete'));
        
        // Clean up
        this.element = null;
        this.statusLines = [];
    },

    forceHide() {
        if (!this.element) return;
        
        this.isVisible = false;
        this.element.style.display = 'none';
        this.onHideComplete();
    },

    isLoading() {
        return this.isVisible;
    }
};

export default LoadingScreen;