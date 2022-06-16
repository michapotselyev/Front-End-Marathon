import fs from 'fs';
import path from 'path';
import { FormatDate } from './dateFormated.js';

export class Note
{
	list = [];
	constructor()
	{
		const data = fs.readFileSync('noteData.json', 'utf-8');
		this.note = JSON.parse(data ? data : '{}');
		for (let key in this.note)
		{
			this.list.push([key, this.note[key]]);
		}
	}

	add(note)
	{
		try {
			this.note[Date.now()] = {
				date: new FormatDate(Date.now()).getDate(),
				name: note.filename,
				importance: note.importance,
				text: note.content,
			};
			fs.writeFile('noteData.json', JSON.stringify(this.note), (err) => {
				if (err)
				{
					console.log(err);
				}
			});
		}
		catch (err)
		{
			console.error(err);
		}
	}

	getList()
	{
		return this.list;
	}

	get(id)
	{
		return new Map(this.list).get(id);
	}

	delete(id)
	{
		delete this.note[id];
		try
		{
			fs.writeFile('noteData.json', JSON.stringify(this.note), (err) => { if (err) console.log(err); });
		}
		catch (err)
		{
			console.error(err);
		}
	}

	getDetail(id)
	{
		let item = this.get(id);
		return `<h2>Detail of "${item.name}"</h2>
		<ul><li>date: <b>${new FormatDate(item.date).getDate()}</b></li>
		<li>name: <b>${item.name}</b></li>
		<li>importance: <b>${item.importance}</b></li>
		<li>text: <b>${item.text}</b></li></ul>`;
	}
}

