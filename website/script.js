// ===== CLIQED - Interactive Features =====

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initAttachmentHover();
    initColorSelectors();
    initFadeUpAnimations();
});

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        
        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');
        
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <a href="#how-it-works">How It Works</a>
                <a href="#attachments">Attachments</a>
                <a href="#bundles">Shop Kits</a>
                <a href="#bundles" class="btn btn-primary" style="margin-top: 16px;">Shop Now</a>
            `;
            document.querySelector('.navbar').appendChild(mobileMenu);
            
            // Add styles for mobile menu
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(250, 248, 245, 0.98);
                    backdrop-filter: blur(10px);
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    transform: translateY(-10px);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                }
                .mobile-menu.active {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }
                .mobile-menu a {
                    text-decoration: none;
                    color: #2D2D2D;
                    font-weight: 500;
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                }
                .mobile-menu-btn.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                .mobile-menu-btn.active span:nth-child(2) {
                    opacity: 0;
                }
                .mobile-menu-btn.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(5px, -5px);
                }
            `;
            document.head.appendChild(style);
        }
        
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.addEventListener('click', (e) => {
        if (e.target.closest('.mobile-menu a')) {
            document.querySelector('.mobile-menu')?.classList.remove('active');
            document.querySelector('.mobile-menu-btn')?.classList.remove('active');
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(`
        .step,
        .attachment-card,
        .bundle-card,
        .testimonial-card,
        .problem,
        .solution
    `);
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index % 3 * 0.1}s`;
        observer.observe(el);
    });
    
    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== ATTACHMENT CARD HOVER EFFECTS =====
function initAttachmentHover() {
    const cards = document.querySelectorAll('.attachment-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add a subtle "click" sound effect feel with a quick scale
            card.style.transition = 'all 0.15s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
}

// ===== BUNDLE CARD INTERACTION =====
document.querySelectorAll('.bundle-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Simple click feedback
        const card = btn.closest('.bundle-card');
        card.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            card.style.transform = '';
            // Here you would normally redirect to checkout or open a modal
            alert('🛒 Added to cart! (This would connect to your checkout in production)');
        }, 150);
    });
});

// ===== HERO PHONE MOCKUP INTERACTION =====
const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) {
    const attachmentColors = ['#A8B5A0', '#E8D4D4', '#C4A77D', '#D4DCE8'];
    let colorIndex = 0;
    
    phoneMockup.addEventListener('click', () => {
        colorIndex = (colorIndex + 1) % attachmentColors.length;
        const inner = phoneMockup.querySelector('::before') || phoneMockup;
        
        // Animate the color change
        phoneMockup.style.setProperty('--attachment-color', attachmentColors[colorIndex]);
        
        // Add a "click" animation
        phoneMockup.style.transform = 'scale(0.98)';
        setTimeout(() => {
            phoneMockup.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Update the pseudo element color via CSS variable
    const style = document.createElement('style');
    style.textContent = `
        .phone-mockup::before {
            background: var(--attachment-color, #A8B5A0);
            transition: background 0.3s ease;
        }
        .phone-mockup {
            cursor: pointer;
            transition: transform 0.15s ease;
        }
    `;
    document.head.appendChild(style);
}

console.log('CLIQED site loaded');

// ===== COLOR SELECTORS =====
function initColorSelectors() {
    const colorOptions = document.querySelectorAll('.color-options');
    
    colorOptions.forEach(optionGroup => {
        const dots = optionGroup.querySelectorAll('.color-dot');
        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                // Remove active from siblings
                dots.forEach(d => d.classList.remove('active'));
                // Add active to clicked
                dot.classList.add('active');
                
                // Add satisfying click animation
                dot.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    dot.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        dot.style.transform = '';
                    }, 100);
                }, 100);
            });
        });
    });
}

// ===== FADE UP SCROLL ANIMATIONS =====
function initFadeUpAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    if (fadeElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });
    
    fadeElements.forEach(el => observer.observe(el));
}

// ===== ADD TO CART FEEDBACK =====
document.querySelectorAll('.product-card .btn, .featured-product .btn, .bundle-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.style.background = '#A8B5A0';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 1500);
    });
});
