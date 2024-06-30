
// Define button colors and game variables
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Start game when any key is pressed
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

// Handle button clicks
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// Generate next sequence and animate
function nextSequence() {
    level++;
    $("#level-title").text(`Level ${level}`);
    let randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    playSequence();
}

// Play sequence of colors with delay
function playSequence() {
    gamePattern.forEach(function(color, index) {
        setTimeout(function() {
            animate(color);
        }, 1000 * index);
    });
}

// Play sound for each color
function playSound(color) {
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

// Animate button press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Animate color change
function animate(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
    playSound(color);
}

// Check user's answer against game pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

// Game over function
function gameOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
    // Play game over sound
    playSound("wrong");
    // Change background color to red
    $("body").addClass("game-over");
     // Update level title text
    $("#level-title").text("Game Over! Press any key to restart.");
    // Reset background color and additional actions after a delay (if needed)
    setTimeout(function() {
      $("body").removeClass("game-over");
  }, 2000);
}
