window.addEventListener("load",loadWindow);
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';    
import {getFirestore, collection, getDocs, getCountFromServer, getDoc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';

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
  let cart_count = 0;
  var itemPrice = 0;
  var BicyclesList = "";
  var AccessoriesList = "";
  var firebaseApp;
  var itemsSnapshots;
  var ItemsList;
  var ItemsCol2;
  var db;
  let bikesToSell;
  
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
  // ***********************************************************************************************
  async function getCartQuantity(db) {
    const ItemsCol = collection(db, 'shoppingList');
    const snapshot = await getCountFromServer(ItemsCol);
    var ret = snapshot.data().count;
    console.log('count: ', snapshot.data().count);
    return ret;
  }
  // ***********************************************************************************************
  
  const querySnapshot = await getDocs(collection(db, "Items"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});



  const querySnapshot2 = await getDocs(collection(db, "Accessories"));
  querySnapshot2.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
cart_count = getCartQuantity(db).then((result) => {
  var span = document.getElementById("cart_qnt");
  span.textContent = '('+result+')';
});



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

  
  async function loadWindow(){
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);

    bikesToSell = getItemsToSell(db).then((result) =>{
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

    const ItemsCol2 = collection(db, 'caynon');
    const itemsSnapshot = await getDocs(ItemsCol2);
    ItemsList = itemsSnapshot.docs.map(doc => doc.data());
    ItemsList.forEach(element => {
        if (element.name == 'caynon')
        {
            itemPrice = element.price;
            var cart = document.getElementById("canyon_price");
            cart.innerHTML += `<label> price: ${itemPrice} $<\label>`

            let btn_buyCanyon = document.getElementById("btn_addCanyon")
            btn_buyCanyon.addEventListener("click",add_canyon(element.data()));
        }
    });
    
    const ItemsCol = collection(db, 'Accessories');
    itemsSnapshots = await getDocs(ItemsCol).then(getAccessories);
    async function getAccessories(){
        const AccessoriesCol = collection(db, 'caynon');
        const AccessorySnapshot = await getDocs(AccessoriesCol);
            const ItemsList = AccessorySnapshot.docs.map(doc => doc.data());
                ItemsList.forEach(element => {
                if(element.name == 'canyon')
                {
                    itemPrice = element.price;
                    var cart = document.getElementById("canyon_price");
                    cart.innerHTML += `<label> price: ${itemPrice} $<\label>`

                    let btn_buyCanyon = document.getElementById("btn_addCanyon")
                    btn_buyCanyon.addEventListener("click",add_canyon(element.data()));
                }
            })
        }    
    
    };
    
    
    


    // ***********************************************************************************************
  
 
 
async function add_canyon(item){
    var shoppingListItems = collection(db,'shoppingList')
    var data = {
      itemName: item.name,
      quantity:1,
      price: itemPrice,
      photo: itemPhoto,
    }

    var shoppingListItems123 = await addDoc(shoppingListItems, data).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("1 Allez bicycle added to cart")
      })
      .catch((error) => {
      console.error("Error adding document: ", error);
      });
    // const res = await setDoc(doc(db, 'shoppingList', 'Gravel'),{
    //     quantity: 1,
    //   });
      
      console.log('Added item to shopping list: ');
}
