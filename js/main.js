// Variables globales
let isMenuOpen = false;
let activeSection = 'inicio';

// Utilidades de performance
function debounce(func, wait, immediate) {
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
}

function throttle(func, limit) {
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
}

// Cache de elementos DOM
const DOMCache = {
    mobileMenuBtn: null,
    mobileMenu: null,
    navLinks: null,
    sections: null,
    
    init() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = ['inicio', 'servicios', 'sobre-mi', 'testimonios', 'contacto'].map(id => ({
            id,
            element: document.getElementById(id)
        })).filter(section => section.element);
    }
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función principal de inicialización
function initializeApp() {
    try {
        // Inicializar cache DOM
        DOMCache.init();
        
        // Inicializar componentes
        createStars();
        initializeNavigation();
        initializeScrollEffects();
        initializeLucideIcons();
        initializeContactForm();
        initializeAnimations();
        initializePerformanceOptimizations();
        initializeServiceWorker();
        initializePWAFeatures();
        initializeAnalytics();
        initializeAccessibilityFeatures();
        initializeErrorHandling();
        
        console.log('✅ GhioAstral inicializado correctamente');
    } catch (error) {
        console.error('❌ Error al inicializar la aplicación:', error);
        // Fallback básico
        initializeBasicFunctionality();
    }
}

// Funcionalidad básica de fallback
function initializeBasicFunctionality() {
    // Solo funcionalidades esenciales
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMobileMenu);
    }
}

// Crear animación de estrellas
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    // Limpiar estrellas existentes
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Inicializar navegación
function initializeNavigation() {
    // Botón de menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section) {
                scrollToSection(section);
            }
        });
    });

    // Botones del hero
    const heroButtons = document.querySelectorAll('[data-section]');
    heroButtons.forEach(button => {
        if (!button.classList.contains('nav-link')) {
            button.addEventListener('click', function() {
                const section = this.getAttribute('data-section');
                if (section) {
                    scrollToSection(section);
                }
            });
        }
    });
}

// Toggle del menú móvil
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Scroll suave a sección
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Ajuste para navbar fija
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        setActiveSection(sectionId);
        
        // Cerrar menú móvil si está abierto
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }
}

// Establecer sección activa
function setActiveSection(sectionId) {
    activeSection = sectionId;
    
    // Actualizar enlaces activos
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Efectos de scroll optimizados
function initializeScrollEffects() {
    // Usar RAF para mejor performance
    let ticking = false;
    
    function requestScrollTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }
    
    function handleScrollOptimized() {
        handleScroll();
        ticking = false;
    }
    
    window.addEventListener('scroll', requestScrollTick, { passive: true });
}

function handleScroll() {
    // Detectar sección activa basada en scroll
    const sections = ['inicio', 'servicios', 'sobre-mi', 'testimonios', 'contacto'];
    const scrollPosition = window.scrollY + 100;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (activeSection !== sectionId) {
                    setActiveSection(sectionId);
                }
            }
        }
    });
}

// Inicializar iconos de Lucide
function initializeLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Inicializar formulario de contacto
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Botones de reserva de servicios
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            scrollToSection('contacto');
            
            // Opcional: pre-seleccionar el servicio en el formulario
            setTimeout(() => {
                const serviceCard = this.closest('.service-card');
                const serviceTitle = serviceCard.querySelector('.service-title').textContent;
                const serviceSelect = document.querySelector('select');
                
                if (serviceSelect) {
                    const options = serviceSelect.querySelectorAll('option');
                    options.forEach(option => {
                        if (option.textContent.includes(serviceTitle.split(' ')[0])) {
                            option.selected = true;
                        }
                    });
                }
            }, 500);
        });
    });
}

