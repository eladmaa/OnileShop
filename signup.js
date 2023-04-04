import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';    
import {getFirestore, collection, getDocs, getDoc, setDoc, doc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';


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

var first = document.getElementById("firstName").value;
var last = document.getElementById("lastName").value;
var email = document.getElementById("email").value;
var pass = document.getElementById("password").value;

let btn_submit = document.getElementById("submit_btn");
btn_submit.addEventListener("click",signup);

async function signup(){
   var id = email;
   itemsCol.foreach((user) =>{
    if (email == user.Email) {
        alert("email already exists");
        return false;
    }
   })
   const res = await setDoc(doc(db, 'users', '1'), {
    firstName: first,
    lastName: last,
    Email: email,
    password: pass,
  });
  
  console.log('Added user: ');

}