import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';    
import {getFirestore, collection, deleteDoc, getDocs, getCountFromServer, getDoc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';

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
  var ItemsInCart = [];
  let cart_count = 0;
  var BicyclesList = "";
  var ItemsList = "";
  var AccessoriesList = "";
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
  async function getAccessToSell(db) {
    const ItemsCol2 = collection(db, 'Accessories');
    const itemsSnapshot2 = await getDocs(ItemsCol2);
    const ItemsList2 = itemsSnapshot2.docs.map(doc => doc.data());
    
    ItemsList2.forEach((item) => {
      
        AccessoriesList += `<li><a href="${item.web}">${item.name}</a></li>`;
      
    })
    return ItemsList2;
  }
  // ***********************************************************************************************
  async function getCartQuantity(db) {
    const ItemsCol = collection(db, 'shoppingList');
    const snapshot = await getCountFromServer(ItemsCol);
    var ret = snapshot.data().count;
    return ret;
  }
  // ***********************************************************************************************
  let bikesToSell = getItemsToSell(db);
  const querySnapshot = await getDocs(collection(db, "Items"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data())
 
});
//*************************************************************************************************
async function showItems(db){
    var ItemsListToShow="";
    const snapshot = await getDocs(collection(db, "shoppingList"));
    snapshot.forEach((item) =>{
        ItemsListToShow += showItem(item.data());
        ItemsInCart += item;
    })
    return ItemsListToShow;
}

let AccessoriesToSell = getAccessToSell(db);
  const querySnapshot2 = await getDocs(collection(db, "Accessories"));
  querySnapshot2.forEach((doc) => {
 
});
cart_count = getCartQuantity(db).then((result) => {
  var span = document.getElementById("cart_qnt");
  span.textContent = '('+result+')';
});
ItemsList =  showItems(db).then((result) =>{
    let ItemsInCart = document.getElementById("itemsInCart")
    ItemsInCart.innerHTML = result;
});
let po_btn = document.getElementById("purchase").addEventListener("click", updateDB(db));

async function updateDB(db){
  ItemsInCart.forEach((item) =>{
    deleteItem(item);
    updateQuantity(item);
})
allert("Thank you for you business");
  allert("Come back soon");
}
// *******************************************************************************************
async function deleteItem(item){
  await deleteDoc(doc(db,'shoppingList', item));
}
async function updateQuantity(item){
  const querySnapshot = await getDocs(collection(db, "Items"));
  querySnapshot.forEach((doc) => {
    if (doc.data().Manufacturer == item.itemName)
      {
        doc.data().quantityAvailable--;
      }
 
});
}
// *******************************************************************************************

let manuContainer = document.getElementById("BicyclesList")
manuContainer.innerHTML = BicyclesList;
let AccessoriesManu = document.getElementById("AccessoriesList")
AccessoriesManu.innerHTML = AccessoriesList;

function showItem(item){
    return '<div class="card rounded-3 mb-4">'+
                '<div class="card-body p-4">'+
                  '<div class="row d-flex justify-content-between align-items-center">'+
                    '<div class="col-md-2 col-lg-2 col-xl-2">'+
                      '<img '+
                        `src=${item.photo}`+
                        'class="img-fluid rounded-3">'+
                    '</div>'+
                    '<div class="col-md-3 col-lg-3 col-xl-3">'+
                      `<p class="lead fw-normal mb-2">${item.itemName}</p>`+
                    '</div>'+
                    
                    '<div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">'+
                      `<h5 class="mb-0">${item.price}</h5>`+
                    '</div>'+
                    '<div class="col-md-1 col-lg-1 col-xl-1 text-end">'+
                      '<a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>';
                    
}