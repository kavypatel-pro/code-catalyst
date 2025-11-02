// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Modal Functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Switch between login and register modals
function switchToRegister() {
    closeLoginModal();
    setTimeout(() => {
        openRegisterModal();
    }, 300);
}

function switchToLogin() {
    closeRegisterModal();
    setTimeout(() => {
        openLoginModal();
    }, 300);
}

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === registerModal) {
        closeRegisterModal();
    }
});

// Form Validation and Submission
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone.replace(/\D/g, ''));
}

function validatePassword(password) {
    return password.length >= 8;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = '#ef4444';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.textContent = message;
    
    formGroup.appendChild(error);
    input.style.borderColor = '#ef4444';
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    input.style.borderColor = '#e5e7eb';
}

// Login Form Handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Clear previous errors
    clearError(document.getElementById('loginEmail'));
    clearError(document.getElementById('loginPassword'));
    
    let isValid = true;
    
    // Validate email
    if (!email) {
        showError(document.getElementById('loginEmail'), 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(document.getElementById('loginEmail'), 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError(document.getElementById('loginPassword'), 'Password is required');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = event.target.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Logging in...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Set user as logged in
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Show success message
            showNotification('Login successful! Welcome to PM Internship Scheme.', 'success');
            closeLoginModal();
            
            // Update UI to show logged in state
            updateLoginState();
            
            // Redirect to questionnaire after login
            setTimeout(() => {
                window.location.href = 'questionnaire.html';
            }, 1500);
        }, 2000);
    }
}

// Register Form Handler
function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Clear previous errors
    const inputs = event.target.querySelectorAll('input, select');
    inputs.forEach(input => clearError(input));
    
    let isValid = true;
    
    // Validate first name
    if (!data.firstName.trim()) {
        showError(document.getElementById('firstName'), 'First name is required');
        isValid = false;
    }
    
    // Validate last name
    if (!data.lastName.trim()) {
        showError(document.getElementById('lastName'), 'Last name is required');
        isValid = false;
    }
    
    // Validate email
    if (!data.email) {
        showError(document.getElementById('registerEmail'), 'Email is required');
        isValid = false;
    } else if (!validateEmail(data.email)) {
        showError(document.getElementById('registerEmail'), 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    if (!data.phone) {
        showError(document.getElementById('phone'), 'Phone number is required');
        isValid = false;
    } else if (!validatePhone(data.phone)) {
        showError(document.getElementById('phone'), 'Please enter a valid 10-digit phone number');
        isValid = false;
    }
    
    // Validate education
    if (!data.education) {
        showError(document.getElementById('education'), 'Please select your education level');
        isValid = false;
    }
    
    // Validate location
    if (!data.location) {
        showError(document.getElementById('location'), 'Please select your location');
        isValid = false;
    }
    
    // Validate interests (at least one)
    const interests = formData.getAll('interests');
    if (interests.length === 0) {
        const interestsGroup = document.querySelector('.checkbox-group');
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = '#ef4444';
        error.style.fontSize = '0.875rem';
        error.style.marginTop = '0.25rem';
        error.textContent = 'Please select at least one area of interest';
        interestsGroup.appendChild(error);
        isValid = false;
    }
    
    // Validate password
    if (!data.password) {
        showError(document.getElementById('registerPassword'), 'Password is required');
        isValid = false;
    } else if (!validatePassword(data.password)) {
        showError(document.getElementById('registerPassword'), 'Password must be at least 8 characters long');
        isValid = false;
    }
    
    // Validate confirm password
    if (!data.confirmPassword) {
        showError(document.getElementById('confirmPassword'), 'Please confirm your password');
        isValid = false;
    } else if (data.password !== data.confirmPassword) {
        showError(document.getElementById('confirmPassword'), 'Passwords do not match');
        isValid = false;
    }
    
    // Validate terms
    if (!data.terms) {
        alert('Please accept the Terms of Service and Privacy Policy');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = event.target.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Creating Account...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Set user as logged in
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userName', `${data.firstName} ${data.lastName}`);
            
            // Show success message
            showNotification('Account created successfully! Welcome to PM Internship Scheme.', 'success');
            closeRegisterModal();
            
            // Update UI to show logged in state
            updateLoginState();
            
            // Redirect to questionnaire after a short delay
            setTimeout(() => {
                window.location.href = 'questionnaire.html';
            }, 1500);
        }, 2000);
    }
}

// Smooth scrolling for anchor links
function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
}

