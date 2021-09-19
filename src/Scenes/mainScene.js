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
      

   }
   update() {
      if (this.bird.y < 0 || this.bird.y > 512) {
         this.scene.restart();
      }
   }

   createBg() {
      this.bg = this.physics.add.sprite(0, 0, 'background').setOrigin(0)

   }

   createBird() {
      this.bird = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'bird');
      this.bird.body.gravity.y = 500;
      this.birdFlap();

   }

   birdFlap() {
      this.input.on("pointerdown", () => {
         this.bird.setVelocityY(-200);
      })
   }



   createPipes() {
      this.pipes= this.physics.add.group();
      this.xDistance = 0;

      for (let i = 0; i < 4; i++) {
    
         const upper = this.pipes.create(0, 0, "pipe").setOrigin(0,1).setFlipY(true);
         const lower = this.pipes.create(0, 0, "pipe").setOrigin(0,0);
         this.placePipes(upper,lower);
   

      }

      this.pipes.setVelocityX(-200);

   }

   placePipes(upper,lower)
   {
      upper.x = 200 + this.xDistance;
      upper.y = 100;

      lower.x = upper.x;
      lower.y = 100+200;

      this.xDistance +=400;
   }

}





