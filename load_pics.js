type = (new URL(location.href)).searchParams.get("t")
img = document.getElementById('img')

fetch('https://homework-63c7.restdb.io/media/' + type, {
    headers: { 'x-apikey': '5c67dd3bad19dc08b020d499', 'cache-control': 'no-cache' },
    method: 'GET'
}).then(res => res.ok ? img.src = res.blob() : console.error(res))
