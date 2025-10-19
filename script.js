document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const darkModeIcon = darkModeToggle.querySelector('i');
    const darkModeText = darkModeToggle.querySelector('span');

    // Function to set dark mode
    const setDarkMode = (isDark) => {
        if (isDark) {
            body.classList.add('dark');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            darkModeText.textContent = 'Modo Claro';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark');
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            darkModeText.textContent = 'Modo Oscuro';
            localStorage.setItem('darkMode', 'disabled');
        }
    };

    // Check for saved dark mode preference or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        setDarkMode(true);
    } else if (savedDarkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Auto-detect system preference only if no explicit user preference is saved
        setDarkMode(true);
    } else {
        setDarkMode(false); // Ensure light mode is set if no dark preference
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
        setDarkMode(!body.classList.contains('dark'));
    });

    // Smooth scroll for navbar links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close navbar on mobile after clicking a link
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent actual form submission
            alert('¡Mensaje enviado! 📧 Gracias por contactarme, Juan Pérez.');
            contactForm.reset(); // Clear the form
        });
    }

    // Update active navbar link on scroll (Bootstrap's scrollspy handles this, but custom logic for offset might be needed)
    // For Bootstrap 5, ensure `data-bs-spy="scroll"` and `data-bs-target="#mainNav"` are on the body tag.
    // The `data-bs-offset="50"` in body is crucial for correcting scroll position below fixed navbar.
});