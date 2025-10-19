document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const darkModeIcon = darkModeToggle.querySelector('i');
    const darkModeText = darkModeToggle.querySelector('span'); // Asegúrate de que el span existe en el HTML

    // Función para aplicar o remover el modo oscuro
    const setDarkMode = (isDark) => {
        if (isDark) {
            body.classList.add('dark');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            darkModeText.textContent = 'Modo Claro'; // Cambia el texto del botón
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark');
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            darkModeText.textContent = 'Modo Oscuro'; // Cambia el texto del botón
            localStorage.setItem('darkMode', 'disabled');
        }
    };

    // 1. Intentar cargar la preferencia guardada en localStorage
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode === 'enabled') {
        setDarkMode(true);
    } else if (savedDarkMode === 'disabled') {
        setDarkMode(false);
    } else {
        // 2. Si no hay preferencia guardada, verificar la preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true); // Activa modo oscuro si el sistema lo prefiere
        } else {
            setDarkMode(false); // Por defecto, modo claro si no hay preferencia guardada ni del sistema oscuro
        }
    }

    // 3. Manejar el click del botón para alternar el modo oscuro
    darkModeToggle.addEventListener('click', () => {
        // Alterna el estado actual
        setDarkMode(!body.classList.contains('dark'));
    });

    // Smooth scroll para los enlaces de la barra de navegación
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Obtener la altura de la navbar para el offset del scroll
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Cerrar la navbar en móviles después de hacer clic en un enlace
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

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('¡Mensaje enviado! 📧 Gracias por contactarme, Juan Pérez.');
            contactForm.reset();
        });
    }
});
