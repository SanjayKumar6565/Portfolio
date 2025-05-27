document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.bar-fill');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }
    
    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements on scroll
    gsap.utils.toArray('.animate__animated').forEach(element => {
        const animationClass = Array.from(element.classList).find(cls => cls.startsWith('animate__'));
        if (animationClass) {
            const animationName = animationClass.replace('animate__', '');
            
            ScrollTrigger.create({
                trigger: element,
                start: "top 80%",
                onEnter: () => {
                    element.classList.add(animationClass);
                },
                once: true
            });
        }
    });
    
    // Animate skill bars when skills section is in view
    ScrollTrigger.create({
        trigger: "#skills",
        start: "top 70%",
        onEnter: animateSkillBars,
        once: true
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Typewriter effect for code animation
    const codeElement = document.querySelector('.code-animation pre code');
    if (codeElement) {
        const codeText = codeElement.textContent;
        codeElement.textContent = '';
        
        let i = 0;
        const typewriter = setInterval(() => {
            if (i < codeText.length) {
                codeElement.textContent += codeText.charAt(i);
                i++;
                codeElement.scrollTop = codeElement.scrollHeight;
            } else {
                clearInterval(typewriter);
            }
        }, 20);
    }
});