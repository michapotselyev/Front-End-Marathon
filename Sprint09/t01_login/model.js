import { connection } from './db.js';

export default class Model
{
	constructor(login, name, email, password)
	{
		this.id = 0;
		this.login = login;
		this.userName = name;
		this.email = email;
		this.password = password;
	}

	async find(login)
	{
		const [result, _] = await connection.promise().query('SELECT * FROM users WHERE login =?', login);
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
		await connection.promise().query(
			'INSERT INTO users (login, username, email, password) VALUES (?, ?, ?, ?)',
			[this.login, this.userName, this.email, this.password]
		);
		const [dataUser, _] = await connection.promise().query('SELECT * FROM users WHERE LOGIN = ?', this.login);
		this.id = dataUser[0].id;
	}

	delete()
	{
		connection.query('DELETE from users WHEREC id=?)', this.id, (err) => {
			if (err)
			{
				console.log(err);
				return;
			}
		});
	}
}
