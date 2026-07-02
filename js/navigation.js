/**
 * Beijing Sancheng Zhiyuan Enterprise Management Consulting Co., Ltd.
 * Navigation JavaScript - Menu and Navigation Functionality
 */

(function() {
    'use strict';

    // =====================================================
    // Mobile Navigation
    // =====================================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // =====================================================
    // Active Navigation Link
    // =====================================================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // =====================================================
    // Dropdown Navigation
    // =====================================================
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');

    dropdownItems.forEach(item => {
        const dropdown = item.querySelector('.nav-dropdown');
        
        if (dropdown) {
            // Desktop hover behavior
            item.addEventListener('mouseenter', function() {
                if (window.innerWidth > 992) {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.transform = 'translateY(0)';
                }
            });

            item.addEventListener('mouseleave', function() {
                if (window.innerWidth > 992) {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.transform = 'translateY(10px)';
                }
            });

            // Mobile click behavior
            const dropdownLink = item.querySelector('> .nav-link');
            
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    const isOpen = item.classList.contains('open');
                    
                    // Close all other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('open');
                            const otherDropdown = otherItem.querySelector('.nav-dropdown');
                            if (otherDropdown) {
                                otherDropdown.style.maxHeight = '0';
                            }
                        }
                    });

                    if (isOpen) {
                        item.classList.remove('open');
                        dropdown.style.maxHeight = '0';
                    } else {
                        item.classList.add('open');
                        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
                    }
                }
            });
        }
    });

    // =====================================================
    // Mega Menu (if applicable)
    // =====================================================
    const megaMenuTriggers = document.querySelectorAll('[data-mega-menu]');

    megaMenuTriggers.forEach(trigger => {
        const megaMenuId = trigger.getAttribute('data-mega-menu');
        const megaMenu = document.getElementById(megaMenuId);

        if (megaMenu) {
            trigger.addEventListener('mouseenter', function() {
                if (window.innerWidth > 992) {
                    megaMenu.classList.add('active');
                }
            });

            trigger.parentElement.addEventListener('mouseleave', function() {
                if (window.innerWidth > 992) {
                    megaMenu.classList.remove('active');
                }
            });
        }
    });

    // =====================================================
    // Sticky Navigation on Scroll
    // =====================================================
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    function handleStickyNavigation() {
        const scrollTop = window.scrollY;

        if (scrollTop > 100) {
            header.classList.add('scrolled');
            
            // Hide header on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', throttle(handleStickyNavigation, 100));

    // =====================================================
    // Smooth Scroll for Anchor Links
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            }
        });
    });

    // =====================================================
    // Scroll Spy for Navigation
    // =====================================================
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        function updateActiveLink() {
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', throttle(updateActiveLink, 100));
        updateActiveLink();
    }

    initScrollSpy();

    // =====================================================
    // Keyboard Navigation Support
    // =====================================================
    navLinks.forEach((link, index, links) => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                
                let targetIndex;
                if (e.key === 'ArrowDown') {
                    targetIndex = index + 1 < links.length ? index + 1 : 0;
                } else {
                    targetIndex = index - 1 >= 0 ? index - 1 : links.length - 1;
                }
                
                links[targetIndex].focus();
            }
        });
    });

    // =====================================================
    // Touch Support for Mobile Dropdowns
    // =====================================================
    if ('ontouchstart' in window) {
        dropdownItems.forEach(item => {
            const dropdown = item.querySelector('.nav-dropdown');
            
            item.addEventListener('touchstart', function(e) {
                if (window.innerWidth <= 992) {
                    const isOpen = item.classList.contains('open');
                    
                    // Close all other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('open');
                        }
                    });

                    if (!isOpen) {
                        e.preventDefault();
                        item.classList.add('open');
                        if (dropdown) {
                            dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
                        }
                    }
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('touchstart', function(e) {
            if (!e.target.closest('.nav-item-dropdown')) {
                dropdownItems.forEach(item => {
                    item.classList.remove('open');
                    const dropdown = item.querySelector('.nav-dropdown');
                    if (dropdown) {
                        dropdown.style.maxHeight = '0';
                    }
                });
            }
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

    // =====================================================
    // Initialize Navigation on Page Load
    // =====================================================
    window.addEventListener('load', function() {
        // Reset any inline styles
        if (header) {
            header.style.transform = '';
        }
    });

    // =====================================================
    // Handle Resize Events
    // =====================================================
    let resizeTimer;

    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        
        resizeTimer = setTimeout(function() {
            // Reset mobile menu state on resize
            if (window.innerWidth > 992) {
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Reset dropdown states
                dropdownItems.forEach(item => {
                    item.classList.remove('open');
                    const dropdown = item.querySelector('.nav-dropdown');
                    if (dropdown) {
                        dropdown.style.maxHeight = '';
                        dropdown.style.opacity = '';
                        dropdown.style.visibility = '';
                    }
                });
            }
        }, 250);
    });

})();