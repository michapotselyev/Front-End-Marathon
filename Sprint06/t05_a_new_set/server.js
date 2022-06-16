const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
const urlencodedParser = express.urlencoded({extended: false});
app.post("/", urlencodedParser, function (request, response)
{
    if(!request.body)
    {
        return response.sendStatus(400);
    }
    console.log(`${request.body.name} ${request.body.alias} ${request.body.age} ${request.body.description} ${request.body.photo}`);
    response.send(` <!DOCTYPE html><html lang="en"><head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
        </head>
        <body>
            <h1>New Avenger application</h1>
            <div class="art">
                <fieldset>
                <h2>Post</h2>
                <br>
                Array<br>
                {<br>
                    [name] => ${request.body.name} <br>
                    [email] => ${request.body.alias} <br>
                    [age] => ${request.body.age} <br>
                    [description] => ${request.body.description} <br>
                    [photo] => ${request.body.photo}<br>
                }
                </fieldset>
            </div>
            <br>
            <fieldset>
                <form method="post">
                    <fieldset>
                        <legend>About candidate</legend>
                        <span>Name</span>
                        <input type="text" placeholder="Superhero real name" autofocus name="name">
                        <span>E-mail</span>
                        <input type="text" placeholder="Superhero alias" name="alias">
                        <span>Age</span>
                        <input type="number" min="1" max="999" name="age">
                        <br>
                        <span>About</span>
                        <textarea placeholder="Information about the superhero, max 500 symbols" rows="5" cols ="70" max="500" name="description"></textarea>
                        <br>
                        <span>Photo</span>
                        <input type="file" name="photo">
                        <br>
                    </fieldset>
                    <br>
                    <input type="reset" value="CLEAR">
                    <input type="submit" value="SEND">
                </form>
            </fieldset>
        </body>
        </html>
        `);
});

app.listen(5050);

