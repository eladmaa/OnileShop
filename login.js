import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';    
import {getFirestore, collection, getDocs, getDoc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyABz2XGXSyT5PS5UPqhRa43DpaXAWJRZcM",
    authDomain: "onlinestore-e87dc.firebaseapp.com",
    projectId: "onlinestore-e87dc",
    storageBucket: "onlinestore-e87dc.appspot.com",
    messagingSenderId: "501364232749",
    appId: "1:501364232749:web:6b614b7b45d5fe7a5d9ea4"
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const itemsCol = collection(db, 'users');
  const snapshot = await getDocs(itemsCol); 

document.getElementById("btnLogin").addEventListener("click",validate =>{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const UsersList = snapshot.docs.map(doc => doc.data());
    UsersList.foreach((user) => {
        if ( username == user.userName.value && password == user.password.value){
            alert ("Login successfully");
            window.location = "index.html"; // Redirecting to other page.
            return false;
    }
        else{
            alert ("Login failed");
            return true;
        }
    
})
})
document.getElementById("btnSignUp").addEventListener("click",signup =>{
    document.getElementById("username").innerHTML += '<input id="username" type="text" placeholder="Enter Username" name="uname">'
    window.location = "signup.html";
})

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
