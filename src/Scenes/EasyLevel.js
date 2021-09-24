class EasyLevel extends Phaser.Scene {
   constructor() {
      super("Easy");
   }

   preload() {
      this.load.image('background', 'src/sprites/background-day.png');
      this.load.image('pipe', 'src/sprites/pipe-red.png');
      this.load.image('bird', 'src/sprites/bluebird-downflap.png');
   }
   create() {
      this.physics.pause();
      this.resumeGame();
      this.respawntime = 0;
      this.pipesSpeed = -200;
      this.coinSpeed = -300;
      this.birdFlapSpeed = -200;
      this.createBg();
      this.createBird();
      this.createPipes();
      this.checkbirdCollision();
      this.createScore();
      this.createIns();


   }
   update() {

      
      this.checkBirdOutofBound();
      this.reusePipes();
   }

   createBg() {
      this.bg = this.physics.add.sprite(0, 0, 'background').setOrigin(0);

   }

   createBird() {
      this.bird = this.physics.add.sprite(50, game.config.height / 2, 'bird');
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

  
   createScore() {
      this.score = 0;
      this.scoreText;
      this.highScore = localStorage.getItem("easyHighScore");
      this.scoreText = this.add.text(0, 0, "Pipes Evaded: 0", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
      this.highScoreText = this.add.text(0, 20, `Highest Pipes Evaded: ${this.highScore || 0}`, { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })

   }

   createIns()
   {
      this.insText= this.add.text(0, 200, "Click to start", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
   }

   checkbirdCollision() {
      this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);

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

   reusePipes() {
      //create an empty array. If the pipes goes out of bounds, i push it in the array. then if array is full, i place the pipe again reusing it.
      let usedPipes = [];
      this.pipes.getChildren().forEach(pipe => {
         if (pipe.getBounds().right <= 0) // if position of the right side of the pipe canvas reaches 0 or < 0. Then i assumed that the pipe is out of the main canvas.
         {
            usedPipes.push(pipe);
            if (usedPipes.length == 2) {
               this.increaseScore();
               this.placePipes(...usedPipes);
            }
         }

      })
   }

  

   saveHighScore() {
      this.highScoreText = localStorage.getItem("easyHighScore");
      this.highScore = this.highScoreText && parseInt(this.highScoreText);

      if (!this.highScore || this.score > this.highScore) {
         localStorage.setItem("easyHighScore", this.score);
      }
   }

   gameOver() {

      this.saveHighScore();
      this.scene.restart();
   }


   birdFlap() {
      this.input.on("pointerdown", (e) => {
         if (e.leftButtonDown()) {

            this.bird.setVelocityY(this.birdFlapSpeed);
         }
      })
   }

 
   resumeGame() {
      this.input.on("pointerdown", (e) => {
         if (e.leftButtonDown()) {
            this.insText.destroy();
            this.physics.resume();
         }
      })
   }

   increaseScore()
   {
      this.score += 1;
      this.saveHighScore();
      this.scoreText.setText(`Pipes Evaded: ${this.score}`);
   }

}




