class MediumLevel extends Phaser.Scene {
   constructor() {
      super("Medium");



   }

   preload() {
      this.load.image('background', 'src/sprites/background-day.png');
      this.load.image('pipe', 'src/sprites/pipe-red.png');
      this.load.image('bird', 'src/sprites/bluebird-downflap.png');
      this.load.image('coin', 'src/sprites/star.png');
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
      this.createCoins();
      this.checkbirdCollision();
      this.checkcoinCollision();
      this.createScore();
      this.createIns();


   }
   update(time, delta) {

      this.increaseDifficulty();
      this.checkBirdOutofBound();
      this.reusePipes();

      this.respawntime += delta;
      if (this.respawntime >= 5000) {
         this.createCoins();
         this.checkcoinCollision();
         this.respawntime = 0;
      }


      this.reuseCoins();
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

   createCoins() {

      this.coins = this.physics.add.group();
      this.coin_x_Distance = 0;


      for (let i = 0; i < 2; i++) {



         const groupOfCoins = this.coins.create(0, 0, "coin")
         this.placeCoins(groupOfCoins);



      }

      this.coins.setVelocityX(this.coinSpeed);

   }

   createScore() {
      this.score = 0;
      this.scoreText;
      this.highScore = localStorage.getItem("this.highScore");
      this.scoreText = this.add.text(0, 0, "Stars: 0", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
      this.highScoreText = this.add.text(0, 20, `Highest stars: ${this.highScore || 0}`, { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })

   }

   createIns()
   {
      this.insText= this.add.text(0, 200, "Click to start", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
   }

   checkbirdCollision() {
      this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);

   }

   checkcoinCollision() {
      this.physics.add.overlap(this.bird, this.coins, this.collectStar, null, this);
   }




   getRightPipePosition() {
      let rightPipeX = 0
      this.pipes.getChildren().forEach(pipe => {

         rightPipeX = Math.max(pipe.x, rightPipeX);
      })

      return rightPipeX;
   }

   getRightCoinPosition() {
      let rightCoinX = 0
      this.coins.getChildren().forEach(coin => {

         rightCoinX = Math.max(coin.x, rightCoinX);
      })

      return rightCoinX;
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

   placeCoins(coin) {
      let coinsXPosition = this.getRightCoinPosition();
      let coinsYPosition = Math.floor(Math.random() * 401) + 100
      this.coin_x_Distance = Math.floor(Math.random() * 201) + 400

      coin.x = coinsXPosition + this.coin_x_Distance;
      coin.y = coinsYPosition;


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

   reuseCoins() {
      let usedCoins = [];
      this.coins.getChildren().forEach(coin => {
         if (coin.getBounds().right <= 0) {
            usedCoins.push(coin);
            if (usedCoins.length == 1) {
               this.placeCoins(usedCoins[0]);
            }
         }


      })
   }

   saveHighScore() {
      this.highScoreText = localStorage.getItem("this.highScore");
      this.highScore = this.highScoreText && parseInt(this.highScoreText);

      if (!this.highScore || this.score > this.highScore) {
         localStorage.setItem("this.highScore", this.score);
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

   collectStar(bird, coin) {
      coin.disableBody(true, true)
      this.score += 1;
      this.saveHighScore();
      this.scoreText.setText(`Coins: ${this.score}`);


   }
   increaseDifficulty() {
      if (this.score === 5) {
         this.pipesSpeed = -300;
         this.coinSpeed = -400;
         this.coins.setVelocityX(this.coinSpeed);
         this.pipes.setVelocityX(this.pipesSpeed);
      }
   }

   resumeGame() {
      //debugger;

      this.input.on("pointerdown", (e) => {
         if (e.leftButtonDown()) {
            this.insText.destroy();
            this.physics.resume();
         }
      })
   }

}




