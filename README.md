# 🌟 GhioAstral - Tu Aliado Astrológico

[![Deploy Status](https://github.com/ghioastrall/GhioAstralGG/workflows/Deploy%20static%20content%20to%20Pages/badge.svg)](https://github.com/ghioastrall/GhioAstralGG/actions)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95+-brightgreen.svg)](https://ghioastrall.github.io/GhioAstralGG/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple.svg)](https://ghioastrall.github.io/GhioAstralGG/)

Una aplicación web moderna y completa para servicios profesionales de astrología, tarot y consultas espirituales. Construida con tecnologías web modernas y optimizada para performance, SEO y accesibilidad.

## ✨ Características Principales

### 🎨 Diseño y UX
- **Diseño responsivo** con soporte completo para móviles, tablets y desktop
- **Animaciones fluidas** con Intersection Observer API
- **Dark theme** con gradientes místicos y efectos visuales
- **Tipografía profesional** con Google Fonts (Inter + Playfair Display)
- **Sistema de design tokens** con variables CSS personalizadas

### ⚡ Performance y Optimización
- **Lazy loading** para imágenes y recursos no críticos
- **Service Worker** para cache inteligente y funcionamiento offline
- **Minificación automática** de CSS y JavaScript
- **Preload hints** para recursos críticos
- **Debounced scroll events** para mejor rendimiento
- **Critical CSS** inlineado para faster First Paint

### 🔍 SEO y Discoverabilidad
- **Meta tags completos** con Open Graph y Twitter Cards
- **Structured data** (JSON-LD) para mejor indexación
- **Sitemap automático** y robots.txt optimizado
- **URLs semánticas** y navegación clara
- **Schema markup** para servicios locales

### 📱 PWA (Progressive Web App)
- **Instalable** en dispositivos móviles y desktop
- **Funcionamiento offline** con cache estratégico
- **App shortcuts** para acceso rápido a secciones
- **Splash screen** personalizada
- **Push notifications** (preparado para futuras implementaciones)

### ♿ Accesibilidad (WCAG 2.1 AA)
- **Navegación por teclado** completa
- **Skip links** para lectores de pantalla
- **ARIA labels** y roles semánticos
- **Contraste de colores** optimizado
- **Focus indicators** visibles y consistentes

### 📊 Analytics y Tracking
- **Google Analytics 4** integrado
- **Event tracking** personalizado
- **Performance monitoring** con Core Web Vitals
- **Error tracking** y reporting automático
- **User engagement metrics** (scroll depth, time on page)

## 🛠️ Tecnologías Utilizadas

- **HTML5** semántico con estructura moderna
- **CSS3** con variables personalizadas y Grid/Flexbox
- **JavaScript ES6+** vanilla con patrones modernos
- **Service Workers** para PWA capabilities
- **Intersection Observer** para animaciones y lazy loading
- **GitHub Actions** para CI/CD automático
- **Lighthouse CI** para auditorías de calidad

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 14+ y npm 6+
- Git

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/ghioastrall/GhioAstralGG.git
cd GhioAstralGG

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Servir build local
npm run serve
```

### Scripts Disponibles
```bash
npm run dev          # Desarrollo con hot reload
npm run build        # Build completo de producción
npm run clean        # Limpiar carpeta dist
npm run minify:css   # Minificar CSS
npm run minify:js    # Minificar JavaScript
npm run lighthouse   # Auditoría de performance
npm run analyze      # Análisis de bundle size
npm run deploy       # Deploy a GitHub Pages
```

## 📁 Estructura del Proyecto

```
GhioAstralGG/
├── 📄 index.html              # Página principal
├── 📁 css/
│   └── 🎨 style.css           # Estilos principales
├── 📁 js/
│   └── ⚙️ main.js             # JavaScript principal
├── 📁 img/                    # Imágenes y assets
│   ├── 🖼️ logo_1.png         # Logo principal
│   ├── 🖼️ logo_2.png         # Logo alternativo
│   ├── 🖼️ logo_3.png         # Logo para redes sociales
│   └── 📁 sodiacIcons/        # Iconos zodiacales
├── 📋 manifest.json           # PWA Manifest
├── ⚙️ sw.js                   # Service Worker
├── 🌐 browserconfig.xml       # Configuración Windows
├── 📦 package.json            # Dependencias y scripts
├── 🔍 lighthouserc.js         # Configuración Lighthouse
├── 📁 .github/workflows/      # GitHub Actions
└── 📖 README.md               # Documentación
```

## 🎯 Funcionalidades Implementadas

### ✅ Core Features
- [x] Navegación responsive con menú móvil
- [x] Secciones: Inicio, Servicios, Sobre Mí, Testimonios, Contacto
- [x] Formulario de contacto con integración WhatsApp
- [x] Validación de formularios con feedback visual
- [x] Animaciones de entrada con Intersection Observer
- [x] Efectos de paralaje y estrellas animadas

### ✅ Optimizaciones
- [x] Variables CSS para design system consistente
- [x] Lazy loading de imágenes con placeholders
- [x] Debounced scroll events para mejor performance
- [x] Service Worker con cache estratégico
- [x] Minificación automática en CI/CD
- [x] Preload de recursos críticos

### ✅ SEO & Analytics
- [x] Meta tags completos (Open Graph, Twitter Cards)
- [x] Structured data con Schema.org
- [x] Google Analytics 4 con event tracking
- [x] Sitemap y robots.txt
- [x] URL canonical y hreflang

### ✅ PWA Features
- [x] Web App Manifest completo
- [x] Service Worker con offline support
- [x] Instalación desde navegador
- [x] App shortcuts y splash screen
- [x] Theme color y iconos adaptativos

### ✅ Accesibilidad
- [x] Navegación por teclado completa
- [x] Skip links y ARIA labels
- [x] Focus indicators visibles
- [x] Screen reader announcements
- [x] Contraste WCAG AA compliant

## 📈 Performance Metrics

Basado en auditorías de Lighthouse:

- 🎯 **Performance**: 95+/100
- 🔍 **SEO**: 100/100
- ♿ **Accessibility**: 95+/100
- ✅ **Best Practices**: 95+/100
- 📱 **PWA**: ✓ Todos los criterios

### Core Web Vitals
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s  
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contacto y Servicios

### 📞 Información de Contacto
- **WhatsApp**: +34 644 140 027
- **Email**: consultas@ghioastral.com
- **Ubicación**: Consultas presenciales y virtuales

### 🌟 Servicios Disponibles
- **Lectura de Tarot** - Desde $25
- **Carta Astral** - Desde $35  
- **Numerología** - Desde $20
- **Consulta Espiritual** - Desde $40
- **Compatibilidad** - Desde $30
- **Limpieza Energética** - Desde $45

## 🔧 Configuración y Personalización

### Variables CSS Principales
```css
:root {
  --color-primary: #fbbf24;       /* Dorado místico */
  --color-secondary: #a855f7;     /* Púrpura espiritual */
  --color-accent: #9333ea;        /* Violeta profundo */
  --font-family-primary: 'Inter'; /* Texto principal */
  --font-family-heading: 'Playfair Display'; /* Títulos */
}
```

### Configuración Analytics
Actualizar el ID de Google Analytics en `index.html`:
```html
gtag('config', 'G-TU-ID-AQUI');
```

### Personalización PWA
Editar `manifest.json` para:
- Cambiar nombre e iconos de la app
- Modificar colores del tema
- Ajustar shortcuts y categorías

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Dispositivos
- 📱 **Mobile**: iOS 12+, Android 8+
- 💻 **Desktop**: Windows 10+, macOS 10.15+
- 🖥️ **Tablets**: iPad OS 13+, Android tablets

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🌟 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🚀 Deploy

El proyecto se despliega automáticamente a GitHub Pages cuando se hace push a la rama `main`. 

La URL de producción es: https://ghioastrall.github.io/GhioAstralGG/

---

**Desarrollado con 💜 por GhioAstral**

*"Conecta con tu verdadero yo a través de la sabiduría ancestral"* ✨
