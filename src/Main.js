// Set up the game canvas
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Game state variables
let bird = { x: 50, y: canvas.height / 2, radius: 20 };
let pipes = [];
let gameOver = false;
let score = 0;

// Player controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !gameOver) {
        bird.velocity = -10;
    }
});

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        // Update bird position
        bird.y += bird.velocity;
        bird.velocity += 1;

        // Update pipes
        updatePipes();

        // Check for collisions
        checkCollisions();

        // Draw game elements
        drawBird();
        drawPipes();
        drawScore();

        // Request next frame
        requestAnimationFrame(gameLoop);
    } else {
        // Game over screen
        drawGameOverScreen();
    }
}

function updatePipes() {
    // Add new pipes
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 100) {
        const pipeGap = 150;
        const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 50;
        pipes.push({ x: canvas.width, y: 0, width: 50, height: pipeHeight });
        pipes.push({ x: canvas.width, y: pipeHeight + pipeGap, width: 50, height: canvas.height - pipeHeight - pipeGap });
    }

    // Move pipes
    pipes.forEach((pipe) => {
        pipe.x -= 3;
    });

    // Remove offscreen pipes
    pipes = pipes.filter((pipe) => pipe.x + pipe.width >= 0);
}

function checkCollisions() {
    // Check for collision with pipes
    for (const pipe of pipes) {
        if (
            bird.x + bird.radius > pipe.x &&
            bird.x - bird.radius < pipe.x + pipe.width &&
            (bird.y - bird.radius < pipe.y || bird.y + bird.radius > pipe.y + pipe.height)
        ) {
            gameOver = true;
            return;
        }
    }

    // Check for collision with ground or ceiling
    if (bird.y - bird.radius < 0 || bird.y + bird.radius > canvas.height) {
        gameOver = true;
    }
}

function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
}

function drawPipes() {
    ctx.fillStyle = 'green';
    for (const pipe of pipes) {
        ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    }
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

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.classList.add('restart-button');
    restartButton.addEventListener('click', () => {
        reset();
        gameLoop();
    });

    const restartButtonY = canvas.height / 2 + 50;
    ctx.fillText('Press the button to restart', canvas.width / 2, restartButtonY - 20);
    ctx.drawImage(restartButton, canvas.width / 2 - 50, restartButtonY, 100, 50);
}

function reset() {
    bird = { x: 50, y: canvas.height / 2, radius: 20 };
    pipes = [];
    gameOver = false;
    score = 0;
}

gameLoop();
