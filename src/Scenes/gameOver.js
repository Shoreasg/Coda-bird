class gameOver extends Phaser.Scene { // extend fropm Phaser Scene to use the orignal class methods
    constructor() {
        super("GameOver"); //name this scene as GameOver so we can call it and use it

    }

    preload() {
        this.load.image('GameOver', 'src/sprites/gameover.png'); // load game over png
        this.load.audio("GameOverMusic", "src/Music/POL-spirits-dance-short.wav") // load GameOverMusic
    }


    create() {
        this.createGameOver(); //call create gameover function

    }


    createGameOver() { //this function creates a gameOver page
        this.gameover = this.add.image(50, game.config.height / 2, 'GameOver').setOrigin(0); // add image with the following position.
        this.add.text(35, 300, "Click Anywhere to return to Main Menu", { fontFamily: 'VT323', fontSize: '15px', fill: '#FFF' }); // add text below the image
        this.createMusic(); // play the music on loop
        this.returnToMainMenu();
    }
    createMusic() { //this function plays the music when its game over.

        this.music = this.sound.add("GameOverMusic");
        this.music.play(
            {
                loop: true,
            })


    }

    returnToMainMenu() //this function detects any input on the scene canvas, then stop the music, stop this scene and launch the MainMenu
    {
        this.input.once("pointerdown", (e) => {
            if (e.leftButtonDown()) {
                this.music.stop();
                this.scene.stop("GameOver");
                this.scene.launch("titleScreen")
            }


        })
    }
}

