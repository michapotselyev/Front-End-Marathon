import Model from '../model.js';

class User extends Model
{
	constructor(login, name, email, password, role)
	{
		super(login, name, email, password, role);
	}

	find(email)
	{
		super.find(email);
	}

	delete()
	{
		super.delete();
	}

	save()
	{
		super.save();
	}
}

export default User;
