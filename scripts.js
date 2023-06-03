// * Firebase Configuración inicial del proyecto ----------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyDc5VAgj7ApSveTTNZJjx-7zSWh4bk9ayk",
    authDomain: "f1-fantasy-1f8d9.firebaseapp.com",
    projectId: "f1-fantasy-1f8d9",
    storageBucket: "f1-fantasy-1f8d9.appspot.com",
    messagingSenderId: "452499597572",
    appId: "1:452499597572:web:89e770086a89aca02e8851"
};



//* HAMBURGUER MENU DEL NAVBAR Y SU DESPLIEGUE
const menu = document.getElementById('menu')
const menuIcon = document.getElementById('menu_icon')
const menuUl = document.createElement('ul'); 
menuUl.setAttribute('class','menu_ul');

menuIcon.addEventListener('click', () => {
  const menuItems = `
  <li><a href="home.html">TU EQUIPO</a></li>
  <li><a href="resultados.html">RESULTADOS</a></li>
  <li><a href="liga.html">LIGA</a></li>
`;

  menuUl.innerHTML= menuItems;
  if (menuUl.style.display === 'none') {
    menuUl.style.display = 'flex';
  } else {
    menuUl.style.display = 'none';
  }
  menu.appendChild(menuUl)

});










// const firebaseInitialize = firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase
// const db = firebase.firestore();// db representa mi BBDD //inicia Firestore
// const auth = firebase.auth();   //Initialize FireAuth
// const user = auth.currentUser;  //Initialize FireAuth


// const app = initializeApp(firebaseConfig);   // Initialize Firebase
// const db = getFirestore(app);   //Initialize DDBB
//*----------------------------------------------------------------------------------------------

let signUpForm = document.getElementById("signUp_form");
let logInForm = document.getElementById("logIn_form");
let logOutButton = document.getElementById("logOut_button");
const emailRegex = /^[\w\._]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

//* CAMBIAR MENÚ LOGIN => SIGNUP
let signUpButton = document.getElementById('signupFreeButton');
signUpButton.addEventListener('click', (event)=>{
    event.preventDefault();
    let logInForm = document.getElementById('logIn_form');
    let signUpForm = document.getElementById('signUp_form');
    logInForm.style.display = 'none'
    signUpForm.style.display = 'flex'
})

//* CREAR DOCUMENTO DE USUARIO EN FIRESTORE
const createUser = (user)=>{
  // event.preventDefault();
  console.log(user);
  db.collection("users")
  .add(user)
  // .then((userName) => console.log("Document written with ID: ", userName.id))
  .then((docRef) => console.log("Document written with ID: ", docRef.id))  //* => meter identificador random = docRef
  .catch((error) => console.error("Error adding document: ", error));

};

//*Sign up function y creación de documento de usuario en FIRESTORE  ----------------
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let userName = document.getElementById('signup-username').value;
    let userEmail = document.getElementById('signup-email').value;
    let userPass = document.getElementById('signup-pass').value;
    let repPass = document.getElementById('signup-reppass').value;

    if (!emailRegex.test(userEmail)) {
      alert("Invalid email format");
      return;
    }
    if (!passwordRegex.test(userPass)) {
      alert("Invalid password format. It should have at least 6 characters and include letters and numbers.");
      return;
    }
    if(userPass != repPass){
        alert("Repeated password did not match with the first one.")
        return;
    }
    try{  //CREATE AUTH USER
        await auth.createUserWithEmailAndPassword(userEmail, userPass)
        .then((userCredential) => {
            console.log('User registered');
            const user = userCredential.user;
            signUpForm.reset();
            window.location.href = 'home.html';    //? Cambiar de documento HTML al registrarse.

            // Guarda El usuario en Firestore
            createUser({                  
              user_name: userName,
              email: userEmail,
              });
        })
    }catch (error) {
      console.log(`There has been an error with code: ${error.code}: ${error.message}`)
    } 
})


//* Log in function -----------------------------
logInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let userNameLog = document.getElementById("login-userEmail").value;
    let userPassLog = document.getElementById("login-pass").value;
    if (!emailRegex.test(userEmail)) {
      alert("Invalid email format");
      return;
    }
    if (!passwordRegex.test(userPass)) {
      alert("Invalid password format. It should have at least 6 characters and include letters and numbers.");
      return;
    }
    auth.signInWithEmailAndPassword(userNameLog, userPassLog)
    .then((userCredential) => {
      console.log('User authenticated')
      const user = userCredential.user;
      logInForm.reset();
    })
    .then(() => {
        window.location.href = 'home.html';    //? Cambiar de documento HTML al registrarse.
        console.log(`Hello, ${userNameLog}`);
      })
    .catch((error) => {
      alert("Invalid user or password. Try again");
      console.log('Invalid user or password');
      console.log(`There has been an error with code: ${error.code}: ${error.message}`)
    });

})


//* Crear identificador usuario en nav
// function createUserBar(userName){
//   const header = document.getElementById('headerHome');
//   let user_idBar = `<div class="idBar">
//                   <p>Hello, ${userName}</p>
//                   </div>`;
//   header.innerHTML += user_idBar;
// }


