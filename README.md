# Coda-bird

## Day 1- 18/9/2021
- Added Phaser
- Added-Sprites
- loaded basic background

### Day 1 summary

First day of the project, i have decided to use Phaser 3.55.2.
Reason:

1. It has physcis in the framework
2. Simple to load and draw canvas

Started off with researching and reading the API documentation. Then i start to do basic setup and managed to load my background and play canvas.

## Day 2- 19/9/2121
- Added Player and Movement
- Added Pipes

### Day 2 summary

Second day, i managed to load the pipes and player images in. Managed to create the input of the player and think of how to draw multiple pipes. I spend a lot of time in thinking of how to implement the generating of the pipes. I managed to generate 4 of the same x and y axis pipes. I am planning to research on how to generate random pipes length.

Issue that i had
 1. When i first added the pipes, my upper pipes are falling down. Found the issue which is my game config, i set the default gravity to be Y which works for the bird but it will also affect the pipes. So i removed it and set the bird with its own gravity.

 2. I had troubles looping the pipes. What do i meant was that i planned to use a time event loop function provided by the framework to call createPipes() every 30 seconds. However, it created a infinite loop which resulted in multiple pipes created once. 

 Since the framework goes by scene, i have decided to create multiple js file for each scene. mainScene will be the main gameplay.


## Day 3- 20/9/2121
- Pipes regeneration
- Added Collision

 ### Day 3 Summary

 Third day, i spend sometime to play around with the values of the length and positioning of the pipes. I used random generator to determine the distance and length of the pipes. I also manage to find a way to regenerate the pipes. By using getBounds provided by the framework, https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.GetBounds.html, i get the bounds of the pipe and store the value in a rectangle like object. I use this values to check the if its fully out of the game canvas. Yes, i push it into an empty array. Once its reaches 2, i will recycle the pipes and place it again.
 Lastly, i used collider class to check for the collsion. https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Collider.html. If the bird hits the pipes, i will restart the game.

 Issues that i had

 1. Trying to find a way to create a function to reuse the pipe and collision. The Phaser framework documentation isn't very user friendly. I had to use examples code on the website to play around and get what they meant.
 
 2. I tried to create another scene and tried to transtioned from Game scene to another scene. Seem like there are some issues with it and i have yet to understand what the issue was.

 Tomorrow, I will be creating coins and maybe bullets for the player to collect and dodge respectively. Then i will research on how to change scenes.


## Day 4- 21/9/2121

- Added coins and collision for coins.
- Fixed Pipes spawning distance


Fourth day, i found some bugs while playing the game. I realized that my pipes get spawned even further away after each time it passes. I fix the bug by getting the previous position of the pipe and then do the necessary calcluations. After that i implemented coins into the game and the player is able to collect coins now. After testing the game, i realized that it is quite hard to collect the coins. Not sure should i even add bullets as a obstacle for the players to dodge. I will think about it.

Issues that i had

1. I had trouble trying to make the coin respawn after the player collect it. Maybe my logic is wrong. I will spend sometime tomorrow to think about it.

2. I sepend a lot of time to think on how to fix the pipes being spawn further away after each time it passes.

Tomorrow, i will spend time to think of coin respawn and maybe to add bullets into it. I will let some people to test play it before deciding whether to add bullets or not.


## Day 5- 22/9/2121

- Fix Coins spawning logic.
- Added score and change some parameters to global variable so that i can change the difficulty.


Fifth day, i managed to find the reason why my coin isn't respawning after collecting it. I need to update it and set a timer to call create. Every 5 seconds, i will call the create function and create the coins respectively. I also added a simple score board and change some parameters. If user collected 5 stars, i will increase the pipe speed to make the game even harder.

Issues that i had

1. Took me a while to think why my respawning isn't working. 
2. I also tried to destory the coins when it reaches outside of the canvas. I feel that this is not very optimized if i do that so i kept the logic of if coin is outside of the canvas, i will reuse it until players collect it.

Tomorrow, i will be letting people to test it and from there, i will ask decide if i want to add more obstacles.



## Day 6- 23/9/2121

- Added Main Menu
- Added 3 different levels

Sixth day, i started working on the main menu and create functionalities such as after the user selected the level, the game will pause until user clicked to start. Also added localstorage to keep track of that particular level highscore.

Easy level gameplay would be flappybird gameplay. Simple and slow
Normal Gameplay would be flappybird but instead of earning points by dodging pipes, Players earn points by collecting stars
Hard Gameplay would required player to collect stars, dodge pipes and incoming bullets at the same time

Easy and normal level framework is done. I will be adding bullets obstacles tomorrow for the hard level. Will also be implementing back functionality and pause functioanlity.

Issues that i had

1. Took me to understand how the scene worked. Apparently pausing the scene will cause everything to be pause. Instead of pausing the scene before the user start, i paused the physics instead, creating the illusion of its paused.

2. I feel that i could tidy up my main menu code. I don't find it really DRY. Maybe i should create a function to group the buttons together.


## Day 7- 24/9/2121

- Added final mode and spawning of enemy birds
- Added pause button

Seventh Day, i decided to rename my game and i have created the final mode and the spawning of enemy birds. I changed the logic of the spawning of both coins and enemybird. I will spawn one each and i don't check for the distance between the first spawn coin/enemy bird with the next spawn coin/bird. The distance between 2 of these can be different else it will be very weird to have the enemybirds and coin spanwing roughly the same distance.

Issues i had

1. I had issue creating the logic of the pause button. Might be due to my event listener. I will work on this tomorrow.


## Day 8- 25/9/2121

- Added GameOver Scene.
- Added Pause and Resume.
- Added MainMenu and GameOver.

Eight Day, i added my GameOver scene. Not really much issue for today. Also manage to find out what's the issue with my pause button logic. Seem like i set the input on the scene to everything there is a left click, it resume the scene hence the logic was broken. Also, while fixing it, i found a bug which is when i pause the game, the stars and enemies birds are spawning even though it is pause. I change the logic to if the game is pause, Spawning of coins and enemy birds will be pause too.

Tomorrow i will be taking a break. After the break, i will be adding more sound effects and maybe animation to the bird. Will be adding scoreboard if i have the time.



## Day 9- 26/9/2121


- Today is a break day.


## Day 10 - 27/9/2121

Grandma was unconscious at around 11pm. Rush her to the hospital. She passed on after that. Didn't really have any time to settle work.

## Day 11 - 28/9/2021

Spend whole day at the funeral. Reached home and worked on sound effects and create a highscore at the bottom of the screen. Highscore at the bottom will always be refresh every 1 second. Tomorrow or Thursday, i will be adjusting my naming conventions and writing down comments for my code.

## Day 12 - 28/9/2021

Refactor my code.
