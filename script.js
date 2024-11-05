// Asegurarse de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si la API de Telegram está disponible
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        // Indicar que la aplicación está lista
        Telegram.WebApp.ready();
        // Expandir la aplicación a pantalla completa
        Telegram.WebApp.expand();
        // Establecer el color de fondo de la barra superior
        Telegram.WebApp.setHeaderColor('#000000'); // Negro
    } else {
        console.error('La API de Telegram WebApp no está disponible.');
    }

    // Renderizar las tareas en las secciones correspondientes
    renderTareas();
});

// Detectar dispositivo y ajustar la visibilidad del contenido
window.addEventListener('load', function () {
    if (window.matchMedia("(min-width: 768px)").matches || !/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)) {
        // Ocultar contenido principal y barra de navegación en pantallas grandes o dispositivos no móviles
        document.getElementById("inicio-section").style.display = "none";
        document.querySelector(".navbar").style.display = "none";
        document.getElementById("desktop-warning").style.display = "block";
    } else {
        // Mostrar contenido principal y barra de navegación en dispositivos móviles
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

// Array con todas las tareas
const tareas = [
    { icon: "📢", text: "¡Sígue nuestro canal!", reward: "+1 Moneda" },
    { icon: "📢", text: "¡Síguenos en Instagram!", reward: "+1 Moneda" },
    { icon: "📢", text: "¡Comparte en Twitter!", reward: "+1 Moneda" },
    { icon: "📢", text: "¡Invita a un amigo!", reward: "+2 Monedas" },
    { icon: "📢", text: "¡Completa una encuesta!", reward: "+3 Monedas" },
    // Añade más tareas aquí según sea necesario
];

// Función para renderizar las tareas en ambas secciones
function renderTareas() {
    const inicioTasksContainer = document.getElementById("inicio-tasks-list");
    const tareasContainer = document.getElementById("tareas-list");

    // Limpiar contenido actual antes de renderizar
    inicioTasksContainer.innerHTML = "";
    tareasContainer.innerHTML = "";

    // Mostrar solo las primeras 5 tareas en "Inicio"
    tareas.slice(0, 5).forEach(task => {
        inicioTasksContainer.innerHTML += `
            <div class="task">
                <span class="task-icon">${task.icon}</span>
                <p>${task.text}<br><span>${task.reward}</span></p>
                <button class="task-button">Seguir</button>
            </div>
        `;
    });

    // Mostrar todas las tareas en la sección de "Tareas"
    tareas.forEach(task => {
        tareasContainer.innerHTML += `
            <div class="task">
                <span class="task-icon">${task.icon}</span>
                <p>${task.text}<br><span>${task.reward}</span></p>
                <button class="task-button">Seguir</button>
            </div>
        `;
    });
}
