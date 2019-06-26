var player1 = prompt("Player One, enter your name. You will be RED.");
var player1Colour = 'rgb(237, 45, 73)';

var player2 = prompt("Player Two, enter your name. You will be BLUE.");
var player2Colour = 'rgb(86, 151, 255)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum){
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}

function changeColour(rowIndex, colIndex, colour){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',colour);
}

function returnColour(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    var colourReport = returnColour(5,colIndex);
    for(var row = 5; row > -1; row--){
        colourReport = returnColour(row,colIndex);
        if(colourReport === 'rgb(128, 128, 128)'){
            return row;
        }
    }
}

function colourMatchCheck(one,two,three,four){
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
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

var currentPlayer = 1;
var currentName = player1;
var currentColour = player1Colour;

$('h3').text(player1+", it's your turn. Click on a column to drop your chip")
$('.board button').on('click',function(){
    if(game_on === true){
        var col = $(this).closest('td').index();
        var bottomAvail = checkBottom(col);

        changeColour(bottomAvail,col,currentColour);

        if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
            $('h1').text("Congratulations "+currentName+", you have won!");
            $('h2').text("");
            $('h3').fadeOut("fast");
            game_on = false;
        }

        currentPlayer = currentPlayer * (-1);
        if(currentPlayer === 1){
            currentName = player1;
            $('h3').text(currentName + ", it's your turn")
            currentColour = player1Colour;
        }else{
            currentName = player2;
            $('h3').text(currentName + ", it's your turn")
            currentColour = player2Colour;
        }
    }

})

