// app.js - Complete JavaScript for Online Services Website

// ======================
// 1. DOM ELEMENTS
// ======================
const mobileMenu = document.getElementById('mobile-menu');
const mainNav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const whatsappFloat = document.querySelector('.whatsapp-float');
const serviceItems = document.querySelectorAll('.service-item');
const getServiceButtons = document.querySelectorAll('.upload-button');
const fadeElements = document.querySelectorAll('.fade-in-up');
const contactForm = document.getElementById('serviceRequestForm');
const phoneInput = document.getElementById('phoneNumber');
const fileInput = document.getElementById('uploadFile');
const fileNameDisplay = document.getElementById('fileName');
const successMessage = document.getElementById('successMessage');
const closeSuccessBtn = document.getElementById('closeSuccess');
const whatsappLink = document.getElementById('whatsappLink');
const submitBtn = document.getElementById('submitBtn');

// ======================
// 2. MOBILE MENU TOGGLE
// ======================
function initMobileMenu() {
    if (!mobileMenu || !mainNav) return;
    
    mobileMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        const spans = mobileMenu.querySelectorAll('span');
        if (mainNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            const spans = mobileMenu.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mainNav.contains(e.target) && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            const spans = mobileMenu.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ======================
// 3. NAVIGATION ACTIVE LINK
// ======================
function initActiveNavLink() {
    if (navLinks.length === 0) return;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ======================
// 4. SERVICE PARAMETER HANDLING
// ======================
function initServiceParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam && serviceItems.length > 0) {
        setTimeout(() => {
            serviceItems.forEach(item => {
                const serviceTitle = item.querySelector('h3');
                if (serviceTitle && serviceTitle.textContent.includes(serviceParam)) {
                    // Scroll to service
                    item.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Highlight service
                    item.style.boxShadow = '0 0 0 3px var(--secondary-color)';
                    item.style.transition = 'box-shadow 0.3s ease';
                    
                    // Remove highlight after 3 seconds
                    setTimeout(() => {
                        item.style.boxShadow = '';
                    }, 3000);
                }
            });
        }, 500);
    }
}

// ======================
// 5. FADE-IN ANIMATIONS
// ======================
function initFadeInAnimations() {
    if (fadeElements.length === 0) return;
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Set initial state for elements that are already in view
    fadeElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 150) {
            el.classList.add('active');
        }
    });
    
    // Listen for scroll
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Initial check
    fadeInOnScroll();
}

// ======================
// 6. SERVICE ITEM HOVER EFFECTS
// ======================
function initServiceHoverEffects() {
    if (serviceItems.length === 0) return;
    
    serviceItems.forEach(item => {
        const imageContainer = item.querySelector('.service-image-container');
        const imageOverlay = item.querySelector('.image-overlay');
        
        if (imageContainer && imageOverlay) {
            imageContainer.addEventListener('mouseenter', () => {
                imageOverlay.style.opacity = '1';
            });
            
            imageContainer.addEventListener('mouseleave', () => {
                imageOverlay.style.opacity = '0';
            });
        }
        
        // Add click animation
        item.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
                item.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 200);
            }
        });
    });
}

// ======================
// 7. GET SERVICE BUTTONS
// ======================
function initGetServiceButtons() {
    if (getServiceButtons.length === 0) return;
    
    getServiceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const serviceItem = this.closest('.service-item');
            const serviceName = serviceItem ? serviceItem.querySelector('h3').textContent : 'Unknown Service';
            
            // Analytics tracking (you can replace with your analytics code)
            console.log(`Get Service clicked for: ${serviceName}`);
            
            // Button click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Optional: Send to Google Analytics or other tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'get_service_click', {
                    'event_category': 'Services',
                    'event_label': serviceName
                });
            }
        });
    });
}

// ======================
// 8. SMOOTH SCROLL
// ======================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// ======================
// 9. PHONE NUMBER FORMATTING
// ======================
function initPhoneFormatting() {
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            // Format for Tanzania numbers
            if (value.startsWith('0')) {
                value = '255' + value.substring(1);
            } else if (value.startsWith('255')) {
                // Already formatted
            } else {
                value = '255' + value;
            }
            
            // Format as +255 XXX XXX XXX
            let formattedValue = '';
            if (value.length > 3) {
                formattedValue = '+' + value.substring(0, 3);
                if (value.length > 3) {
                    formattedValue += ' ' + value.substring(3, 6);
                }
                if (value.length > 6) {
                    formattedValue += ' ' + value.substring(6, 9);
                }
                if (value.length > 9) {
                    formattedValue += ' ' + value.substring(9, 12);
                }
            }
            
            e.target.value = formattedValue;
        }
    });
    
    // Add validation
    phoneInput.addEventListener('blur', function() {
        const value = this.value.replace(/\D/g, '');
        if (value.length < 9 || value.length > 12) {
            this.style.borderColor = 'var(--danger-color)';
            this.setCustomValidity('Please enter a valid phone number (9-12 digits)');
        } else {
            this.style.borderColor = '';
            this.setCustomValidity('');
        }
    });
}

