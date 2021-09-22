class MainMenu extends Phaser.Scene
{
    constructor()
    {
        super("titleScreen");
    }

    create()
    {
        this.add.text(20,20,"Loading game....");
        this.scene.start("GameScene");
    }
}