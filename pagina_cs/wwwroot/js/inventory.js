const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const path = window.location.pathname.toLowerCase();

// si no esta loggeado sacar
if (!currentUser && (path.includes("/inventory"))) {
  window.location.href = "/Home/Index";
}

// funciones
function getInventory() {
  return JSON.parse(localStorage.getItem("inventory")) || {};
}

function saveInventory(inventory) {
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

function getUserInventory(username) {
  const inventory = getInventory();
  return inventory[username] || { propias: [], carrito: [] };
}

function saveUserInventory(username, userInventory) {
  const inventory = getInventory();
  inventory[username] = userInventory;
  saveInventory(inventory);
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

function renderInventario() {
  const user = getCurrentUser();
  if (!user) return alert("Inicia sesión primero.");

  const inv = getInventory()[user.username] || { propias: [], carrito: [] };
  const catalog = getCatalog();
  const container = document.getElementById("inventario-container");

  if (inv.propias.length === 0) {
    container.innerHTML = "<p>No has comprado ninguna película todavía.</p>";
    return;
  }

  container.innerHTML = inv.propias.map(id => {
    const peli = catalog[id];
    return `
      <div class="pelicula-tarjeta">
        <h3>${peli.titulo}</h3>
        <img src="${peli.imagen}" alt="${peli.titulo}" />
        <p>${peli.descripcion}</p>
      </div>
    `;
  }).join("");
}

renderInventario();

