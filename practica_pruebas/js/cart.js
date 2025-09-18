const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// si no esta loggeado sacar
if (!currentUser) {
  window.location.href = "index.html";
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

function getCatalog() {
  return JSON.parse(localStorage.getItem('catalog'));
}

function getInventory() {
  return JSON.parse(localStorage.getItem('inventory')) || {};
}

function saveInventory(inventory) {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

function renderCarrito() {
  const user = getCurrentUser();
  if (!user) {
  }
  const userInv = getUserInventory(user.username);
  const catalog = getCatalog();

  if (userInv.carrito.length === 0) {
    document.querySelector('#carrito-container').innerHTML = '';
    document.querySelector('main').innerHTML += '<p>El carrito esta vacio</p>';
    return;
  }

  const cartHTML = userInv.carrito.map(id => {
    const pelicula = catalog[id];
    if (!pelicula) return "";
    return `
      <div class="carrito-tarjeta">
        <img src="${pelicula.imagen}" alt="${pelicula.titulo} poster" />
        <div class="carrito-tarjeta-content">
          <h3>${pelicula.titulo}</h3>
          <p>${pelicula.descripcion}</p>
          <button class="btn-salir btn-quitar" data-movie-id="${id}">Quitar</button>
        </div>
      </div>
    `;
  }).join("");

  document.querySelector('#carrito-peliculas').innerHTML = cartHTML;

  // poner el evento a todos los botones quitar
  document.querySelectorAll('.btn-quitar').forEach(btn => {
    btn.addEventListener('click', ev => {
      ev.preventDefault();

      const id = btn.getAttribute('data-movie-id');
      removeMovie(id);
      renderCarrito();
    });
  });


  // colocar la informacion acerca de las peliculas
  const resumenCarrito = userInv.carrito.map(id => {
    const pelicula = catalog[id];
    if (!pelicula) return;
    return pelicula.titulo;
  }).join(", ");

  document.getElementById("comprar-btn-container").innerHTML = `
    <h3>Resumen</h3>
    <p>Peliculas: ${resumenCarrito}</p>
    <hr />
    <button id="comprar-btn" class="btn-primario">Comprar todo</button>
  `;

  const comprarBtn = document.getElementById('comprar-btn');
  if (comprarBtn) {
    comprarBtn.addEventListener("click", () => {
      const user = getCurrentUser();
      if (!user) return alert("Debes iniciar sesión para comprar.");

      const username = user.username;
      const userInventory = getUserInventory(username);

      if (userInventory.carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }

      // Filtrar duplicados por si ya tenía películas compradas
      const nuevasPeliculas = userInventory.carrito.filter(
        id => !userInventory.propias.includes(id)
      );

      userInventory.propias.push(...nuevasPeliculas);
      userInventory.carrito = []; // Vaciar carrito

      saveUserInventory(username, userInventory);

      alert("¡Compra realizada con éxito!");
      window.location.href = "inventory.html"; // o como se llame tu página
    });
  }
}

renderCarrito();

function getUserInventory(username) {
  const inventory = getInventory();
  return inventory[username] || { propias: [], carrito: [] };
}

function saveUserInventory(username, userInventory) {
  const inventory = getInventory();
  inventory[username] = userInventory;
  saveInventory(inventory);
}



function removeMovie(movieId) {
  const user = getCurrentUser();
  if (!user) return alert("Debes iniciar sesion");
  const userInv = getUserInventory(user.username);
  // eliminar la pelicula del carrito
  carritoNuevo = userInv.carrito.filter(el => el != movieId);
  userInv.carrito = carritoNuevo;
  saveUserInventory(user.username, userInv);
}

