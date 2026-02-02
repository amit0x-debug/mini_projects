const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const box = 20
let snake = [{ x: 200, y: 200 }]
let direction = 'RIGHT'

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
}
let gameOver = false

document.addEventListener('keydown', changeDirection)
let score = 0

const scoreEl = document.getElementById('score')
const restartBtn = document.getElementById('restartBtn')

function changeDirection(e) {
  if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP'
  if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN'
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT'
  if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT'
}

function draw() {
  if (gameOver) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? 'lime' : 'green'
    ctx.fillRect(part.x, part.y, box, box)
  })

  ctx.fillStyle = 'red'
  ctx.fillRect(food.x, food.y, box, box)

  let head = { ...snake[0] }

  if (direction === 'UP') head.y -= box
  if (direction === 'DOWN') head.y += box
  if (direction === 'LEFT') head.x -= box
  if (direction === 'RIGHT') head.x += box

 if (head.x === food.x && head.y === food.y) {
   score += 1
   scoreEl.textContent = score

   food = {
     x: Math.floor(Math.random() * 20) * box,
     y: Math.floor(Math.random() * 20) * box,
   }
 } else {
   snake.pop()
 }

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.some((p) => p.x === head.x && p.y === head.y)
  ) {
    alert('Game Over!')
    gameOver = true
    return

  }

  snake.unshift(head)
}
restartBtn.addEventListener('click', restartGame)

function restartGame() {
  snake = [{ x: 200, y: 200 }]
  direction = 'RIGHT'
  score = 0
  scoreEl.textContent = score
  gameOver = false

  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
  }
}


setInterval(draw, 120)
