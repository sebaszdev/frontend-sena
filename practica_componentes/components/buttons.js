const cardCreator = document.querySelector('.main-card');
const btn = document.getElementById('btn-restart');

btn.addEventListener('click', (ev) => {
  ev.preventDefault();

  cardCreator.innerHTML = '';
});