// ======================
// 10. FILE UPLOAD HANDLING
// ======================
function initFileUpload() {
    if (!fileInput || !fileNameDisplay) return;
    
    fileInput.addEventListener('change', function(e) {
        if (this.files.length > 0) {
            const file = this.files[0];
            const fileName = file.name;
            const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
            const fileType = file.type;
            
            // Validate file type
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (!allowedTypes.includes(fileType)) {
                alert('Please upload only PDF, JPEG, PNG, or Word documents');
                this.value = '';
                fileNameDisplay.classList.remove('show');
                return;
            }
            
            // Validate file size (max 10MB)
            if (fileSize > 10) {
                alert('File size should not exceed 10MB');
                this.value = '';
                fileNameDisplay.classList.remove('show');
                return;
            }
            
            // Display file info
            fileNameDisplay.textContent = `📄 ${fileName} (${fileSize} MB)`;
            fileNameDisplay.classList.add('show');
        } else {
            fileNameDisplay.classList.remove('show');
        }
    });
    
    // Drag and drop support
    const fileUploadLabel = document.querySelector('.file-upload-label');
    if (fileUploadLabel) {
        fileUploadLabel.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadLabel.style.backgroundColor = 'var(--light-color)';
            fileUploadLabel.style.borderColor = 'var(--secondary-color)';
        });
        
        fileUploadLabel.addEventListener('dragleave', () => {
            fileUploadLabel.style.backgroundColor = '';
            fileUploadLabel.style.borderColor = '';
        });
        
        fileUploadLabel.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadLabel.style.backgroundColor = '';
            fileUploadLabel.style.borderColor = '';
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                fileInput.dispatchEvent(new Event('change'));
            }
        });
    }
}

