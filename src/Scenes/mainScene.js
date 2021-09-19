class MainScene extends Phaser.Scene{
  
    preload() {
      this.load.image('sky', 'src/sprites/background-day.png');
      this.load.image('pipe', 'src/sprites/pipe-red.png');
      this.load.image('bird', 'src/sprites/bluebird-downflap.png');
   }
   create() {

      const bg = this.add.image(0, 0, 'sky').setOrigin(0);
      this.createBird();
      
      
   }
   createBird()
   {
      let player = this.physics.add.sprite(game.config.width/2,game.config.height/2,'bird');
      player.setCollideWorldBounds(true);

      this.input.on("pointerdown", () => {
         player.setVelocityY(-100);
      })
   }

}





