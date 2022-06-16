import Model from '../model.js';

class User extends Model
{
	constructor(login, name, email, password)
	{
		super(login, name, email, password);
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
