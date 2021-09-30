class DodgePipes extends Phaser.Scene {// extend fropm Phaser Scene to use the orignal class methods
   constructor() {
      super("DodgePipes"); //name this scene DodgePipes so that we can call it later

   }

   preload() { //load everything
      this.load.image('background', 'src/sprites/background-day.png');
      this.load.image('pipe', 'src/sprites/pipe-red.png');
      this.load.image('bird', 'src/sprites/bluebird-downflap.png');
      this.load.image('pauseBtn', 'src/sprites/pause.png');
      this.load.image('backBtn', 'src/sprites/back.png');
      this.load.audio("collectPoints", "src/Music/CoinCollect.ogg")
      this.load.audio("birdFlap1", "src/Music/toggle_001.ogg")
   }
   create() {


      this.gameisPaused = false; //create a variable that checks if the game is paused.
      this.pause(); // pause the game and set the game pause check is true.


      this.pipesSpeed = -200; // set velocity to -200 by x axis
      this.birdFlapSpeed = -200; // set bird velocity of y axis to -200
      this.createBg(); // create the background of the scene
      this.createBird();

      this.createPipes();
      this.checkbirdCollision();
      this.createScore();
      this.createIns();
      this.createBackButton();
      this.startGame();



   }
   update() {


      this.checkBirdOutofBound();
      this.reusePipes();




   }

   createBg() { // create background
      this.add.sprite(0, 0, 'background').setOrigin(0);

   }

   createBird() { // create the player/bird
      this.bird = this.physics.add.sprite(50, game.config.height / 2, 'bird');
      this.bird.body.gravity.y = 500;
      this.birdFlap();
   }

   createPipes() { //create the pipes
      this.pipes = this.physics.add.group(); // create a group called pipes


      for (let i = 0; i < 4; i++) { // create 4 set of pipes. Upper and lower

         const upper = this.pipes.create(0, 0, "pipe").setOrigin(0, 1).setFlipY(true); //flip the pipes as the image is in the opposite direction
         const lower = this.pipes.create(0, 0, "pipe").setOrigin(0, 0); // set the lower pipe
         this.placePipes(upper, lower); //called the placePipes function and place the pipes accordingly.


      }



      this.pipes.setVelocityX(this.pipesSpeed); // set all of the pipes to have a velocity.

   }


   createScore() { // this function create the score on the canvas
      this.score = 0; // start with score = 0
      this.scoreText; // text vairable.
      this.highScore = localStorage.getItem("easyHighScore"); // set highscore variable to get the local storage of key "easyHighScore"
      this.scoreText = this.add.text(0, 0, "Pipes Evaded: 0", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' }) // set the text of the current score
      this.highScoreText = this.add.text(0, 20, `Highest Pipes Evaded: ${this.highScore || 0}`, { fontFamily: 'VT323', fontSize: '20px', fill: '#000' }) // set the last highscore that the user get.Let say the local storage is empty, set it to 0.

   }

   createIns() { // create instructions to tell the user on what to do when the game start.
      this.insText = this.add.text(5, 170, "Evade the Pipes", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })
      this.insText2 = this.add.text(10, 200, "Click to start", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' })

   }

   createPauseButton() { // create pause button


      this.pauseButton = this.add.sprite(15, 465, 'pauseBtn').setInteractive({ useHandCursor: true })

      this.pauseorResume();

   }


   createBackButton() { // create back button


      this.BackButton = this.add.sprite(15, 490, 'backBtn').setInteractive({ useHandCursor: true })
      this.Back();
   }




   checkbirdCollision() { // function to check bird Collision with the pipes. If yes, call gameover function.
      this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);

   }

   getRightPipePosition() { // function to get the last active pipe position and return it.
      let rightPipeX = 0
      this.pipes.getChildren().forEach(pipe => {

         rightPipeX = Math.max(pipe.x, rightPipeX);
      })

      return rightPipeX;
   }

   checkBirdOutofBound() { // check if bird is out of canvas. Yes, game is over.
      if (this.bird.y < 0 || this.bird.y > 512) {
         this.gameOver();
      }
   }


   placePipes(upper, lower) { // place the upper and lower pipes.

      const xPostition = this.getRightPipePosition(); // get the last active pipe position.
      let randUpperYPosition = Math.floor(Math.random() * 221) + 100// random num from 100 -320, random y position for the pipes
      let randLowerYDistance = Math.floor(Math.random() * 51) + 100 // random num from 100-150, random y position for the pipes
      this.randxDistance = Math.floor(Math.random() * 300) + 200; // choose random num from 200 - 300 from the pipe from previous and add
      upper.x = xPostition + this.randxDistance; // add random distance to the last active pipe.
      upper.y = randUpperYPosition; // set a random y position for the upper pipe.

      lower.x = upper.x; // lower x position of pipe is the same as upper pipe.
      lower.y = upper.y + randLowerYDistance; // add a random length to create a small opening between the 2 pipes.

   }

   reusePipes() {
      //create an empty array. If the pipes goes out of bounds, i push it in the array. then if array is full, i place the pipe again reusing it.
      let usedPipes = [];
      this.pipes.getChildren().forEach(pipe => {
         if (pipe.getBounds().right <= 0) // if position of the right side of the pipe canvas reaches 0 or < 0. Then i assumed that the pipe is out of the main canvas.
         {
            usedPipes.push(pipe);
            if (usedPipes.length == 2) {
               this.sound.play("collectPoints")
               this.increaseScore(); // increase score.
               this.placePipes(...usedPipes);
            }
         }

      })
   }



   saveHighScore() { //save highscore to localstorage.
      this.highScoreText = localStorage.getItem("easyHighScore");
      this.highScore = this.highScoreText && parseInt(this.highScoreText);

      if (!this.highScore || this.score > this.highScore) {
         localStorage.setItem("easyHighScore", this.score);
      }
   }

   gameOver() { // once game over, save the highscore and return user to main title screen.

      this.saveHighScore();
      this.scene.stop("DodgePipes");
      this.scene.launch("GameOver");

   }


   birdFlap() { //detect if user right click. Yes, flap the bird.
      this.input.on("pointerdown", (e) => {
         if (e.leftButtonDown()) {
            if(this.gameisPaused == false)
            {
               this.sound.play("birdFlap1")
            }
       
            this.bird.setVelocityY(this.birdFlapSpeed);
         }
      })
   }


   startGame() { // check if user click on the scene when the game is start. Yes, start the game else keep it pause.
      this.input.once("pointerdown", (e) => {
         if (e.leftButtonDown()) {
            this.insText.destroy();
            this.insText2.destroy();
            this.resume();
            this.createPauseButton();

         }


      })

   }

   increaseScore() { // increase score function.
      this.score += 1;
      this.saveHighScore();
      this.scoreText.setText(`Pipes Evaded: ${this.score}`);
   }

   pause() { // pause function

      this.gameisPaused = true;
      this.physics.pause();
   }

   resume() { // resume function

      this.gameisPaused = false;
      this.physics.resume();


   }

   pauseorResume() { //check if the button of pause is press. if yes, paused the game if the game is not pause else unpause the game if the game is pause.
      this.pauseButton.on("pointerdown", () => {
         if (this.gameisPaused === false) {
            this.PausedText = this.add.text(120, game.config.height / 2, "Paused", { fontFamily: 'VT323', fontSize: '20px', fill: '#F00' })
            this.pause();

         }
         else if (this.gameisPaused === true) {
            this.PausedText.destroy();
            this.resume();
         }
      })

   }

   Back() { //back function. if user press back button, go back to main scene.
      this.BackButton.once("pointerdown", () => {
         this.scene.stop("DodgePipes");
         this.scene.launch("titleScreen");

      })
   }

}




