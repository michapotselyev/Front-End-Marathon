// let Client = function client(socket) {
//     this.id = socket.id;
//     this.state = "newly Connected";
//     this.clientSocket = socket;
//     this.LobbyArr = [];

//     this.changeState = function (newState) {
//         this.state = newState;
//     }

//     this.addLobby = function (lobbyId) {
//         this.LobbyArr.push(lobbyId);
//     }
// }


// let client = require("socket.io-client");
// let socket = client.connect("http://localhost:3000/");
// socket.emit("hello", "world");

// module.exports = socket;

let countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

let x = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    console.log(seconds);

    document.getElementById("demo").innerHTML = seconds + "сек";
    if (seconds <= 1) {
        console.log("that is all");
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);
