document.getElementById('submit').onclick = () =>
{
    body = {
        'subject': document.getElementById('name').value,
        'body': document.getElementById('desc').value,
        'from': 'anonymous@8v-dz.tk'
    }
    fetch('https://homework-63c7.restdb.io/rest/email_inbound', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'x-apikey': '5c6ecf1828ca2e129e8696e8',
            'content-type': 'application/json'
        }
    }).then(response => response.ok ? console.log('POST OK') : console.error('POST not OK'))
}
