document.getElementById('img').onclick = () => 
{
	document.getElementById('imgfile').click()
}
document.getElementById('imgfile').onchange = () =>
{
	file = document.getElementById('imgfile').files[0]
	fd = new FormData()
	//fd.append('img', file)
	fd.append('subject', document.getElementById('name').value)
	fd.append('body', document.getElementById('desc').value)
	fetch('https://homework-63c7.restdb.io/rest/hw', {
		method: 'PUT',
		body: fd,
		headers: { 'x-apikey': '5c67dd3bad19dc08b020d499' }
	}).then(response => response.ok ? console.log('POST OK') : console.error('POST not OK'))
}
