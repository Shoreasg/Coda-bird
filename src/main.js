// this is where everything loads
const config = {
    type: Phaser.AUTO,
    title: "3 in 1 Bird",
    url: "https://shoreasg.github.io/Coda-bird/",
    parent: "main",
    input: true,
    width: 288,
    height: 512,
    version: 1.0,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
    },
    scene: [MainMenu,DodgePipes,CollectStars,DodgeBirds,gameOver]
           
    
};
let game = new Phaser.Game(config);




