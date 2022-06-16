import path from 'path';
import * as fs from 'fs';

export class FileList
{
	constructor()
	{
		this.path = path.join(path.resolve(), './tmp');
	}

	getList()
	{
		const Date = [];
		fs.readdirSync(this.path).forEach((file) => {
			const text = fs.readFileSync(this.path + '/' + file, 'utf-8');
			Date.push({ fileName: file, text });
		});
		return Date;
	}

	hasFiles()
	{
		if (!fs.existsSync(this.path))
		{
			fs.mkdirSync(this.path);
		}
		else
		{
			return fs.readdirSync(this.path) ? true : false;
		}
	}

	getHTMLList()
	{
		let buf = "";
		fs.readdirSync(this.path).forEach((fileName) => {
			buf += `<li><a href="/select-file?file=${fileName}">${fileName}</a></li>`;
		});
		return `<ul>${buf}</ul>`;
	}
}

