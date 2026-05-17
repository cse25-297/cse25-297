/**
 * SLANGFIELD Landscape Services - Main JavaScript
 * Provides interactivity for:
 * - Bootstrap components (navbar toggler, dropdowns)
 * - Smooth scrolling with offset
 */

(function() {
    'use strict';
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initContactForm();
    initPopupStyles();
});

/**
 * Initialize Popup Styles
 */
function initPopupStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Popup Overlay */
        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .popup-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* Popup Box */
        .popup-box {
            background-color: #fff;
            padding: 40px 50px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            transform: scale(0.8);
            transition: all 0.3s ease;
            max-width: 400px;
            width: 90%;
        }
        
        .popup-overlay.active .popup-box {
            transform: scale(1);
        }
        
        /* Popup Icon */
        .popup-icon {
            width: 80px;
            height: 80px;
            background-color: #198754;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
        }
        
        .popup-icon i {
            font-size: 40px;
            color: #fff;
        }
        
        /* Popup Content */
        .popup-title {
            font-size: 24px;
            font-weight: 700;
            color: #1A1A1A;
            margin-bottom: 10px;
        }
        
        .popup-message {
            font-size: 16px;
            color: #666;
            margin-bottom: 25px;
        }
        
        /* Popup Button */
        .popup-btn {
            background-color: #198754;
            color: #fff;
            border: none;
            padding: 12px 40px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .popup-btn:hover {
            background-color: #146c43;
            transform: translateY(-2px);
        }
        
        /* Error Message */
        .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Show Popup Message
 */
function showPopup(title, message) {
    // Remove existing popup if any
    const existingPopup = document.querySelector('.popup-overlay');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create popup HTML
    const popupHTML = `
        <div class="popup-overlay">
            <div class="popup-box">
                <div class="popup-icon">
                    <i class="bi bi-check-lg"></i>
                </div>
                <h3 class="popup-title">${title}</h3>
                <p class="popup-message">${message}</p>
                <button class="popup-btn" onclick="closePopup()">OK</button>
            </div>
        </div>
    `;
    
    // Add popup to body
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Show popup with animation
    setTimeout(() => {
        document.querySelector('.popup-overlay').classList.add('active');
    }, 10);
}

/**
 * Close Popup
 */
function closePopup() {
    const popup = document.querySelector('.popup-overlay');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}





    // ==================================================
    // 1. LOAD MISSING DEPENDENCIES
    // ==================================================
    function loadDependencies() {
        // Check if Bootstrap JS is already loaded (look for bootstrap bundle functions)
        const bootstrapLoaded = typeof bootstrap !== 'undefined' || 
                               (typeof $ !== 'undefined' && $.fn && $.fn.tooltip) ||
                               document.querySelector('script[src*="bootstrap.bundle"]');
        
        if (!bootstrapLoaded) {
            const bootstrapScript = document.createElement('script');
            bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
            bootstrapScript.integrity = 'sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz';
            bootstrapScript.crossOrigin = 'anonymous';
            document.body.appendChild(bootstrapScript);
        }

        // Check if Bootstrap Icons CSS is loaded
        const iconsLoaded = Array.from(document.querySelectorAll('link')).some(link => link.href && link.href.includes('bootstrap-icons'));
        if (!iconsLoaded) {
            const iconsLink = document.createElement('link');
            iconsLink.rel = 'stylesheet';
            iconsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
            document.head.appendChild(iconsLink);
        }
    }

    // ==================================================
    // 2. SMOOTH SCROLLING WITH HEADER OFFSET
    // ==================================================
    function initSmoothScroll() {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            // Exclude links that only have "#" or no target element
            const hash = anchor.getAttribute('href');
            if (hash === '#' || hash === '#!' || hash === '#0') return;
            
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jumping
                    history.pushState(null, null, targetId);
                    
                    // Close mobile navbar if open (Bootstrap toggler)
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            });
        });
    }

    // ==================================================
    // 3. STATISTICS COUNTER ANIMATION (when in viewport)
    // ==================================================
    function initStatsCounter() {
        // Target all stat numbers inside sections with .bg-dark or .bg-light stats area
        const statNumbers = document.querySelectorAll('.display-5.fw-bold.text-success');
        if (!statNumbers.length) return;
        
        // Parse numeric values from text content (e.g., "10+" -> 10, "500+" -> 500, "100%" -> 100)
        const statsData = [];
        statNumbers.forEach(el => {
            const rawText = el.innerText.trim();
            let numericValue = 0;
            let suffix = '';
            let isPercent = false;
            
            if (rawText.includes('+')) {
                numericValue = parseInt(rawText.replace('+', ''), 10);
                suffix = '+';
            } else if (rawText.includes('%')) {
                numericValue = parseInt(rawText.replace('%', ''), 10);
                suffix = '%';
                isPercent = true;
            } else {
                numericValue = parseInt(rawText, 10);
                suffix = '';
            }
            
            if (!isNaN(numericValue)) {
                statsData.push({
                    element: el,
                    target: numericValue,
                    suffix: suffix,
                    current: 0,
                    animated: false
                });
                // Set initial display to 0
                el.innerText = '0' + suffix;
            }
        });
        
        if (!statsData.length) return;
        
        // Intersection Observer to trigger counter when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statItem = statsData.find(item => item.element === entry.target);
                    if (statItem && !statItem.animated) {
                        statItem.animated = true;
                        animateCounter(statItem);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsData.forEach(stat => {
            observer.observe(stat.element);
        });
        
        function animateCounter(stat) {
            const { element, target, suffix } = stat;
            let current = 0;
            const step = Math.ceil(target / 30);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.innerText = target + suffix;
                    clearInterval(timer);
                } else {
                    element.innerText = current + suffix;
                }
            }, 25);
        }
    }

    // ==================================================
    // 4. CONTACT FORM HANDLER (with validation & fetch simulation)
    // ==================================================
   function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        // Prevent default form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Clear previous errors
            clearAllErrors();
            
            // Validate name
            if (name && name.value.trim() === '') {
                showError(name, 'Please enter your name');
                isValid = false;
            } else if (name && name.value.trim().length < 2) {
                showError(name, 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (email && !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (message && message.value.trim() === '') {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message && message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If valid, show popup
            if (isValid) {
                showPopup('Message Sent!', 'Thank you for contacting us. We will get back to you within 24 hours.');
                form.reset();
            }
            
            return false;
        });
    }
}

