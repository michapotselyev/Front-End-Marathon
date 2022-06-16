import { connection } from './db.js';
import bcrypt from 'bcrypt';
import e from 'express';

const logins = [];
const emails = [];
const admins = [];

const getAllData = () => {
	connection.query('SELECT login, email FROM users', (err, res) => {
		if (err)
		{
			console.error(err);
			return;
		}
		res.map(({ login }) => logins.push(login));
		res.map(({ email }) => emails.push(email));
	});
};

const getAdmins = () => {
	connection.query('SELECT user_login FROM admins', (err, res) => {
		if (err)
		{
			return;
		}
		res.map(({ user_login }) => admins.push(user_login));
	});
};

const setHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(Math.floor(Math.random() * (10 - 1 + 1)) + 1));
};

const getEmails = async () => {
	const [result, _] = await connection.promise().query('SELECT email FROM users;');
	result.map(({ email }) => emails.push(email));
};

const isCorrectPass = (pass, hash) => bcrypt.compareSync(pass, hash);

export { getAllData, setHash, isCorrectPass, getAdmins, getEmails, admins, logins, emails };
