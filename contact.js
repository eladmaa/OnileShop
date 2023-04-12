import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';    
import {getFirestore, collection, doc, setDoc, getDocs, getDoc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js';


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
