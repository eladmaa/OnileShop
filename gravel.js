window.addEventListener("load",loadWindow);

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
  

 
  async function loadWindow(){
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const ItemsCol = collection(db, 'Items');
    const itemsSnapshot = await getDocs(ItemsCol);
    const ItemsList = itemsSnapshot.docs.map(doc => doc.data());
  var price=0;
    ItemsList.forEach(element => {
        if (element.Manufacturer == 'Gravel')
        {
            price = element.price;
        }
    });
    var cart = document.getElementById("AddToCart");
    cart.innerHTML += `<label> price: ${price} $<\label>`

  }

  let btn_submit = document.getElementById("btn_addToCart")
    btn_submit.addEventListener("click",add);

async function add(){
    console.log("HI THERE")
    const res = await setDoc(doc(db, 'shoppingList', 'Gravel'),{
        quantity: 1,
      });
      
      console.log('Added item to shopping list: ');
}
