const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const aboba = require('./script');
app.use('/', router);
const urlencodedParser = express.urlencoded({extended: false});

router.get('/',function(req,res)
{
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.post("/", urlencodedParser, function (request, response)
{
    if(!request.body)
    {
        return response.sendStatus(400);
    }
    let ans = request.body.answer;
    if(ans === "correct")
    {
        response.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=, initial-scale=1.0">
            <script src="script.js"></script>
            <title>Document</title>
        </head>
        <body>
            <h1>Что сгорело в видосе у анонимусов?</h1>
            <form id="MyForm" action="/" method="post">
                <input type="radio" name="answer" id ="1" value="correct">
                <label for="1">Материнская плата</label><br>
                <input type="radio" name="answer" id ="2" value="wrong">
                <label for="2">Мать</label><br>
                <input type="radio" name="answer" id ="3" value="wrong">
                <label for="1">Моя биба</label><br>
                <button type="submit">Узнать ответ</button><br>
                <p>НЕПЛОХ</p>
        
            </form>
            
        </body>
        </html>`);
    }
    else
    {
        response.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=, initial-scale=1.0">
            <script src="script.js"></script>
            <title>Document</title>
        </head>
        <body>
            <h1>Что сгорело в видосе у анонимусов?</h1>
            <form id="MyForm" action="/" method="post">
                <input type="radio" name="answer" id ="1" value="correct">
                <label for="1">Материнская плата</label><br>
                <input type="radio" name="answer" id ="2" value="wrong">
                <label for="2">Мать</label><br>
                <input type="radio" name="answer" id ="3" value="wrong">
                <label for="1">Моя биба</label><br>
                <button type="submit">Узнать ответ</button><br>
                <p>МЕГАПЛОХ</p>
        
            </form>
            
        </body>
        </html>`);
    }

    console.log(request.body);
});

app.listen(3000);

