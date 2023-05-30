import firebase from "firebase/app";  //* iniciafirebase
import "firebase/auth";   //* inicia fire auth
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js";


// * Firebase Configuración inicial del proyecto
const firebaseConfig = {
    apiKey: "AIzaSyDc5VAgj7ApSveTTNZJjx-7zSWh4bk9ayk",
    authDomain: "f1-fantasy-1f8d9.firebaseapp.com",
    projectId: "f1-fantasy-1f8d9",
    storageBucket: "f1-fantasy-1f8d9.appspot.com",
    messagingSenderId: "452499597572",
    appId: "1:452499597572:web:89e770086a89aca02e8851"
};
  

//* Initialize Firebase
firebase.initializeApp(firebaseConfig);



const app = initializeApp(firebaseConfig);   // Initialize Firebase
const auth = firebase.auth();   //Initialize FireAuth
const user = auth.currentUser;  //Initialize FireAuth
const db = getFirestore(app);   //Initialize DDBB
const storage = getStorage();   //Initialize cloudstore



let signUpForm = document.getElementById("signUp_form");
let logInForm = document.getElementById("logIn_form");
let logOutButton = document.getElementById("logOut_button")


//*Sign up function --------------------------
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let userName = document.getElementById('signup-username').value;
    let userEmail = document.getElementById('signup-email').value;
    let userPass = document.getElementById('signup-pass').value;
    let repPass = document.getElementById('signup-reppass').value;
    let userImg = document.getElementById('signup-img').value;
    // const usersRef = collection(db, "users");   //llamada a la colección USERS
    const signUpImg = document.getElementById('signup-picture').files[0];  //asigna files a variable
    const storageRef = ref(storage, signUpImg.name);
    let imageUrl;
    if(password != repPass){
        alert("Repeated password did not match with the first one.")
        return;
    }
    try{  //CREATE AUTH USER
        await createUserWithEmailAndPassword(auth, userName, userEmail, userPass)
        .then((userCredential) => {
            console.log('User registered');
            const user = userCredential.user;
            // signUpForm.reste();
        })
        //UPLOAD IMG TO CLOUD STORAGE
        await uploadBytes(storageRef, userImg).then(async (snapshot) => {
            console.log('Uploaded profile pic!')
            imageUrl = await getDownloadURL(storageRef);
          })

    }catch (error) {
      console.log('Error: ', error)
    }
})




//* Log in function -----------------------------
logInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let userNameLog = document.getElementById("login-username").value;
    let userPassLog = document.getElementById("login-pass").value;

    auth.signInWithEmailAndPassword(userNameLog, userPassLog)
    .then((userCredential) => {
      console.log('User authenticated')
      const user = userCredential.user;
      logInForm.reset();
    })
    .then(() => {
        console.log(`Hello, ${userNameLog}`);
      })
    .catch((error) => {
      alert("Invalid user or password.");
      console.log('Invalid user or password');
      const errorCode = error.code;
      const errorMessage = error.message;
    });

})


//* CAMBIAR MENÚ LOGIN POR SIGNUP
let signUpButton = document.getElementById('signupFreeButton');
signUpButton.addEventListener('click', (event)=>{
    event.preventDefault();
    let logInForm = document.getElementById('logIn_form');
    let signUpForm = document.getElementById('signUp_form');
    logInForm.style.display = 'none'
    signUpForm.style.display = 'flex'
})
