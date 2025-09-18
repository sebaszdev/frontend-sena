// si no existe catalogo crearlo
const catalog = getCatalog();
if (!catalog) {
  const peliculasCatalogo = {
    "el-padrino": {
      titulo: "El Padrino",
      imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.ZkJXLF-c-7_qHrNP2pxbmQAAAA%3Fpid%3DApi&f=1&ipt=a0e22ba0f29d1b02182a2d4da4f77a02225715e78c14214ceca00fcb76670c96&ipo=images",
      descripcion: "La historia de la familia mafiosa Corleone y su lucha por el poder en Nueva York."
    },
    "forrest-gump": {
      titulo: "Forrest Gump",
      imagen: "https://duckduckgo.com/i/d9ffa182df1c60b6.jpg",
      descripcion: "Un hombre con un bajo coeficiente intelectual presencia y participa en eventos históricos de Estados Unidos."
    },
    "matrix": {
      titulo: "Matrix",
      imagen: "https://duckduckgo.com/i/1f7c8c88e36e3577.png",
      descripcion: "Un hacker descubre la verdad sobre su realidad y se une a la rebelión contra las máquinas."
    },
    "el-senor-de-los-anillos-la-comunidad-del-anillo": {
      titulo: "El Señor de los Anillos: La Comunidad del Anillo",
      imagen: "https://duckduckgo.com/i/7542dcb16a0e0ae2.jpg",
      descripcion: "Un grupo de héroes se embarca en una misión para destruir el Anillo Único y salvar la Tierra Media."
    },
    "pulp-fiction": {
      titulo: "Pulp Fiction",
      imagen: "https://duckduckgo.com/i/2534d02a622109ac.jpg",
      descripcion: "Historias entrelazadas de crimen y redención en Los Ángeles."
    },
    "la-la-land": {
      titulo: "La La Land",
      imagen: "https://duckduckgo.com/i/49a809afde339b1e.png",
      descripcion: "Un músico y una actriz luchan por sus sueños en Los Ángeles mientras viven una historia de amor."
    },
    "gladiador": {
      titulo: "Gladiador",
      imagen: "https://duckduckgo.com/i/cf8fe5c7096b1f3b.png",
      descripcion: "Un general romano busca venganza tras ser traicionado y convertido en esclavo."
    },
    "avatar": {
      titulo: "Avatar",
      imagen: "https://duckduckgo.com/i/421081d9c3e024e5.jpg",
      descripcion: "Un ex-marine se embarca en una misión en el planeta Pandora y se une a los Na'vi."
    },
    "el-viaje-de-chihiro": {
      titulo: "El viaje de Chihiro",
      imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.5Rf65QHEcV7uVmWyqAbFtgHaKb%3Fpid%3DApi&f=1&ipt=25900866e3532780e7edf690fc40fb549a2a824d08595d370ba2bd94b7134815&ipo=images",
      descripcion: "Una niña queda atrapada en un mundo mágico y debe encontrar la manera de salvar a sus padres."
    },
    "jurassic-park": {
      titulo: "Jurassic Park",
      imagen: "https://duckduckgo.com/i/0518541de7a7e50c.jpg",
      descripcion: "Un parque temático con dinosaurios clonados se convierte en una pesadilla cuando los animales escapan."
    },
    "spider-man-un-nuevo-universo": {
      titulo: "Spider-Man: Un nuevo universo",
      imagen: "https://duckduckgo.com/i/fdaf864c78ec27e9.jpg",
      descripcion: "El joven Miles Morales se convierte en Spider-Man y conoce a otros héroes de diferentes dimensiones."
    },
    "los-increibles": {
      titulo: "Los Increíbles",
      imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.wZDoQ0kY2HYTCwLwn-3MDQHaLH%3Fpid%3DApi&f=1&ipt=626db3a6c8e2437988bc2b6563b1c5370cf11660addd33848ee6cfaf008504fe&ipo=images",
      descripcion: "Una familia de superhéroes intenta vivir una vida normal mientras enfrentan nuevos villanos."
    },
    "el-gran-hotel-budapest": {
      titulo: "El Gran Hotel Budapest",
      imagen: "https://duckduckgo.com/i/a0b60627778588df.png",
      descripcion: "Las aventuras de un conserje y su joven protegido en un famoso hotel europeo."
    }
  };
  saveCatalog(peliculasCatalogo);
  // actualizar
  renderCatalog(getCatalog());
} else {
  renderCatalog(catalog);
}

// funciones
function getCatalog() {
  const catalog = JSON.parse(localStorage.getItem('catalog'));
  return catalog;
}

function saveCatalog(catalog) {
  localStorage.setItem('catalog', JSON.stringify(catalog));
}

function crearTarjetaHTML(id, { titulo, imagen, descripcion }) {
  return `
    <div id="${id}" class="pelicula-tarjeta">
      <h3>${titulo}</h3>
      <img src="${imagen}" alt="${titulo} poster" />
      <p>${descripcion}</p>
    </div>
  `;
}

function renderCatalog(catalog) {
  const tarjetasHTML = Object.entries(catalog)
    .map(([id, data]) => crearTarjetaHTML(id, data))
    .join("");

  document.querySelector('.catalogo-container').innerHTML = tarjetasHTML;
  document.querySelectorAll('.pelicula-tarjeta').forEach(el => {
    el.addEventListener('click', (ev) => {
      abrirPopupPelicula(ev.currentTarget.id);
      });
  });
}

let selectedMovieId = null;

function abrirPopupPelicula(id) {
  const peliculasCatalogo = getCatalog();
  const pelicula = peliculasCatalogo[id];
  if (!pelicula) return;

  selectedMovieId = id;

  const modal = document.getElementById("popup-modal");
  const header = document.getElementById("popup-header");
  const title = document.getElementById("popup-title");
  const description = document.getElementById("popup-description");

  // Set data
  header.style.backgroundImage = `url(${pelicula.imagen})`;
  title.textContent = pelicula.titulo;
  description.textContent = pelicula.descripcion;

  // Mostrar modal
  modal.classList.remove("hidden");
}

document.getElementById('popup-agregar-btn').addEventListener('click', ev => {
  ev.preventDefault();
  const user = getCurrentUser();
  if (!user) {
    alert("Debes iniciar sesión para añadir al carrito.");
    return;
  }
  if (!selectedMovieId) {
    alert("No hay película seleccionada.");
    return;
  }
  addToCart(user.username, selectedMovieId);
  cerrarPopup();
});

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener("click", (e) => {
  const modal = document.getElementById("popup-modal");

  if (e.target === modal) {
    cerrarPopup();
  }
});

function cerrarPopup() {
  document.getElementById("popup-modal").classList.add("hidden");
}

function getCurrentUser() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser;
}

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

function addToCart(username, movieId) {
  const userInv = getUserInventory(username);

  if (!userInv.carrito.includes(movieId) && !userInv.propias.includes(movieId)) {
    userInv.carrito.push(movieId);
    saveUserInventory(username, userInv);
    alert("Película añadida al carrito.");
  } else {
    alert("Esta película ya está en el carrito o ya la posees.");
  }
}

