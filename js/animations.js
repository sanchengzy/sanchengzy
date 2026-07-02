/**
 * Beijing Sancheng Zhiyuan Enterprise Management Consulting Co., Ltd.
 * Animations JavaScript - Scroll and Interactive Animations
 */

(function() {
    'use strict';

    // =====================================================
    // Intersection Observer for Scroll Animations
    // =====================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if element has data attribute
                const counter = entry.target.querySelector('.counter');
                if (counter && !counter.classList.contains('counted')) {
                    animateCounterValue(counter);
                    counter.classList.add('counted');
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .zoom-in, .slide-in-bottom, .stagger-item').forEach(el => {
        animationObserver.observe(el);
    });

    // =====================================================
    // Counter Animation
    // =====================================================
    function animateCounterValue(element) {
        const target = parseInt(element.getAttribute('data-count'), 10);
        const duration = parseInt(element.getAttribute('data-duration'), 10) || 2000;
        const suffix = element.getAttribute('data-suffix') || '';
        const prefix = element.getAttribute('data-prefix') || '';
        
        if (isNaN(target)) return;

        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOut * target);
            
            element.textContent = prefix + currentValue.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target.toLocaleString() + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // =====================================================
    // Parallax Scroll Effect
    // =====================================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        function updateParallax() {
            const scrolled = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }
        
        window.addEventListener('scroll', throttle(updateParallax, 16));
        updateParallax();
    }
    
    initParallax();

    // =====================================================
    // Text Reveal Animation
    // =====================================================
    function initTextReveal() {
        const textElements = document.querySelectorAll('.text-reveal');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.transitionDelay = `${index * 0.03}s`;
                element.appendChild(span);
            });
        });
    }
    
    initTextReveal();

    // =====================================================
    // Image Reveal Animation
    // =====================================================
    function initImageReveal() {
        const imageReveals = document.querySelectorAll('.image-reveal');
        
        imageReveals.forEach(element => {
            animationObserver.observe(element);
        });
    }
    
    initImageReveal();

    // =====================================================
    // Card 3D Tilt Effect
    // =====================================================
    function init3DTilt() {
        const tiltCards = document.querySelectorAll('.card-3d');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.querySelector('.card-3d-inner').style.transform = 
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.querySelector('.card-3d-inner').style.transform = 
                    'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
    
    init3DTilt();

    // =====================================================
    // Magnetic Button Effect
    // =====================================================
    function initMagneticButtons() {
        const magneticBtns = document.querySelectorAll('.magnetic-btn');
        
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', function() {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    initMagneticButtons();

    // =====================================================
    // Scroll Progress Indicator
    // =====================================================
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #0066b3, #3399cc);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    initScrollProgress();

    // =====================================================
    // Particle Effect
    // =====================================================
    function initParticles() {
        const particleContainers = document.querySelectorAll('.particles');
        
        particleContainers.forEach(container => {
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 15}s;
                    animation-duration: ${Math.random() * 10 + 10}s;
                `;
                container.appendChild(particle);
            }
        });
    }
    
    initParticles();

    // =====================================================
    // Hover Ripple Effect
    // =====================================================
    function initRippleEffect() {
        const rippleButtons = document.querySelectorAll('.btn-ripple');
        
        rippleButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    width: 100px;
                    height: 100px;
                    left: ${x - 50}px;
                    top: ${y - 50}px;
                    transform: scale(0);
                    animation: rippleEffect 0.6s ease-out;
                    pointer-events: none;
                `;
                
                btn.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
    
    // Add ripple animation keyframes
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    initRippleEffect();

    // =====================================================
    // Stagger Animation for Lists
    // =====================================================
    function initStaggerAnimation() {
        const staggerContainers = document.querySelectorAll('.stagger-container');
        
        staggerContainers.forEach(container => {
            const items = container.children;
            
            Array.from(items).forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }
    
    initStaggerAnimation();

    // =====================================================
    // Number Counter with Easing
    // =====================================================
    function initNumberCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            animationObserver.observe(counter);
        });
    }
    
    initNumberCounters();

    // =====================================================
    // Smooth Reveal on Scroll
    // =====================================================
    function initSmoothReveal() {
        const revealElements = document.querySelectorAll('.reveal-mask, .reveal-overlay');
        
        revealElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
    
    initSmoothReveal();

    // =====================================================
    // Animated Gradient Background
    // =====================================================
    function initAnimatedGradient() {
        const gradientElements = document.querySelectorAll('.gradient-animate');
        
        gradientElements.forEach(element => {
            // Add animation class
            element.classList.add('bg-move');
        });
    }
    
    initAnimatedGradient();

    // =====================================================
    // Scroll-Triggered Timeline Animation
    // =====================================================
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-animate');
        const timelineLine = document.querySelector('.timeline-line');
        
        if (timelineLine) {
            animationObserver.observe(timelineLine);
        }
        
        timelineItems.forEach(item => {
            animationObserver.observe(item);
        });
    }
    
    initTimelineAnimation();

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
    // Performance: Pause animations when not visible
    // =====================================================
    function initVisibilityBasedAnimation() {
        const animatedElements = document.querySelectorAll('*');
        
        if ('IntersectionObserver' in window) {
            const visibilityObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    } else {
                        entry.target.style.animationPlayState = 'paused';
                    }
                });
            }, { threshold: 0 });
            
            animatedElements.forEach(el => {
                if (getComputedStyle(el).animationName !== 'none') {
                    visibilityObserver.observe(el);
                }
            });
        }
    }
    
    initVisibilityBasedAnimation();

    // =====================================================
    // Initialize all animations on DOM ready
    // =====================================================
    document.addEventListener('DOMContentLoaded', function() {
        // Re-observe elements after DOM is ready
        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .zoom-in, .slide-in-bottom, .stagger-item').forEach(el => {
            animationObserver.observe(el);
        });
    });

})();