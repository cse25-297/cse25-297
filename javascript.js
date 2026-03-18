document.addEventListener('DOMContentLoaded', function() {
    
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        
            this.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
        });

        
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }

   
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-full');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                
                filterBtns.forEach(b => b.classList.remove('active'));
                
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        
        function validateName(name) {
            if (!name.trim()) {
                return 'Name is required';
            }
            if (name.trim().length < 2) {
                return 'Name must be at least 2 characters';
            }
            return '';
        }

        function validateEmail(email) {
            if (!email.trim()) {
                return 'Email is required';
            }
        
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                return 'Please enter a valid email address';
            }
            return '';
        }

        function validatePhone(phone) {
            if (!phone.trim()) {
                return 'Phone number is required';
            }
            
            const phonePattern = /^[\d\s\-+()]{10,}$/;
            if (!phonePattern.test(phone)) {
                return 'Please enter a valid phone number (at least 10 digits)';
            }
            return '';
        }

        function validateService(service) {
            if (!service) {
                return 'Please select a service';
            }
            return '';
        }

        function validateMessage(message) {
            if (!message.trim()) {
                return 'Message is required';
            }
            if (message.trim().length < 10) {
                return 'Message must be at least 10 characters';
            }
            return '';
        }

        
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + '-error');
            
            if (field && errorElement) {
                if (message) {
                    field.classList.add('error');
                    errorElement.textContent = message;
                } else {
                    field.classList.remove('error');
                    errorElement.textContent = '';
                }
            }
        }

        
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const serviceField = document.getElementById('service');
        const messageField = document.getElementById('message');

        if (nameField) {
            nameField.addEventListener('blur', function() {
                showError('name', validateName(this.value));
            });
        }

        if (emailField) {
            emailField.addEventListener('blur', function() {
                showError('email', validateEmail(this.value));
            });
        }

        if (phoneField) {
            phoneField.addEventListener('blur', function() {
                showError('phone', validatePhone(this.value));
            });
        }

        if (serviceField) {
            serviceField.addEventListener('change', function() {
                showError('service', validateService(this.value));
            });
        }

        if (messageField) {
            messageField.addEventListener('blur', function() {
                showError('message', validateMessage(this.value));
            });
        }

        
        document.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('focus', function() {
                this.classList.remove('error');
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

        
            const name = nameField ? nameField.value : '';
            const email = emailField ? emailField.value : '';
            const phone = phoneField ? phoneField.value : '';
            const service = serviceField ? serviceField.value : '';
            const message = messageField ? messageField.value : '';


            const nameError = validateName(name);
            const emailError = validateEmail(email);
            const phoneError = validatePhone(phone);
            const serviceError = validateService(service);
            const messageError = validateMessage(message);

    
            showError('name', nameError);
            showError('email', emailError);
            showError('phone', phoneError);
            showError('service', serviceError);
            showError('message', messageError);

            
            if (!nameError && !emailError && !phoneError && !serviceError && !messageError) {
                
                if (successMessage) {
                    successMessage.classList.add('show');
                }
                
            
                contactForm.reset();
                
            
                if (successMessage) {
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                setTimeout(function() {
                    if (successMessage) {
                        successMessage.classList.remove('show');
                    }
                }, 5000);
            }
        });
    }

  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

  

});