//Sign up function --------------------------------There is a strange error here
signUpForm.addEventListener("submit", async function (event){
    event.preventDefault();

    let userName = document.getElementById("signIn_user_name").value;
    let email = document.getElementById("signIn_email").value;
    let password = document.getElementById("signIn_password").value;
    let repPassword = document.getElementById("signIn_repeat_password").value;

    if(password != repPassword){
        alert("Repeated password did not match with the first one.")
        return;
    }

    try {
        //Create auth user
        await auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userCredential.user.updateProfile({
                    displayName: name
                });
                console.log('User registered');
                let user = userCredential.user;
                console.log(user);
                signUpForm.reset();
            });
    } catch(error) {
        console.log(`There has been an error with code: ${error.code}: ${error.message}`)
    }

})
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const signUpEmail = document.getElementById('signup-email').value;
    const signUpPassword = document.getElementById('signup-pass').value;
    const signUpUser = document.getElementById('signup-user').value;
    const usersRef = collection(db, "users");
    const signUpImg = document.getElementById('signup-picture').files[0];
    const storageRef = ref(storage, signUpImg.name);
    let publicImageUrl;
    try {
      //Create auth user
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then((userCredential) => {
        console.log('User registered')
        const user = userCredential.user;
        signUpForm.reset();
      })
      //Upload file to cloud storage
      await uploadBytes(storageRef, signUpImg).then(async (snapshot) => {
        console.log('Uploaded a blob or file!')
        publicImageUrl= await getDownloadURL(storageRef);
      })
      //Create document in DB
      await setDoc(doc(usersRef, signUpEmail), {
        username: signUpUser,
        email: signUpEmail,
        profile_picture: publicImageUrl})
    } catch (error) {
      console.log('Error: ', error)
    }
        
  })


  //LOGIN FUNCTION -------------------------------------
  //Login function
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-pass').value;
    //Call the collection in the DB
    const docRef = doc(db, "users", loginEmail);
    //Search a document that matches with our ref
    console.log(docRef);
    const docSnap = await getDoc(docRef);
  
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        console.log('User authenticated')
        const user = userCredential.user;
        loginForm.reset();
      })
      .then(() => {
        if (docSnap.exists()) {
          console.log(docSnap.data())
          userData.style.cssText = 'background-color: #73AB84;width: 50%;margin: 2rem auto;padding: 1rem;border-radius: 5px;display: flex;flex-direction: column;align-items: center';
          userData.innerHTML = `<h3>User Data</h3>
                                <p>Username: ${docSnap.data().username}</p>
                                <p>Email: ${docSnap.data().email}</p>
                                <img src=${docSnap.data().profile_picture} alt='User profile picture'>`
     
        } else {
          console.log("No such document!");
      }})
      .catch((error) => {
        document.getElementById('msgerr').innerHTML='Invalid user or password';
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  })