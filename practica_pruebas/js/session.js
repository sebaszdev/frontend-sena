// manejar la sesion de usuarios
// mirar si ya hay usuario
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
  window.location.href = "index.html";
}

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

if (registerForm) {
  registerForm.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = new FormData(registerForm);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    if (username && email && password) {
      saveUser(username.trim(), email.trim(), password.trim());
    } else {
      alert('Error en el registro');
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username && password) {
      loginUser(username, password);
    } else {
      alert('Error durante el inicio de sesion');
    }
  });
}

// funciones
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// registrarse
function saveUser(username, email, password) {
  const users = getUsers();
  
  // mirar si ya existe el usuario
  const exists = users.some(user => user.username === username);
  if (exists) {
    alert('El usuario ya existe');
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registro exitoso');
  // iniciar sesion despues de
  loginUser(username, password);
}

// iniciar sesion
function loginUser(username, password) {
  const users = getUsers();

  // usuario y contra correctas
  const user = users.find(user => {
    return user.username === username && user.password === password;
  });

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    alert('Usuario y/o contraseña incorrectas');
  }
}

