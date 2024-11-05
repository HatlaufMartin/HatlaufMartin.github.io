const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");
const gameOverScreen = document.getElementById("game-over-screen");
const resetButton = document.getElementById("reset-button");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box,
};
let score = 0;
let gameInterval;

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Move snake
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    if (headX === food.x && headY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = { x: headX, y: headY };

    // Check game over conditions
    if (
        headX < 0 || headX >= canvas.width ||
        headY < 0 || headY >= canvas.height ||
        isCollision(newHead, snake)
    ) {
        clearInterval(gameInterval);
        gameOverScreen.style.display = "block";
        resetButton.style.display = "block";
        return;
    }

    snake.unshift(newHead);
}

function isCollision(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}

function resetGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = "RIGHT";
    food = {
        x: Math.floor(Math.random() * 19) * box,
        y: Math.floor(Math.random() * 19) * box,
    };
    score = 0;
    gameOverScreen.style.display = "none";
    resetButton.style.display = "none";
    gameInterval = setInterval(drawGame, 100);
}

document.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

// Start the game
resetGame();