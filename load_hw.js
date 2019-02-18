layout = document.getElementById('layout')
url = 'https://homework-63c7.restdb.io/rest/email_inbound'
fetch(url, {
    headers: {
        'x-apikey': '5c67dd3bad19dc08b020d499'
    }
}).then(res => {
    if (!res.ok) {
        console.error(res)
        return
    }
    window.res = res.json()
    fetch('/card.tmp').then(res => {
        if(!res.ok) {
            console.error(res)
            return
        }
        window.tmp = res.text()
        for(var i = window.res.length - 1; i >= 0; i--) {
            pred = window.res[i]
            card = window.tmp.replace('TITLE', pred.subject).replace('TEXT', pred.body)
            layout.insertAdjacentHTML('beforeend', card)
        }
    })
})
