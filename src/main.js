// this is where everything loads
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
    },
    scene: [MainMenu,MainScene]
           
    
};
let game = new Phaser.Game(config);