/**
 * Clear All Errors
 */
function clearAllErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => input.classList.remove('is-invalid'));
}

/**
 * Validate Email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Show Error Message
 */
function showError(input, message) {
    input.classList.add('is-invalid');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

// Close popup when clicking outside the box
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup-overlay')) {
        closePopup();
    }
});

        

    // ==================================================
    // 5. GALLERY LIGHTBOX (for services page)
    // ==================================================
    function initGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item-full');
        if (!galleryItems.length) return;
        
        // Create lightbox modal dynamically
        const lightbox = document.createElement('div');
        lightbox.id = 'galleryLightbox';
        lightbox.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            backdrop-filter: blur(5px);
        `;
        
        const lightboxContent = document.createElement('div');
        lightboxContent.style.cssText = `
            max-width: 90%;
            max-height: 85%;
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
            cursor: default;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.style.cssText = `
            width: 100%;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
            display: block;
        `;
        
        const lightboxCaption = document.createElement('div');
        lightboxCaption.style.cssText = `
            padding: 1rem;
            background: white;
            border-top: 1px solid #eee;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: rgba(0,0,0,0.6);
            color: white;
            border: none;
            font-size: 28px;
            cursor: pointer;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        lightboxContent.appendChild(closeBtn);
        lightboxContent.appendChild(lightboxImg);
        lightboxContent.appendChild(lightboxCaption);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // Attach click event to each gallery item
        galleryItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const overlay = item.querySelector('.gallery-item-overlay');
                let title = '';
                let description = '';
                let detailsHtml = '';
                
                if (overlay) {
                    const titleEl = overlay.querySelector('h3');
                    const descEl = overlay.querySelector('p');
                    const detailsEl = overlay.querySelector('.project-details');
                    title = titleEl ? titleEl.innerText : 'Project';
                    description = descEl ? descEl.innerText : '';
                    detailsHtml = detailsEl ? detailsEl.innerText : '';
                } else {
                    title = 'Project Image';
                    description = '';
                }
                
                lightboxImg.src = img ? img.src : '';
                lightboxImg.alt = title;
                
                lightboxCaption.innerHTML = `
                    <h4 class="mb-2" style="color:#198754;">${escapeHtml(title)}</h4>
                    <p class="mb-1">${escapeHtml(description)}</p>
                    ${detailsHtml ? `<small class="text-muted">${escapeHtml(detailsHtml)}</small>` : ''}
                `;
                
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/[&<>]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                return m;
            }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
                return c;
            });
        }
    }

    // ==================================================
    // 6. ENSURE NAVBAR DROPDOWNS WORK (Bootstrap helper)
    // ==================================================
    function initNavbarEnhancements() {
        // For any dynamically loaded content, ensure dropdowns are initialized
        // Bootstrap will auto-handle if JS is loaded, but we ensure toggles work
        const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
        if (dropdownToggles.length && typeof bootstrap !== 'undefined') {
            // Bootstrap already handles this, just ensure no conflicts
            dropdownToggles.forEach(toggle => {
                if (!toggle.getAttribute('data-bs-auto-close')) {
                    toggle.setAttribute('data-bs-auto-close', 'outside');
                }
            });
        }
    }

    // ==================================================
    // 7. ACTIVE NAVIGATION HIGHLIGHT (based on current section)
    // ==================================================
    function initActiveNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        if (!sections.length) return;
        
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const observerOptions = { threshold: 0.4 };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        const href = link.getAttribute('href');
                        if (href === `#${id}` || href === `services.html#${id}`) {
                            link.classList.add('active');
                        }
                        // For index page root sections
                        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
                            if (href === `#${id}`) link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }

    // ==================================================
    // 8. FIX BROKEN IMAGE PLACEHOLDER (optional)
    // ==================================================
    function handleBrokenImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                if (!this.hasAttribute('data-fallback')) {
                    this.setAttribute('data-fallback', 'true');
                    this.src = 'https://via.placeholder.com/500x400?text=Image+Not+Found';
                    this.alt = 'Image placeholder';
                }
            });
        });
    }

    // ==================================================
    // INITIALIZE EVERYTHING ON DOM READY
    // ==================================================
    document.addEventListener('DOMContentLoaded', function() {
        loadDependencies();
        initSmoothScroll();
        initStatsCounter();
        initContactForm();
        initGalleryLightbox();
        initNavbarEnhancements();
        initActiveNavHighlight();
        handleBrokenImages();
        
        // If Bootstrap loads later, ensure dropdowns are correctly initialized
        if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
            // Reinitialize dropdowns if needed
            const dropdownElements = document.querySelectorAll('.dropdown-toggle');
            dropdownElements.forEach(el => {
                if (el.getAttribute('data-bs-toggle') === 'dropdown') {
                    new bootstrap.Dropdown(el);
                }
            });
        }
        
        // Small delay to reapply stats observer if images load later
        setTimeout(() => {
            initStatsCounter();
        }, 500);
    });
})();