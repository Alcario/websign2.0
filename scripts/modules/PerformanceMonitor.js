/**
 * WebSign Portfolio - Performance Monitor Module
 * Author: Albano Caminos
 */

'use strict';

// ===== PERFORMANCE MONITOR MODULE =====
export const PerformanceMonitor = {
    metrics: {
        loadTime: 0,
        domContentLoaded: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        firstInputDelay: 0,
        cumulativeLayoutShift: 0
    },
    
    observers: [],
    isMonitoring: false,
    reportInterval: null,

    init() {
        this.isMonitoring = true;
        this.measureBasicMetrics();
        this.setupPerformanceObservers();
        this.startContinuousMonitoring();
        this.logInitialMetrics();
    },

    measureBasicMetrics() {
        // Measure page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            this.reportMetric('Page Load Time', this.metrics.loadTime);
        });

        // Measure DOM content loaded time
        document.addEventListener('DOMContentLoaded', () => {
            this.metrics.domContentLoaded = performance.now();
            this.reportMetric('DOM Content Loaded', this.metrics.domContentLoaded);
        });

        // Get navigation timing
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.getNavigationMetrics();
            }, 1000);
        });
    },

    setupPerformanceObservers() {
        if (!('PerformanceObserver' in window)) {
            console.warn('PerformanceObserver not supported');
            return;
        }

        // Paint metrics observer
        try {
            const paintObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.name === 'first-paint') {
                        this.metrics.firstPaint = entry.startTime;
                        this.reportMetric('First Paint', entry.startTime);
                    }
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.firstContentfulPaint = entry.startTime;
                        this.reportMetric('First Contentful Paint', entry.startTime);
                    }
                });
            });
            paintObserver.observe({ entryTypes: ['paint'] });
            this.observers.push(paintObserver);
        } catch (e) {
            console.warn('Paint observer setup failed:', e);
        }

        // Largest Contentful Paint observer
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.largestContentfulPaint = lastEntry.startTime;
                this.reportMetric('Largest Contentful Paint', lastEntry.startTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(lcpObserver);
        } catch (e) {
            console.warn('LCP observer setup failed:', e);
        }

        // First Input Delay observer
        try {
            const fidObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.processingStart && entry.startTime) {
                        const fid = entry.processingStart - entry.startTime;
                        this.metrics.firstInputDelay = fid;
                        this.reportMetric('First Input Delay', fid);
                    }
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
            this.observers.push(fidObserver);
        } catch (e) {
            console.warn('FID observer setup failed:', e);
        }

        // Cumulative Layout Shift observer
        try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        this.metrics.cumulativeLayoutShift = clsValue;
                    }
                });
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(clsObserver);
        } catch (e) {
            console.warn('CLS observer setup failed:', e);
        }
    },

    getNavigationMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            const metrics = {
                'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
                'TCP Connection': navigation.connectEnd - navigation.connectStart,
                'TLS Setup': navigation.secureConnectionStart > 0 ? 
                    navigation.connectEnd - navigation.secureConnectionStart : 0,
                'Request': navigation.responseStart - navigation.requestStart,
                'Response': navigation.responseEnd - navigation.responseStart,
                'DOM Processing': navigation.domContentLoadedEventStart - navigation.responseEnd,
                'Resource Loading': navigation.loadEventStart - navigation.domContentLoadedEventEnd
            };

            Object.entries(metrics).forEach(([name, value]) => {
                if (value > 0) {
                    this.reportMetric(name, value);
                }
            });
        }
    },

    startContinuousMonitoring() {
        // Monitor every 30 seconds
        this.reportInterval = setInterval(() => {
            this.generatePerformanceReport();
        }, 30000);

        // Monitor memory usage if available
        if ('memory' in performance) {
            setInterval(() => {
                this.monitorMemoryUsage();
            }, 10000);
        }

        // Monitor frame rate
        this.startFrameRateMonitoring();
    },

    monitorMemoryUsage() {
        if (!('memory' in performance)) return;

        const memory = performance.memory;
        const memoryMetrics = {
            'Used JS Heap': memory.usedJSHeapSize,
            'Total JS Heap': memory.totalJSHeapSize,
            'Heap Limit': memory.jsHeapSizeLimit
        };

        // Convert to MB
        Object.entries(memoryMetrics).forEach(([name, bytes]) => {
            const mb = (bytes / 1024 / 1024).toFixed(2);
            this.reportMetric(name, `${mb} MB`);
        });

        // Warn if memory usage is high
        const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        if (usagePercent > 80) {
            console.warn(`⚠️ High memory usage: ${usagePercent.toFixed(1)}%`);
        }
    },

    startFrameRateMonitoring() {
        let frames = 0;
        let lastTime = performance.now();

        const countFrame = () => {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                this.reportMetric('FPS', fps);
                
                if (fps < 30) {
                    console.warn(`⚠️ Low frame rate detected: ${fps} FPS`);
                }
                
                frames = 0;
                lastTime = currentTime;
            }
            
            if (this.isMonitoring) {
                requestAnimationFrame(countFrame);
            }
        };

        requestAnimationFrame(countFrame);
    },

    generatePerformanceReport() {
        if (!this.isMonitoring) return;

        const report = {
            timestamp: new Date().toISOString(),
            coreWebVitals: this.getCoreWebVitals(),
            resourceTiming: this.getResourceTimings(),
            userTiming: this.getUserTimings(),
            recommendation: this.getRecommendations()
        };

        this.logPerformanceReport(report);
        return report;
    },

    getCoreWebVitals() {
        return {
            LCP: this.metrics.largestContentfulPaint,
            FID: this.metrics.firstInputDelay,
            CLS: this.metrics.cumulativeLayoutShift,
            FCP: this.metrics.firstContentfulPaint,
            TTFB: this.getTTFB()
        };
    },

    getTTFB() {
        const navigation = performance.getEntriesByType('navigation')[0];
        return navigation ? navigation.responseStart - navigation.requestStart : 0;
    },

    getResourceTimings() {
        const resources = performance.getEntriesByType('resource');
        const slowResources = resources
            .filter(resource => resource.duration > 1000)
            .map(resource => ({
                name: resource.name,
                duration: Math.round(resource.duration),
                type: resource.initiatorType
            }))
            .sort((a, b) => b.duration - a.duration)
            .slice(0, 5);

        return slowResources;
    },

    getUserTimings() {
        const marks = performance.getEntriesByType('mark');
        const measures = performance.getEntriesByType('measure');
        
        return {
            marks: marks.length,
            measures: measures.length
        };
    },

    getRecommendations() {
        const recommendations = [];

        if (this.metrics.largestContentfulPaint > 2500) {
            recommendations.push('LCP > 2.5s: Optimize loading of largest element');
        }

        if (this.metrics.firstInputDelay > 100) {
            recommendations.push('FID > 100ms: Reduce JavaScript execution time');
        }

        if (this.metrics.cumulativeLayoutShift > 0.1) {
            recommendations.push('CLS > 0.1: Prevent unexpected layout shifts');
        }

        if (this.metrics.firstContentfulPaint > 1800) {
            recommendations.push('FCP > 1.8s: Optimize critical rendering path');
        }

        return recommendations;
    },

    reportMetric(name, value) {
        if (!this.isMonitoring) return;

        const formattedValue = typeof value === 'number' ? 
            `${Math.round(value)}ms` : value;
        
        console.log(`📊 ${name}: ${formattedValue}`);
    },

    logInitialMetrics() {
        setTimeout(() => {
            console.group('🚀 WebSign Performance Metrics');
            console.log('📊 Load Time:', `${this.metrics.loadTime.toFixed(2)}ms`);
            console.log('📄 DOM Content Loaded:', `${this.metrics.domContentLoaded.toFixed(2)}ms`);
            
            if (this.metrics.firstPaint) {
                console.log('🎨 First Paint:', `${this.metrics.firstPaint.toFixed(2)}ms`);
            }
            
            if (this.metrics.firstContentfulPaint) {
                console.log('🖼️ First Contentful Paint:', `${this.metrics.firstContentfulPaint.toFixed(2)}ms`);
            }
            
            console.groupEnd();
        }, 3000);
    },

    logPerformanceReport(report) {
        console.group(`📈 Performance Report - ${new Date().toLocaleTimeString()}`);
        
        console.log('Core Web Vitals:', report.coreWebVitals);
        
        if (report.resourceTiming.length > 0) {
            console.log('Slow Resources:', report.resourceTiming);
        }
        
        if (report.recommendation.length > 0) {
            console.warn('Recommendations:', report.recommendation);
        }
        
        console.groupEnd();
    },

    // Public API
    mark(name) {
        performance.mark(name);
        console.log(`🎯 Performance mark: ${name}`);
    },

    measure(name, startMark, endMark) {
        try {
            performance.measure(name, startMark, endMark);
            const measure = performance.getEntriesByName(name, 'measure')[0];
            console.log(`⏱️ Performance measure: ${name} = ${measure.duration.toFixed(2)}ms`);
            return measure.duration;
        } catch (e) {
            console.warn(`Failed to measure ${name}:`, e);
            return 0;
        }
    },

    getMetrics() {
        return { ...this.metrics };
    },

    exportReport() {
        const report = this.generatePerformanceReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { 
            type: 'application/json' 
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `websign-performance-${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        console.log('📊 Performance report exported');
    },

    destroy() {
        this.isMonitoring = false;
        
        // Clear interval
        if (this.reportInterval) {
            clearInterval(this.reportInterval);
        }
        
        // Disconnect observers
        this.observers.forEach(observer => {
            try {
                observer.disconnect();
            } catch (e) {
                console.warn('Failed to disconnect observer:', e);
            }
        });
        
        this.observers = [];
        console.log('📊 Performance monitoring destroyed');
    }
};

export default PerformanceMonitor;