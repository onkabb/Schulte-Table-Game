var n;              //Table size
var check = false;  //The correctness of entered size
var counter = 0;    // Counter the numbers in the game
var game = document.getElementById('game');
var isWin = false;
var firstTouch = true;
var mistakes = 0;
var tip = 0;
var cells;
var dfcolors = false; 

// Smoothly display the menu at the beginning
function show() {
    $('#menu').fadeIn(500);
}

// Switching to the menu from any state
function showMenu() {
    counter = 0;
    check = true;
    isWin = false;
    firstTouch = true;
    mistakes = 0;
    if (game.style.display == 'block') {
        $('#game').fadeOut(500);
    } else {
        $('#win').fadeOut(500);
        $('#info').fadeOut(500);
    }
    setTimeout(() => {
        $('#menu').fadeIn(500);
        var st = document.querySelectorAll('[class="cell"]');
        for (var i = 0; i < st.length; i++) {
            st[i].remove();
        }
    }, 500);
    $('#back').fadeOut(500);
    setTimeout(() => {
        $('#infobtn').fadeIn(500);
    }, 500);
    $('#timer').css("display", "none");
    $('#maxsize').css("display", "block");
    console.log('Status: Enter N');
}

// Game start
function startGame() {
    if (check == true) {
        $('#game').fadeIn(500);
        $('#timer').fadeIn(500);
        $('#menu').fadeOut(500);
        $('#maxsize').css("display", "none");
        n = parseInt($('#sizeipt').val());
        var numbers = new Array();
        for (var i = 0; i < n * n; i++) {
            numbers[i] = i + 1;
        }
        var gameSize = 700;
        if ($(document).width() < 1400)
            gameSize = 700;
        var fontSize = 20;
        var fontZoom = 20;
        if (n <= 5) {
            fontSize = 10;
            fontZoom = 30;
        }
        game.style.width = gameSize + "px";
        game.style.height = gameSize + "px";
        var colors = new Array();
        colors = ['red', 'yellow', 'orange', 'greenyellow', ' lightblue', 'blue', 'pink'];
        var a = "";
        var numberId = 0;
		chbox = document.getElementById('colors');
		if (chbox.checked) {
				dfcolors = true;
		} else {
			dfcolors = false;
		}
		if (dfcolors == true) {
			for (var i = 1; i <= n * n; i++) {
            numberId = getRandomInt(numbers.length);
            a += '<div id="' + i + '" onclick="cellPick(' + i + ')" class="cell"' +
                ' style="color:' + colors[getRandomInt(7)] + '; width:' + (gameSize / n) +
                'px; height: ' + (gameSize / n) + 'px; font-size:'
                + (getRandomInt(gameSize / fontSize) + fontZoom) + 'px; " onmouseover="mouseover(' + i + ')" onmouseout="mouseuot(' + i + ')" >' + numbers[numberId] + '</div>';
            numbers.splice(numberId, 1);
        }
		} else  {
			for (var i = 1; i <= n * n; i++) {
            numberId = getRandomInt(numbers.length);
            a += '<div id="' + i + '" onclick="cellPick(' + i + ')" class="cell"' +
                ' style="color:' + "black" + '; width:' + (gameSize / n) +
                'px; height: ' + (gameSize / n) + 'px; font-size:'
                + 40  + 'px; " onmouseover="mouseover(' + i + ')" onmouseout="mouseuot(' + i + ')" >' + numbers[numberId] + '</div>';
            numbers.splice(numberId, 1);
        }
		}
        game.innerHTML = a;
        document.getElementById('timer').innerHTML = "Time: " + Math.round(n * n * 1.75) + " sec.";
        cells = document.querySelectorAll('[class="cell"]');
        console.log('Status: Game');
    } else {

    }
}

// Show instructions
function showInfo() {
    $('#menu').fadeOut(500);
    $('#infobtn').fadeOut(500);
    setTimeout(() => {
        $('#info').fadeIn(500);
        $('#back').fadeIn(500);
    }, 500);
}

