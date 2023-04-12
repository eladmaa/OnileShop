window.addEventListener("load",loadWindow);

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';    
import {getFirestore, collection, getDocs, addDoc, getDoc, setDoc, doc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyABz2XGXSyT5PS5UPqhRa43DpaXAWJRZcM",
    authDomain: "onlinestore-e87dc.firebaseapp.com",
    projectId: "onlinestore-e87dc",
    storageBucket: "onlinestore-e87dc.appspot.com",
    messagingSenderId: "501364232749",
    appId: "1:501364232749:web:6b614b7b45d5fe7a5d9ea4"
  };
  
  var firebaseApp;
  var db;
  var itemsSnapshot;
  var ItemsCol
  var ItemsList;
  var itemPrice=0;
  var itemPhoto = ""

  
  async function loadWindow(){
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
    ItemsCol = collection(db, 'Items');
    itemsSnapshot = await getDocs(ItemsCol);
    ItemsList = itemsSnapshot.docs.map(doc => doc.data());
    ItemsList.forEach(element => {
        if (element.Manufacturer == 'BMX')
        {
          itemPrice = element.price;
          itemPhoto = "bmxPhoto.png "
        }
    });
    var cart = document.getElementById("AddToCart");
    cart.innerHTML += `<label> price: ${price} $<\label>`

    let btn_submit = document.getElementById("btn_addToCart")
    btn_submit.addEventListener("click",add_item);

  }

  
async function add_item(){
    console.log("HI THERE")
    var shoppingListItems = collection(db,'shoppingList')
    var data = {
      itemName: 'BMX',
      quantity:1,
      price: itemPrice,
      photo: itemPhoto,
    }

    var shoppingListItems123 = await addDoc(shoppingListItems, data).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("1 BMX added to cart")
      })
      .catch((error) => {
      console.error("Error adding document: ", error);
      });
    // const res = await setDoc(doc(db, 'shoppingList', 'Gravel'),{
    //     quantity: 1,
    //   });
      
      console.log('Added item to shopping list: ');
}
