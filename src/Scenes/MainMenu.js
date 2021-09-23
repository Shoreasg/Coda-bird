class MainMenu extends Phaser.Scene {
    constructor() {
        super("titleScreen");
    }

    preload() {
        this.load.image('background', 'src/sprites/background-day.png');
        this.load.image('easyBird', 'src/sprites/bluebird-downflap.png');
        this.load.image('mediumBird', 'src/sprites/redbird-downflap.png');
        this.load.image('hardBird', 'src/sprites/yellowbird-downflap.png');
    }
    create() {
        this.createBg();
        this.createText();
        this.createChoices();
    }

    createBg() {
        this.bg = this.physics.add.sprite(0, 0, 'background').setOrigin(0);

    }

    createText() {
        this.add.text(50, 106, "Impossible", { fontFamily: 'VT323', fontSize: '50px', fill: '#000' });
        this.add.text(115, 160, "Bird", { fontFamily: 'VT323', fontSize: '40px', fill: '#000' });
        this.add.text(45, 260, "Easy", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' });
        this.add.text(120, 260, "Medium", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' });
        this.add.text(205, 260, "Hard", { fontFamily: 'VT323', fontSize: '20px', fill: '#000' });
    }

    createChoices() {

       
       this.buttons = this.add.group();

        this.easyButton = this.add.sprite(60, 300, "easyBird").setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.easyHoverState())
            .on("pointerout", () => this.resetEasyState())
            .on("pointerdown", () => this.clickedEasyState());


        this.mediumButton =  this.add.sprite(140, 300, "mediumBird").setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.mediumHoverState())
            .on("pointerout", () => this.resetMediumState())
            .on("pointerdown", () => this.clickedNormalState());


        this.hardButton =  this.add.sprite(220, 300, "hardBird").setInteractive({ useHandCursor: true })
            .on("pointerover", () => this.hardHoverState())
            .on("pointerout", () => this.resetHardState())
            .on("pointerdown", () => this.clickedHardState());
    }

    easyHoverState() {
        this.easyButton.setTint(0xff0000);
        
    }
    mediumHoverState() {
        
        this.mediumButton.setTint(0xff0000);
    
    }
    hardHoverState() {
       
        this.hardButton.setTint(0xff0000);
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
        this.scene.launch("Easy");
    }
    clickedNormalState() {
        this.scene.stop("titleScreen");
        this.scene.launch("Normal");
    }
    clickedHardState() {
        this.scene.stop("titleScreen");
        this.scene.launch("Hard");
    }

}