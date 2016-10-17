/**
 * Created by dsay on 10/17/16.
 */
function showNumber(i, j, randNumber) {
    var numberCell = $('#number-cell-row' + i + '-col' + j);

    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top: getPositionTop(i, j),
        left: getPositionLeft(i, j)
    }, 50);

}

function showMove(fromx,fromy,tox,toy){
    var numberCell = $('#number-cell-row' + fromx + '-col' + fromy);

    numberCell.animate({
        top:getPositionTop(tox,toy),
        left:getPositionLeft(tox,toy)
    }, 200);
}


function updateScore(score){
    $('#score').text(score);
}