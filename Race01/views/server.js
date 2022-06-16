const express = require("express");
const bodyParser = require("body-parser");
let http = require('http');
let path = require("path");
const sqlite3 = require('sqlite3').verbose();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('ReallySecretKey');
const Socket = require('socket.io');
const app = express();

// for database
const db = new sqlite3.Database("players.db", {root: __dirname }, sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err.message);
});
db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY NOT NULL, login TEXT NOT NULL,password TEXT NOT NULL)");
db.run("CREATE TABLE IF NOT EXISTS sockets(id INTEGER PRIMARY KEY NOT NULL, login1 TEXT, login2 TEXT, roomNum TEXT NOT NULL)");
 
const server = http.createServer(app);

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('register');
});

server.listen(3000);
console.log('============= Server started =============== \
            \nServer listen on port 3000\n \
            \nSee here: http://localhost:3000');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

app.post('/', (req, res) => {
    const { login, password, repeatpass} = req.body;
    db.get("SELECT * FROM users WHERE login = ? LIMIT 1", login, function(err, row){
        if(row){
            res.render('register', { message: 'This login has already exists.'});
        } 
        else {
            let countErr = 0;
            let checkStrengthPass = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
            if(login.length <= 2 || login == null || login.length >= 15) {
                console.log("Err");
                res.render('register', { message: 'Login must has more than 2 symbols and less than 15'});
                countErr++;
            }
            if(!checkStrengthPass.test(password)) {
                console.log("Err");
                res.render('register', { message: 'Password must be strong (at least 8 symbols, numeric, top and bottom reg'});
                countErr++;
            }
            if(password != repeatpass) {
                console.log("Err");
                res.render('register', { message: 'Passwords must be matched'});
                countErr++;
            }
            if(countErr == 0) {
                const sqlToReg = "INSERT INTO users(login, password) VALUES(?,?)";
                db.run(sqlToReg,[login,cryptr.encrypt(password)]);
                res.render('login');
                // db.close(); 
            }
        }
    });
});


app.get("/login", (req, res) => {
    res.render('login');
    // res.sendFile("login.pug", {root: __dirname });
});

let chel;
app.post('/login', (req, res) => { 
    const { login, password} = req.body;
    let db = new sqlite3.Database('players.db'); 
    db.get("SELECT * FROM users WHERE login = ? LIMIT 1", login, function(err, row) {
        if (err) {
           console.log('Error: ' + err);
        }
        if(!row){
            res.render('login', { message: 'This login does not exist.'});
            console.log("This login does not exist.");
        } 
        else {            
            let db = new sqlite3.Database('players.db'); 
            let checkpass = db.get("SELECT password FROM users WHERE login = ? LIMIT 1", login, function(err, row) {
                if(cryptr.decrypt(row.password) != password) {
                    res.render('login', { message: 'Password is wrong'});
                    console.log("Password is wrong");
                }
                else {
                    chel = login;
                    res.render('main', { login: login});
                }
            });
        }
   });
});

app.get('/main', (req, res) => {
    res.render('main');
});

let io = Socket(server, {});

io.attach(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
        transports: ['websocket', 'polling'],
    },
    allowEIO3: true,
})

app.post('/main', (req, res) => {
    const { roomNum, avatar } = req.body;
    String.prototype.isNumber = function(){return /^\d+$/.test(this);}
    if(roomNum.length <= 2 || roomNum == null || roomNum.length >= 5 || !roomNum.isNumber()) {
        console.log("Err");
        res.render('main', { message: 'Number of room must be filled and has more than 2 symbols and less than 5'});
    }

    let choosenAvatar;
    if(avatar == "BillyH") choosenAvatar = "https://i.postimg.cc/X7zqKMQy/BillH.png";
    if(avatar == "Van") choosenAvatar = "https://i.postimg.cc/02P5pkYQ/Van.png";
    if(avatar == "Steve") choosenAvatar = "https://i.postimg.cc/HkTJs0Z6/Steve.png";
    if(avatar == "Brad") choosenAvatar = "https://i.postimg.cc/vZCvNNH4/Brad.png";
    if(avatar == "RicardoMilos") choosenAvatar = "https://i.postimg.cc/43T9tkxQ/Ricardo-Milos.png";

    db.get("SELECT * FROM sockets WHERE roomNum = ? LIMIT 1", roomNum, function(err, row) {
        if (err) {
        console.log('Error: ' + err);
        }
        if(!row){
            const sqlToReg = "INSERT INTO sockets(login1, roomNum) VALUES(?,?)";
            db.run(sqlToReg,[chel,roomNum]);
            io.on('connection', (socket) => {
                console.log('new socket connected! >>', socket.id)
            });
            res.render('game', {choosenAvatar: choosenAvatar});         
        }
        else {
            db.get("SELECT login2 FROM sockets WHERE roomNum = ? LIMIT 1", roomNum, function(err, row) {
                if(row.login2 == null){
                    const sqlToReg = `UPDATE sockets SET login2 = ? WHERE roomNum = ?`;
                    db.run(sqlToReg,[chel, roomNum]);
                    io.conection(socket.id);
                    res.render('game', {choosenAvatar: choosenAvatar});
                } 
                else {
                    console.log('no way');
                }
            });
        }
    });
});



// let gameServiceRepository = new GameServiceRepository();
// let gameServiceFactory = new GameServiceFactory();

// io.sockets.on('connection', function(socket) {
//     console.log('Socket connection');
//     socket.on('create', function(room) {

//         console.log('Join room: ' + room + ' socketId: ' + socket.id);
//         socket.join(room);

//         let gameService = gameServiceRepository.findById(room);

//         if(!gameService){
//             gameService = gameServiceFactory.create("Create", room);
//             gameServiceRepository.insert(gameService);
//         }
//         socket.use(function(packet){
//             gameService.handleAction(socket, packet[0], packet[1]);             
//             Object.keys(io.sockets.sockets).forEach(function(id) {
//                 let data = gameService.getClientResponseData(id);
//                 if(data){
//                     io.to(id).emit('state', data);
//                 }
//             });
//         });
//     });
// });


// db.get("SELECT * FROM sockets WHERE roomNum = ? LIMIT 1", roomNum, function(err, row) {
    //     if (err) {
    //        console.log('Error: ' + err);
    //     }
    //     if(!row){
    //         const sqlToReg = "INSERT INTO sockets(login1, roomNum) VALUES(?,?)";
    //         db.run(sqlToReg,[chel,roomNum]);
    //         res.render('game', {choosenAvatar: choosenAvatar});
    //     }
    //     else {
    //         db.get("SELECT login2 FROM sockets WHERE roomNum = ? LIMIT 1", roomNum, function(err, row) {
    //             if(row.login2 == null){
    //                 const sqlToReg = `UPDATE sockets SET login2 = ? WHERE roomNum = ?`;
    //                 db.run(sqlToReg,[chel, roomNum]);
    //                 res.render('game', {choosenAvatar: choosenAvatar});
    //             } 
    //             else {
    //                 console.log('no way');
    //             }
    //         });
    //     }
    // });



