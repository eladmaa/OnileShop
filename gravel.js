window.addEventListener("load",loadWindow);

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';    
import {getFirestore, collection, getDocs, getCountFromServer, addDoc, getDoc, setDoc, doc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyABz2XGXSyT5PS5UPqhRa43DpaXAWJRZcM",
    authDomain: "onlinestore-e87dc.firebaseapp.com",
    projectId: "onlinestore-e87dc",
    storageBucket: "onlinestore-e87dc.appspot.com",
    messagingSenderId: "501364232749",
    appId: "1:501364232749:web:6b614b7b45d5fe7a5d9ea4"
  };
  
  

  let welcome="";
  let cart_count = 0;
  var itemPrice = 0;
  var BicyclesList = "";
  var AccessoriesList = "";
  var firebaseApp;
  var itemsSnapshot;
  var ItemsList;
  var ItemsCol2;
  var db;
  var ItemsCol
  var ItemsList;
  var itemPhoto = "gravel_photo.jpg ";

   // ***********************************************************************************************
   async function getCartQuantity(db) {
    const ItemsCol = collection(db, 'shoppingList');
    const snapshot = await getCountFromServer(ItemsCol);
    var ret = snapshot.data().count;
    console.log('count: ', snapshot.data().count);
    return ret;
  }
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
    return BicyclesList;
  }
  // ***********************************************************************************************
  async function getAccessToSell(db) {
    const ItemsCol2 = collection(db, 'Accessories');
    const itemsSnapshot2 = await getDocs(ItemsCol2);
    const ItemsList2 = itemsSnapshot2.docs.map(doc => doc.data());
    
    ItemsList2.forEach((item) => {
      
        AccessoriesList += `<li><a href="${item.web}">${item.name}</a></li>`;
      
    })
    return ItemsList2;
  }

  async function loadWindow(){
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
    ItemsCol = collection(db, 'Items');
    itemsSnapshot = await getDocs(ItemsCol);
    ItemsList = itemsSnapshot.docs.map(doc => doc.data());
    ItemsList.forEach(element => {
        if (element.Manufacturer == 'Gravel')
        {
          itemPrice = element.price;
          var cart = document.getElementById("AddToCart");
          cart.innerHTML += `<label> price: ${itemPrice} $<\label>`
        }
    });
    let bikesToSell = getItemsToSell(db).then((result) =>{
      let manuContainer = document.getElementById("BicyclesList")
      manuContainer.innerHTML = BicyclesList;
    });
    let AccessoriesToSell = getAccessToSell(db).then((result) => {
      let AccessoriesManu = document.getElementById("AccessoriesList")
      AccessoriesManu.innerHTML = AccessoriesList;
  });
  cart_count = getCartQuantity(db).then((result) => {
  var span = document.getElementById("cart_qnt");
  span.textContent = '('+result+')';
  });

    let btn_submit = document.getElementById("btn_addToCart")
    btn_submit.addEventListener("click",add_item);

  }

  
async function add_item(){
    console.log("HI THERE")
    var shoppingListItems = collection(db,'shoppingList')
    var data = {
      itemName: 'Gravel',
      quantity:1,
      price: itemPrice,
      photo: itemPhoto,
    }

    var shoppingListItems123 = await addDoc(shoppingListItems, data).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("1 Gravel bicycle added to cart")
      cart_count = getCartQuantity(db).then((result) => {
        var span = document.getElementById("cart_qnt");
        span.textContent = '('+result+')';
        });
      })
      .catch((error) => {
      console.error("Error adding document: ", error);
      });
    // const res = await setDoc(doc(db, 'shoppingList', 'Gravel'),{
    //     quantity: 1,
    //   });
      
      console.log('Added item to shopping list: ');
}
