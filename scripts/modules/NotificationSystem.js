/**
 * WebSign Portfolio - Notification System Module
 * Author: Albano Caminos
 */

'use strict';

import { CONFIG, NOTIFICATION_ICONS } from '../config/constants.js';
import { Utils } from '../utils/helpers.js';

// ===== NOTIFICATION SYSTEM =====
export const NotificationSystem = {
    container: null,
    notifications: [],
    maxNotifications: 5,

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
            display: flex;
            flex-direction: column;
            gap: 1rem;
        `;
        document.body.appendChild(this.container);
    },

    show(message, type = 'info', duration = CONFIG.NOTIFICATION_DURATION) {
        // Limit number of notifications
        if (this.notifications.length >= this.maxNotifications) {
            this.hide(this.notifications[0]);
        }

        const notification = this.createNotification(message, type);
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto-hide notification
        if (duration > 0) {
            setTimeout(() => {
                this.hide(notification);
            }, duration);
        }

        return notification;
    },

    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-left: 4px solid var(--accent-${type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'primary'});
            border-radius: 8px;
            padding: 1rem 1.5rem;
            box-shadow: var(--shadow-primary);
            max-width: 400px;
            font-family: var(--font-sans);
            pointer-events: auto;
            opacity: 0;
            transform: translateX(100%);
            transition: all var(--transition-normal);
        `;

        notification.innerHTML = `
            <div class="notification-content" style="display: flex; align-items: flex-start; gap: 1rem;">
                <div class="notification-icon" style="font-size: 1.2rem; margin-top: 0.1rem;">
                    ${NOTIFICATION_ICONS[type] || NOTIFICATION_ICONS.info}
                </div>
                <div class="notification-text" style="flex: 1;">
                    <div class="notification-title" style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">
                        ${type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                    <div class="notification-message" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.4;">
                        ${Utils.sanitizeString(message)}
                    </div>
                </div>
                <button class="notification-close" aria-label="Cerrar notificación" style="
                    background: none; border: none; color: var(--text-muted); cursor: pointer; 
                    font-size: 1.2rem; padding: 0; margin-left: 1rem; transition: color var(--transition-fast);
                ">&times;</button>
            </div>
        `;

        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.hide(notification));
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.color = 'var(--text-primary)';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = 'var(--text-muted)';
        });

        // Add show class styles
        notification.addEventListener('transitionend', () => {
            if (notification.classList.contains('show')) {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }
        });

        return notification;
    },

    hide(notification) {
        if (!notification || !notification.parentNode) return;

        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    },

    hideAll() {
        this.notifications.forEach(notification => this.hide(notification));
    },

    success(message, duration) {
        return this.show(message, 'success', duration);
    },

    error(message, duration) {
        return this.show(message, 'error', duration);
    },

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    },

    info(message, duration) {
        return this.show(message, 'info', duration);
    },

    destroy() {
        this.hideAll();
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
        this.notifications = [];
    }
};

export default NotificationSystem;