level = 0

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

    if (monster.x < hero.x) monster.x -= monster.x * d
    if (monster.y < hero.y) monster.y -= monster.y * d
    if (monster.x > hero.x) monster.x += monster.x * d
    if (monster.y > hero.y) monster.y += monster.y * d

    if (hero.x <= 0) hero.x = canvas.width
    else if (hero.x >= canvas.width) hero.x = 0
    if (hero.y <= 0) hero.y = canvas.height
    else if (hero.y >= canvas.height) hero.y = 0

    if (monster.x <= 0) monster.x = 0
    else if (monster.x >= canvas.width) monster.x = canvas.width
    if (monster.y <= 0) monster.y = 0
    else if (monster.y >= canvas.height) monster.y = canvas.height

    if (
        hero.x <= (monster.x + 32) &&
        hero.y <= (monster.y + 32) &&
        monster.x <= (hero.x + 32) &&
        monster.y <= (hero.y + 32)
    ) {
        level++
        reset()
    }
}

function render() {
    if (bgReady) ctx.drawImage(bgImg, 0, 0)
    if (heroReady) ctx.drawImage(heroImg, hero.x, hero.y)
    if (monsterReady) ctx.drawImage(monsterImg, monster.x, monster.y)

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Level " + level, 32, 32);

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
    requestAnimationFrame(main)
}

then = Date.now()
reset()
main()