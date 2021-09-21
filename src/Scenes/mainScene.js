class MainScene extends Phaser.Scene {

   preload() {
      this.load.image('background', 'src/sprites/background-day.png');
      this.load.image('pipe', 'src/sprites/pipe-red.png');
      this.load.image('bird', 'src/sprites/bluebird-downflap.png');
   }
   create() {

      this.createBg();
      this.createBird();
      this.createPipes();
      this.checkCollision();


   }
   update() {
      this.checkBirdOutofBound();
      this.reusePipes();
   }

   createBg() {
      this.bg = this.physics.add.sprite(0, 0, 'background').setOrigin(0)

   }

   createBird() {
      this.bird = this.physics.add.sprite(50, game.config.height / 2, 'bird');
      this.bird.body.gravity.y = 500;
      this.birdFlap();


   }

   birdFlap() {
      this.input.on("pointerdown", (e) => {
         if(e.leftButtonDown())
         {
         this.bird.setVelocityY(-200);
         }
      })
   }



   createPipes() {
      this.pipes = this.physics.add.group();
      this.randxDistance = 0

      for (let i = 0; i < 4; i++) {

         const upper = this.pipes.create(0, 0, "pipe").setOrigin(0, 1).setFlipY(true);
         const lower = this.pipes.create(0, 0, "pipe").setOrigin(0, 0);
         this.placePipes(upper, lower);


      }

      this.pipes.setVelocityX(-200);

   }

   placePipes(upper, lower) {

      const xPostition = this.getRightPipePosition(); // first position will be position 300
      let randUpperYPosition = Math.floor(Math.random() * 221) + 100// random num from 100 -320
      let randLowerYDistance = Math.floor(Math.random() * 51) + 100 // random num from 100-150
      this.randxDistance = Math.floor(Math.random() * 201) + 400; // choose random num from 200 - 300 from the pipe from previous and add
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
               this.placePipes(...usedPipes);
            }
         }

      })
   }

   getRightPipePosition()
   {
      let rightPipeX = 0
      this.pipes.getChildren().forEach(pipe =>
         {
            rightPipeX= Math.max(pipe.x,rightPipeX);
         })

         return rightPipeX;
   }

   checkCollision() {
      this.physics.add.collider(this.bird, this.pipes, this.gameover, null, this);
   }

   checkBirdOutofBound() {
      if (this.bird.y < 0 || this.bird.y > 512) {
         this.gameover();
      }
   }

   gameover() {
      this.scene.restart();
   }

}