// Validación de formulario mejorada
function validateForm(formData) {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,3}?[\s-]?[\(]?[1-9][\d]{0,4}[\)]?[\s-]?[\d]{1,4}[\s-]?[\d]{1,4}$/;
    
    // Validaciones
    if (!formData.nombre?.trim()) {
        errors.push('El nombre es requerido');
    } else if (formData.nombre.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!formData.email?.trim()) {
        errors.push('El email es requerido');
    } else if (!emailRegex.test(formData.email.trim())) {
        errors.push('El email no tiene un formato válido');
    }
    
    if (!formData.servicio) {
        errors.push('Debes seleccionar un servicio');
    }
    
    if (!formData.mensaje?.trim()) {
        errors.push('El mensaje es requerido');
    } else if (formData.mensaje.trim().length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errors;
}

// Manejar envío del formulario
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Mostrar estado de carga
    const submitBtn = e.target.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validar datos
        const errors = validateForm(data);
        if (errors.length > 0) {
            showNotification(errors.join('\n'), 'error');
            return;
        }
        
        const numeroWhatsApp = "34644140027"; // Tu número en formato internacional sin +
        
        // Mensaje formateado para WhatsApp
        const texto = 
`Hola, soy ${data.nombre}.
📧 Email: ${data.email}
🔔 Servicio de interés: ${data.servicio}

📝 Mensaje:
${data.mensaje}`;
        
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
        
        // Abrir WhatsApp
        window.open(url, '_blank');
        showNotification('✨ Abriendo WhatsApp para enviar tu consulta...', 'success');
        
        // Limpiar formulario
        e.target.reset();
        
        // Analytics event (si está disponible)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'engagement',
                'event_label': data.servicio
            });
        }
        
    } catch (error) {
        console.error('Error al procesar el formulario:', error);
        showNotification('Hubo un error al procesar tu solicitud. Inténtalo de nuevo.', 'error');
    } finally {
        // Restaurar botón
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    }
}


// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Efectos adicionales para mejorar la experiencia
document.addEventListener('DOMContentLoaded', function() {
    // Animación de aparición para elementos cuando entran en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que deben animarse
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Manejo de redimensionamiento de ventana
window.addEventListener('resize', function() {
    // Recrear estrellas si es necesario
    if (window.innerWidth !== window.lastWidth) {
        createStars();
        window.lastWidth = window.innerWidth;
    }
    
    // Cerrar menú móvil si se cambia a desktop
    if (window.innerWidth >= 768 && isMenuOpen) {
        toggleMobileMenu();
    }
});

// Nuevas funciones de optimización
function initializePerformanceOptimizations() {
    // Prefetch de recursos críticos
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
        './img/logo_1.png'
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
    
    // Lazy loading de imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

function initializeAnimations() {
    // Intersection Observer para animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Desconectar después de animar para mejor performance
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
}

// Función mejorada de notificaciones
function showNotification(message, type = 'info', duration = 5000) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Agregar icono según el tipo
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: var(--font-family-primary, 'Inter', sans-serif);
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después del tiempo especificado
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
    
    // Permitir cerrar con click
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Inicializar Service Worker
function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('✨ Service Worker registrado exitosamente:', registration.scope);
                    
                    // Escuchar actualizaciones
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showNotification('🆕 Nueva versión disponible. Recarga la página para actualizar.', 'info', 10000);
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log('❌ Error al registrar Service Worker:', error);
                });
        });
        
        // Escuchar mensajes del Service Worker
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
                showNotification(`🆕 Actualización disponible (${event.data.version})`, 'info', 8000);
            }
        });
    } else {
        console.log('⚠️ Service Worker no soportado en este navegador');
    }
}

