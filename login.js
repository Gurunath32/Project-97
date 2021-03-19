function login() {
    username=document.getElementById("username").value;
    localStorage.setItem("username",username);
    window.location="lechat.html";
}