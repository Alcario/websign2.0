document.documentElement.classList.add('js-enabled');

const storageKey = 'websign-theme-preference';
const root = document.documentElement;
const themeSelects = Array.from(document.querySelectorAll('.js-theme-select'));
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const themeColorMap = {
    light: '#3d1a5f',
    dark: '#12161d'
};

function getStoredThemePreference() {
    try {
        return localStorage.getItem(storageKey);
    } catch (error) {
        return null;
    }
}

function saveThemePreference(preference) {
    try {
        localStorage.setItem(storageKey, preference);
    } catch (error) {
        return;
    }
}

function resolveTheme(preference) {
    if (preference === 'dark' || preference === 'light') {
        return preference;
    }

    return systemThemeQuery.matches ? 'dark' : 'light';
}

function updateThemeColor(resolvedTheme) {
    if (!themeColorMeta) {
        return;
    }

    themeColorMeta.setAttribute('content', themeColorMap[resolvedTheme]);
}

function applyTheme(preference, shouldPersist = false) {
    const normalizedPreference = preference || 'system';
    const resolvedTheme = resolveTheme(normalizedPreference);

    root.setAttribute('data-theme', resolvedTheme);
    root.setAttribute('data-theme-preference', normalizedPreference);

    themeSelects.forEach((themeSelect) => {
        themeSelect.value = normalizedPreference;
        themeSelect.setAttribute(
            'aria-label',
            'Tema visual: ' + (normalizedPreference === 'system' ? 'sistema' : normalizedPreference === 'light' ? 'claro' : 'oscuro')
        );
    });

    updateThemeColor(resolvedTheme);

    if (shouldPersist) {
        saveThemePreference(normalizedPreference);
    }
}

applyTheme(getStoredThemePreference() || 'system');

themeSelects.forEach((themeSelect) => {
    themeSelect.addEventListener('change', (event) => {
        applyTheme(event.target.value, true);
    });
});

function handleSystemThemeChange() {
    const currentPreference = root.getAttribute('data-theme-preference') || 'system';

    if (currentPreference === 'system') {
        applyTheme('system');
    }
}

if (typeof systemThemeQuery.addEventListener === 'function') {
    systemThemeQuery.addEventListener('change', handleSystemThemeChange);
} else if (typeof systemThemeQuery.addListener === 'function') {
    systemThemeQuery.addListener(handleSystemThemeChange);
}

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

function setMenuState(isOpen) {
    if (!menuToggle || !navMenu) {
        return;
    }

    navMenu.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
}

function closeMenu() {
    setMenuState(false);
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        setMenuState(!isOpen);
    });

    document.querySelectorAll('.nav-menu a').forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    document.addEventListener('click', (event) => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetSelector = anchor.getAttribute('href');

        if (!targetSelector || targetSelector === '#') {
            return;
        }

        let target;

        try {
            target = document.querySelector(targetSelector);
        } catch (error) {
            return;
        }

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
        });
    });
});

const revealElements = document.querySelectorAll('[data-reveal]');

if (!prefersReducedMotion && 'IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add('is-visible');
    });
}
