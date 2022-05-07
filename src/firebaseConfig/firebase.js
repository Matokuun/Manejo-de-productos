import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBgsRTXUn0DbbeX7HTAHpYiBS4XiabCADY",
  authDomain: "matiapp-5d599.firebaseapp.com", //nombre del proyecto, seguido de numeros
  projectId: "matiapp-5d599",
  storageBucket: "matiapp-5d599.appspot.com",
  messagingSenderId: "668258679202",
  appId: "1:668258679202:web:f532852c00730f46201afb"
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)