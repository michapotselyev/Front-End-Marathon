import express from 'express';
import fs from 'fs';
import { Note } from './Note.js';
import path from 'path';

const app = express();
fs.writeFileSync('noteData.json', '');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/js', express.static(path.resolve() + '/'));

app.get('/', function (request, response)
{
  	response.send(getIndex());
});

app.post('/', function (request, response)
{
	new Note().add(request.body);
	response.redirect('/');
});

app.listen(3000);

app.get('/list', function (request, response)
{
  	response.json({ list: new Note().getList()});
});

app.get('/show', function (request, response)
{
  	response.send(getIndex(new Note().getDetail(request.query.id)));
});

app.get('/delete', function (request, response)
{
	new Note().delete(request.query.id);
	response.redirect('/');
});

function getIndex(insert = false)
{
	try
	{
		const data = fs.readFileSync('index.html', 'utf-8');
		return data && insert ? data.replace('CONTENT', insert) : data.replace('CONTENT', '');
	}
	catch (err)
	{
		console.error(err);
	}
	return false;
}

