var player1 = prompt("Player One: Enter you name , you will be BLUE");
var player1Colour = 'rgb(86, 151, 255)';

var player2 = prompt("Player One: Enter you name , you will be RED  ");
var player2Colour = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum){
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}

function changeColour(rowIndex, colIndex, colour){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-colour',colour);
}

function returnColour(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-colour');
}

function checkBottom(colIndex){
    var colourReport = returnColor(5,colIndex);
    for(var row = 5; row > -1; row--){
        colourReport = returnColor(row,colIndex);
        if(colourReport === 'rbg(128, 128, 128)'){
            return row;
        }
    }
}

function colourMatchCheck(one,two,three,four){
    return (one === two && one === three && one === four && one !== 'rbg(128, 128, 128)' && one !== undefined)
}

function horizontalWinCheck(){
    for (var row = 0; row < 6; row++){
        for(var col = 0; col < 4; col++){
            if (colourMatchCheck(returnColour(row,col),returnColour(row,col+1),returnColour(row,col+2),returnColour(row,col+3))){
                console.log('horizontal');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}

function verticalWinCheck(){
    for (var col = 0; col < 7; col++){
        for(var row = 0; row < 3; row++){
            if (colourMatchCheck(returnColour(row,col),returnColour(row+1,col),returnColour(row+2,col),returnColour(row+3,col))){
                console.log('vertical');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}

function diagonalWinCheck(){
    for (var col = 0; col < 5; col++){
        for(var row = 0; row < 7; row++){
            if (colourMatchCheck(returnColour(row,col),returnColour(row+1,col+1),returnColour(row+2,col+2),returnColour(row+3,col+3))){
                console.log('diagonal');
                reportWin(row,col);
                return true;
            }else if (colourMatchCheck(returnColour(row,col),returnColour(row-1,col+1),returnColour(row-2,col+2),returnColour(row-3,col+3))){
                console.log('diagonal');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }     
        }
    }
}

