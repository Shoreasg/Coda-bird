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



