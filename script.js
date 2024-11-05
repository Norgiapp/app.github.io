// Inicializar y expandir la mini app en Telegram
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand(); // Expande la app a pantalla completa
        
        // Cambiar la franja superior a negro y el texto a blanco
        Telegram.WebApp.setHeaderColor('bg_color'); // Cambia el color de fondo de la barra
        Telegram.WebApp.setHeaderTextColor('white'); // Cambia el color del texto de la barra

        // Renderizar las tareas al cargar la página solo si Telegram está listo
        renderTareas();
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

// Array con todas las tareas
const tareas = [
    { icon: "📢", text: "¡Sígue nuestro canal!", reward: "+1 Coin" },
    { icon: "📢", text: "¡Síguenos en Instagram!", reward: "+1 Coin" },
    { icon: "📢", text: "¡Comparte en Twitter!", reward: "+1 Coin" },
    { icon: "📢", text: "¡Invita a un amigo!", reward: "+2 Coins" },
    { icon: "📢", text: "¡Completa una encuesta!", reward: "+3 Coins" },
    // Añade más tareas aquí según sea necesario
];

// Función para renderizar las tareas
function renderTareas() {
    const inicioTasksContainer = document.getElementById("inicio-tasks-list");
    const tareasContainer = document.getElementById("tareas-list");

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
