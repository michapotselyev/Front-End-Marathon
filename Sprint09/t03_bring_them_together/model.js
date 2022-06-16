import { connection } from './db.js';
import { Admin } from './model/admin.js';

export default class Model
{
	constructor(login, name, email, password, role)
	{
		this.id = 0;
		this.login = login;
		this.userName = name;
		this.email = email;
		this.password = password;
		this.update = false;
		this.parametr = '';
		this.role = role;
	}

	async find(value)
	{
		const [result, _] = await connection.promise().query(`SELECT * FROM users WHERE ${this.parametr} =?`, value);
		try 
		{
			this.id = result[0].id;
			this.login = result[0].login;
			this.userName = result[0].username;
			this.email = result[0].email;
			this.password = result[0].password;
		}
		catch (err)
		{
			console.error('not user');
		}
	}

	async save()
	{
		if (this.update)
		{
			await connection.promise().query(`UPDATE users SET password = '${this.password}' WHERE id = ${this.id}`);
			this.update = false;
			return;
		}
		await connection.promise().query(
			'INSERT INTO users (login, username, email, password) VALUES (?, ?, ?, ?)',
			[this.login, this.userName, this.email, this.password]
		);
		const [dataUser, _] = await connection.promise().query('SELECT * FROM users WHERE LOGIN = ?', this.login);
		this.id = dataUser[0].id;
		const admin = new Admin(this.id, this.login, this.role);
		this.role = await admin.saveAdmin().then((result) => result);
	}

	delete()
	{
		connection.query('DELETE FROM users WHEREC id=?)', this.id, (err) => {
			if (err)
			{
				console.log(err);
				return;
			}
		});
	}
}
