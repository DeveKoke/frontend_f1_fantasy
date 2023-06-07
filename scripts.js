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
if(signUpButton){
signUpButton.addEventListener('click', (event)=>{
    event.preventDefault();
    let logInForm = document.getElementById('logIn_form');
    let signUpForm = document.getElementById('signUp_form');
    logInForm.style.display = 'none'
    signUpForm.style.display = 'flex'
})
}


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
if(signUpForm){
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
          .then (() => {        // Ejecutar window.location.href después de 1500 milisegundos (1.5 segundos)
            setTimeout(function() {
              window.location.href = "home.html";
            }, 500);
          }); //? Cambiar de documento HTML al registrarse.
  }catch (error) {
    console.log(`There has been an error with code: ${error.code}: ${error.message}`)
  } 
})
}


//* Log in function -----------------------------
if(logInForm){
logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let userEmail = document.getElementById("login-userEmail").value;
  let userPassLog = document.getElementById("login-pass").value;
  if (!emailRegex.test(userEmail)) {
    alert("Invalid email format");
    return;
  }
  if (!passwordRegex.test(userPassLog)) {
    alert("Invalid password format. It should have at least 6 characters and include letters and numbers.");
    return;
  }
  auth.signInWithEmailAndPassword(userEmail, userPassLog)
  .then((userCredential) => {
    console.log('User authenticated')
    const user = userCredential.user;
    logInForm.reset();
  })
  .then(() => {
      window.location.href = 'home.html';    //? Cambiar de documento HTML al registrarse.
      console.log(`Hello, ${userEmail}`);
    })
  .catch((error) => {
    alert("Invalid user or password. Try again");
    console.log('Invalid user or password');
    console.log(`There has been an error with code: ${error.code}: ${error.message}`)
  });

})
}


//* Crear identificador usuario en nav
const userName = document.getElementById('userBar');
let state = auth.onAuthStateChanged(user => {
if(user){
  db.collection("users").where("email", "==", user.email)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        let userInfo = doc.data();
    let userNav = `<div class="userNav">
    <img src="assets/usuario.png" alt="user" id="userImg">
    <p class="userNameNav">${userInfo.user_name}</p>
    </div>`
    userName.innerHTML = userNav;
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  })
}else{
    console.log('No logged user');
    document.querySelector(".kindWrapper").classList.add("hideCard");
    document.querySelector(".auth_form").classList.remove("hideCard");
  }
})



//* LOGOUT function.
const logOutButton = document.getElementById("logOutButton");
if(logOutButton){
logOutButton.addEventListener('click', function (){
    auth.signOut().then(() => {
      window.location.href = "index.html";  
    }).catch((error) => {
      console.log('Error: ', error)
    });
})
}



//* HAMBURGUER MENU DEL NAVBAR Y SU DESPLIEGUE   ---------------------------------
const menu = document.getElementById('menu')
const menuIcon = document.getElementById('menu_icon')
const menuUl = document.createElement('ul'); 
menuUl.setAttribute('class','menu_ul');

if(menuIcon){
  menuIcon.addEventListener('click', () => {
    const menuItems = `
    <li><a href="drivers.html">DRIVERS</a></li>
    <li><a href="home.html">YOUR TEAM</a></li>
    <li><a href="resultados.html">RESULTS</a></li>
    <li><a href="liga.html">LEAGUE</a></li>
  `;
  if (menuUl.style.display === 'none') {
    setTimeout(function() {
      menu.style.opacity = '1';
    }, 100);
    menuUl.style.display = 'flex';
    menu.style.borderTop = 'solid';
    menu.style.borderTopColor = 'rgb(203, 25, 25)';
  } else {
    menuUl.style.display = 'none';
    menu.style.borderTop = 'none';
  }
  menu.appendChild(menuUl);
  menuUl.innerHTML= menuItems;
  });
}


//* FUNCIÓN LLAMADA A LA API
var arrIndex = 0;
const driversList = ["vers","per"] 
// ,"lec" ,"sai","lew","russ","alo","stro","nor","pia"];
let driversInfo = [];
let driver_card = document.getElementById('driver-card');

