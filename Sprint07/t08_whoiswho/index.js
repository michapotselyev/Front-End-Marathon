import express from 'express';
import session from 'express-session';
import csv from 'csv-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { renderTable, getIndex } from './renderFile.js';
let csvArray = [];
let sess;

const app = express();

app.use(
	session({
		name: 'anonymous',
		secret: 'abobus',
		saveUninitialized: true,
		resave: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve() + '/'));
app.use('/js', express.static(path.resolve() + '/'));
app.use(multer({ dest: 'uploads' }).single('file'));

app.get('/', (req, res) => {
  	res.send(getIndex());
});

app.post('/', (req, res, next) => {
	sess = req.session;
	if (!req.file)
	{
		res.redirect('/');
	}
	else
	{
		sess.file = req.file.path;
		let result = '';
		fs.createReadStream(sess.file).pipe(csv()).on('data', (data) => csvArray.push(data)).on('end', () => {
			result = renderTable(csvArray);
			res.send(getIndex(result));
		});
	}
});

app.get('/filter', (req, res) => {
	let result = '';
	fs.createReadStream(sess.file).pipe(csv()).on('data', (data) => csvArray.push(data)).on('end', () => {
		result = renderTable(csvArray, req.query);
		res.send(getIndex(result));
	});
});

app.listen(3000);

