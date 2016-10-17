/**
 * Created by dsay on 10/17/16.
 */
/*
 * definite basic size
 */
documentWidth=window.screen.availWidth;
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;

//return the distance to the top-edge
function getPositionTop( i , j ){
    return cellSpace + i*(cellSpace+cellSideLength);
}
//return the distance to the left-edge
function getPositionLeft( i , j ){
    return cellSpace + j*(cellSpace+cellSideLength);
}

//set background color based on the number
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";break;
        case 4:
            return "#ede0c8";break;
        case 8:
            return "#f2b179";break;
        case 16:
            return "#f59563";break;
        case 32:
            return "#67c5f";break;
        case 64:
            return "#65e3b";break;
        case 128:
            return "#edcf72";break;
        case 256:
            return "#edcc61";break;
        case 512:
            return "#9c0";break;
        case 1024:
            return "#33b5e5";break;
        case 2048:
            return "#09c";break;
        case 4096:
            return "#a6c";break;
        case 8192:
            return "#93c";break;
        case 16384:
            return "white";break;
    }
    return "black";
}

//set number color based on the inner number
function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    else {
        return "white";
    }
}
//check if the cell is blank
function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}//check if left_move is valid
function isMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}//check if right_move is valid
function isMoveRight(board)
{
    for(var i=0;i<4;i++)
        for(var j=0;j<3;j++)
        {
            if(board[i][j]!=0)
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                    return true;
        }
    return false;
}
//check if up_move is valid
function isMoveUp(board)
{
    for(var i=1;i<4;i++)
        for(var j=0;j<4;j++)
        {
            if(board[i][j]!=0)
                if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                    return true;
        }
    return false;
}

//check if down_move is valid
function isMoveDown(board)
{
    for(var i=0;i<3;i++)
        for(var j=0;j<4;j++)
        {
            if(board[i][j]!=0)
                if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                    return true;
        }
    return false;
}

//check if there is blocks when moving horizontally
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0)
            return false;
    }
    return true;
}
//check if there is blocks when moving vertically
function noBlockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ ){
        if( board[i][col] != 0 )
        return false;
    }
    return true;
}


//check if there is any step can be continued
function noMove( board ){
    if( isMoveLeft( board ) ||
        isMoveRight( board ) ||
        isMoveUp( board ) ||
        isMoveDown( board ))
        return false;

    return true;
}