// ======================
// 11. CONTACT FORM SUBMISSION
// ======================
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!submitBtn) return;
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Message...';
        
        // Get form values
        const fullName = document.getElementById('fullName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const email = document.getElementById('email').value || 'Not provided';
        const serviceType = document.getElementById('serviceType').value;
        const message = document.getElementById('message').value;
        
        // Get file info if uploaded
        const fileInfo = fileInput && fileInput.files.length > 0 ? 
            `File Attached: ${fileInput.files[0].name}` : 
            'No files attached';
        
        // Create WhatsApp message
        const whatsappMessage = `*NEW SERVICE REQUEST*%0A%0A` +
                               `*Name:* ${encodeURIComponent(fullName)}%0A` +
                               `*Phone:* ${encodeURIComponent(phoneNumber)}%0A` +
                               `*Email:* ${encodeURIComponent(email)}%0A` +
                               `*Service Needed:* ${encodeURIComponent(serviceType)}%0A` +
                               `*Documents:* ${encodeURIComponent(fileInfo)}%0A%0A` +
                               `*Message:*%0A${encodeURIComponent(message)}%0A%0A` +
                               `*Sent from Website Contact Form*`;
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/255695695952?text=${whatsappMessage}`;
        
        // Update WhatsApp link
        if (whatsappLink) {
            whatsappLink.href = whatsappURL;
        }
        
        // Show success message after short delay
        setTimeout(() => {
            if (successMessage) {
                successMessage.classList.add('show');
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Reset submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Send via WhatsApp';
            
            // Auto-close success message after 15 seconds
            setTimeout(() => {
                if (successMessage && successMessage.classList.contains('show')) {
                    closeSuccessMessage();
                }
            }, 15000);
        }, 1000);
    });
}

// ======================
// 12. CLOSE SUCCESS MESSAGE
// ======================
function initCloseSuccessMessage() {
    if (!closeSuccessBtn) return;
    
    closeSuccessBtn.addEventListener('click', closeSuccessMessage);
    
    // Also close when clicking outside
    document.addEventListener('click', (e) => {
        if (successMessage && successMessage.classList.contains('show') && 
            !successMessage.contains(e.target) && 
            e.target !== submitBtn && 
            !submitBtn.contains(e.target)) {
            closeSuccessMessage();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successMessage && successMessage.classList.contains('show')) {
            closeSuccessMessage();
        }
    });
}

function closeSuccessMessage() {
    if (!successMessage || !contactForm) return;
    
    successMessage.classList.remove('show');
    contactForm.reset();
    
    // Reset file name display
    if (fileNameDisplay) {
        fileNameDisplay.classList.remove('show');
    }
    
    // Scroll to top of form
    const contactFormContainer = document.querySelector('.contact-form-container');
    if (contactFormContainer) {
        contactFormContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// ======================
// 13. FORM VALIDATION
// ======================
function initFormValidation() {
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = 'var(--secondary-color)';
            } else {
                this.style.borderColor = 'var(--danger-color)';
            }
        });
        
        input.addEventListener('blur', function() {
            if (!this.checkValidity()) {
                this.style.borderColor = 'var(--danger-color)';
            }
        });
    });
    
    // Real-time validation for email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = 'var(--warning-color)';
            } else if (this.value) {
                this.style.borderColor = 'var(--secondary-color)';
            }
        });
    }
}

// ======================
// 14. WHATSAPP FLOAT BUTTON
// ======================
function initWhatsAppFloat() {
    if (!whatsappFloat) return;
    
    // Show/hide based on scroll position
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            whatsappFloat.style.transform = 'translateY(100px)';
        } else {
            // Scrolling up
            whatsappFloat.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add click animation
    whatsappFloat.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // Analytics tracking
        console.log('WhatsApp float button clicked');
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'Contact',
                'event_label': 'Floating Button'
            });
        }
    });
}

// ======================
// 15. SERVICE SEARCH FUNCTIONALITY
// ======================
function initServiceSearch() {
    // Create search input if not exists
    if (!document.getElementById('serviceSearch') && document.querySelector('.services-categories')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'service-search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="serviceSearch" placeholder="Search services...">
                <button id="clearSearch" class="clear-search">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        const servicesSection = document.querySelector('.services-categories');
        const title = servicesSection.querySelector('.section-title');
        if (title) {
            title.parentNode.insertBefore(searchContainer, title.nextSibling);
            
            // Add CSS for search
            const style = document.createElement('style');
            style.textContent = `
                .service-search-container {
                    margin-bottom: 2rem;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                .search-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                
                .search-box i {
                    position: absolute;
                    left: 15px;
                    color: var(--text-light);
                }
                
                #serviceSearch {
                    width: 100%;
                    padding: 12px 45px 12px 45px;
                    border: 2px solid var(--secondary-color);
                    border-radius: 50px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }
                
                #serviceSearch:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(43, 108, 176, 0.2);
                }
                
                .clear-search {
                    position: absolute;
                    right: 15px;
                    background: none;
                    border: none;
                    color: var(--text-light);
                    cursor: pointer;
                    font-size: 1rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .clear-search.show {
                    opacity: 1;
                }
                
                .service-item.hidden {
                    display: none;
                }
                
                .no-results {
                    text-align: center;
                    padding: 3rem;
                    grid-column: 1 / -1;
                    color: var(--text-light);
                }
            `;
            document.head.appendChild(style);
            
            // Initialize search functionality
            const searchInput = document.getElementById('serviceSearch');
            const clearSearchBtn = document.getElementById('clearSearch');
            
            if (searchInput && clearSearchBtn) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase().trim();
                    
                    if (searchTerm) {
                        clearSearchBtn.classList.add('show');
                    } else {
                        clearSearchBtn.classList.remove('show');
                    }
                    
                    filterServices(searchTerm);
                });
                
                clearSearchBtn.addEventListener('click', function() {
                    searchInput.value = '';
                    clearSearchBtn.classList.remove('show');
                    filterServices('');
                    searchInput.focus();
                });
            }
        }
    }
}

function filterServices(searchTerm) {
    const serviceItems = document.querySelectorAll('.service-item');
    const servicesGrid = document.querySelector('.services-grid');
    let hasVisibleItems = false;
    
    // Remove existing no-results message
    const existingNoResults = document.querySelector('.no-results');
    if (existingNoResults) {
        existingNoResults.remove();
    }
    
    serviceItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const features = Array.from(item.querySelectorAll('.service-features li')).map(li => li.textContent.toLowerCase()).join(' ');
        
        if (searchTerm === '' || 
            title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            features.includes(searchTerm)) {
            item.classList.remove('hidden');
            hasVisibleItems = true;
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Add no results message
    if (!hasVisibleItems && searchTerm !== '' && servicesGrid) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results fade-in-up';
        noResults.innerHTML = `
            <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-light);"></i>
            <h3>No services found</h3>
            <p>No services match your search for "${searchTerm}"</p>
        `;
        servicesGrid.appendChild(noResults);
        setTimeout(() => noResults.classList.add('active'), 100);
    }
}

// ======================
// 16. BACK TO TOP BUTTON
// ======================
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.title = 'Back to top';
    document.body.appendChild(backToTopBtn);
    
    // Add CSS for back to top button
    const style = document.createElement('style');
    style.textContent = `
        #backToTop {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--secondary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 99;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(43, 108, 176, 0.3);
        }
        
        #backToTop.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        #backToTop:hover {
            background: var(--primary-color);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(43, 108, 176, 0.4);
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide button based on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======================
// 17. PAGE LOADER
// ======================
function initPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Loading Services...</div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Add CSS for loader
    const style = document.createElement('style');
    style.textContent = `
        #pageLoader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        #pageLoader.hidden {
            opacity: 0;
            visibility: hidden;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
            margin: 0 auto 20px;
        }
        
        .loader-text {
            color: white;
            font-size: 1.1rem;
            letter-spacing: 1px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Hide loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 800);
    });
}

// ======================
// 18. SERVICE VIEW COUNTER
// ======================
function initServiceViewCounter() {
    if (!serviceItems.length) return;
    
    // Track which services have been viewed
    const viewedServices = new Set();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const serviceTitle = entry.target.querySelector('h3');
                if (serviceTitle && !viewedServices.has(serviceTitle.textContent)) {
                    viewedServices.add(serviceTitle.textContent);
                    
                    // You can send this data to analytics
                    console.log(`Service viewed: ${serviceTitle.textContent}`);
                    
                    // Optional: Send to analytics
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'service_view', {
                            'event_category': 'Services',
                            'event_label': serviceTitle.textContent
                        });
                    }
                }
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the service is visible
    });
    
    // Observe each service item
    serviceItems.forEach(item => {
        observer.observe(item);
    });
}

// ======================
// 19. PRINT FUNCTIONALITY
// ======================
function initPrintFunctionality() {
    const printBtn = document.createElement('button');
    printBtn.id = 'printServices';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Services';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 160px;
        right: 30px;
        background: var(--warning-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(221, 107, 32, 0.3);
        transition: all 0.3s ease;
        z-index: 98;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    document.body.appendChild(printBtn);
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    printBtn.addEventListener('mouseenter', () => {
        printBtn.style.transform = 'translateY(-3px)';
        printBtn.style.boxShadow = '0 6px 20px rgba(221, 107, 32, 0.4)';
    });
    
    printBtn.addEventListener('mouseleave', () => {
        printBtn.style.transform = '';
        printBtn.style.boxShadow = '0 4px 15px rgba(221, 107, 32, 0.3)';
    });
}

// ======================
// 20. INITIALIZE ALL FUNCTIONS
// ======================
function initAll() {
    // Initialize in order
    initPageLoader();
    initMobileMenu();
    initActiveNavLink();
    initServiceParameter();
    initFadeInAnimations();
    initServiceHoverEffects();
    initGetServiceButtons();
    initSmoothScroll();
    initPhoneFormatting();
    initFileUpload();
    initContactForm();
    initCloseSuccessMessage();
    initFormValidation();
    initWhatsAppFloat();
    initServiceSearch();
    initBackToTop();
    initServiceViewCounter();
    initPrintFunctionality();
    
    // Additional initialization after DOM is fully loaded
    setTimeout(() => {
        // Set current year in footer if exists
        const yearSpan = document.querySelector('#currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
        
        // Initialize tooltips if any
        const tooltips = document.querySelectorAll('[title]');
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', function() {
                // You can add custom tooltip implementation here
            });
        });
    }, 1000);
    
    // Log initialization
    console.log('Online Services Website initialized successfully');
}

// ======================
// 21. ERROR HANDLING
// ======================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ======================
// 22. OFFLINE DETECTION
// ======================
function initOfflineDetection() {
    window.addEventListener('online', () => {
        showNotification('You are back online!', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('You are currently offline. Some features may not work.', 'warning');
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add CSS for notification
    if (!document.querySelector('.notification-style')) {
        const style = document.createElement('style');
        style.className = 'notification-style';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 1000;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                max-width: 350px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                border-left: 4px solid var(--success-color);
            }
            
            .notification-warning {
                border-left: 4px solid var(--warning-color);
            }
            
            .notification-info {
                border-left: 4px solid var(--secondary-color);
            }
            
            .notification i {
                font-size: 1.2rem;
            }
            
            .notification-success i {
                color: var(--success-color);
            }
            
            .notification-warning i {
                color: var(--warning-color);
            }
            
            .notification-info i {
                color: var(--secondary-color);
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-light);
                margin-left: auto;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Close notification on button click
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ======================
// 23. PERFORMANCE MONITORING
// ======================
function initPerformanceMonitoring() {
    // Log page load performance
    window.addEventListener('load', () => {
        if (window.performance) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            // You can send this to analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    'name': 'page_load',
                    'value': loadTime,
                    'event_category': 'Performance'
                });
            }
        }
    });
}

// ======================
// 24. LAZY LOAD IMAGES
// ======================
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ======================
// 25. INITIALIZE WHEN DOM IS READY
// ======================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAll,
        initMobileMenu,
        initContactForm,
        initSmoothScroll,
        initServiceSearch,
        showNotification
    };
}