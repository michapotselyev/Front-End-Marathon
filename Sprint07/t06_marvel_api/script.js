const application = async (e) => {
	
	e.preventDefault();
	e.target.style = 'display: none';

	const response = await fetch('/api');
	const data = await response.json();

	const anonymous = (data) => {
		let result = '';
		for (let key in data)
		{
			if (typeof data[key] === 'object')
			{
				result += `<div class="box parent">
				<p class="name__object parent__color">
				${key}:
				</p>
					${anonymous(data[key])}
				</div>`;
			}
			else
			{
				result +=
				`<div class="box child">
					<p class="name__object">
					${key}: <span class="value">${data[key]}</span>
					</p>
				</div>`;
			}
		}
		return result;
	};

	console.log();
	document.getElementById('content').innerHTML = anonymous(data);
};

