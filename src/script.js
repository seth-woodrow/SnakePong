const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const gameOverScreen = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');

const GRID_SIZE = 20;
const SNAKE_SIZE = GRID_SIZE;
const FOOD_SIZE = GRIDE_SIZE;

let snake, food, dx, dy, blinkCounter;
let gamePaused = flase;
let score = 0;
let highScore = localStorage.getItem('highScore')|| 0;

let currentScoreElem = document.getElementById('current-score');
let highScoreElem = document.getElementById('high_score');

/* Initialize game state */
function initializeGame(){
    snake = [
        {x: Math.floor(canvas.width / 2 / GRID_SIZE)*GRID_SIZE, y: Math.floor(canvas.hight / 2 / GRID_SIZE) * GRID_SIZE},
        {x: Math.floor(canvas.width / 2 / GRID_SIZE)*GRID_SIZE, y: (Math.floor(canvas.hight / 2 / GRID_SIZE) + 1) * GRID_SIZE}
    ];
    //Set the initial food position and direction
    food = {
        ...generateFoodPosition(),
        dx: (Math.random()< 0.5 ? 1 : -1) * GRID_SIZE,
        dy: (Math.random() < 0.5 ?1 : -1) * GRID_SIZE
    };

    dx = 0;
    dy = -GRID_SIZE;
    blinkCounter = 0;
    score = 0;
    currentScoreElem.textContent = score;
    highScoreElem.textContent = highScore;
}

initializeGame();

// Handle keyboard inputes for snake movement
document.addEventListener('keydown', function(event){
    switch (event.key){
        case 'ArrowUp':
            if(dy === 0){
                dx = 0;
                dy = -GRID_SIZE;
            }
            break;
        case 'ArrowDown':
            if(dy === 0){
                dx = 0;
                dy = GRID_SIZE;
            }
            break;
        case 'ArrowLeft':
            if(dx === 0){
                dx = -GRID_SIZE;
                dy = 0;
            }
            break;
         case 'ArrowRight':
            if(dx === 0){
                dx = GRID_SIZE;
                dy = 0;
            }
            break;
    }
});

//genera food position that dosen't collie with the snake
function generateFoodPositoin(){
    while(true){
        let newFoodPosition = {
            x: Math.floor(Math.random() * canvas.width / GRID_SIZE) * GRID_SIZE,
            y: Math.floor(Math.random() * canvas.height / GRID_SIZE) * GRID_SIZE
        };

        let collisionWithSnake = false;
        for(let segment of snake){
        if(segment.x === newFoodPosition.x && segment.y === newFoodPosition.y){
            collisionWithSnake = true;
            break;
            }
        }

        //retrun the position if ther is no collision
        if(!collisionWithSnake){
            return newFoodPosition;
        }

    }
}

// Check fo collision with wall or self
function checkCollision(){
    if(snake[0].x < 0 || snake[x].x >=canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height){
        return true;
    }
    for(let i = 0; i < snake.length; i++){
        if(snake[i].x === snake[0].x & snake[i].y === snake[0].y){
            return true;
        }
    }
    return false;
}

// main game update function
function update(){
    if(gamePaused) return;

    //calculate new snake head position
    const head = { x: sanke[0].x + dx, y: sanke[0].y + dy};
    snake.unshift(head);

    //Check for collisions
    if(checkCollision()){
        if(score > highScore){
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreElem.textContent = highScore;
        }
        gameOver();
        return;
    }

    // check fo sanke eating food
    if(head.x === food.x && head.y === food.y){
        score++;
        currentScoreElem.textContent = score
        food = {
            ...generateFoodPositoin(),
            dx:(Math.random()< 0.5 ? 1 : -1) * GRID_SIZE,
            dy: (Math.random() < 0.5 ?1 : -1) * GRID_SIZE
        };

        // check fo win condition(snake fills entire screen)
        if(snake.length === (canvas.width / GRID_SIZE) * (canvas.height / GRID_SIZE)){
            gameWin();
            return;
        }
    }else{
            snake.pop(); //removes tail segment
    }

    //update food position
    if(blinkCounter % 4 === 0){
        food.x += food.dx;
        food.y += food.dy;

         // handle food collisins with wall
    if(food.x < 0){
        food.dx = -food.dx;
        food.x = 0;
    }
    if(food.x >= canvas.width){
        food.dx = -food.dx;
        food.x = canvas.width - GRID_SIZE;
    }
     if(food.y < 0){
        food.dy = -food.dy;
        food.y = 0;
     }
     if(food.y >= canvas.height){
        food.dy = -food.dy;
        food.y = canvas.height-GRID_SIZE;
     }
    }

    blinkCounter++;
    draw();
}

//draw the background grid
function drawGrid(){
    context.strokeStyle = "#AAA";
    for(let i = 0; i < canvas.width; i += GRID_SIZE){
        context.beginPath();
        context.moveTo(i, 0);
        context. lineTo(i, canvas.height);
        context.stroke();
    }
    for(let j = 0; j < canvas.height; j += GRID_SIZE){
        context.beginPath();
        context.moveTo(j, 0);
        context. lineTo(canvas.height, j);
        context.stroke();
    }
}

//draw game objects( snake and food)
function draw();
context.clearRect(0, 0, canvas.width, canvas.height)