const normal = require('./normal-router');
const quantum = require('./quantum-router');
const Time = normal.calculateTime();
const QuantumTime = quantum.calculateTime();
const express = require("express");
 
const app = express();
app.set("view engine", "ejs");

app.use("/quantum", function(request, response){
    response.render('quantum', {
        yearn: Time.years(),
        monthn: Time.months(),
        dayn: Time.days(),
        yearq: QuantumTime[0],
        monthq: QuantumTime[1],
        dayq: QuantumTime[2],
    });
});
app.use("/normal", function(request, response){
    response.render('normal', {
        yearn: Time.years(),
        monthn: Time.months(),
        dayn: Time.days(),
        yearq: QuantumTime[0],
        monthq: QuantumTime[1],
        dayq: QuantumTime[2],
    });
});
app.use("/", function(request, response){
    response.render('index', {
        yearn: Time.years(),
        monthn: Time.months(),
        dayn: Time.days(),
        yearq: QuantumTime[0],
        monthq: QuantumTime[1],
        dayq: QuantumTime[2],
    });
});
app.listen(3000);

