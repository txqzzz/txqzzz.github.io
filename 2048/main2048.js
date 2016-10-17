/**
 * Created by dsay on 10/17/16.
 */
/* var board = [];
var score = 0;
var hasConflicted = [];

$(document).ready(function () {
        newgame();
    }
);

function newgame() {
    //initialize
    init();
    //generate 2 or 4 in random grid-cell
    generateNumber();
    generateNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            var gridCell = $('#grid-cell-row' + i + '-col' + j);
            gridCell.css('top', getPositionTop(i, j));
            gridCell.css('left', getPositionLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i]= new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;//initialize the inner numbers
            hasConflicted[i][j]=false;
        }
    }

    boardView();
}

//View the board change in front-end
function boardView() {
    $(".grid-cell-number").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='grid-cell-number'  id='number-cell-row" + i + "-col" + j + "'></div>");

            var numberCell = $('#number-cell-row' + i + '-col' + j);


            if (board[i][j] == 0) {
                numberCell.css('width', '0px');
                numberCell.css('height', '0px');
                numberCell.css('top', getPositionTop(i, j) + 50);
                numberCell.css('left', getPositionLeft(i, j) + 50);
            }
            else {
                numberCell.css('width', '100px');
                numberCell.css('height', '100px');
                numberCell.css('top', getPositionTop(i, j));
                numberCell.css('left', getPositionLeft(i, j));
                numberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                numberCell.css('color', getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }

    }
}

function generateNumber() {
    if (noSpace(board)) {
        return false;
    }
    else {
        //location random
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
        while (true) {
            if (board[randx][randy] == 0) {
                break;
            }
            randx = Math.floor(Math.random() * 4);
            randy = Math.floor(Math.random() * 4);
        }

        //value random
        var randNumber = Math.random() < 0.5 ? 2 : 4;

        //display the number
        board[randx][randy] = randNumber;
        showNumber(randx, randy, randNumber);
    }
}


$(document).keydown(function (event) {
    /*
     38: 0, // Up
     39: 1, // Right
     40: 2, // Down
     37: 3, // Left
     75: 0, // Vim up
     76: 1, // Vim right
     74: 2, // Vim down
     72: 3, // Vim left
     87: 0, // W
     68: 1, // D
     83: 2, // S
     65: 3  // A

    switch (event.keyCode) {
        case 37:
            if (moveLeft()) {
                generateNumber();
                isOver();
            }//left
            break;
        case 38:
            if (moveUp()) {
                generateNumber();
                isOver();
            }//up
            break;
        case 39:
            if (moveRight()) {
                generateNumber();
                isOver();
            }//right
            break;
        case 40:
            if (moveDown()) {
                generateNumber();
                isOver();
            }//down
            break;
        default://default
            break;
    }
});

function moveLeft() {
    if( !isMoveLeft() )
        return false;

    //moveLeft
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1 ; j < 4 ; j ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < j ; k ++ ){
                    if( board[i][k] == 0 && noBlockedHorizontal()( i , k , j , board ) ){
                        //move
                        showMove( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if( board[i][k] == board[i][j] && noBlockedHorizontal( i , k , j , board ) && !hasConflicted[i][k] ){
                        //move
                        showMove( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                    }
                }
            }
        }

    setTimeout("boardView()",200);
    return true;
}

function isOver(){
    if( noSpace( board ) && noMove( board ) ){
        gameover();
    }
}

function gameOver(){
    alert('gameover!');
}

*/

var board = new Array();
var hasConflicted = new Array();
var score = 0;
var startx=0;
var starty=0;
var endx=0;
var endy=0;


$(document).ready(function(){
    prepareForMobile();
    newgame();
});

function prepareForMobile(){

    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
    //initialize the map
    init();
    //generate two numbers randomly
    generateNumber();
    generateNumber();
}

function init(){
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){

            var gridCell = $('#grid-cell-row' + i + '-col' + j);
            gridCell.css('top', getPositionTop( i , j ) );
            gridCell.css('left', getPositionLeft( i , j ) );
        }

    for( var i = 0 ; i < 4 ; i ++ ){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    boardView();

    score = 0;
}

function boardView(){

    $(".grid-cell-number").remove();
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#grid-container").append("<div class='grid-cell-number'  id='number-cell-row" + i + "-col" + j + "'></div>");
            var numberCell = $('#number-cell-row' + i + '-col' + j);

            if( board[i][j] == 0 ){
                numberCell.css('width','0px');
                numberCell.css('height','0px');
                numberCell.css('top',getPositionTop(i,j) + cellSideLength/2 );
                numberCell.css('left',getPositionLeft(i,j) + cellSideLength/2 );
            }
            else{
                numberCell.css('width',cellSideLength);
                numberCell.css('height',cellSideLength);
                numberCell.css('top',getPositionTop(i,j));
                numberCell.css('left',getPositionLeft(i,j));
                numberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                numberCell.css('color',getNumberColor( board[i][j] ) );
                numberCell.text( board[i][j] );
            }

            hasConflicted[i][j] = false;
        }

    $('.grid-cell-number').css('line-height',cellSideLength+'px');
    $('.grid-cell-number').css('font-size',0.6*cellSideLength+'px');
}

