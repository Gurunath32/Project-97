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

user_name = localStorage.getItem("username");
room_name = localStorage.getItem("room_name");

function send_message() {
    console.log("test");
    msg = document.getElementById("message").value;
    firebase.database().ref(room_name).push({
        Name: user_name,
        Message: msg,
        like: 0
    });
    document.getElementById("message").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;

                console.log(firebase_message_id);
                console.log(message_data);
                name_1 = message_data['Name'];
                message = message_data['Message'];
                Like = message_data['like'];

                name_with_tag = "<h4>" + name_1 + "<img class='user_tick' src='tick.png' style='width:20px; height:20px;'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + Like + " onclick='updatelike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + Like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}

getData();

function updatelike(message_id) {
    console.log("Clicked On Like Button- " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}