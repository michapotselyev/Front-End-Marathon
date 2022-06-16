import { pool } from '../db.js';

export class Admin
{
	constructor(id, login, role)
	{
		this.id = id;
		this.login = login;
		this.role = role;
	}

	async saveAdmin()
	{
		if (this.role === 'on') 
		{
			await pool.promise().query('INSERT INTO admins (id_user, user_login) VALUE(?, ?)', [
				this.id,
				this.login,
				]);
			return 'admin';
		}
		return 'user';
	}
}

