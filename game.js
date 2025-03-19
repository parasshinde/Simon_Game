var buttonColours = ["red", "blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
    
});


$(".btn").click(function() {
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);

    animatePress(userChoosenColour);
    playSound(userChoosenColour);

    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    }else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any key to Restart!");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);
        
        startOver();
        
    }
    

}
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level" + level)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColour);
    
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    

}






