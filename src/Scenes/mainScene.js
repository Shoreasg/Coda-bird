class MainScene extends Phaser.Scene {

   preload() {
      this.load.image('sky', 'src/sprites/background-day.png');
      this.load.image('pipe', 'src/sprites/pipe-red.png');
      this.load.image('bird', 'src/sprites/bluebird-downflap.png');
   }
   create() {

      this.createBg();
      this.createBird();


   }


   createBg() {
      this.add.image(0, 0, 'sky').setOrigin(0);
   }

   createBird() {
      this.bird = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'bird');
      this.birdFlap();
    
   }

   birdFlap()
   {
      this.input.on("pointerdown", () => {
         this.bird.setVelocityY(-150);
      })
   }

   update()
   {
      if(this.bird.y< 0 || this.bird.y > 512)
      {
         this.scene.restart();
      }
   }

   createPipes()
   {
      
   }

}





