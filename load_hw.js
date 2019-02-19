layout = document.getElementById('layout')
group = document.getElementById('group')
url = 'https://homework-63c7.restdb.io/rest/email_inbound'

function update() {
  fetch(url, {
    headers: {
      'x-apikey': '5c67dd3bad19dc08b020d499'
    }
  }).then(res => res.json()).then(res => {
    window.preds = res
    fetch('/card.tmp').then(res => res.text()).then(template => {
      window.temp = template
      layout.innerHTML = ''
      for (var i = 0; i < window.preds.length; i++) {
        pred = preds[i]
        if (pred.subject.slice(-1) != (group.checked?'1':'2')) continue;
        card = window.temp.replace('TITLE', pred['subject']).replace('TEXT', pred['body'])
        layout.innerHTML += card
      }
    })
  })
}
update()

group.onclick = () => {
  group.value = (group.checked?'1':'2')+' группа'
  document.querySelector('.mdl-js-snackbar').MaterialSnackbar.showSnackbar({message: 'Загрузка...'})
  update()
}