function generateNumber(){

    if( noSpace( board ) )
        return false;

    //location
    var randx = parseInt( Math.floor( Math.random()  * 4 ) );
    var randy = parseInt( Math.floor( Math.random()  * 4 ) );
    /*
     var times = 0;
     while( times < 50 ){
     if( board[randx][randy] == 0 )
     break;

     randx = parseInt( Math.floor( Math.random()  * 4 ) );
     randy = parseInt( Math.floor( Math.random()  * 4 ) );

     times ++;
     }
     if( times == 50 ){
     for( var i = 0 ; i < 4 ; i ++ )
     for( var j = 0 ; j < 4 ; j ++ ){
     if( board[i][j] == 0 ){
     randx = i;
     randy = j;
     }
     }
     }*/

    var count=0;
    var temporary=new Array();
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
        {
            if(board[i][j]==0)
            {
                temporary[count]=i*4+j;
                count++;
            }
        }
    var Position= parseInt( Math.floor( Math.random()  * count ) );

    randx=Math.floor(temporary[Position]/4);
    randy=Math.floor(temporary[Position]%4);



    //number random
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //display the number
    board[randx][randy] = randNumber;
    showNumber( randx , randy , randNumber );

    return true;
}

$(document).keydown( function( event ){
    //event.preventDefault();
    /*
    38: 0, // Up
    39: 1, // Right
    40: 2, // Down
    37: 3, // Left
    75: 0, // Vim up
    76: 1, // Vim right
    74: 2, // Vim down
    72: 3, // Vim left
    87: 0, // W
    68: 1, // D
    83: 2, // S
    65: 3  // A
    */
    switch( event.keyCode ){

        case 37: //left
            if( moveLeft() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 38: //up
            if( moveUp() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 39: //right
            if( moveRight() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 40: //down
            if( moveDown() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;

        case 72: //vim left
            if( moveLeft() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 75: //vim up
            if( moveUp() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 76: //vim right
            if( moveRight() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 74: //vim down
            if( moveDown() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;


        case 65: //A
            if( moveLeft() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 87: //W
            if( moveUp() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 68: //D
            if( moveRight() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;
        case 83: //S
            if( moveDown() ){
                setTimeout("generateNumber()",210);
                setTimeout("isOver()",300);
            }
            break;

        default: //default
            break;
    }
});
document.addEventListener('touchstart',function(event)
    {
        startx=event.touches[0].pageX;
        starty=event.touches[0].pageY;
    }
);
document.addEventListener('touchend',function(event)
    {
        endx=event.changedTouches[0].pageX;
        endy=event.changedTouches[0].pageY;
        var deltax=endx-startx;
        var deltay=endy-starty;
        if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth)
            return;
        if(Math.abs(deltax)>=Math.abs(deltay))
        {
            if(deltax>0)//right
            {


                if(moveRight())
                {
                    generateNumber();
                    isOver();
                }
            }else//left
            {
                if(moveLeft())
                {
                    setTimeout("generateNumber()",210);
                    setTimeout("isOver()",300);
                }
            }

        }
        else
        {
            if(deltay>0)//down
            {

                if(moveDown())
                {
                    generateNumber();
                    isOver();
                }
            }else//up
            {
                if(moveUp())
                {
                    generateNumber();
                    isOver();
                }
            }

        }


    }
);

function isOver(){
    if( noSpace( board ) && noMove( board ) ){
        gameOver();
    }
}

function gameOver(){
    alert('GameOver!');
}

function moveLeft(){

    if( !isMoveLeft( board ) )
        return false;

    //moveLeft
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 1 ; j < 4 ; j ++ ){
            if( board[i][j] != 0 ){

                for( var k = 0 ; k < j ; k ++ ){
                    if( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) ){
                        //move
                        showMove( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) && !hasConflicted[i][k] ){
                        //move
                        showMove( i , j , i , k );
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                    }
                }
            }
        }
    //refresh to show the move, latency for effects
    setTimeout("boardView()",200);
    return true;
}

function moveRight(){
    if( !isMoveRight( board ) )
        return false;

    //moveRight
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2 ; j >= 0 ; j -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > j ; k -- ){

                    if( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ){
                        //move
                        showMove( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasConflicted[i][k] ){
                        //move
                        showMove( i , j , i , k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore( score );

                        hasConflicted[i][k] = true;
                    }
                }
            }
        }

    setTimeout("boardView()",200);
    return true;
}

function moveUp(){

    if( !isMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        //move
                        showMove( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) && !hasConflicted[k][j] ){
                        //move
                        showMove( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                    }
                }
            }
        }

    setTimeout("boardView()",200);
    return true;
}

function moveDown(){
    if( !isMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        //move
                        showMove( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) && !hasConflicted[k][j] ){
                        //move
                        showMove( i , j , k , j );
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore( score );

                        hasConflicted[k][j] = true;
                    }
                }
            }
        }

    setTimeout("boardView()",200);
    return true;
}