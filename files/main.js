/* ============================================
   SHAPES & SHADES - MAIN JAVASCRIPT
   Interactive Elements and Animations
   ============================================ */

// ============================================
// NAVIGATION SCROLL EFFECT & HERO FADE
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero-section');
    
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hero fade out effect
    if (heroSection) {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        const fadeStart = 0;
        const fadeEnd = heroHeight * 0.6; // Start fading at 60% of hero height
        
        if (scrollPosition <= fadeStart) {
            heroSection.style.opacity = '1';
        } else if (scrollPosition >= fadeEnd) {
            heroSection.style.opacity = '0';
            heroSection.style.pointerEvents = 'none';
        } else {
            const fadeProgress = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
            heroSection.style.opacity = 1 - fadeProgress;
        }
    }
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ANIMATED COUNTER FOR STATS
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Initialize counters when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    statNumbers.forEach(stat => counterObserver.observe(stat));
});

// ============================================
// PORTFOLIO FILTER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    // Fade out
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('hidden');
                            // Fade in
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.classList.add('hidden');
                        }
                    }, 300);
                });
            });
        });
    }
});

// ============================================
// SIMPLE AOS (ANIMATE ON SCROLL) IMPLEMENTATION
// ============================================
class SimpleAOS {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.observer = null;
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateElement(element) {
        const animationType = element.getAttribute('data-aos');
        const delay = element.getAttribute('data-aos-delay') || 0;

        setTimeout(() => {
            element.classList.add('aos-animate');
            
            switch(animationType) {
                case 'fade-up':
                    element.style.transform = 'translateY(0)';
                    break;
                case 'fade-down':
                    element.style.transform = 'translateY(0)';
                    break;
                case 'fade-right':
                    element.style.transform = 'translateX(0)';
                    break;
                case 'fade-left':
                    element.style.transform = 'translateX(0)';
                    break;
                case 'zoom-in':
                    element.style.transform = 'scale(1)';
                    break;
            }
        }, delay);
    }
}

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    new SimpleAOS();
});

// ============================================
// FORM VALIDATION AND SUBMISSION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Simple validation
            let isValid = true;
            const inputs = this.querySelectorAll('.form-input');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });

        // Remove error styling on input
        const formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
});

// ============================================
// NAVBAR MOBILE MENU AUTO-CLOSE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navLinks.length > 0 && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });
    }
});

// ============================================
// HERO FADE OUT ON SCROLL (handled in navigation scroll section above)
// ============================================

// ============================================
// IMAGE PLACEHOLDER HOVER EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// MODAL AUTO-GENERATE FOR PORTFOLIO ITEMS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach((button, index) => {
        // If modal doesn't exist, this ensures buttons still work
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-bs-target');
            const modal = document.querySelector(modalId);
            
            if (!modal) {
                console.log('Modal not found for:', modalId);
                // You could dynamically create modals here if needed
            }
        });
    });
});

// ============================================
// CURSOR TRAIL EFFECT (OPTIONAL LUXURY TOUCH)
// ============================================
class CursorTrail {
    constructor() {
        this.dots = [];
        this.maxDots = 10;
        this.init();
    }

    init() {
        // Only on desktop
        if (window.innerWidth > 768) {
            this.createDots();
            this.attachListeners();
        }
    }

    createDots() {
        for (let i = 0; i < this.maxDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.2s ease;
                opacity: ${1 - (i / this.maxDots)};
            `;
            document.body.appendChild(dot);
            this.dots.push({ element: dot, x: 0, y: 0 });
        }
    }

    attachListeners() {
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animate = () => {
            let x = mouseX;
            let y = mouseY;

            this.dots.forEach((dot, index) => {
                dot.element.style.left = x + 'px';
                dot.element.style.top = y + 'px';

                const nextDot = this.dots[index + 1] || this.dots[0];
                x += (nextDot.x - x) * 0.5;
                y += (nextDot.y - y) * 0.5;

                dot.x = x;
                dot.y = y;
            });

            requestAnimationFrame(animate);
        };

        animate();
    }
}

// Initialize cursor trail (commented out by default, uncomment to enable)
// document.addEventListener('DOMContentLoaded', () => {
//     new CursorTrail();
// });

// ============================================
// PAGE TRANSITION EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Fade in page on load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Smooth page transitions on navigation
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
class ScrollProgress {
    constructor() {
        this.createIndicator();
        this.attachListener();
    }

    createIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'scroll-progress';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 2px;
            background: linear-gradient(to right, #000, #666);
            width: 0%;
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);
    }

    attachListener() {
        window.addEventListener('scroll', () => {
            const indicator = document.getElementById('scroll-progress');
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            indicator.style.width = scrolled + '%';
        });
    }
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', () => {
    new ScrollProgress();
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
});

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%c SHAPES & SHADES ', 'background: #000; color: #fff; font-size: 20px; padding: 10px; letter-spacing: 5px;');
console.log('%c Luxury Interior Design ', 'background: #fff; color: #000; font-size: 12px; padding: 5px; border: 1px solid #000;');
