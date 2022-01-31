const fild = document.createElement('div')
document.body.appendChild(fild)
fild.classList.add('filed')

for (let i = 0; i < 100; i++) {
  let excel = document.createElement('div')
  fild.appendChild(excel)
  excel.classList.add('excel')
}

let excelCor = document.querySelectorAll('.excel')

let x = 1,
  y = 10

for (let i = 0; i < excelCor.length; i++) {
  if (x > 10) {
    x = 1
    y--
  }
  excelCor[i].setAttribute('posX', x)
  excelCor[i].setAttribute('posY', y)
  x++
}

function generetSnake() {
  let posX = Math.round(Math.random() * (10 - 3) + 3)
  let posY = Math.round(Math.random() * (10 - 1) + 1)
  return [posX, posY]
}
let cordinate = generetSnake()
let snakeBody = [
  document.querySelector(
    '[posX ="' + cordinate[0] + '"][ posY="' + cordinate[1] + '"]'
  ),
  document.querySelector(
    '[posX ="' + (cordinate[0] - 1) + '"][ posY="' + cordinate[1] + '"]'
  ),
  document.querySelector(
    '[posX ="' + (cordinate[0] - 2) + '"][ posY="' + cordinate[1] + '"]'
  ),
]
for (let i = 0; i < snakeBody.length; i++) {
  snakeBody[i].classList.add('snakeBody')
  snakeBody[0].classList.add('snakeHead')
}

let mouse

function createMouse() {
  function generetMouse() {
    let posX = Math.round(Math.random() * (10 - 3) + 3)
    let posY = Math.round(Math.random() * (10 - 1) + 1)
    return [posX, posY]
  }
  let cordinateMouse = generetMouse()
  mouse = document.querySelector(
    '[posX ="' + cordinateMouse[0] + '"][ posY="' + cordinateMouse[1] + '"]'
  )
  while (mouse.classList.contains('snakeBody')) {
    let cordinateMouse = generetMouse()
    mouse = document.querySelector(
      '[posX ="' + cordinateMouse[0] + '"][ posY="' + cordinateMouse[1] + '"]'
    )
  }
  mouse.classList.add('food')
}
createMouse()
let direction = 'right'
let step = false
let input = document.createElement('input')
document.body.appendChild(input)
input.classList.add('input')
let score = 0
input.value = `Ваши очки: ${score}`
function snakeMove() {
  let snakeCordinates = [
    snakeBody[0].getAttribute('posX'),
    snakeBody[0].getAttribute('posY'),
  ]
  snakeBody[0].classList.remove('snakeHead')
  snakeBody[snakeBody.length - 1].classList.remove('snakeBody')
  snakeBody.pop()
  if (direction == 'right') {
    if (snakeCordinates[0] < 10) {
      snakeBody.unshift(
        document.querySelector(
          '[posX ="' +
            (+snakeCordinates[0] + 1) +
            '"][ posY="' +
            snakeCordinates[1] +
            '"]'
        )
      )
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX ="1"][ posY="' + snakeCordinates[1] + '"]'
        )
      )
    }
  } else if (direction == 'left') {
    if (snakeCordinates[0] > 1) {
      snakeBody.unshift(
        document.querySelector(
          '[posX ="' +
            (+snakeCordinates[0] - 1) +
            '"][ posY="' +
            snakeCordinates[1] +
            '"]'
        )
      )
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX ="10"][ posY="' + snakeCordinates[1] + '"]'
        )
      )
    }
  } else if (direction == 'up') {
    if (snakeCordinates[1] < 10) {
      snakeBody.unshift(
        document.querySelector(
          '[posX ="' +
            snakeCordinates[0] +
            '"][ posY="' +
            (+snakeCordinates[1] + 1) +
            '"]'
        )
      )
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX ="' + snakeCordinates[0] + '"][ posY="1"]'
        )
      )
    }
  } else if (direction == 'down') {
    if (snakeCordinates[1] > 1) {
      snakeBody.unshift(
        document.querySelector(
          '[posX ="' +
            snakeCordinates[0] +
            '"][ posY="' +
            (snakeCordinates[1] - 1) +
            '"]'
        )
      )
    } else {
      snakeBody.unshift(
        document.querySelector(
          '[posX ="' + snakeCordinates[0] + '"][ posY="10"]'
        )
      )
    }
  }

  if (
    snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') &&
    snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')
  ) {
    mouse.classList.remove('food')
    let a = snakeBody[snakeBody.length - 1].getAttribute('posX')
    let b = snakeBody[snakeBody.length - 1].getAttribute('posY')
    snakeBody.push(
      document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]')
    )
    createMouse()
    score++
    input.value = `Ваши очки: ${score}`
  }

  if (snakeBody[0].classList.contains('snakeBody')) {
    setTimeout(() => {
      alert(`Игра окончина, вы набрали ${score} ОЧКОВ !!!`)
    }, 200)
    clearInterval(interval)
    snakeBody[0].style.background = 'black'
  }
  snakeBody[0].classList.add('snakeHead')
  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody')
  }
  step = true
}
let interval = setInterval(snakeMove, 300)

window.addEventListener('keydown', function (e) {
  if (step === true) {
    if (e.keyCode === 37 && direction != 'right') {
      direction = 'left'
      step = false
    } else if (e.keyCode === 38 && direction != 'down') {
      direction = 'up'
      step = false
    } else if (e.keyCode === 39 && direction != 'lift') {
      direction = 'right'
      step = false
    } else if (e.keyCode === 40 && direction != 'up') {
      direction = 'down'
      step = false
    }
  }
})
