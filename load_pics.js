type = (new URL(location.href)).searchParams.get("t")

xhr = new XMLHttpRequest()
//xhr.withCredentials = true

xhr.responseType='blob'

xhr.open('GET', "https://homework-63c7.restdb.io/media/" + type)

xhr.setRequestHeader('x-apikey','5c67dd3bad19dc08b020d499')
xhr.setRequestHeader('content-type','image/jpeg')
xhr.setRequestHeader('cache-control','no-cache')
xhr.setRequestHeader('Accept','image/jpeg')

xhr.onload = (stat) => {
	if (!xhr.response) {
		console.error(stat)
		return
	}
	document.getElementById('img').src = URL.createObjectURL(xhr.response)
}

xhr.send()
