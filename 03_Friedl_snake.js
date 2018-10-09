var ansi = require("ansi");
var keypress = require("keypress");
var fieldHeight = 30;
var fieldWidth = 15;

var snakeY = 7
var snakeX = 20

var appleY = 7;
var appleX = 10;
var score = 0;
var speed = 3;

var inputChar;
var oldChar;

process.stdout.write('\x1Bc');
process.stdout.write('\x1B[?25l');

cursor = ansi(process.stdout);
cursor.bg.reset();
cursor.bg.grey();
buildField();

cursor.bg.green();
cursor.goto(snakeX, snakeY).write(" ");

cursor.bg.red();
cursor.goto(appleX, appleY).write(" ");

cursor.bg.reset();

keypress(process.stdin);
game();


function game(){
    process.stdin.on('keypress', function (ch, key) {
        inputChar = key.name;
        
            //which char is pressed? 
            switch(inputChar){
                case "p": 
                    cursor.bg.reset(); process.exit(-1); 
                    break;
    
                case "a":
                    cursor.bg.black();
                    cursor.goto(snakeX, snakeY).write(" ");
                    
                    snakeX--;
                    break;
    
                case "d": 
                    cursor.bg.black();
                    cursor.goto(snakeX, snakeY).write(" ");
                
                    snakeX++;
                    break;
                case "w": 
                    cursor.bg.black();
                    cursor.goto(snakeX, snakeY).write(" ");
                
                    snakeY--
                    break;
                case "s":
                    cursor.bg.black();
                    cursor.goto(snakeX, snakeY).write(" ");
                
                    snakeY++;
                    break;
                default:
                cursor.bg.black();
                cursor.goto(snakeX, snakeY).write(" ");
            
                snakeX++;
                }

                moveSnake();
        
        //Apple eaten?
        if(snakeX === appleX && snakeY === appleY){
            score++;
            appleX = (Math.random()*fieldHeight-1)+1;
            appleY = (Math.random()*fieldWidth-1)+1;
            cursor.bg.red();
            cursor.goto(appleX, appleY).write(" ");
            speed++;
        }

        //Collide with barrier?
        if((snakeX === 1 || snakeX === fieldHeight) || (snakeY === 1 || snakeY === fieldWidth)){
            cursor.white();
            cursor.goto(10,7).write("GAME OVER");
            cursor.goto(10,8).write("Score: " +score);
            cursor.bg.reset();
            process.exit(-1);
        }

        setTimeout(game, 1000 / speed);

    
    
    });
    
    process.stdin.setRawMode(true);

    
}

function input(ch, key){
    //which char is pressed? 
    switch(inputChar){
        case "p": 
            cursor.bg.reset(); process.exit(-1); 
            break;

        case "a":
            cursor.bg.black();
            cursor.goto(snakeX, snakeY).write(" ");
            
            snakeX--;
            break;

        case "d": 
            cursor.bg.black();
            cursor.goto(snakeX, snakeY).write(" ");
        
            snakeX++;
            break;
        case "w": 
            cursor.bg.black();
            cursor.goto(snakeX, snakeY).write(" ");
        
            snakeY--
            break;
        case "s":
            cursor.bg.black();
            cursor.goto(snakeX, snakeY).write(" ");
        
            snakeY++;
            break;
        default:
        cursor.bg.black();
        cursor.goto(snakeX, snakeY).write(" ");
    
        snakeX++;
        }
}

function moveSnake(){                
    cursor.bg.green();
    cursor.goto(snakeX, snakeY).write(" ");
}

function buildField(){
    for(var i = 0; i<= fieldHeight; i++){
        for(var j = 0; j<= fieldWidth; j++){
            if(i === 0 || i === fieldHeight){
                cursor.goto(i,j).write(" ");
            }
            if(j === 0 || j === fieldWidth){
                cursor.goto(i,j).write(" ");
            }
        }
    }
    cursor.bg.reset();
}