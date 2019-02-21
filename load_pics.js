type = (new URL(location.href)).searchParams.get("t")
img = document.getElementById('img')

fetch('https://homework-63c7.restdb.io/media/' + type, {
    headers: { 'x-apikey': '5c6ecf1828ca2e129e8696e8', 'cache-control': 'no-cache' },
    method: 'GET'
}).then(res => res.ok ? img.src = res.blob() : console.error(res))