// Starts timer for specified number of seconds
function timer(seconds) {
    var originalSeconds = seconds;
    var seconds_timer_id = setInterval(function () {
        if (tip == 3000) {
            var i;
            for (i = 0; i < cells.length; i++) 
                if (cells[i].textContent == (counter+1)) {
                    cells[i].style.backgroundColor = 'yellow';
                    break;
                } 
                tip = 0;       
            }
        if ((seconds > 0.1) && (game.style.display != 'none') && !isWin) {
            seconds -= 0.1;
            $("#timer").html("Time: " + seconds.toFixed(1) + " sec. <br>"+ "Next digit: "+(counter+1));
        } else {
            if (seconds > 0.1) {
                clearInterval(seconds_timer_id);
                $("#win").html("<h2>Victory!</h2><h4>Mistakes: " + mistakes + "</h4><h4>Press ESC to exit the menu</h4>");
                $("#timer").html(seconds.toFixed(1) + " sec. left <br>" + "You have made it in " + (originalSeconds - seconds).toFixed(1) + " seconds");
            } else {
                clearInterval(seconds_timer_id);
                $("#timer").html("Your time is up.<br>Press ESC to exit the menu");
                defeat();
                check = false;
            }
        }
        tip += 100;
    }, 100);

}

// State of victory
function win() {
    $('#win').fadeIn(500);
    $('#game').fadeOut(500);
    isWin = true;
    console.log('Status: Victory');
}

// Defeat status
function defeat() {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].style.backgroundColor != 'rgb(149, 250, 154)') {
            cells[i].style.backgroundColor = 'lightcoral'
            cells[i].style.color = 'black';
        }
        console.log('Status: Defeat');
    }
}

// Selecting Cells When Playing
function cellPick(id) {
    if (check) {
        if (firstTouch) {

            timer(Math.round(n * n * 1.75));
            firstTouch = false;
        }
        var element = document.getElementById(id);
        if (element.textContent == (counter + 1)) {
            element.style.backgroundColor = 'rgb(149, 250, 154)';
            element.style.color = 'black';
            counter++;
            if (counter == n * n) {
                win();
            }
        } else {
            if (element.textContent > counter + 1) {
                element.style.backgroundColor = 'lightcoral';
                setTimeout(() => {
                    element.style.backgroundColor = 'rgb(238, 238, 238)';
                }, 100);
                mistakes++;
            }
        }
    }
    tip = 0;
    setTimeout(() => {
        cells[i].style.backgroundColor = 'rgb(149, 250, 154)'
    }, 350);

    

}

// Checking table size entry
function checkSize() {
    var input = document.getElementById("sizeipt");

    if (input.value > 10 || input.value <= 1 || isNaN(input.value)) {
        if (input.value == ""){
        input.style.color = 'black';
        }
        else 
        input.style.color = 'red';
        check = false;
    } else {
        input.style.color = 'black';
        check = true;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Cell color change on hovering
function mouseover(id) {
    if (document.getElementById(id).style.backgroundColor != 'rgb(149, 250, 154)' && document.getElementById(id).style.backgroundColor != 'lightcoral')
        document.getElementById(id).style.backgroundColor = 'rgb(216, 216, 216)';
}

// Cell color change back
function mouseuot(id) {
    if (document.getElementById(id).style.backgroundColor != 'rgb(149, 250, 154)' && document.getElementById(id).style.backgroundColor != 'lightcoral')
        document.getElementById(id).style.backgroundColor = 'rgb(238, 238, 238)';
}

// When the page has loaded
jQuery(document).ready(function ($) {

    // Listening for table size input
    $('#sizeipt').keyup(function (e) {
        if (e.key === "Enter") {
            startGame();
        }
    });

    // Listening ESC
    $(document).keyup(function (e) {
        if (e.key === "Escape") {
            showMenu();
        }
    });
});

