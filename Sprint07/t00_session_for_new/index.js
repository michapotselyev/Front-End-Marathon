import express from 'express';
import expressThymeleaf from 'express-thymeleaf';
import session from 'express-session';
import path from 'path';
import { TemplateEngine } from 'thymeleaf';
import hendlerDate from './datePush.js';
Array.prototype.sum = function () {
	let sum = 0;
	for (const num of this)
	{
		sum += Number(num);
	}
	return sum;
};
const dateUser = {};
Object.entries(date).map(([key, val]) =>
{
	dateUser[key] = val ? val : '[none]';
});

if (dateUser.experience)
{
	dateUser.experience = isNaN(dateUser.experience) ? `${dateUser.experience.sum()}` : `${dateUser.experience}`;
} 
else 
{
	dateUser.experience = '[none]';
}

if (!dateUser.purpose)
{
	dateUser.purpose = '[none]';
}
const hendlerDate = { title: 'Session for new', dateUser };


const getSession = (req) => req.session.showAd;

const hasSession = (req) => (req.session.showAd ? true : false);

const app = express();
const __dirname = path.resolve();
const templateEngine = new TemplateEngine();

app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', __dirname);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		name: 'anonymous',
		secret: 'anonymous',
		resave: false,
		saveUninitialized: true,
		cookie:
		{
			maxAge: 1000 * 60 * 100
		}
	})
);

const addSession = (req, session) => {
  	return (req.session.showAd = session);
};

app.listen(3000);

app.get('/', (req, res) => {
	if (hasSession(req))
	{
		res.render('date', getSession(req));
	}
	else
	{
		res.render('index');
	}
});

app.post('/', (req, res) => {
	addSession(req, hendlerDate(req.body));
	res.render('date', getSession(req));
});

app.post('/date', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

