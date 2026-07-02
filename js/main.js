/**
 * Beijing Sancheng Zhiyuan Enterprise Management Consulting Co., Ltd.
 * Main JavaScript - Core Functionality
 */

(function() {
    'use strict';

    // =====================================================
    // Page Loader
    // =====================================================
    window.addEventListener('load', function() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(function() {
                loader.classList.add('hidden');
            }, 500);
        }
    });

    // =====================================================
    // Header Scroll Effect
    // =====================================================
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', throttle(handleHeaderScroll, 100));

    // =====================================================
    // Smooth Scroll
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================================
    // Scroll to Top Button
    // =====================================================
    const scrollTopBtn = document.querySelector('.scroll-top');

    function toggleScrollTopButton() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    }

    window.addEventListener('scroll', throttle(toggleScrollTopButton, 100));

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =====================================================
    // Counter Animation
    // =====================================================
    function animateCounter(element, target, duration) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        function updateCounter() {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // =====================================================
    // Form Validation
    // =====================================================
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#28a745';
                    this.reset();

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });

        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Required check
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (isValid && field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (isValid && field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = '#dc3545';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '0.25rem';
            field.parentNode.appendChild(errorDiv);
        }

        return isValid;
    }

    // =====================================================
    // Accordion Functionality
    // =====================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentNode;
            const content = this.nextElementSibling;
            const isActive = item.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // =====================================================
    // Tabs Functionality
    // =====================================================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // =====================================================
    // Mobile Navigation Toggle
    // =====================================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // =====================================================
    // Parallax Effect
    // =====================================================
    function updateParallax() {
        const scrolled = window.scrollY;
        document.documentElement.style.setProperty('--scroll-y', scrolled);

        document.querySelectorAll('[data-parallax]').forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', throttle(updateParallax, 16));

    // =====================================================
    // Lazy Loading Images
    // =====================================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // =====================================================
    // Utility Functions
    // =====================================================
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

    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // =====================================================
    // Mouse Trail Effect (Optional - Can be removed)
    // =====================================================
    const mouseTrail = document.createElement('div');
    mouseTrail.className = 'mouse-trail';
    mouseTrail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0, 102, 179, 0.3), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease-out;
    `;
    document.body.appendChild(mouseTrail);

    let mouseTrailVisible = false;

    document.addEventListener('mousemove', throttle(function(e) {
        mouseTrail.style.left = e.clientX + 'px';
        mouseTrail.style.top = e.clientY + 'px';
        
        if (!mouseTrailVisible) {
            mouseTrail.style.opacity = '1';
            mouseTrailVisible = true;
        }
    }, 16));

    document.addEventListener('mouseleave', function() {
        mouseTrail.style.opacity = '0';
        mouseTrailVisible = false;
    });

    // =====================================================
    // Active Navigation Link
    // =====================================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // =====================================================
    // Prevent Right Click on Images (Optional)
    // =====================================================
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    });

    // =====================================================
    // Console Message
    // =====================================================
    console.log('%c🏢 Beijing Sancheng Zhiyuan Enterprise Management Consulting Co., Ltd.', 
                'font-size: 20px; font-weight: bold; color: #0066b3;');
    console.log('%c🌐 Website: https://sanchengzy.com', 'font-size: 14px; color: #666;');

})();