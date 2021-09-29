class CollectStars extends Phaser.Scene {// extend fropm Phaser Scene to use the orignal class methods
   constructor() {//name this scene DodgePipes so that we can call it later
      super("CollectStars");



   }

   preload() {
      this.load.image('background', 'src/sprites/background-day.png');
      this.load.image('pipe', 'src/sprites/pipe-red.png');
      this.load.image('bird2', 'src/sprites/redbird-downflap.png');
      this.load.image('star', 'src/sprites/star.png');
      this.load.image('pauseBtn', 'src/sprites/pause.png');
      this.load.image('backBtn', 'src/sprites/back.png');
      this.load.audio("CollectStars", "src/Music/CoinCollect.ogg")
      this.load.audio("birdFlap", "src/Music/toggle_002.ogg")
   }
   create() {
      this.gameisPaused = false;
      this.pause();

      this.respawntime = 0; //set star respawn time to 0
      this.pipesSpeed = -200;
      this.starSpeed = -300;
      this.birdFlapSpeed = -200;
      this.createBg();
      this.createBird();
      this.createPipes();
      this.createStars();
      this.checkbirdCollision();
      this.checkstarCollision();
      this.createScore();
      this.createIns();
      this.createBackButton();
      this.startGame();


   }
   update(time, delta) { //time and delta are passed to update by phaser.

      this.increaseDifficulty();
      this.checkBirdOutofBound();
      this.reusePipes();

      if (this.gameisPaused === false) { // if the game is pause, you don't spawn new stars
         this.respawntime += delta; // repsawn time plus the delta time in ms since the last frame
         if (this.respawntime >= 5000) { //check if the respawn time since the last frame is >= 5 seconds. spawn new stars and reset the respawn time.
            this.createStars();
            this.checkstarCollision();
            this.respawntime = 0;
         }
      }

      this.reuseStars();
   }

   createBg() {
      this.bg = this.physics.add.sprite(0, 0, 'background').setOrigin(0);

   }

   createBird() {
      this.bird = this.physics.add.sprite(50, game.config.height / 2, 'bird2');
      this.bird.body.gravity.y = 500;
      this.birdFlap();
   }

   createPipes() {
      this.pipes = this.physics.add.group();
      this.randxDistance = 0

      for (let i = 0; i < 4; i++) {

         const upper = this.pipes.create(0, 0, "pipe").setOrigin(0, 1).setFlipY(true);
         const lower = this.pipes.create(0, 0, "pipe").setOrigin(0, 0);
         this.placePipes(upper, lower);


      }



      this.pipes.setVelocityX(this.pipesSpeed);

   }

   createStars() {

      this.stars = this.physics.add.group();


      const groupOfStars = this.stars.create(0, 0, "star")
      this.placeStars(groupOfStars);

      this.stars.setVelocityX(this.starSpeed);

   }

   createScore() {
      this.score = 0;
      this.scoreText;
      this.highScore = localStorage.getItem("normalHighScore");
      this.scoreText = this.add.text(0, 0, "Stars Collected: 0", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
      this.highScoreText = this.add.text(0, 20, `Highest stars: ${this.highScore || 0}`, { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })

   }

   createIns() {
      this.insText = this.add.text(10, 170, "Collect Stars!", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
      this.insText2 = this.add.text(10, 200, "Click to start", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
   }

   checkbirdCollision() {
      this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);

   }

   checkstarCollision() {
      this.physics.add.overlap(this.bird, this.stars, this.collectStar, null, this);
   }

   createPauseButton() {


      this.pauseButton = this.add.sprite(15, 465, 'pauseBtn').setInteractive({ useHandCursor: true })

      this.pauseorResume();



   }
   createBackButton() {


      this.BackButton = this.add.sprite(15, 490, 'backBtn').setInteractive({ useHandCursor: true })
      this.Back();
   }

   getRightPipePosition() {
      let rightPipeX = 0
      this.pipes.getChildren().forEach(pipe => {

         rightPipeX = Math.max(pipe.x, rightPipeX);
      })

      return rightPipeX;
   }


   checkBirdOutofBound() {
      if (this.bird.y < 0 || this.bird.y > 512) {
         this.gameOver();
      }
   }


   placePipes(upper, lower) {

      const xPostition = this.getRightPipePosition(); // first position will be position 300
      let randUpperYPosition = Math.floor(Math.random() * 221) + 100// random num from 100 -320
      let randLowerYDistance = Math.floor(Math.random() * 51) + 100 // random num from 100-150
      this.randxDistance = Math.floor(Math.random() * 300) + 200; // choose random num from 200 - 300 from the pipe from previous and add
      upper.x = xPostition + this.randxDistance; // first position will be 300 then second pipe will add random distance.
      upper.y = randUpperYPosition;

      lower.x = upper.x;
      lower.y = upper.y + randLowerYDistance;

   }


   placeStars(star) {
      let starsXPosition = Math.floor(Math.random() * 201) + 400
      let starsYPosition = Math.floor(Math.random() * 401) + 100


      star.x = starsXPosition
      star.y = starsYPosition;


   }


   reusePipes() {
      //create an empty array. If the pipes goes out of bounds, i push it in the array. then if array is full, i place the pipe again reusing it.
      let usedPipes = [];
      this.pipes.getChildren().forEach(pipe => {
         if (pipe.getBounds().right <= 0) // if position of the right side of the pipe canvas reaches 0 or < 0. Then i assumed that the pipe is out of the main canvas.
         {
            usedPipes.push(pipe);
            if (usedPipes.length == 2) {
               this.placePipes(...usedPipes);
            }
         }

      })
   }

   reuseStars() {
      let usedStars = [];
      this.stars.getChildren().forEach(star => {
         if (star.getBounds().right <= 0) {
            usedStars.push(star);
            if (usedStars.length == 1) {
               this.placeStars(usedStars[0]);
            }
         }


      })
   }

   saveHighScore() {
      this.highScoreText = localStorage.getItem("normalHighScore");
      this.highScore = this.highScoreText && parseInt(this.highScoreText);

      if (!this.highScore || this.score > this.highScore) {
         localStorage.setItem("normalHighScore", this.score);
      }
   }

   gameOver() {

      this.saveHighScore();
      this.scene.stop("CollectStars");
      this.scene.launch("GameOver");
   }


   birdFlap() {
      this.input.on("pointerdown", (e) => {
         if (e.leftButtonDown()) {
            this.sound.play("birdFlap")
            this.bird.setVelocityY(this.birdFlapSpeed);
         }
      })
   }

   collectStar(bird, star) {
      star.disableBody(true, true)
      this.sound.play("CollectStars")
      this.increaseScore();


   }
   increaseDifficulty() {
      if (this.score === 5) {
         this.pipesSpeed = -300;
         this.starSpeed = -400;
         this.stars.setVelocityX(this.starSpeed);
         this.pipes.setVelocityX(this.pipesSpeed);
      }
   }

   startGame() {
      this.input.once("pointerdown", (e) => {
         if (e.leftButtonDown()) {
            this.insText.destroy();
            this.insText2.destroy();
            this.resume();
            this.createPauseButton();
         }
      })
   }

   increaseScore() {
      this.score += 1;
      this.saveHighScore();
      this.scoreText.setText(`Stars Collected: ${this.score}`);
   }

   pause() {

      this.gameisPaused = true;
      this.physics.pause();



   }

   resume() {

      this.gameisPaused = false;
      this.physics.resume();


   }

   pauseorResume() {
      this.pauseButton.on("pointerdown", () => {
         if (this.gameisPaused === false) {
            this.PausedText = this.add.text(120, game.config.height/2, "Paused", { fontFamily: 'VT323', fontSize: '20px', fill: '#F00' })
            this.pause();
         }
         else if (this.gameisPaused === true) {
            this.PausedText.destroy();
            this.resume();
         }
      })

   }
   Back() {
      this.BackButton.once("pointerdown", () => {
         this.scene.stop("CollectStars");
         this.scene.launch("titleScreen");

      })
   }
}




