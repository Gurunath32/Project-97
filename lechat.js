var firebaseConfig = {
    apiKey: "AIzaSyDUPSk78xvPl39Tkch0CJrAXoXNA8-2ySA",
    authDomain: "lechat-9fd9d.firebaseapp.com",
    databaseURL: "https://lechat-9fd9d-default-rtdb.firebaseio.com",
    projectId: "lechat-9fd9d",
    storageBucket: "lechat-9fd9d.appspot.com",
    messagingSenderId: "917220552371",
    appId: "1:917220552371:web:4002062e6e3e07ad854ac6",
    measurementId: "G-D7ZJZ35Q8Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name=localStorage.getItem("username");
    document.getElementById("welcome").innerHTML ="Welcome " + user_name +"!";

    function addroom() {
      roomname=document.getElementById("room_name").value;
      firebase.database().ref("/").child(roomname).update({ purpose : "adding room name" });

      localStorage.setItem("room_name",roomname);
      window.location="lechat_chat.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("rooms_div").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
  Room_names = childKey;
 //Start code
 console.log("Roomname-" + Room_names);

 row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
 document.getElementById("rooms_div").innerHTML +=row;
 //End code
 });});}
getData();

function redirectToRoomName(name) {
 console.log(name);
 localStorage.setItem("room_name",name);
 window.location="lechat_chat.html";
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location="index.html"
}