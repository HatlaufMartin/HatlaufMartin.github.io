// Get the canvas element
const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;



// Game state variables
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
let direction = 'right';
let score = 0;
let gameOver = false;

// Player controls
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
        case 'r':
            reset();
            break;
    }
});

window.setInterval(gameLoop, 100);
// Game loop
function gameLoop() {
    if (!gameOver) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update the snake
        updateSnake();

        // Draw the game elements
        drawSnake();
        drawFood();
        drawScore();

        // Request the next frame
        // requestAnimationFrame(gameLoop);
    } else {
        // Game over screen
        drawGameOverScreen();
    }
}

function updateSnake() {
    // Move the snake
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y -= 10;
            break;
        case 'down':
            head.y += 10;
            break;
        case 'left':
            head.x -= 10;
            break;
        case 'right':
            head.x += 10;
            break;
    }
    snake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
    } else {
        snake.pop();
    }

    // Check for collision with walls or snake body
    if (
        head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver = true;
    }
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function drawScore() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawGameOverScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '36px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 50);

    ctx.font = '24px Arial';
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2);

    // Create the Restart button

    const restartButtonY = canvas.height / 2 + 50;
    ctx.fillText('Press the button to restart', canvas.width / 2, restartButtonY - 20);
}

function reset() {
    snake = [{ x: 10, y: 10 }];
    food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };
    direction = 'right';
    score = 0;
    gameOver = false;
}

// gameLoop();
