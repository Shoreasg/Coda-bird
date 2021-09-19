# Fluffy-bird

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

Issue that i met was
 1. When i first added the pipes, my upper pipes are falling down. Found the issue which is my game config, i set the default gravity to be Y which works for the bird but it will also affect the pipes. So i removed it and set each object 1 gravity.

 2. I had troubles looping the pipes. What do i meant was that i planned to use a time event loop function provided by the framework to call createPipes() every 30 seconds. However, it created a infinite loop which resulted in multiple pipes created once. 

 Since the framework goes by scene, i have decided to create multiple js file for each scene. mainScene will be the main gameplay.