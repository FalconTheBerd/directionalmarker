import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Firebase configuration

const firebaseConfig = {

apiKey: "AIzaSyAMQ6qkuWzTOZKJnoal01MrqVaAy32aXlc",

authDomain: "directionalmarker.firebaseapp.com",

projectId: "directionalmarker",

storageBucket: "directionalmarker.appspot.com",

messagingSenderId: "124118111336",

appId: "1:124118111336:web:c7ebea9a5869c263c157dd"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Require the user to be logged in

onAuthStateChanged(auth, (user) => {

if (!user) {


// User is not logged in

window.location.href = "login.html";

setTimeout(() => {

  alert("Not Logged In");

}, 200);


}

});
