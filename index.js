import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';    
import {getFirestore, collection, getDocs, getDoc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';

jQuery.support.cors = true;

const firebaseConfig = {
    apiKey: "AIzaSyABz2XGXSyT5PS5UPqhRa43DpaXAWJRZcM",
    authDomain: "onlinestore-e87dc.firebaseapp.com",
    projectId: "onlinestore-e87dc",
    storageBucket: "onlinestore-e87dc.appspot.com",
    messagingSenderId: "501364232749",
    appId: "1:501364232749:web:6b614b7b45d5fe7a5d9ea4"
  };

  let welcome="";
  var BicyclesList = "";
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp, createUserWithEmailAndPassword );
  const db = getFirestore(firebaseApp);
  const itemsCol = collection(db, 'Items');
  const snapshot = await getDocs(itemsCol); 

  
  onAuthStateChanged(auth, user => {
    if(user != null){
        console.log('logged in');
        welcome += `<ul><a href="#">שלום${user.name}</a></ul>`;
        let userGuest = document.getElementById("TopLine")
        userGuest.innerHTML += welcome;
    }
    else{
        console.log('No user');
        welcome += `<ul><a href="login.html">שלום אורח/התחבר</a></ul>`;
        let userGuest = document.getElementById("TopLine")
        userGuest.innerHTML += welcome;
    }
  })
  
  // ***********************************************************************************************
  async function getItemsToSell(db) {
    const ItemsCol = collection(db, 'Items');
    const itemsSnapshot = await getDocs(ItemsCol);
    const ItemsList = itemsSnapshot.docs.map(doc => doc.data());
    
    ItemsList.forEach((item) => {
      if(item.quantityAvailable > 0)
      {
        BicyclesList += `<li><a href="${item.web}">${item.Manufacturer}</a></li>`;
      }
    })
    return ItemsList;
  }
  // ***********************************************************************************************
  let itemsToSell = getItemsToSell(db);
  console.log(itemsToSell.ItemsList);
  const querySnapshot = await getDocs(collection(db, "Items"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());

});



let manuContainer = document.getElementById("BicyclesList")
manuContainer.innerHTML = BicyclesList;



  // createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });
