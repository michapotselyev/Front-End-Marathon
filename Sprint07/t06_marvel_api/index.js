import express from 'express';
import session from 'express-session';
import expressThymeleaf from 'express-thymeleaf';
import { TemplateEngine } from 'thymeleaf';
import path from 'path';
import fetch from 'node-fetch';
import crypto from 'crypto';

const app = express();

const templateEngine = new TemplateEngine();
app.use('/public', express.static(path.resolve() + '/'));
app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', path.resolve());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: 'codeil',
		secret: 'anonymous',
		resave: false,
		saveUninitialized: true,
		cookie: {
		maxAge: 1000 * 60 * 100,
		},
	})
);

app.get('/', (req, res) => {
  	res.render('index');
});

app.get('/api', async (req, res) => {
	const KEY_PRIVATE = process.env.KEY_PRIVATE ?? '63c8498b3f70afa3ebf71261fe778b6004b2120a';
	const KEY_PUBLIC = process.env.KEY_PUBLIC ?? '946ced9a95abda53eeb976a1fd20f651';
	res.json(await fetch(`http://gateway.marvel.com/v1/public/comics?apikey=${KEY_PUBLIC}&hash=${crypto.createHash('md5').update(Date.now() + KEY_PRIVATE + KEY_PUBLIC).digest('hex')}&ts=` + Date.now()).then((response) => response.json()));
});

app.listen(3000);

