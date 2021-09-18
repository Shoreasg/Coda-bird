const config = {
    type: Phaser.AUTO,
    title: "Coda Bird",
    url: "https://shoreasg.github.io/Coda-bird/",
    parent: "main",
    width: 288,
    height: 512,
    version: 1.0,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

function preload() {

    this.load.image('sky', 'sprites/background-day.png');
}



function create() {

    const sky = this.add.image(0, 0, 'sky').setOrigin(0);



}