// Go to questionnaire function
function goToQuestionnaire() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        // If not logged in, show register modal first
        openRegisterModal();
    } else {
        // If logged in, go directly to questionnaire
        window.location.href = 'questionnaire.html';
    }
}

// Add smooth scrolling to all anchor links
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

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .step, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form input enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add focus/blur effects to form inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Real-time validation for email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                showError(this, 'Please enter a valid email address');
            } else {
                clearError(this);
            }
        });
    });
    
    // Real-time validation for phone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Format phone number as user types
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            this.value = value;
        });
        
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                showError(this, 'Please enter a valid 10-digit phone number');
            } else {
                clearError(this);
            }
        });
    }
    
    // Password strength indicator
    const passwordInput = document.getElementById('registerPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = getPasswordStrength(password);
            updatePasswordStrength(this, strength);
        });
    }
});

function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
}

function updatePasswordStrength(input, strength) {
    const formGroup = input.parentElement;
    let strengthIndicator = formGroup.querySelector('.password-strength');
    
    if (!strengthIndicator) {
        strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';
        strengthIndicator.style.marginTop = '0.5rem';
        formGroup.appendChild(strengthIndicator);
    }
    
    const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
    
    if (strength > 0) {
        strengthIndicator.textContent = `Password strength: ${strengthText[strength - 1]}`;
        strengthIndicator.style.color = strengthColors[strength - 1];
    } else {
        strengthIndicator.textContent = '';
    }
}

// Keyboard navigation for modals
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeLoginModal();
        closeRegisterModal();
    }
});

// Add loading states and better UX
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


// Contact form handler
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Clear previous errors
    const inputs = event.target.querySelectorAll('input, select, textarea');
    inputs.forEach(input => clearError(input));
    
    let isValid = true;
    
    // Validate name
    if (!data.name.trim()) {
        showError(document.getElementById('contactName'), 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!data.email) {
        showError(document.getElementById('contactEmail'), 'Email is required');
        isValid = false;
    } else if (!validateEmail(data.email)) {
        showError(document.getElementById('contactEmail'), 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone
    if (!data.phone) {
        showError(document.getElementById('contactPhone'), 'Phone number is required');
        isValid = false;
    } else if (!validatePhone(data.phone)) {
        showError(document.getElementById('contactPhone'), 'Please enter a valid 10-digit phone number');
        isValid = false;
    }
    
    // Validate subject
    if (!data.subject) {
        showError(document.getElementById('contactSubject'), 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    if (!data.message.trim()) {
        showError(document.getElementById('contactMessage'), 'Message is required');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = event.target.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            event.target.reset();
        }, 2000);
    }
}

// Update login state in UI
function updateLoginState() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const userName = localStorage.getItem('userName') || 'User';
    
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    
    if (isLoggedIn) {
        // Replace login and register buttons with user menu
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="user-info">
                <i class="fas fa-user-circle"></i>
                <span>${userName}</span>
            </div>
            <div class="user-dropdown">
                <a href="#" onclick="viewProfile()">Profile</a>
                <a href="#" onclick="viewApplications()">My Applications</a>
                <a href="#" onclick="logout()">Logout</a>
            </div>
        `;
        
        // Replace the login and register buttons
        const navItem = loginBtn.closest('.nav-item');
        const nextNavItem = registerBtn.closest('.nav-item');
        
        navItem.innerHTML = '';
        navItem.appendChild(userMenu);
        nextNavItem.style.display = 'none';
    }
}

// User menu functions
function viewProfile() {
    showNotification('Profile page coming soon!', 'success');
}

function viewApplications() {
    showNotification('Applications page coming soon!', 'success');
}

function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Reload page to reset UI
    location.reload();
}

// Check login state on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLoginState();
});

// Add CSS animation for fade in effect
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .user-menu {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        transition: background-color 0.3s ease;
    }
    
    .user-menu:hover {
        background-color: #f3f4f6;
    }
    
    .user-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #4F46E5;
        font-weight: 500;
    }
    
    .user-info i {
        font-size: 1.2rem;
    }
    
    .user-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        min-width: 150px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .user-menu:hover .user-dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .user-dropdown a {
        display: block;
        padding: 0.75rem 1rem;
        color: #374151;
        text-decoration: none;
        transition: background-color 0.3s ease;
    }
    
    .user-dropdown a:hover {
        background-color: #f3f4f6;
        color: #4F46E5;
    }
    
    .user-dropdown a:first-child {
        border-radius: 8px 8px 0 0;
    }
    
    .user-dropdown a:last-child {
        border-radius: 0 0 8px 8px;
    }
`;
document.head.appendChild(style);
