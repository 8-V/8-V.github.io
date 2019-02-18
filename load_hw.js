layout = document.getElementById('layout')
url = 'https://homework-63c7.restdb.io/rest/email_inbound'
fetch(url, {
    headers: {
        'x-apikey': '5c67dd3bad19dc08b020d499'
    }
}).then(res => { res.ok ? res.json() : console.error(res)}).then(res => {
    window.preds = res
    fetch('/card.tmp').then(res => res.ok ? res.text() : console.error(res)).then(template => {
        window.temp = template
        for (var i = 0; i < window.preds.length; i++) {
            pred = preds[i]
            card = window.temp.replace('TITLE', pred['subject']).replace('TEXT', pred['body'])
            layout.insertAdjacentHTML('beforeend', card)
        }
    })
})

