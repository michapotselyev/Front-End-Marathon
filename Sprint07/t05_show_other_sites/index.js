import express from 'express';
import session from 'express-session';
import expressThymeleaf from 'express-thymeleaf';
import { TemplateEngine } from 'thymeleaf';
import path from 'path';
import got from 'got';
import cheerio from 'cheerio';

const app = express();

const templateEngine = new TemplateEngine();
app.use('/js', express.static(path.resolve() + '/'));
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

app.get('/', async (req, res) => {
	if (req.query.url)
	{
		const responce = await got(req.query.url);
		const $ = cheerio.load(responce.body);
		res.render('index', { urlName: req.query.url, url: $('body').html().trim() });
		return;
	}
	res.render('index', { url: 'Type an URL...' });
});

app.listen(3000);

