const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const playerWidth = 50;
const playerHeight = 50;
const bulletWidth = 50;
const bulletHeight = 100;
const enemyWidth = 50;
const enemyHeight = 50;
const powerUpWidth = 20;
const powerUpHeight = 20;
const maxHealth = 5;
const initialHealth = 3;

// 加载子弹图片
const bulletImage = new Image();
bulletImage.src = './bullet.png'; // 替换为你本地端子弹图片的路径

let player = {
    x: WIDTH / 2 - playerWidth / 2,
    y: HEIGHT - playerHeight - 10,
    width: playerWidth,
    height: playerHeight,
    speed: 5,
    bullets: [],
    health: initialHealth,
    lastShotTime: 0,
    shotInterval: 500 // 子彈射擊間隔（毫秒）
};

let enemies = [];
let enemyBullets = [];
let powerUps = [];
let keys = {};
let gameRunning = false;

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

startButton.addEventListener('click', () => {
    gameRunning = true;
    startButton.style.display = 'none';
    gameLoop();
});

function createBullet() {
    let currentTime = Date.now();
    if (currentTime - player.lastShotTime > player.shotInterval) {
        player.bullets.push({
            x: player.x + player.width / 2 - bulletWidth / 2,
            y: player.y,
            width: bulletWidth,
            height: bulletHeight,
            speed: 7,
            image: bulletImage // 保存图片引用
        });
        player.lastShotTime = currentTime;
    }
}

function createEnemy() {
    let enemy = {
        x: Math.random() * (WIDTH - enemyWidth),
        y: 0,
        width: enemyWidth,
        height: enemyHeight,
        speed: 2,
        lastShotTime: 0,
        shotInterval: 2000 // 敵人射擊間隔（毫秒）
    };
    enemies.push(enemy);
}

function createEnemyBullet(enemy) {
    enemyBullets.push({
        x: enemy.x + enemy.width / 2 - bulletWidth / 2,
        y: enemy.y + enemy.height,
        width: bulletWidth,
        height: bulletHeight,
        speed: 1,
        image: bulletImage
    });
}

function createPowerUp() {
    powerUps.push({
        x: Math.random() * (WIDTH - powerUpWidth),
        y: 0,
        width: powerUpWidth,
        height: powerUpHeight,
        speed: 2
    });
}

function update() {
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < WIDTH - player.width) {
        player.x += player.speed;
    }
    if (keys['ArrowUp'] && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown'] && player.y < HEIGHT - player.height) {
        player.y += player.speed;
    }
    if (keys[' ']) {
        createBullet();
    }

    player.bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) {
            player.bullets.splice(index, 1);
        }
    });

    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        if (enemy.y > HEIGHT) {
            enemies.splice(index, 1);
        } else {
            let currentTime = Date.now();
            if (currentTime - enemy.lastShotTime > enemy.shotInterval) {
                createEnemyBullet(enemy);
                enemy.lastShotTime = currentTime;
            }
        }
    });

    enemyBullets.forEach((bullet, index) => {
        bullet.y += bullet.speed;
        if (bullet.y > HEIGHT) {
            enemyBullets.splice(index, 1);
        }
    });

    powerUps.forEach((powerUp, index) => {
        powerUp.y += powerUp.speed;
        if (powerUp.y > HEIGHT) {
            powerUps.splice(index, 1);
        }
    });

    // 玩家子彈與敵人碰撞檢測
    player.bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                player.bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
            }
        });
    });

    // 玩家與敵人子彈碰撞檢測
    enemyBullets.forEach((bullet, bIndex) => {
        if (bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y) {
            enemyBullets.splice(bIndex, 1);
            player.health -= 1; // 碰撞敵人子彈扣血
            if (player.health <= 0) {
                alert('Game Over');
                resetGame();
            }
        }
    });

    // 玩家與敵人碰撞檢測
    enemies.forEach((enemy, eIndex) => {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            enemies.splice(eIndex, 1);
            player.health -= 1; // 碰撞敵人扣血
            if (player.health <= 0) {
                alert('Game Over');
                resetGame();
            }
        }
    });

    // 玩家與道具碰撞檢測
    powerUps.forEach((powerUp, pIndex) => {
        if (player.x < powerUp.x + powerUp.width &&
            player.x + player.width > powerUp.x &&
            player.y < powerUp.y + powerUp.height &&
            player.y + player.height > powerUp.y) {
            powerUps.splice(pIndex, 1);
            player.health = Math.min(player.health + 1, maxHealth); // 增加血量，最大為5
        }
    });
}

function drawRotatedImage(image, x, y, width, height, angle) {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(angle);
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // 繪制玩家飛船
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 繪制玩家子彈
    player.bullets.forEach(bullet => {
        if (bullet.image.complete) {
            ctx.drawImage(bullet.image, bullet.x, bullet.y, bullet.width, bullet.height);
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }
    });

    // 繪制敵人
    ctx.fillStyle = 'blue';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // 繪制敵人子彈
    enemyBullets.forEach(bullet => {
        if (bullet.image.complete) {
            drawRotatedImage(bullet.image, bullet.x, bullet.y, bullet.width, bullet.height, Math.PI); // 上下颠倒
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }
    });

    // 繪制道具
    ctx.fillStyle = 'yellow';
    powerUps.forEach(powerUp => {
        ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
    });

    // 繪制血量
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Health: ${player.health}`, 10, 20);
}

function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

function resetGame() {
    player.x = WIDTH / 2 - playerWidth / 2;
    player.y = HEIGHT - playerHeight - 10;
    player.bullets = [];
    player.health = initialHealth;
    enemies = [];
    enemyBullets = [];
    powerUps = [];
    gameRunning = false;
    startButton.style.display = 'block';
}

setInterval(createEnemy, 1000);
setInterval(createPowerUp, 5000);

gameLoop();
