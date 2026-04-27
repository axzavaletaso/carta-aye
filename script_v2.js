const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");
const musica = document.getElementById('musica-carta');
const modal = document.getElementById('modal-pregunta');
const btnSi = document.getElementById('btn-si');
const btnNo = document.getElementById('btn-no');

document.addEventListener("click", (e) => {
    // 1. Reproducir música
    if (musica && musica.paused) {
        musica.play().catch(error => {
            console.log("Esperando interacción para sonar...");
        });
    }

    // 2. Lógica para abrir/cerrar el sobre
    if (e.target.matches(".sobre") || 
        e.target.matches(".solapa-derecha") ||
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon")) {
        
        envoltura.classList.toggle("abierto");
    } 
    
    // 3. Lógica para sacar la carta
    else if (e.target.matches(".sobre *") || e.target.matches(".carta") || e.target.matches(".contenido")) {
        if (!carta.classList.contains("abierta")) {
            carta.classList.add("mostrar-carta");

            setTimeout(() => {
                carta.classList.remove("mostrar-carta");
                carta.classList.add("abierta");
                
                // --- LANZAR PREGUNTA DESPUÉS DE LEER ---
                // Aparece después de 8 segundos para que le dé tiempo de leer un poco
                setTimeout(() => {
                    modal.style.display = "block";
                }, 8000);

            }, 500);
            
            envoltura.classList.add("desactivar-sobre");
        } else {
            // Lógica para cerrar si ya estaba abierta
            carta.classList.add("cerrando-carta");
            envoltura.classList.remove("desactivar-sobre");

            setTimeout(() => {
                carta.classList.remove("cerrando-carta");
                carta.classList.remove("abierta");
            }, 500);
        }
    } 
});

// EVENTO BOTÓN SÍ: Envía notificación y muestra alerta
btnSi.addEventListener("click", () => {
    // Notificación a Formspree (reemplaza con tu link si es necesario, he usado el que me diste)
    fetch("https://formspree.io/f/mvzdnbpk", {
        method: "POST",
        body: JSON.stringify({ 
            Respuesta: "¡Dijo que SÍ!", 
            Persona: "Caroline ❤️" 
        }),
        headers: { 'Accept': 'application/json' }
    }).then(() => {
        alert("¡Me haces la persona más feliz del mundo! ❤️ 😍");
        modal.style.display = "none";
    });
});

// EVENTO BOTÓN NO: Se escapa (broma clásica)
btnNo.addEventListener("mouseover", () => {
    const x = Math.random() * (window.innerWidth - btnNo.clientWidth);
    const y = Math.random() * (window.innerHeight - btnNo.clientHeight);
    btnNo.style.position = "fixed";
    btnNo.style.left = x + "px";
    btnNo.style.top = y + "px";
});