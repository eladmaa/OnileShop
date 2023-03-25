import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firebase/app.js';
import {getAuth, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firebase/auth';    
import {getFirestore, collection, getDocs, getDoc} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyABz2XGXSyT5PS5UPqhRa43DpaXAWJRZcM",
    authDomain: "onlinestore-e87dc.firebaseapp.com",
    projectId: "onlinestore-e87dc",
    storageBucket: "onlinestore-e87dc.appspot.com",
    messagingSenderId: "501364232749",
    appId: "1:501364232749:web:6b614b7b45d5fe7a5d9ea4"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const todosCol = collection(db, 'todos');
  const snapshot = await getDocs(todosCol); 

  onAuthStateChanged(auth, user => {
    if(user != null){
        console.log('logged in');
    }
    else{
        console.log('No user');
    }
  })