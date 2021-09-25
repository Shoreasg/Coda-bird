class gameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");

    }

    preload() {
        this.load.image('gameover', 'src/sprites/gameOver.png');
        this.load.audio("GameOverMusic", "src/Music/POL-spirits-dance-short.wav")
    }


    create() {
        this.createGameOver();
    }


    createGameOver() {
        this.gameover = this.add.image(50, game.config.height / 2, 'gameover').setOrigin(0);
        this.add.text(35, 300, "Click Anywhere to return to Main Menu", { fontFamily: 'VT323', fontSize: '15px', fill: '#FFF' });
        this.createMusic();
        this.input.once("pointerdown", (e) => {
            if (e.leftButtonDown()) {
                this.music.stop();
                this.scene.stop("GameOver");
                this.scene.launch("titleScreen")
            }


        })
    }
    createMusic() {

        this.music = this.sound.add("GameOverMusic");
        this.music.play(
            {
                loop: true,
            })


    }
}

