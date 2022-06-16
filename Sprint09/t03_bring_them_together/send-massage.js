import nodemailer from 'nodemailer';

export default async (email, { login, ..._ }, password) => {
	const transporter = nodemailer.createTransport(
	{
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'camden.kertzmann96@ethereal.email',
			pass: 'TtD4TjePs7QprVeEy2'
		},
	});

	let info = await transporter.sendMail(
	{
		from: '"anonymous 👻" <anon@example.com>',
		to: email,
		subject: 'Reset password',
		html: `<h1>Reset password</h1>
			<br>
			<p>Login: ${login}</p>
			<p>Password: ${password}</p>`,
	});
};
