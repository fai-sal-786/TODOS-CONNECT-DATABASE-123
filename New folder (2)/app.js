 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
 
 import {
     getFirestore,
     collection,
     addDoc,
     getDocs,
     doc,
     deleteDoc,
 } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
 
    const firebaseConfig = {
    apiKey: "AIzaSyCr_X4ZXgOM8w2gOhiGF2m5uMtneQs4Frg",
    authDomain: "my-database-project-1234-f325d.firebaseapp.com",
    projectId: "my-database-project-1234-f325d",
    storageBucket: "my-database-project-1234-f325d.appspot.com",
    messagingSenderId: "1029002782810",
    appId: "1:1029002782810:web:f18a91661a098bd2611063",
    measurementId: "G-MYBG7N56LM"
  };
 
   // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  console.log("app=>", app);
  const analytics = getAnalytics(app);  
  const db = getFirestore(app);
  let numbersCollection = collection(db, "Numbers");
  let todosCollection = collection(db, "todos");
 
 
  const todo_input = document.getElementById("todo_input");
  const add_todo = document.getElementById("add_todo");
  const todo_list = document.getElementById("todo_list");
 
  getTodosFromDb();
  add_todo.addEventListener("click", addTodoToDb);
 
  async function addTodoToDb() {
    try {
      const obj = {
        todo: todo_input.value,
        createdAt: new Date().toISOString(),
      };
 
      const docRef = await addDoc(todosCollection, obj);
     //  console.log('Todo added=>', docRef);
      getTodosFromDb();
      todo_input.value = "";
    }
    catch(e) {
        console.log(e)
    }
  }
 
  async function getTodosFromDb() {
    try {
      const querySnapshot = await getDocs(todosCollection);
      todo_list.innerHTML = ''
      querySnapshot.forEach((doc) => {
       console.log('Doc=>', doc.id);
       // console.log('data=>', doc.data());
       const { todo, createdAt } = doc.data();
       const ele = `<li id=${doc.id}>${todo} - ${new Date(createdAt).toLocaleString()}</li>`;
 
        todo_list.innerHTML += ele;       
       // console.log(todo, createdAt);
      });
 
      todo_list.childNodes.forEach((li) =>
        li.addEventListener('click', deleteTodo)          
      );
     } catch (e){
      console.log(e);
     }
  }
 
  async function deleteTodo() {
   try {
     const docId = this.id;
     const docCollection = doc(db, 'todos', docId);
     const docRef = await deleteDoc(docCollection);
     getTodosFromDb();
     console.log('Document deleted=>', docRef);
   } catch (e) {
     console.log(e);
   }
 }
 //  addNumberToDB();
 //  async function addNumberToDB() {
 
 //      try {
 
 //          const docRef = await addDoc(numbersCollection, {
 //              number: Math.round(Math.random() * 1000000),
 //          });
 //          console.log("docRef=>", docRef);
 //         //  console.log(abc);
 //         // const docRef = await addDoc(collection(db, "users"), {
 //         //   first: "Ada",
 //         //   last: "Lovelace",
 //         //   born: 1815
 //          // });
 //          console.log("Document written with ID: ", docRef.id);
 //       } catch (e) {
 //         console.error("Error adding document: ", e);
 //       } 
 
 
 // }