async function getDriverInfoCard(driverId) {
  try {       
    const response = await fetch(`OOhttps://v1.formula-1.api-sports.io/drivers?search=${driverId}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
        "x-rapidapi-key": "8cd55f4fc36d00125765355eaf63e045"
      }
    });

    const driverData = await response.json();
    return driverData;
  } catch (error) {
    console.error("Error fetching driver info:", error);
    return null;
  }
}


//* FUNCIÓN PARA PINTAR MINITARJETA
async function create_MiniCard() {
  for (let i = 0; i < driversList.length; i++) {
    const driverId = driversList[i];
    const driverInfo = await getDriverInfoCard(driverId);
    driversInfo.push(driverInfo);
  }
  for (let i = 0; i < driversInfo.length; i++) {
    const accordion = document.getElementById('accordion');
    const driverInfo = driversInfo[i];
    const driverName = driverInfo.response[0].name;
    const driverImg = driverInfo.response[0].image;

    let driver_MiniCard = `
    <label class='accordion__item'>
        <input type="check" name="driver_checked">
        <h2>${driverName}</h2>
        <div id="driver-FP">
            <img src="${driverImg}" alt="piloto ${driverName}">
        </div>
    </label>
    `;
    accordion.innerHTML += driver_MiniCard;
  }
}
create_MiniCard()



//* FUNCIÓN ACORDEON
var accordionItems = document.querySelectorAll('.accordion__item');

accordionItems.forEach(function(item) {
  item.addEventListener('click', function() {
    // Verificar si el elemento está abierto
    var isOpen = this.classList.contains('open');

    // Si el elemento está abierto, cerrarlo
    if (isOpen) {
      this.classList.remove('open');
    } else {
      // Si el elemento está cerrado, cerrar todos los demás y abrir este
      accordionItems.forEach(function(item) {
        item.classList.remove('open');
      });
      this.classList.add('open');
    }
  });
});



// //* FUNCIÓN PARA PINTAR TARJETA COMPLETA

// //todo añadir addEventListener cuando se hace clicky se muestre esta función

// async function fetchDriverInfo() {
//   for (let i = 0; i < driversList.length; i++) {
//     const driverId = driversList[i];
//     const driverInfo = await getDriverInfoCard(driverId);
//     driversInfo.push(driverInfo);
//   }
  
//   console.log(driversInfo);
//   // Puedes hacer más operaciones con los datos de los conductores aquí
//   for (let i = 0; i < driversInfo.length; i++) {
//     const driverInfo = driversInfo[i];
//     const driverName = driverInfo.response[0].name;
//     const driverImg = driverInfo.response[0].image;
//     const driverNumber = driverInfo.response[0].number;
//     const driverCountry = driverInfo.response[0].country.name;
//     const driverChamps = driverInfo.response[0].world_championships;
//     const driverRaces = driverInfo.response[0].grands_prix_entered;
//     const driverVic = driverInfo.response[0].highest_race_finish.number;
//     const driverPodiums = driverInfo.response[0].podiums;
//     const driverPoints = driverInfo.response[0].areer_points;

//     console.log(driverName, driverNumber, driverRaces);
//     let driverCard = `
//       <h2>${driverName}</h2>
//       <div id="driver-FP">
//         <img src="${driverImg}" alt="piloto ${driverName}">
//         <p>Number: ${driverNumber}</p>
//       </div>
//       <p>Country: ${driverCountry}</p>
//       <p>World Championships: ${driverChamps}</p>
//       <p>Races: ${driverRaces}</p>
//       <p>Victories: ${driverVic}</p>
//       <p>Podiums: ${driverPodiums}</p>
//       <p>Career Points: ${driverPoints}</p>
//     `;

//     carouselCards.innerHTML = driverCard;
//     cardContainer.appendChild(carouselCards);
//   }
// }

// fetchDriverInfo();







