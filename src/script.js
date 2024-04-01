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

        


    }
}