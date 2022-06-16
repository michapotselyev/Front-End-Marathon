import path from 'path';
import * as fs from 'fs';

export class File
{
	constructor(name)
	{
		this.name = name;
		this.path = path.join(path.resolve(), './tmp');
	}

	write(text)
	{
		if (text == "")
		{
			throw new Error('write text pls');
		}
		const isExists = (path) => fs.existsSync(path);
		if (!isExists(this.path))
		{
			fs.mkdirSync(this.path);
		}
		else
		{
			if (!isExists(this.path + '/' + this.name))
			{
				fs.writeFileSync(this.path + '/' + this.name, text, 'utf8');
			}
			else
			{
				fs.appendFileSync(this.path + '/' + this.name, `\n${text}`);
			}
		}
	}

	delete()
	{
		try
		{
			fs.unlinkSync(this.path + '/' + this.name);
		}
		catch (err)
		{
			console.error(err);
		}
	}

	read()
	{
		const textCurr = fs.readFileSync(this.path + '/' + this.name, 'utf8');
		return textCurr;
	}
}

