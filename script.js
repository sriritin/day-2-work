// Smooth scrolling for navigation links
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

// Form submission handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const formData = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toLocaleString()
        };

        // Store in localStorage (since we can't send to a server)
        let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        // Show success message
        showFormMessage('Thank you for reaching out! I\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill cards, project cards, and section content
document.querySelectorAll('.skill-card, .project-card, .education-item, .experience-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Hamburger menu for mobile (optional enhancement)
document.addEventListener('DOMContentLoaded', function () {
    // Add mobile responsiveness for navigation
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile menu toggle could be added here if needed
});

// Add typing animation to hero title
function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize animations on page load
window.addEventListener('load', function () {
    // Optional: Add typing animation to hero title
    // Uncomment the line below if you want the title to type out
    // const heroTitle = document.querySelector('.hero h1');
    // typeWriter(heroTitle, 'Sriritin Sudina', 50);
});

// Log stored messages (for debugging - can be removed in production)
function getStoredMessages() {
    const messages = localStorage.getItem('contactMessages');
    console.log('Stored contact messages:', JSON.parse(messages) || []);
}

// Prevent console errors if elements don't exist
console.log('Resume website loaded successfully!');
console.log('Contact form is ready for submissions');
