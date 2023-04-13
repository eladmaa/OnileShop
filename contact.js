import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';    
import {getFirestore, collection, getDocs, getCountFromServer, getDoc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';

jQuery.support.cors = true;


let welcome="";
let cart_count = 0;
var BicyclesList = "";
var AccessoriesList = "";


const firebaseConfig = {
    apiKey: "AIzaSyABz2XGXSyT5PS5UPqhRa43DpaXAWJRZcM",
    authDomain: "onlinestore-e87dc.firebaseapp.com",
    projectId: "onlinestore-e87dc",
    storageBucket: "onlinestore-e87dc.appspot.com",
    messagingSenderId: "501364232749",
    appId: "1:501364232749:web:6b614b7b45d5fe7a5d9ea4"
  };
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp, createUserWithEmailAndPassword );
const db = getFirestore(firebaseApp);

 
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
    console.log('count: ', snapshot.data().count);
    return ret;
  }
  // ***********************************************************************************************
  let bikesToSell = getItemsToSell(db);
  console.log(bikesToSell.ItemsList);
  const querySnapshot = await getDocs(collection(db, "Items"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

let AccessoriesToSell = getAccessToSell(db);
console.log(AccessoriesToSell.ItemsList);
  const querySnapshot2 = await getDocs(collection(db, "Accessories"));
  querySnapshot2.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
cart_count = getCartQuantity(db).then((result) => {
  var span = document.getElementById("cart_qnt");
  span.textContent = '('+result+')';
});



let manuContainer = document.getElementById("BicyclesList")
manuContainer.innerHTML = BicyclesList;
let AccessoriesManu = document.getElementById("AccessoriesList")
AccessoriesManu.innerHTML = AccessoriesList;

let btnSend = document.getElementById("sendbtn")
btnSend.addEventListener("click", btnSendClicked);

async function btnSendClicked(){
    console.log("button send clicked,,,");
    var subjectMsg = document.getElementById("F100410").value;
    var lastName = document.getElementById("F100401").value;
    var name = document.getElementById("F100402").value;
    var phoneNo = document.getElementById("F100407").value;
    var emailMsg = document.getElementById("F100404").value;
    var cityMsg = document.getElementById("F100411").value;
    var messageSent = document.getElementById("F100409").value;
    var approvesEmails = document.getElementById("F100405").checked;
       
    
    const res = await setDoc(doc(db, 'Messages', subjectMsg), {
        approves: approvesEmails,
        city: cityMsg,
        email: emailMsg,
        first_name:name,
        last_name: lastName,
        messge: messageSent,
        phone_no: phoneNo,
        subject: subjectMsg
      });
      alert("מכתבך התקבל ברשומות ויועבר לגורם המתאים")
      console.log('Added document: ');

}
