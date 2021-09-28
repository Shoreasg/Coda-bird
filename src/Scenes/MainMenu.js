class MainMenu extends Phaser.Scene {
    constructor() {
        super("titleScreen");
    }

    preload() {
        this.load.image('background', 'src/sprites/background-day.png');
        this.load.image('easyBird', 'src/sprites/bluebird-downflap.png');
        this.load.image('mediumBird', 'src/sprites/redbird-downflap.png');
        this.load.image('hardBird', 'src/sprites/yellowbird-downflap.png');


        this.load.audio("MainMenuMusic", "src/Music/POL-follow-me-short.wav")
        this.load.audio("hoverSoundPipes", "src/Music/toggle_001.ogg")
        this.load.audio("hoverSoundStars", "src/Music/toggle_002.ogg")
        this.load.audio("hoverSoundBirds", "src/Music/toggle_003.ogg")
        this.createText();
    }
    create() {

        this.createBg();
        this.createText();
        this.createChoices();
        this.createMusic();
    }



    createBg() {
        this.bg = this.physics.add.sprite(0, 0, 'background').setOrigin(0);

    }

    createMusic() {

        this.music = this.sound.add("MainMenuMusic");
        this.music.play(
            {
                loop: true,
            })


    }
    createText() {
        this.add.text(85, 106, "3 in 1", { fontFamily: 'VT323', fontSize: '50px', fill: '#000' });
        this.add.text(110, 160, "Bird", { fontFamily: 'VT323', fontSize: '40px', fill: '#000' });
        this.add.text(40, 200, "Select a mode!", { fontFamily: 'VT323', fontSize: '40px', fill: '#000' });
        this.add.text(40, 260, "Pipes!", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' });
        this.add.text(120, 260, "Stars!", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' });
        this.add.text(200, 260, "Birds!", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' });
    }

    createChoices() {


        this.easyButton = this.add.sprite(60, 300, "easyBird").setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.easyHoverState())
            .on("pointerout", () => this.resetEasyState())
            .on("pointerdown", () => this.clickedEasyState());


        this.mediumButton = this.add.sprite(140, 300, "mediumBird").setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.mediumHoverState())
            .on("pointerout", () => this.resetMediumState())
            .on("pointerdown", () => this.clickedNormalState());


        this.hardButton = this.add.sprite(220, 300, "hardBird").setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.hardHoverState())
            .on("pointerout", () => this.resetHardState())
            .on("pointerdown", () => this.clickedHardState());
    }

    easyHoverState() {
        this.easyButton.setTint(0xff0000);
        this.sound.play("hoverSoundPipes")

    }
    mediumHoverState() {

        this.mediumButton.setTint(0xff0000);
        this.sound.play("hoverSoundStars")

    }
    hardHoverState() {

        this.hardButton.setTint(0xff0000);
        this.sound.play("hoverSoundBirds")
    }

    resetEasyState() {
        this.easyButton.clearTint();

    }

    resetMediumState() {

        this.mediumButton.clearTint();

    }

    resetHardState() {
        this.hardButton.clearTint();
    }


    clickedEasyState() {
        this.scene.stop("titleScreen");
        this.music.stop();
        this.scene.start("DodgePipes");
    }
    clickedNormalState() {
        this.scene.stop("titleScreen");
        this.music.stop();
        this.scene.start("CollectStars");
    }
    clickedHardState() {
        this.scene.stop("titleScreen");
        this.music.stop();
        this.scene.start("DodgeBirds");
    }

}