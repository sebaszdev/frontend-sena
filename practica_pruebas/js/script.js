// botones en el nav y footer en funcion de la sesion
const inSessionButtons = [
  `<li><a href="cart.html">Carrito</a></li>
  <li><a href="inventory.html">Mi biblioteca</a></li>
  <li><button id="btn-logout" class="btn-salir">Salir</button></li>`,
  `<li><a href="index.html">Inicio</a></li>
  <li><a href="catalog.html">Explorar</a></li>
  <li><a href="inventory.html">Mi biblioteca</a></li>
  <li><a href="about.html">Acerca de</a></li>`
];

const outSessionButtons = [
  `<li><a href="register.html">Registro</a></li>
  <li><a href="login.html">Iniciar sesión</a></li>`,
  `<li><a href="index.html">Inicio</a></li>
  <li><a href="catalog.html">Explorar</a></li>
  <li><a href="about.html">Acerca de</a></li>`
];

const onSession = `
  <p>Explora nuestro catalogo de peliculas</p>
  <div id="btns-inicio">
    <a href="catalog.html" class="btn-index">Ir a catalogo</a>
  </div>
`;

const outSession = `
  <p>Registrate o inicia sesión para poder acceder al cátalogo de peliculas y escribir tus reseñas</p>
  <div id="btns-inicio">
    <a href="register.html" class="btn-index">Registro</a>
    <a href="login.html" class="btn-index">Iniciar sesión</a>
  </div>
`;

window.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (currentUser) {
    document.querySelectorAll('.nav-final-container').forEach(el => {
      el.innerHTML = inSessionButtons[0];
    });
    document.querySelectorAll('.footer-links ul').forEach(el => {
      el.innerHTML = inSessionButtons[1];
    });
    
    document.getElementById('btn-logout').addEventListener("click", ev => {
      ev.preventDefault();
      logOut();
    });

    if (window.location.pathname.includes("index.html")) {
      document.getElementById('informacion-sesion').innerHTML = onSession;
    }
  } else {
    document.querySelectorAll('.nav-final-container').forEach(el => {
      el.innerHTML = outSessionButtons[0];
    });
    document.querySelectorAll('.footer-links ul').forEach(el => {
      el.innerHTML = outSessionButtons[1];
    });

    if (window.location.pathname.includes("index.html")) {
      document.getElementById('informacion-sesion').innerHTML = outSession;
    }
  }
});

// salir de la sesion
function logOut() {
  localStorage.removeItem('currentUser');
  window.location.href = "index.html";
}

