window.addEventListener("load",loadWindow);

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';    
import {getFirestore, collection, getDocs, getDoc, addDoc, doc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyABz2XGXSyT5PS5UPqhRa43DpaXAWJRZcM",
    authDomain: "onlinestore-e87dc.firebaseapp.com",
    projectId: "onlinestore-e87dc",
    storageBucket: "onlinestore-e87dc.appspot.com",
    messagingSenderId: "501364232749",
    appId: "1:501364232749:web:6b614b7b45d5fe7a5d9ea4"
  };

  var firebaseApp;
  // firebase.initializeApp(firebaseConfig);
  var auth;
  var db;
  // const db = firebase.firestore();
  var itemsCol;
  var snapshot;
  var UsersList;

  async function loadWindow(){
    firebaseApp = initializeApp(firebaseConfig);
    // firebase.initializeApp(firebaseConfig);
     auth = getAuth(firebaseApp, createUserWithEmailAndPassword );
     db = getFirestore(firebaseApp);
    // const db = firebase.firestore();
    itemsCol = collection(db, 'usersList');
     snapshot = await getDocs(itemsCol);
     UsersList = snapshot.docs.map(doc => doc.data());

let btn_submit = document.getElementById("submit_btn");
btn_submit.addEventListener("click",signup);
  }
  async function signup(){
  var first = document.getElementById("firstName").value;
  var last = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
// UsersList.foreach((user) =>{
//     if (email == user.Email) {
//         alert("email already exists");
//         return false;
//     }
//    })
var userData = {
  firstName: first,
  lastName: last,
  Email: email,
  password: pass,
}
var usersRef = collection(db, 'usersList')
var addUserRef = await addDoc(usersRef,userData).then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
  console.error("Error adding document: ", error);
  });

  //  const res2 = await addDoc(collection(db, 'usersList'), {
  //   firstName: first,
  //   lastName: last,
  //   Email: email,
  //   password: pass,
  // });
  
  console.log('Added user: ');

}


