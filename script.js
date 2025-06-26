// DataCon - Professional Scripts

class DataConApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupPricingToggle();
        this.setupPlatformShowcase();
        this.setupSmoothScrolling();
        this.setupFormHandling();
        this.setupAnimations();
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.main-nav');

        if (mobileToggle && nav) {
            mobileToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
        }
    }

    // Pricing Toggle (Monthly/Annual)
    setupPricingToggle() {
        const toggle = document.getElementById('pricingToggle');
        if (!toggle) return;

        const monthlyPrices = document.querySelectorAll('.monthly-price');
        const annualPrices = document.querySelectorAll('.annual-price');

        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                monthlyPrices.forEach(price => price.classList.add('hidden'));
                annualPrices.forEach(price => price.classList.remove('hidden'));
            } else {
                monthlyPrices.forEach(price => price.classList.remove('hidden'));
                annualPrices.forEach(price => price.classList.add('hidden'));
            }
        });
    }

    // Platform Showcase Controls
    setupPlatformShowcase() {
        const controls = document.querySelectorAll('.control-btn');
        const screens = document.querySelectorAll('.screen-image');

        controls.forEach(control => {
            control.addEventListener('click', () => {
                const targetScreen = control.dataset.screen;

                // Update active states
                controls.forEach(btn => btn.classList.remove('active'));
                screens.forEach(screen => screen.classList.remove('active'));

                control.classList.add('active');
                document.querySelector(`[data-screen="${targetScreen}"]`).classList.add('active');
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Form Handling
    setupFormHandling() {
        const contactForm = document.querySelector('.contact-section .form');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(contactForm);
            });
        }
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Scroll Animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.feature-card, .pricing-card, .floating-card, .about-text, .contact-item'
        );

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DataConApp();
});

// Utility Functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static formatPrice(price, currency = 'R$') {
        return `${currency} ${price.toLocaleString('pt-BR')}`;
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Export for use in other modules if needed
window.DataConApp = DataConApp;
window.Utils = Utils;