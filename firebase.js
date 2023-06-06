// * Firebase Configuración inicial del proyecto ----------------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyDc5VAgj7ApSveTTNZJjx-7zSWh4bk9ayk",
    authDomain: "f1-fantasy-1f8d9.firebaseapp.com",
    projectId: "f1-fantasy-1f8d9",
    storageBucket: "f1-fantasy-1f8d9.appspot.com",
    messagingSenderId: "452499597572",
    appId: "1:452499597572:web:89e770086a89aca02e8851"
};

const firebaseInitialize = firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase
const db = firebase.firestore();// db representa mi BBDD //inicia Firestore
const auth = firebase.auth();   //Initialize FireAuth
const user = auth.currentUser;  //Initialize FireAuth


// const app = initializeApp(firebaseConfig);   // Initialize Firebase
// const db = getFirestore(app);   //Initialize DDBB
//*----------------------------------------------------------------------------------------------

let signUpForm = document.getElementById("signUp_form");
let logInForm = document.getElementById("logIn_form");
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

//* CREAR DOCUMENTO DE COLECCION USERS EN FIRESTORE
const createUser = (user)=>{
    // let userName = document.getElementById('signup-username').value;
  // event.preventDefault();
  console.log(user);
  db.collection("users")
  .add(user)
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
          console.log(user);
          signUpForm.reset();
          // Guarda El usuario en Firestore
          createUser({                  
            email: user.email,
            user_name: userName
            });
          })
          .then (() => {
            window.location.href = "home.html";
          }); //? Cambiar de documento HTML al registrarse.
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


//* LOGOUT function.
const logOutButton = document.getElementById("logOutButton");
logOutButton.addEventListener('click', function (){
    auth.signOut().then(() => {
      console.log('Logout user');

    }).catch((error) => {
      console.log('Error: ', error)
    });
})