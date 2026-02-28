// ==========================================
// Portfolio JavaScript - Enhanced Version
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================
    // Preloader
    // ==========================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 500);
        }
    });

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Update icon
            const icon = mobileMenuBtn.querySelector('[data-lucide]');
            if (icon) {
                const isOpen = !mobileMenu.classList.contains('hidden');
                icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('[data-lucide]');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            });
        });
    }

    // ==========================================
    // Typing Animation
    // ==========================================
    const typingTextElement = document.getElementById('typing-text');
    
    if (typingTextElement) {
        const phrases = [
            'Penetration Testing',
            'Ethical Hacking',
            'Secure Web Development',
            'Vulnerability Analysis',
            'Security Research'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (!isDeleting) {
                typingTextElement.textContent = currentPhrase.substring(0, charIndex);
                charIndex++;
                
                if (charIndex > currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(type, 2000); // Pause at end
                    return;
                }
            } else {
                typingTextElement.textContent = currentPhrase.substring(0, charIndex);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, 500); // Pause before new phrase
                    return;
                }
            }
            
            setTimeout(type, isDeleting ? 50 : 100);
        }
        
        type();
    }

    // ==========================================
    // Scroll Reveal Animation
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sectionsToReveal = document.querySelectorAll('.section-reveal');
    sectionsToReveal.forEach(section => {
        observer.observe(section);
    });

    // ==========================================
    // Header Scroll Effect
    // ==========================================
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });

    // ==========================================
    // Active Navigation Link
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    function updateActiveLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-brand-accent', 'bg-white/10');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-brand-accent');
                        if (link.classList.contains('nav-link')) {
                            link.classList.add('bg-white/10');
                        }
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ==========================================
    // Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="flex items-center justify-center"><span class="animate-spin mr-2">⏳</span> Sending...</span>';
            formStatus.textContent = '';
            formStatus.className = 'text-center text-sm';

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = '✓ Thank you! Your message has been sent successfully.';
                    formStatus.className = 'text-center text-sm text-brand-accent font-semibold';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formStatus.textContent = '';
                    }, 5000);
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        formStatus.textContent = '✗ ' + data.errors.map(error => error.message).join(', ');
                    } else {
                        formStatus.textContent = '✗ Oops! There was a problem submitting your form.';
                    }
                    formStatus.className = 'text-center text-sm text-red-400 font-semibold';
                }
            } catch (error) {
                formStatus.textContent = '✗ Oops! There was a problem submitting your form.';
                formStatus.className = 'text-center text-sm text-red-400 font-semibold';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    }

    // ==========================================
    // Current Year in Footer
    // ==========================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // Parallax Effect for Background
    // ==========================================
    const blobs = document.querySelectorAll('.animate-blob');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.05;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ==========================================
    // Copy Email on Click
    // ==========================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const email = link.getAttribute('href').replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show a temporary tooltip or notification
                    const originalText = link.textContent;
                    link.textContent = 'Copied!';
                    setTimeout(() => {
                        link.textContent = originalText;
                    }, 2000);
                });
            }
        });
    });

    // ==========================================
    // Lazy Load Images (if any are added later)
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==========================================
    // Console Easter Egg
    // ==========================================
    console.log('%c👋 Hello there!', 'color: #00e0a4; font-size: 20px; font-weight: bold;');
    console.log('%cLooking for something?', 'color: #a78bfa; font-size: 14px;');
    console.log('%cFeel free to reach out if you want to collaborate!', 'color: #60a5fa; font-size: 12px;');
    console.log('%c🔗 GitHub: https://github.com/A7medzx', 'color: #00e0a4; font-size: 12px;');
});