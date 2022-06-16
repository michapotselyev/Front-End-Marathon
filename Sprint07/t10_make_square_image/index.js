import express from 'express';
import fs from 'fs';
import request from 'request';
import sharp from 'sharp';

const app = express();
  
app.get('/', (req, res) => {
  	res.render('index');
});

app.get('/upload', async (req, responce) => {
	const path = './i.png';
	let url = req.query.url;

	request.head(url, async (err, res, body) => {
		request(url).pipe(fs.createWriteStream(path)).on('close', await imageCheck);
	});

	function imageCheck() {
		let arr = [
		[
			[1, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		],
		[
			[0, 0, 0],
			[1, 0, 0],
			[0, 0, 0],
		],
		[
			[0, 0, 0],
			[0, 0, 0],
			[1, 0, 0],
		],
		];
		for (let i = 1; i <= 4; i++)
		{
			let img = sharp('i.png');
			if (i > 1)
			{
				img = img.recomb(arr[i - 2]);
			}
			img.resize(250, 250).toFile(`i${i}.png`, (err, info) => {
				if (i === 4)
				{
					responce.json({
						img: [`i1.png`, `i2.png`, `i3.png`, `i4.png`],
					});
				}
			});
		}
	}
});

app.listen(3000);

