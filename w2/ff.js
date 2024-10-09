const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasSize = 400;
const blockSize = 20;
canvas.width = canvasSize;
canvas.height = canvasSize;

const snakeColor = 'lime';
const appleColor = 'red';
const bgColor = 'black';

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let apple = { x: getRandomCoordinate(), y: getRandomCoordinate() };
let score = 0;
let level = 1;
let gameInterval;

// Tốc độ ban đầu (mili giây)
let speed = 100;

// Tải hình ảnh quả táo
const appleImage = new Image();
appleImage.src = 'appo.png';  // Đường dẫn tới hình ảnh quả táo

document.addEventListener('keydown', changeDirection);
startGame();

// Bắt đầu trò chơi
function startGame() {
    gameInterval = setInterval(updateGame, speed);
}

// Cập nhật trò chơi
function updateGame() {
    let head = { x: snake[0].x + direction.x * blockSize, y: snake[0].y + direction.y * blockSize };

    // Kiểm tra va chạm tường
    if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
        endGame();
        return;
    }

    // Kiểm tra va chạm với chính con rắn
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }

    snake.unshift(head);

    // Kiểm tra nếu ăn táo
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        document.getElementById('score').innerText = 'Điểm: ' + score;
        apple = { x: getRandomCoordinate(), y: getRandomCoordinate() };

        // Tăng cấp độ và tốc độ khi đạt được điểm số
        if (score % 5 === 0) {
            level++;
            speed -= 10; // Tăng tốc độ
            clearInterval(gameInterval);
            startGame();
            alert('Chúc mừng! Bạn đã lên cấp ' + level + '!');
        }
    } else {
        snake.pop();
    }

    drawGame();
}

// Hàm vẽ lại trò chơi
function drawGame() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = snakeColor;
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, blockSize, blockSize);
    });

    // Vẽ quả táo bằng hình ảnh
    ctx.drawImage(appleImage, apple.x, apple.y, blockSize, blockSize);
}

// Hàm thay đổi hướng đi của con rắn
function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

// Hàm kết thúc trò chơi
function endGame() {
    clearInterval(gameInterval);
    alert('Trò chơi kết thúc! Điểm của bạn là: ' + score);
    document.location.reload();
}

// Hàm tạo tọa độ ngẫu nhiên cho quả táo
function getRandomCoordinate() {
    return Math.floor(Math.random() * (canvasSize / blockSize)) * blockSize;
}
