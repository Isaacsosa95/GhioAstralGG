// Variables globales
let isMenuOpen = false;
let activeSection = 'inicio';

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Función principal de inicialización
function initializeApp() {
    createStars();
    initializeNavigation();
    initializeScrollEffects();
    initializeLucideIcons();
    initializeContactForm();
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

// Efectos de scroll
function initializeScrollEffects() {
    window.addEventListener('scroll', handleScroll);
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

// Manejar envío del formulario
// Manejar envío del formulario
function handleContactSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const numeroWhatsApp = "34644140027"; // Tu número en formato internacional sin +

    // Mensaje formateado para WhatsApp
    const texto = 
`Hola, soy ${data.nombre}.
📧 Email: ${data.email}
🛎 Servicio de interés: ${data.servicio}

📝 Mensaje:
${data.mensaje}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
    showNotification('Abriendo WhatsApp para enviar tu consulta...', 'success');

    e.target.reset();
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

// Inicializar ancho de ventana
window.lastWidth = window.innerWidth;