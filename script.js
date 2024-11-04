// Inicializar y expandir la mini app en Telegram
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
    }
});
// Detectar dispositivo y ajustar la visibilidad del contenido
window.addEventListener('load', function () {  
    if (window.matchMedia("(min-width: 768px)").matches || !/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)) {
        // Oculta el contenido principal y la barra de navegación en pantallas grandes o dispositivos no móviles
        document.getElementById("inicio-section").style.display = "none";
        document.querySelector(".navbar").style.display = "none";
        document.getElementById("desktop-warning").style.display = "block";
    } else {
        // Muestra el contenido principal y la barra de navegación en dispositivos móviles
        document.getElementById("inicio-section").style.display = "block";
        document.querySelector(".navbar").style.display = "flex";
        document.getElementById("desktop-warning").style.display = "none";
    }
});

// Función para cambiar de sección
function showSection(sectionId, element = null) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    document.getElementById(sectionId).style.display = 'block';

    // Remover la clase 'active' de todos los botones de navegación
    const navbarItems = document.querySelectorAll('.navbar-item');
    navbarItems.forEach(item => {
        item.classList.remove('active');
    });

    // Agregar la clase 'active' al botón de navegación correspondiente
    if (element) {
        element.classList.add('active');
    } else {
        // Si no se proporciona 'element', activar el botón de navegación de la sección seleccionada
        const targetNavItem = document.querySelector(`.navbar-item[onclick*="${sectionId}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }
    }
}
