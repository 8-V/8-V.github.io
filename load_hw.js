layout = $('#layout')
url = "https://homework-63c7.restdb.io/rest/hw"
$.ajax({
	url: url,
	beforeSend: (xhr) => {
		xhr.setRequestHeader('x-apikey', '5c67dd3bad19dc08b020d499')
	},
	complete: (xhr, stat) => {
		if (stat != 'success') {
			console.error(stat)
			return
		}
		window.predmets = JSON.parse(xhr.responseText)
		$.ajax('/card.tmp', {
			complete: (xhr, stat) => {
				if (stat != 'success') {
					console.error(stat)
					return
				}
				window.template = xhr.responseText
				for (var i = window.predmets.length - 1; i >= 0; i--) {
					predmet = window.predmets[i];
					card = template.replace('TYPE', encodeURIComponent(predmet.img[0])).replace('TITLE', predmet.name).replace('TEXT', predmet.desc)
					layout.append(card)
				}
			}
		})
	}
})
