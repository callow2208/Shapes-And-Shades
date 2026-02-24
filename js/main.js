/* ============================================
   SHAPES & SHADES - MAIN JAVASCRIPT
   Interactive Elements and Animations
   ============================================ */

let projectsData = {};
let currentProjectImages = []; // NEW: For modal navigation
let currentImageIndex = 0;     // NEW: For modal navigation

// ============================================
// NAVIGATION SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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

// ============================================
// PORTFOLIO FILTER
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('hidden');
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
// NEW: MODAL NAVIGATION FUNCTIONS
// ============================================
function createImageClickHandler(src, index) {
    return function() {
        currentImageIndex = index;
        document.getElementById("imageModal").style.display = "block";
        document.getElementById("modalImage").src = src;
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    };
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
    document.getElementById("modalImage").src = currentProjectImages[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
    document.getElementById("modalImage").src = currentProjectImages[currentImageIndex];
}


// ============================================
// PROJECT DETAIL VIEW (UPDATED)
// ============================================
async function showProjectDetail(button, title, category, location, size, description, projectSize = '') {
    const projectKey = button.getAttribute("data-project");
    console.log("Project Key:", projectKey);

    // Populate details
    document.getElementById('detailTitle').textContent = title;
    document.getElementById('detailCategory').textContent = category;
    document.getElementById('detailLocation').textContent = location;
    document.getElementById('detailYear').textContent = size;
    document.getElementById('detailSize').textContent = projectSize || 'N/A';
    document.getElementById('detailDescription').textContent = description;

    const imageContainer = document.getElementById('projectImages');
    const galleryGrid = document.getElementById('galleryGrid');
    imageContainer.innerHTML = "<p>Loading images...</p>";
    galleryGrid.innerHTML = "<p>Loading gallery...</p>";

    try {
        if (Object.keys(projectsData).length === 0) {
            const response = await fetch('js/projects.json');
            projectsData = await response.json();
        }

        const images = projectsData[projectKey];
        if (!images || images.length === 0) {
            imageContainer.innerHTML = "<p>No images available.</p>";
            galleryGrid.innerHTML = "";
        } else {
            renderImages(images, projectKey, title, imageContainer);
            renderGallery(images, projectKey, title, galleryGrid);
        }
    } catch (error) {
        console.error("Error loading images:", error);
        imageContainer.innerHTML = "<p>Error loading images.</p>";
        galleryGrid.innerHTML = "";
    }

    document.querySelector('.filter-section').style.display = 'none';
    document.querySelector('.portfolio-grid').style.display = 'none';
    document.getElementById('projectDetailSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadProjectImages(projectKey);
}

function renderImages(images, projectKey, title, imageContainer) {
    imageContainer.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = "gallery-wrapper";
    const scrollContainer = document.createElement('div');
    scrollContainer.className = "image-scroll-container";
    scrollContainer.setAttribute('role', 'region');
    scrollContainer.setAttribute('aria-label', 'Project images');

    const leftArrow = document.createElement('button');
    leftArrow.className = "gallery-arrow left";
    leftArrow.innerHTML = "&#10094;";
    leftArrow.setAttribute('aria-label', 'Previous images');
    leftArrow.onclick = () => scrollSmooth(scrollContainer, -1);

    const rightArrow = document.createElement('button');
    rightArrow.className = "gallery-arrow right";
    rightArrow.innerHTML = "&#10095;";
    rightArrow.setAttribute('aria-label', 'Next images');
    rightArrow.onclick = () => scrollSmooth(scrollContainer, 1);

    images.forEach((imageName, index) => {
        const card = document.createElement('div');
        card.className = "image-card";
        const img = document.createElement('img');
        img.src = `img/${projectKey}/${imageName}`;
        img.alt = title;
        img.loading = 'lazy';
        img.onclick = createImageClickHandler(img.src, index); // UPDATED: Modal navigation
        card.appendChild(img);
        scrollContainer.appendChild(card);
    });

    wrapper.appendChild(leftArrow);
    wrapper.appendChild(scrollContainer);
    wrapper.appendChild(rightArrow);
    imageContainer.appendChild(wrapper);
}

function renderGallery(images, projectKey, title, galleryGrid) {
    currentProjectImages = images.map(name => `img/${projectKey}/${name}`); // Store for modal
    galleryGrid.innerHTML = '';
    images.forEach((imageName, index) => {
        const img = document.createElement('img');
        img.src = `img/${projectKey}/${imageName}`;
        img.alt = title;
        img.loading = 'lazy';
        img.onclick = createImageClickHandler(img.src, index); // UPDATED: Modal navigation
        galleryGrid.appendChild(img);
    });
}

function scrollSmooth(container, direction) {
    const card = container.querySelector('.image-card');
    if (!card) return;
    const scrollDistance = card.offsetWidth + 20;
    container.scrollBy({
        left: scrollDistance * direction,
        behavior: 'smooth'
    });
}

function loadProjectImages(projectKey) {
    console.log('Loading images for:', projectKey);
}

function hideProjectDetail() {
    document.getElementById('projectDetailSection').style.display = 'none';
    document.querySelector('.filter-section').style.display = 'block';
    document.querySelector('.portfolio-grid').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// MODAL EVENT LISTENERS (NEW)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("imageModal");
    if (!modal) return;

    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');

    // Close modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = '';
    };

    // Close on outside click
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = '';
        }
    };

    // Arrow buttons
    prevBtn.onclick = showPrevImage;
    nextBtn.onclick = showNextImage;

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === "block") {
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'Escape') {
                modal.style.display = "none";
                document.body.style.overflow = '';
            }
        }
    });
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

            switch (animationType) {
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
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

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
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });

        const formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                this.style.borderColor = '';
            });
        });
    }
});

// ============================================
// NAVBAR MOBILE MENU AUTO-CLOSE
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navLinks.length > 0 && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
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
// PARALLAX EFFECT FOR HERO SECTION
// ============================================
window.addEventListener('scroll', function () {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const scrolled = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    if (scrolled < heroHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    let opacity = 1 - (scrolled / heroHeight);
    opacity = Math.max(opacity, 0);
    heroSection.style.opacity = opacity;
});

// ============================================
// IMAGE PLACEHOLDER HOVER EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');

    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
        });

        placeholder.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// MODAL AUTO-GENERATE FOR PORTFOLIO ITEMS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const viewButtons = document.querySelectorAll('.view-btn');

    viewButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-bs-target');
            const modal = document.querySelector(modalId);

            if (!modal) {
                console.log('Modal not found for:', modalId);
            }
        });
    });
});

// ============================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ============================================
// document.addEventListener('DOMContentLoaded', () => {
//     new CursorTrail();
// });

// ============================================
// PAGE TRANSITION EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);

    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
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

document.addEventListener('DOMContentLoaded', () => {
    new ScrollProgress();
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
document.addEventListener('DOMContentLoaded', function () {
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
// COUNTERS INIT (MOVED UP)
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    statNumbers.forEach(stat => counterObserver.observe(stat));
});

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%c SHAPES & SHADES ', 'background: #000; color: #fff; font-size: 20px; padding: 10px; letter-spacing: 5px;');
console.log('%c Luxury Interior Design ', 'background: #fff; color: #000; font-size: 12px; padding: 5px; border: 1px solid #000;');
