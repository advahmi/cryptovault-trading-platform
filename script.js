// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initCookieConsent();
    initAuthModal();
    initNewsletterForm();
    initDownloadApp();
    initScrollEffects();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Cookie Consent Banner
function initCookieConsent() {
    const cookieBanner = document.getElementById('cookie-consent');
    const acceptButton = document.getElementById('accept-cookies');

    if (cookieBanner && acceptButton) {
        // Check if user has already accepted cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
        if (!cookiesAccepted) {
            // Show cookie banner after a short delay
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 1000);
        }

        // Handle accept button click
        acceptButton.addEventListener('click', function() {
            try {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieBanner.classList.remove('active');
                
                // Optional: Show success message
                showMessage('Cookies preferences saved successfully!', 'success');
            } catch (error) {
                console.error('Error saving cookie preference:', error);
                // Still hide the banner even if localStorage fails
                cookieBanner.classList.remove('active');
            }
        });
    }
}

// Authentication Modal
function initAuthModal() {
    const accessWalletBtn = document.getElementById('access-wallet');
    const authModal = document.getElementById('auth-modal');
    const modalClose = document.getElementById('modal-close');
    const authForm = document.getElementById('auth-form');

    if (accessWalletBtn && authModal && modalClose && authForm) {
        // Open modal
        accessWalletBtn.addEventListener('click', function(e) {
            e.preventDefault();
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Focus on first input for accessibility
            const firstInput = authModal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        });

        // Close modal
        function closeModal() {
            authModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            clearAuthForm();
        }

        modalClose.addEventListener('click', closeModal);

        // Close modal when clicking outside
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && authModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Handle form submission
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAuthSubmission();
        });
    }
}

// Handle Authentication Form Submission
function handleAuthSubmission() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('auth-message');

    // Basic validation
    if (!email || !password) {
        showAuthMessage('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showAuthMessage('Please enter a valid email address.', 'error');
        return;
    }

    if (password.length < 6) {
        showAuthMessage('Password must be at least 6 characters long.', 'error');
        return;
    }

    // Simulate authentication process
    showAuthMessage('Signing in...', 'info');
    
    setTimeout(() => {
        // Simulate successful login (in real app, this would be an API call)
        showAuthMessage('Welcome back! Redirecting to your wallet...', 'success');
        
        setTimeout(() => {
            document.getElementById('auth-modal').classList.remove('active');
            document.body.style.overflow = '';
            clearAuthForm();
            
            // In a real app, redirect to wallet dashboard
            showMessage('Successfully signed in to your wallet!', 'success');
        }, 2000);
    }, 1500);
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');

    if (newsletterForm && emailInput) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmission();
        });
    }
}

// Handle Newsletter Submission
function handleNewsletterSubmission() {
    const email = document.getElementById('newsletter-email').value;
    const messageDiv = document.getElementById('newsletter-message');

    if (!email) {
        showNewsletterMessage('Please enter your email address.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNewsletterMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate subscription process
    showNewsletterMessage('Subscribing...', 'info');
    
    setTimeout(() => {
        showNewsletterMessage('Thank you for subscribing! You will receive updates soon.', 'success');
        document.getElementById('newsletter-email').value = '';
    }, 1500);
}

// Download App Functionality
function initDownloadApp() {
    const downloadBtn = document.getElementById('download-app');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a simulated APK download
            const link = document.createElement('a');
            link.href = '#'; // In real app, this would be the actual APK URL
            link.download = 'cryptovault-app.apk';
            
            // Show download message
            showMessage('Download started! CryptoVault app will be downloaded shortly.', 'success');
            
            // In a real application, you would trigger the actual download here
            console.log('APK download initiated');
        });
    }
}

// Scroll Effects and Animations
function initScrollEffects() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-based animations (optional enhancement)
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .trust-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    // Create a temporary message element
    const messageEl = document.createElement('div');
    messageEl.className = `global-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    // Set background color based on type
    switch(type) {
        case 'success':
            messageEl.style.backgroundColor = '#10b981';
            break;
        case 'error':
            messageEl.style.backgroundColor = '#ef4444';
            break;
        case 'info':
            messageEl.style.backgroundColor = '#3b82f6';
            break;
        default:
            messageEl.style.backgroundColor = '#6b7280';
    }

    document.body.appendChild(messageEl);

    // Animate in
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 4000);
}

function showAuthMessage(message, type) {
    const messageDiv = document.getElementById('auth-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';
    }
}

function showNewsletterMessage(message, type) {
    const messageDiv = document.getElementById('newsletter-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.display = 'block';
    }
}

function clearAuthForm() {
    const form = document.getElementById('auth-form');
    const messageDiv = document.getElementById('auth-message');
    
    if (form) {
        form.reset();
    }
    
    if (messageDiv) {
        messageDiv.style.display = 'none';
        messageDiv.textContent = '';
    }
}

// Handle Get Started buttons
document.addEventListener('DOMContentLoaded', function() {
    const getStartedBtns = document.querySelectorAll('#get-started, .btn-primary');
    
    getStartedBtns.forEach(btn => {
        if (btn.id === 'get-started' || btn.textContent.includes('Get Started')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Scroll to newsletter section for sign up
                const newsletterSection = document.querySelector('.newsletter');
                if (newsletterSection) {
                    newsletterSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                    // Focus on email input
                    setTimeout(() => {
                        const emailInput = document.getElementById('newsletter-email');
                        if (emailInput) {
                            emailInput.focus();
                        }
                    }, 1000);
                }
            });
        }
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});
