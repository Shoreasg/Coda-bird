// this is where everything loads
const config = {
    type: Phaser.AUTO, // will automatically tries to use WebGL. If browser or device doesn't support, it will use canvas instead
    title: "3 in 1 Bird", // title of the game. Can see in console.
    url: "https://shoreasg.github.io/Coda-bird/", // tell people where to find the code. Can be found in console.
    parent: "main", //specify the parent container to append the canvas to.
    width: 288, // set width of canvas
    height: 512, // set height of canvas
    version: 1.0, // tell people what version of the game this is. Can be found on console.
    autoCenter: Phaser.Scale.CENTER_BOTH, //center the canvas
    physics: {
        default: 'arcade', //set physics to arcade
    },
    scene: [MainMenu,DodgePipes,CollectStars,DodgeBirds,gameOver] //put the scene in an array and arrange them accordingly.
           
    
};
let game = new Phaser.Game(config); //create an instance of the game object. Assign it to a variable called game.