// Funcionalidades PWA
function initializePWAFeatures() {
    // Detectar si la app está siendo usada como PWA
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                  window.navigator.standalone ||
                  document.referrer.includes('android-app://');
    
    if (isPWA) {
        console.log('📱 Aplicación ejecutándose como PWA');
        document.body.classList.add('pwa-mode');
    }
    
    // Prompt de instalación PWA
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('📥 PWA instalable detectada');
        e.preventDefault();
        deferredPrompt = e;
        
        // Mostrar botón de instalación personalizado
        showInstallButton();
    });
    
    // Evento de instalación completada
    window.addEventListener('appinstalled', (e) => {
        console.log('✅ PWA instalada exitosamente');
        showNotification('✨ ¡GhioAstral instalado! Ahora puedes acceder desde tu pantalla de inicio.', 'success');
        hideInstallButton();
        deferredPrompt = null;
    });
    
    // Función para mostrar botón de instalación
    function showInstallButton() {
        const installBtn = document.createElement('button');
        installBtn.id = 'install-pwa-btn';
        installBtn.innerHTML = '📥 Instalar App';
        installBtn.className = 'install-pwa-button';
        
        installBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--gradient-primary, linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%));
            color: #000;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
            font-family: var(--font-family-primary, 'Inter', sans-serif);
        `;
        
        installBtn.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('🚀 Usuario aceptó instalar la PWA');
            } else {
                console.log('❌ Usuario rechazó instalar la PWA');
            }
            
            deferredPrompt = null;
            hideInstallButton();
        });
        
        document.body.appendChild(installBtn);
        
        // Animar entrada
        setTimeout(() => {
            installBtn.style.transform = 'scale(1)';
            installBtn.style.opacity = '1';
        }, 100);
    }
    
    function hideInstallButton() {
        const installBtn = document.getElementById('install-pwa-btn');
        if (installBtn) {
            installBtn.style.transform = 'scale(0)';
            installBtn.style.opacity = '0';
            setTimeout(() => {
                if (installBtn.parentNode) {
                    installBtn.parentNode.removeChild(installBtn);
                }
            }, 300);
        }
    }
    
    // Manejar cambios de conectividad
    window.addEventListener('online', () => {
        showNotification('🌐 Conexión restaurada', 'success', 3000);
    });
    
    window.addEventListener('offline', () => {
        showNotification('🚫 Sin conexión. Algunas funciones pueden estar limitadas.', 'warning', 5000);
    });
    
    // Share API para compartir la app
    if (navigator.share) {
        const shareData = {
            title: 'GhioAstral - Tu aliado astrológico',
            text: 'Descubre tu destino con servicios profesionales de astrología y tarot.',
            url: window.location.href
        };
        
        // Añadir funcionalidad de compartir si existe algn botón
        window.shareGhioAstral = () => {
            navigator.share(shareData)
                .then(() => console.log('✨ Contenido compartido exitosamente'))
                .catch((error) => console.log('❌ Error al compartir:', error));
        };
    }
}

// Inicializar Analytics y tracking
function initializeAnalytics() {
    // Solo si Google Analytics está disponible
    if (typeof gtag === 'function') {
        console.log('📊 Analytics inicializado');
        
        // Track eventos importantes
        window.trackEvent = (action, category = 'engagement', label = '') => {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: 1
            });
        };
        
        // Track scroll depth
        let scrollDepths = [25, 50, 75, 90];
        let scrollTracked = [];
        
        window.addEventListener('scroll', throttle(() => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            scrollDepths.forEach(depth => {
                if (scrollPercent >= depth && !scrollTracked.includes(depth)) {
                    scrollTracked.push(depth);
                    trackEvent('scroll_depth', 'engagement', `${depth}%`);
                }
            });
        }, 1000));
        
        // Track time on page
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            if (timeSpent > 10) { // Solo si el usuario estuvo más de 10 segundos
                gtag('event', 'time_on_page', {
                    event_category: 'engagement',
                    event_label: 'seconds',
                    value: timeSpent
                });
            }
        });
    } else {
        // Analytics mock para desarrollo
        window.trackEvent = (action, category, label) => {
            console.log(`📊 Analytics Mock: ${action} - ${category} - ${label}`);
        };
    }
}

// Funciones de accesibilidad
function initializeAccessibilityFeatures() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#inicio';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary, #fbbf24);
        color: #000;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.2s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Mejorar navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
        }
        
        // Navigation shortcuts
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    scrollToSection('inicio');
                    break;
                case '2':
                    e.preventDefault();
                    scrollToSection('servicios');
                    break;
                case '3':
                    e.preventDefault();
                    scrollToSection('sobre-mi');
                    break;
                case '4':
                    e.preventDefault();
                    scrollToSection('contacto');
                    break;
            }
        }
    });
    
    // Indicador de foco mejorado
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .focus-visible {
            outline: 2px solid var(--color-primary, #fbbf24) !important;
            outline-offset: 2px !important;
        }
        
        *:focus-visible {
            outline: 2px solid var(--color-primary, #fbbf24) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(focusStyle);
    
    // Announcements para lectores de pantalla
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-announcer';
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    window.announceToScreenReader = (message) => {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// Manejo global de errores
function initializeErrorHandling() {
    // Capturar errores JavaScript
    window.addEventListener('error', (event) => {
        console.error('❌ Error JavaScript:', {
            message: event.message,
            filename: event.filename,
            line: event.lineno,
            column: event.colno,
            error: event.error
        });
        
        // Enviar a analytics si está disponible
        if (typeof trackEvent === 'function') {
            trackEvent('javascript_error', 'error', event.message);
        }
        
        // Mostrar error user-friendly solo en desarrollo
        if (window.location.hostname === 'localhost') {
            showNotification(`Error: ${event.message}`, 'error', 5000);
        }
    });
    
    // Capturar promesas rechazadas
    window.addEventListener('unhandledrejection', (event) => {
        console.error('❌ Promise rechazada:', event.reason);
        
        if (typeof trackEvent === 'function') {
            trackEvent('promise_rejection', 'error', event.reason?.message || 'Unknown');
        }
    });
    
    // Monitor de performance
    if ('PerformanceObserver' in window) {
        try {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                if (typeof trackEvent === 'function') {
                    trackEvent('lcp_measurement', 'performance', Math.round(lastEntry.startTime));
                }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                list.getEntries().forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                if (clsValue > 0 && typeof trackEvent === 'function') {
                    trackEvent('cls_measurement', 'performance', clsValue.toFixed(4));
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            
        } catch (error) {
            console.warn('⚠️ Performance Observer no soportado:', error);
        }
    }
    
    // Retry mechanism para requests fallidos
    window.retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                if (attempt === maxRetries) {
                    throw error;
                }
                
                console.warn(`⚠️ Intento ${attempt}/${maxRetries} fallido, reintentando en ${delay}ms:`, error);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
            }
        }
    };
}

// Mejoras adicionales al sistema de notificaciones
function createAdvancedNotification(message, type = 'info', duration = 5000, actions = []) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} advanced-notification`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    const icon = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    }[type] || 'ℹ️';
    
    let actionsHTML = '';
    if (actions.length > 0) {
        actionsHTML = `
            <div class="notification-actions">
                ${actions.map((action, index) => 
                    `<button class="notification-action" data-action="${index}">${action.label}</button>`
                ).join('')}
            </div>
        `;
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <div class="notification-body">
                <span class="notification-message">${message}</span>
                ${actionsHTML}
            </div>
            <button class="notification-close" aria-label="Cerrar notificación">×</button>
        </div>
    `;
    
    // Estilos mejorados
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
        min-width: 300px;
        font-family: var(--font-family-primary, 'Inter', sans-serif);
        backdrop-filter: blur(10px);
    `;
    
    // Event listeners
    notification.addEventListener('click', (e) => {
        if (e.target.classList.contains('notification-close')) {
            removeNotification(notification);
        } else if (e.target.classList.contains('notification-action')) {
            const actionIndex = parseInt(e.target.dataset.action);
            const action = actions[actionIndex];
            if (action && action.handler) {
                action.handler();
            }
            removeNotification(notification);
        }
    });
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    if (duration > 0) {
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    }
    
    return notification;
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Inicializar ancho de ventana
window.lastWidth = window.innerWidth;
