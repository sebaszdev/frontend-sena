const form = document.querySelector("form");
const card = document.querySelector(".main-card");
const btn = document.getElementById('btn-restart');

form.addEventListener('submit', (ev) => {
  ev.preventDefault(); // prevent reload page

  const formData = new FormData(ev.currentTarget);
  const name = formData.get('card-name');
  if (!name) {
    alert("Ingresa un nombre");
    return;
  }
  const img = formData.get('img');
  if (!img) {
    alert("Ingresa un link para una imagen")
    return;
  }
  const desc = formData.get('description');

  card.innerHTML = `
    <div class="name-container">
      <h2>${name}</h2>
    </div>
    <div class="img-container">
      <img src="${img}" />
    </div>
    
    ${desc ? `
      <div class="description-container">
        <p>${desc}</p>
      </div>` : ''}
    
  `;
});

if (btn) {
  btn.addEventListener('click', (ev) => {
    ev.preventDefault();
  
    card.innerHTML = '';
  });
}
