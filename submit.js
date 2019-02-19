document.getElementById('submit').onclick = () =>
{
	fd = new FormData()
	fd.append('subject', document.getElementById('name').value)
	fd.append('body', document.getElementById('desc').value)
	fetch('https://homework-63c7.restdb.io/rest/email_inbound', {
		method: 'POST',
		body: fd,
		headers: {
                    'x-apikey': '5c67dd3bad19dc08b020d499'
                }
	}).then(response => response.ok ? console.log('POST OK') : console.error('POST not OK'))
}
