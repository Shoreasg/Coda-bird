class DodgeBirds extends Phaser.Scene {
   constructor() {
      super("DodgeBirds");

   }

   preload() {
      this.load.image('background', 'src/sprites/background-day.png');
      this.load.image('pipe', 'src/sprites/pipe-red.png');
      this.load.image('bird3', 'src/sprites/yellowbird-downflap.png');
      this.load.image('enemyBird', 'src/sprites/redbird-downflap.png');
      this.load.image('star', 'src/sprites/star.png');
      this.load.image('pauseBtn', 'src/sprites/pause.png');
      this.load.image('backBtn', 'src/sprites/back.png');
      this.load.audio("CollectStars", "src/Music/CoinCollect.ogg")
      this.load.audio("birdFlap3", "src/Music/toggle_003.ogg")
   }
   create() {
      this.gameisPaused = false;
      this.pause();

      this.respawntime = 0;
      this.pipesSpeed = -200;
      this.starSpeed = -300;
      this.enemyBirdSpeed = -500;
      this.birdFlapSpeed = -200;
      this.createBg();
      this.createBird();
      this.createPipes();
      this.createStars();
      this.createEnemyBird();
      this.checkbirdCollision();
      this.checkstarCollision();
      this.createScore();
      this.createIns();
      this.createBackButton();
      this.startGame();


   }
   update(time, delta) {

      this.increaseDifficulty();
      this.checkBirdOutofBound();
      this.reusePipes();

      if (this.gameisPaused === false) {
         this.respawntime += delta;
         if (this.respawntime >= 5000) {
            this.createStars();
            this.checkstarCollision();
            this.respawntime = 0;
         }
      }

      this.reuseStars();
      this.reuseEnemyBirds();
   }

   createBg() {
      this.bg = this.physics.add.sprite(0, 0, 'background').setOrigin(0);

   }

   createBird() {
      this.bird = this.physics.add.sprite(50, game.config.height / 2, 'bird3');
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

   createEnemyBird() {

      this.enemyBirds = this.physics.add.group();



      const groupOfEnemyBirds = this.enemyBirds.create(0, 0, "enemyBird").setFlipX(true);
      this.placeEnemyBirds(groupOfEnemyBirds);

      this.enemyBirds.setVelocityX(this.enemyBirdSpeed);

   }

   createScore() {
      this.score = 0;
      this.scoreText;
      this.highScore = localStorage.getItem("hardHighScore");
      this.scoreText = this.add.text(0, 0, "Stars Collected: 0", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
      this.highScoreText = this.add.text(0, 20, `Highest stars: ${this.highScore || 0}`, { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })

   }

   createIns() {
      this.insText = this.add.text(15, 170, "Dodge Birds!", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
      this.insText2 = this.add.text(10, 200, "Click to start", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
   }

   createPauseButton() {


      this.pauseButton = this.add.sprite(15, 465, 'pauseBtn').setInteractive({ useHandCursor: true })

      this.pauseorResume();

   }


   createBackButton() {


      this.BackButton = this.add.sprite(15, 490, 'backBtn').setInteractive({ useHandCursor: true })
      this.Back();
   }


   checkbirdCollision() {
      this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
      this.physics.add.collider(this.bird, this.enemyBirds, this.gameOver, null, this);

   }

   checkstarCollision() {
      this.physics.add.overlap(this.bird, this.stars, this.collectStar, null, this);
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

   placeEnemyBirds(enemyBird) {
      let enemyBirdXPosition = Math.floor(Math.random() * 201) + 400
      let enemyBirdYPosition = Math.floor(Math.random() * 401) + 100


      enemyBird.x = enemyBirdXPosition;
      enemyBird.y = enemyBirdYPosition;


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

   reuseEnemyBirds() {
      let usedEnemyBirds = [];
      this.enemyBirds.getChildren().forEach(enemyBird => {
         if (enemyBird.getBounds().right <= 0) {
            usedEnemyBirds.push(enemyBird);
            if (usedEnemyBirds.length == 1) {
               this.placeEnemyBirds(usedEnemyBirds[0]);
            }
         }


      })
   }

   saveHighScore() {
      this.highScoreText = localStorage.getItem("hardHighScore");
      this.highScore = this.highScoreText && parseInt(this.highScoreText);

      if (!this.highScore || this.score > this.highScore) {
         localStorage.setItem("hardHighScore", this.score);
      }
   }

   gameOver() {

      this.saveHighScore();
      this.scene.stop("DodgeBirds");
      this.scene.launch("GameOver");
   }


   birdFlap() {
      this.input.on("pointerdown", (e) => {
         if (e.leftButtonDown()) {
            if(this.gameisPaused == false)
            {
               this.sound.play("birdFlap3")
            }
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

   increaseScore() {
      this.score += 1;
      this.saveHighScore();
      this.scoreText.setText(`Stars Collected: ${this.score}`);
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
         this.scene.stop("DodgeBirds");
         this.scene.launch("titleScreen");

      })
   }

}




