const card = document.querySelector('.card');
const btn = document.getElementById('btn-change');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content')
const closeModal = document.getElementById('close-modal');
let currentScheme = null;

const colorSchemes = {
  Default: {
    background: "#1e1e2e",
    secondBackground: "#313244",
    text: "#cdd6f4",
  },
  RosewaterScheme: {
    background: "#f5e0dc",
    secondBackground: "#f9e2af",
    text: "#313244",
  },
  FlamingoScheme: {
    background: "#f2cdcd",
    secondBackground: "#f5e0dc",
    text: "#45475a",
  },
  PeachScheme: {
    background: "#fab387",
    secondBackground: "#f9e2af",
    text: "#1e1e2e",
  },
  BlueScheme: {
    background: "#89b4fa",
    secondBackground: "#b4befe",
    text: "#11111b",
  },
};

function applyRandomScheme() {
  const keys = Object.keys(colorSchemes);
  let randomKey;
  
  do {
    randomKey = keys[Math.floor(Math.random() * keys.length)];
  } while (randomKey === currentScheme && keys.length > 1);

  applyScheme(colorSchemes[randomKey], randomKey);
}

function applyScheme(scheme, schemeKey) {
  currentScheme = schemeKey;

  document.body.style.backgroundColor = scheme.background;
  document.body.style.color = scheme.text;
  card.style.backgroundColor = scheme.secondBackground;
  modalContent.style.backgroundColor = scheme.secondBackground;
  modalContent.style.color = scheme.text;
  
  modal.classList.remove('hidden');
}

btn.addEventListener('click', () => {
  applyRandomScheme();
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
})
