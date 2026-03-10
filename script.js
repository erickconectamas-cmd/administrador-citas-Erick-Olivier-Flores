let citas = JSON.parse(localStorage.getItem("citas")) || [];

function login() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensajeLogin");

  if (usuario === "admin" && password === "1234") {
    localStorage.setItem("sesionActiva", "true");
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("appSection").style.display = "block";
    mostrarCitas();
  } else {
    mensaje.textContent = "Usuario o contraseña incorrectos";
  }
}

function cerrarSesion() {
  localStorage.removeItem("sesionActiva");
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("appSection").style.display = "none";
}

function agregarCita() {
  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const motivo = document.getElementById("motivo").value;

  if (nombre === "" || fecha === "" || hora === "" || motivo === "") {
    alert("Completa todos los campos");
    return;
  }

  const nuevaCita = {
    id: Date.now(),
    nombre,
    fecha,
    hora,
    motivo
  };

  citas.push(nuevaCita);
  localStorage.setItem("citas", JSON.stringify(citas));

  document.getElementById("nombre").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("hora").value = "";
  document.getElementById("motivo").value = "";

  mostrarCitas();
}

function mostrarCitas() {
  const lista = document.getElementById("listaCitas");
  lista.innerHTML = "";

  if (citas.length === 0) {
    lista.innerHTML = "<p>No hay citas registradas.</p>";
    return;
  }

  citas.forEach(cita => {
    lista.innerHTML += `
      <div class="cita">
        <strong>Nombre:</strong> ${cita.nombre}<br>
        <strong>Fecha:</strong> ${cita.fecha}<br>
        <strong>Hora:</strong> ${cita.hora}<br>
        <strong>Motivo:</strong> ${cita.motivo}<br>
        <button onclick="eliminarCita(${cita.id})">Eliminar</button>
      </div>
    `;
  });
}

function eliminarCita(id) {
  citas = citas.filter(cita => cita.id !== id);
  localStorage.setItem("citas", JSON.stringify(citas));
  mostrarCitas();
}

window.onload = function() {
  const sesionActiva = localStorage.getItem("sesionActiva");

  if (sesionActiva === "true") {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("appSection").style.display = "block";
    mostrarCitas();
  }
};