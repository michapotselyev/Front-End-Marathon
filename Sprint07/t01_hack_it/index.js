import express from 'express';
import expressThymeleaf from 'express-thymeleaf';
import session from 'express-session';
import path from 'path';
import { TemplateEngine } from 'thymeleaf';
import bcrypt from 'bcrypt';

const generateSaltHash = (password, saltCount) => {
	const HASH = bcrypt.hashSync(password, bcrypt.genSaltSync(Number(saltCount)));
	return { HASH };
};

const isCorrectPass = (pass, hash) => bcrypt.compareSync(pass, hash);
const hasSession = (req) => (req.session.showAd ? true : false);
const addSession = (req, session) => (req.session.showAd = session);
const sessionEnd = (req) => req.session.destroy();
const getSessionValue = (session) => session.showAd;

const app = express();
const getPass = (pass) => pass.HASH;

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
	if (hasSession(req))
	{
		const status = getSessionValue(req.session).status;
		if (status == 'correct')
		{
			res.render('index', { answer: 'Hack!' });
		}
		else if (status == 'denied')
		{
			res.render('salt', {answer: 'Access denied!', HASH: getPass(getSessionValue(req.session))});
		}
		else
		{
			res.render('salt', getSessionValue(req.session));
		}
	}
	res.render('index');
});

app.post('/', (req, res) => {
	const { pass, salt } = req.body;
	addSession(req, generateSaltHash(pass, salt));
	res.render('salt', getSessionValue(req.session));
});

app.post('/correct-pass', (req, res) => {

	const seesionValue = getSessionValue(req.session);
	const checkPass = req.body.checkPass;

	if (isCorrectPass(checkPass, getPass(seesionValue)))
	{
		addSession(req, { status: 'Correct' });
		res.render('index', { answer: 'Hack!' });
	}

	addSession(req, { status: 'denied', HASH: getPass(seesionValue) });
	res.render('salt', {
		answer: 'Denied!',
		HASH: getPass(seesionValue),
	});
});

app.post('/clear', (req, res) => {
	sessionEnd(req);
	res.redirect('/');
});
