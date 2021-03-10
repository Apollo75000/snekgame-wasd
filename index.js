



const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
var img = document.getElementById("background");


class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2; 

let appleX = 5;
let appleY = 5;

let xVelocity=0;
let yVelocity=0;
let score = 0;

const eatSound = new Audio("eat.mp3")

//game loop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if(score > 5){
        speed = 9;
    }
    if(score > 10){
        speed = 10;
    }
    if(score > 15){
        speed = 11
    }
    if(score > 20){
        speed = 13;
    }
    if(score > 25){
        speed = 15
    }
    if(score > 30){
        speed = 16;
    }
    if(score > 40){
        speed = 18;
    }

    setTimeout(drawGame, 1000/ speed);
    
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity ===0 && xVelocity ===0)
    return false;

    if(yVelocity ===0 && xVelocity ===0){
        return false;
    }
    
    //walls
    if(headX < 0 ){
        gameOver = true;
    }
    else if(headX === tileCount){
        gameOver = true
    }
    else if( headY < 0){
        gameOver = true;
    }
    else if(headY === tileCount){
        gameOver = true
    }

    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        if (gameOver) {
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";
        
        
            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
          }
    
        
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
      }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white'
    ctx.font = "11px Verdana"
    ctx.fillText("Score " + score, canvas.width-50, 10)
}

function clearScreen(){
    ctx.drawImage(img, 0,0, canvas.width,canvas.height)
   
}


function drawSnake(){
   
    ctx.fillStyle = 'yellow';
    for(let i =0; i < snakeParts.length; i++){
        let part =  snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
    while (snakeParts.length > tailLength){ 
        snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
    }

    ctx.fillStyle =  'DodgerBlue';
    ctx.fillRect(headX * tileCount, headY* tileCount, tileSize,tileSize);


}
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "DeepPink";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize / 2, tileSize / 2);
}

function checkAppleCollision(){
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        eatSound.play();
    }
}

document.addEventListener('keydown', keyDown);

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 87){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down
    if(event.keyCode == 83){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 65){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

     //right
     if(event.keyCode == 68){
        if(xVelocity == -1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }
}


drawGame();
