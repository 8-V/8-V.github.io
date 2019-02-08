// (С)тырено
health = 5

bgReady = false
bgImg = new Image()
bgImg.onload = function() {
	bgReady = true
}
bgImg.src = 'bg.png'

heroReady = false
heroImg = new Image()
heroImg.onload = function() {
	heroReady = true
}
heroImg.src = 'hero.png'

monsterReady = false
monsterImg = new Image()
monsterImg.onload = function() {
	monsterReady = true
}
monsterImg.src = 'monster.png'

keysDown = {}

addEventListener('keydown', function(e) {
	keysDown[e.keyCode] = true
})
addEventListener('keyup', function(e) {
	delete keysDown[e.keyCode]
})

canvas = document.querySelector('#game')
canvas.width = 512
canvas.height = 480
ctx = canvas.getContext('2d')

hero = {
	speed: 256,
	x: 0,
	y: 0
}

monster = {
	speed: 128,
	x: 0,
	y: 0
}

function update(d) {
	if (38 in keysDown || 87 in keysDown) hero.y -= hero.speed * d
	if (40 in keysDown || 83 in keysDown) hero.y += hero.speed * d
	if (37 in keysDown || 65 in keysDown) hero.x -= hero.speed * d
	if (39 in keysDown || 68 in keysDown) hero.x += hero.speed * d

	if (monster.x < hero.x) monster.x += monster.speed * d
	if (monster.y < hero.y) monster.y += monster.speed * d
	if (monster.x > hero.x) monster.x -= monster.speed * d
	if (monster.y > hero.y) monster.y -= monster.speed * d

	if (hero.x <= 0) hero.x = 0
	if (hero.x >= canvas.width-32) hero.x = canvas.width-32
	if (hero.y <= 0) hero.y = 0
	if (hero.y >= canvas.height-32) hero.y = canvas.height-32

	if (monster.x <= 0) monster.x = 0
	else if (monster.x >= canvas.width-32) monster.x = canvas.width-32
	if (monster.y <= 0) monster.y = 0
	else if (monster.y >= canvas.height-32) monster.y = canvas.height-32

	if (
		hero.x <= (monster.x + 32) &&
		hero.y <= (monster.y + 32) &&
		monster.x <= (hero.x + 32) &&
		monster.y <= (hero.y + 32)
	) {
		health--
		reset()
	}
}

function render() {
	if (bgReady) ctx.drawImage(bgImg, 0, 0)
	if (heroReady) ctx.drawImage(heroImg, hero.x, hero.y)
	if (monsterReady) ctx.drawImage(monsterImg, monster.x, monster.y)

	if (health>0){
		ctx.fillStyle = "rgb(250, 250, 250)"
		ctx.font = "24px Comic Sans MS"
		ctx.textAlign = "left"
		ctx.textBaseline = "top"
		ctx.fillText("Health: " + health, 32, 32)
	}

}

function reset() {
	hero.x = canvas.width / 2
	hero.y = canvas.height / 2

	monster.x = Math.random() * (canvas.width - 64)
	monster.y = Math.random() * (canvas.height - 64)
}

function main(t) {
	now = Date.now()
	delta = now - then
	update(delta / 1000)
	render()
	then = now
	if (health >0)
		requestAnimationFrame(main)
	else {
		ctx.fillStyle = "rgb(250, 250, 250)"
		ctx.font = "24px Comic Sans MS"
		ctx.textAlign = "left"
		ctx.textBaseline = "top"
		ctx.fillText("Total: "+(now-begin)/1000 + ' seconds', 32, 32)
	}
}

function restart() {
	health = 5
	begin = then = Date.now()
	reset()
	main()
}

begin = then = Date.now()
reset()
main()
