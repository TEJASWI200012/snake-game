document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');

    canvas.width = 400;
    canvas.height = 400;

    const gridSize = 20;
    let snake = [{ x: gridSize * 2, y: 0 }, { x: gridSize, y: 0 }, { x: 0, y: 0 }];
    let direction = { x: gridSize, y: 0 };
    let food = randomFoodPosition();
    let score = 0;
    let gameInterval;

    function randomFoodPosition() {
        return {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
        };
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snake.forEach(segment => {
            ctx.fillStyle = 'lime';
            ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        });

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }

    function update() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            food = randomFoodPosition();
        } else {
            snake.pop();
        }

        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snakeCollision(head)) {
            clearInterval(gameInterval);
            alert('Game Over! Your score is ' + score);
            resetGame();
        }
    }

    function snakeCollision(head) {
        return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
    }

    function resetGame() {
        snake = [{ x: gridSize * 2, y: 0 }, { x: gridSize, y: 0 }, { x: 0, y: 0 }];
        direction = { x: gridSize, y: 0 };
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        food = randomFoodPosition();
        gameInterval = setInterval(gameLoop, 100);
    }

    function changeDirection(event) {
        const keyPressed = event.keyCode;
        const left = 37, up = 38, right = 39, down = 40;

        switch (keyPressed) {
            case left:
                if (direction.x === 0) direction = { x: -gridSize, y: 0 };
                break;
            case up:
                if (direction.y === 0) direction = { x: 0, y: -gridSize };
                break;
            case right:
                if (direction.x === 0) direction = { x: gridSize, y: 0 };
                break;
            case down:
                if (direction.y === 0) direction = { x: 0, y: gridSize };
                break;
        }
    }

    function gameLoop() {
        update();
        draw();
    }

    document.addEventListener('keydown', changeDirection);
    gameInterval = setInterval(gameLoop, 100);
});
