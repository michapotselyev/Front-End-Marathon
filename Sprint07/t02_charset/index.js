import express from 'express';
import expressThymeleaf from 'express-thymeleaf';
import session from 'express-session';
import path from 'path';
import iconv from 'iconv-lite';
import { TemplateEngine } from 'thymeleaf';

const app = express();

const templateEngine = new TemplateEngine();
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

app.listen(3000);

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/charset', (req, res) => {
	let charset = req.body.selected;
	let Text;
	if (charset == 'utf8')
	{
		Text = req.body.text;
		charset = 'utf8';
	}
	else if (charset == 'Windows-1252')
	{
		Text = iconv.encode(iconv.decode(req.body.text, 'utf8'), 'cp1252').toString();
		charset = 'cp1252';
	}
	else if (charset == 'ISO-8859-1')
	{
		Text = iconv.encode(iconv.decode(req.body.text, 'utf8'), 'iso-8859-1').toString();
		charset = 'iso';
	}
	else
	{
		throw new Error(`undefined this charset '${charset}'`);
	}
	res.render('index', { input: text, [charset]: Text });
});

