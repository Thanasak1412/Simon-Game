(() => {
  let userClickedPattern = [];
  let gamePattern = [];
  let level = 0;
  let start = false;

  function playSound(name) {
    const audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
  }

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
  }

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");

      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  }

  $(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });

  $(document).keypress(() => {
    if (!start) {
      $("#level").text(`Level ${level}`);
      start = true;
      nextSequence();
    }
  });

  function nextSequence() {
    const buttonColor = ["red", "blue", "green", "yellow"];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColor[randomNumber];

    userClickedPattern = [];
    level++;
    $("#level").text(`Level ${level}`);
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);

    playSound(randomChosenColor);
  }
})();
