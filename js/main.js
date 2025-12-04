/**
 * Main JavaScript Module
 * Handles navigation, form validation, and general interactions
 * Security-focused with input sanitization and rate limiting
 */

(function() {
    'use strict';

    // Rate limiting for form submissions
    const rateLimiter = {
        lastSubmit: 0,
        minInterval: 3000, // 3 seconds between submissions
        canSubmit() {
            const now = Date.now();
            if (now - this.lastSubmit < this.minInterval) {
                return false;
            }
            this.lastSubmit = now;
            return true;
        }
    };

    /**
     * Sanitize user input
     * @param {string} input - Raw input
     * @returns {string} Sanitized input
     */
    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input
            .trim()
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .substring(0, 1000); // Limit length
    }

    /**
     * Validate email format
     * @param {string} email - Email address
     * @returns {boolean} Is valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length <= 254;
    }

    /**
     * Initialize mobile navigation
     */
    function initNavigation() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        const links = document.querySelectorAll('.nav-link');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('active');
        });

        // Close menu on link click
        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('active');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('active');
            }
        });
    }

    /**
     * Initialize smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Initialize contact form with validation
     */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const fields = {
            name: {
                element: form.querySelector('#name'),
                validate: (value) => {
                    if (!value || value.length < 2) return 'Name must be at least 2 characters';
                    if (value.length > 100) return 'Name is too long';
                    return '';
                }
            },
            email: {
                element: form.querySelector('#email'),
                validate: (value) => {
                    if (!value) return 'Email is required';
                    if (!isValidEmail(value)) return 'Please enter a valid email';
                    return '';
                }
            },
            message: {
                element: form.querySelector('#message'),
                validate: (value) => {
                    if (!value || value.length < 10) return 'Message must be at least 10 characters';
                    if (value.length > 1000) return 'Message is too long';
                    return '';
                }
            }
        };

        // Real-time validation
        Object.keys(fields).forEach(key => {
            const field = fields[key];
            if (field.element) {
                field.element.addEventListener('blur', () => validateField(field));
                field.element.addEventListener('input', () => {
                    if (field.element.classList.contains('error')) {
                        validateField(field);
                    }
                });
            }
        });

        function validateField(field) {
            const value = sanitizeInput(field.element.value);
            const error = field.validate(value);
            const errorEl = field.element.parentElement.querySelector('.error-message');

            if (error) {
                field.element.classList.add('error');
                if (errorEl) errorEl.textContent = error;
                return false;
            } else {
                field.element.classList.remove('error');
                if (errorEl) errorEl.textContent = '';
                return true;
            }
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Check honeypot (bot protection)
            const honeypot = form.querySelector('input[name="website"]');
            if (honeypot && honeypot.value) {
                console.warn('Bot detected');
                return;
            }

            // Rate limiting
            if (!rateLimiter.canSubmit()) {
                alert('Please wait a moment before submitting again.');
                return;
            }

            // Validate all fields
            let isValid = true;
            Object.keys(fields).forEach(key => {
                if (!validateField(fields[key])) {
                    isValid = false;
                }
            });

            if (!isValid) return;

            // Collect sanitized data
            const formData = {
                name: sanitizeInput(fields.name.element.value),
                email: sanitizeInput(fields.email.element.value),
                message: sanitizeInput(fields.message.element.value)
            };

            // Submit button state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                // Simulate form submission
                // Replace with actual API endpoint
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Success
                alert('Message sent successfully! I\'ll get back to you soon.');
                form.reset();
                
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Failed to send message. Please try again later.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    /**
     * Initialize scroll animations
     */
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // Add visible class styles
        const style = document.createElement('style');
        style.textContent = '.section.visible { opacity: 1 !important; transform: translateY(0) !important; }';
        document.head.appendChild(style);
    }

    /**
     * Set current year in footer
     */
    function setCurrentYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    /**
     * Initialize active nav link highlighting
     */
    function initActiveNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!sections.length || !navLinks.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(section => observer.observe(section));

        // Add active link styles
        const style = document.createElement('style');
        style.textContent = '.nav-link.active { color: var(--primary); }';
        document.head.appendChild(style);
    }

    /**
     * Initialize all modules
     */
    function init() {
        initNavigation();
        initSmoothScroll();
        initContactForm();
        initScrollAnimations();
        initActiveNavHighlight();
        setCurrentYear();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
