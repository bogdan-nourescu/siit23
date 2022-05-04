// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFzMkPlHobPV_toN57EKsbLdelLgCaW6w",
  authDomain: "chat-5fad5.firebaseapp.com",
  databaseURL:
    "https://chat-5fad5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-5fad5",
  storageBucket: "chat-5fad5.appspot.com",
  messagingSenderId: "727750086290",
  appId: "1:727750086290:web:467e6134f45b2d5751204b",
};

// Initialize Firebase
function initializeFirebase() {
  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);
  const messagesRef = ref(db, "messages");
  onChildAdded(messagesRef, function (snapshot) {
    const data = snapshot.val();
    let key = snapshot.key;
    displayMessage(data);
  });
}

let userName = null;

function displayMessage(data) {
  console.log("new message", data);
  //   let date = new Date(data.date);
  //   let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  //   let minutes =
  //     date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  //   let time = hour + ":" + minutes;
  let time = dayjs(data.date).format("HH:mm");

  let template = `
    <div class="chatBubble ${data.userName === userName ? "self" : "other"}">
        <div class="userName">${data.userName}</div>
        <div class="message">${data.message}</div>
        <div class="time">${time}</div>
    </div>
    `;
  document.querySelector("#chat").insertAdjacentHTML("beforeend", template);
  //element.scrollHeight - Math.abs(element.scrollTop) === element.clientHeight
  document.querySelector("#chat .chatBubble:last-child").scrollIntoView();
}

function startChat() {
  let name = document.querySelector('[name="name"]').value;
  name = name.trim();
  if (name.length < 3) {
    document.querySelector('[name="name"]').classList.add("error");
  } else {
    document.querySelector('[name="name"]').classList.remove("error");
    userName = name;
    document.querySelector("#signUpForm").classList.add("hidden");
    document.querySelector("#chatContainer").classList.remove("hidden");
    initializeFirebase();
  }
}

async function addMessage() {
  let message = document.querySelector('[name="chatMessage"]').value;
  message = message.trim();

  await fetch(firebaseConfig.databaseURL + "/messages/" + ".json", {
    method: "POST",
    body: JSON.stringify({
      userName: userName,
      message: message,
      date: new Date(),
    }),
  });
  document.querySelector('[name="chatMessage"]').value = "";
}

window.addMessage = addMessage;
window.startChat = startChat;
