score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        ball = document.querySelector('.ball');
        ball.classList.add('animateball');
        setTimeout(() => {
            ball.classList.remove('animateball')
        }, 700);
    }
    if (e.keyCode == 39) {
        ball = document.querySelector('.ball');
        ballX = parseInt(window.getComputedStyle(ball, null).getPropertyValue('left'));
        ball.style.left = ballX + 200 + "px";
    }
    if (e.keyCode == 37) {
        ball = document.querySelector('.ball');
        ballX = parseInt(window.getComputedStyle(ball, null).getPropertyValue('left'));
        ball.style.left = (ballX - 200) + "px";
    }
}

setInterval(() => {
    ball = document.querySelector('.ball');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(ball, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(ball, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 140) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.01;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}