import { getEmails, emails, setHash, logins, admins, getAdmins, isCorrectPass, getAllData } from './utils.js';
import shortid from 'shortid';
import User from './model/user.js';
import sendMassage from './send-massage.js';

const mainPage = (app) => {
	app.get('/', (req, res) => {
		if (req.session.user)
		{
			res.render('user-account', {
				login: req.session.user.login,
				roles: req.session.user.roles,
			});
			return;
		}
		res.render('index');
	});
};

const registerPage = (app) => {
	app.get('/register', (req, res) => {
		if (req.session.user) 
		{
			res.render('user-account', {
				login: req.session.user.login,
				roles: req.session.user.roles,
			});
			return;
		}
		getAllData();
		res.render('register-form');
	});

	app.post('/register', async (req, res) => {
		const { login, userName, email, password, password_confirmation, admin } =
		req.body;

		if (logins.includes(login))
		{
			res.render('register-form', {
				errorLogin: 'User with this login already exists',
				errorL: 'alert alert-danger',
			});
		}
		else if (emails.includes(email))
		{
			res.render('register-form', {
				errorEmail: 'User with this email already exists',
				errorE: 'alert alert-danger',
			});
		}
		else if (password !== password_confirmation)
		{
			res.render('register-form', {
				errorPass: 'Incorrectly entered password!',
				errorP: 'alert alert-danger',
			});
		}
		else
		{
			const hashPass = setHash(password);
			const userCreate = new User(login, userName, email, hashPass, admin);
			userCreate.save();
			setTimeout(() => {
				logins.length = 0;
				emails.length = 0;
				res.render('user-account', {
				login: userCreate.login,
				roles: userCreate.role,
				});
			}, 100);
		}
	});
};

const loginPage = (app) => {
	app.get('/login', (req, res) => {
		if (req.session.user)
		{
			res.render('user-account', {
				login: req.session.user.login,
				roles: req.session.user.roles,
			});
			return;
		}
		getAllData();
		res.render('login-form');
	});
	
	app.post('/login', async (req, res) => {
		getAdmins();
		const { login, password } = req.body;
		let roles = 'User';
		const currentUser = new User();
		currentUser.parametr = 'login';
		currentUser.find(login);
		setTimeout(() => {
			if (currentUser.login === login &&isCorrectPass(password, currentUser.password))
			{
				if (admins.includes(login))
				{
					roles = 'Admin';
				}
				admins.length = 0;
				req.session.user = { login, roles };
				res.render('user-account', { login, roles });
				return;
			}
			res.render('login-form', {
				errorMass: 'User or password incorrect',
				errorClass: 'alert alert-danger text-center',
			});
		}, 10);
	});
};

const resetPage = (app) => {
	app.get('/reminder-password', (_, res) => {
		if (req.session.user)
		{
			res.render('user-account', {
				login: req.session.user.login,
				roles: req.session.user.roles,
			});
			return;
		}
		getEmails();
		res.render('reminder-form');
	});

	app.post('/push-massege', async (req, res) => {
		const email = req.body.email;
		if (!emails.includes(email))
		{
			res.render('form-reminder', {
				errorClass: 'alert alert-danger text-center',
				errorMass: 'Email not found',
			});
			return;
		}
		const newPass = shortid.generate();
		const currentUser = new User();
		currentUser.find(email);
		setTimeout(() => {
			currentUser.password = setHash(newPass);
			currentUser.update = true;
			currentUser.save();
			sendMassage(email, currentUser, newPass).catch(console.error);
			res.render('index', {
				confirmClass: 'alert alert-success',
				confirmMass: 'Check your email',
			});
		}, 100);
	});
};

const userPage = (app) => {
	app.get('/account', (req, res) => {
		if (!req.session.user)
		{
			res.redirect('/');
		}
		res.render('user-account');
	});

	app.post('/exit', (req, res) => {
		req.session.destroy();
		res.render('index', {
			massageExit: 'End',
		});
	});
};


export const routPages = (app) => {
	mainPage(app);
	registerPage(app);
	loginPage(app);
	resetPage(app);
	userPage(app);
};
