# Wizard Couple Survivors Devlog
by Nuzcraft

## Intro
I spent 3 days making a game in the style of Vampire Survivors for Wowie Jam 4.0 despite never actually playing Vampire Survivors.

Over 1,000 games were entered and I'm very happy with how my game was rated, landing it in the top 25%.

There are definitely some elements I can improve on, most importantly 'Fun', but I'm proud of the game nonetheless.

Well, you're here for a devlog, so here's how I made Wizard Couple Survivors.

## Preparation

Prep for the Wowie Jam started the night before, when I created a GitHub repo and started thinking about what kind of game I might make.

Limited by my knowledge and skills, I knew I'd be making a simple 2D game with HTML and Javascript. 

It's here that I give a shoutout to Jeremiah Reid and his wonderful Broughlike tutorial, I've left a link in the description.

https://nluqo.github.io/broughlike-tutorial/

I wrote down a bunch of ideas for basic mechanics that I hoped I could build out with a total jam time of 2-3 hours.

Later that night, I happened across a cool video here on Youtube, where a couple of developers tried to recreated Vampire Survivors in 10 lines of code in Godot. Little did I know that this would serve as inspiration the next day. There's a link to the video in the description.

https://www.youtube.com/watch?v=LgvLbahJOTA

## Jam Day 1

Jam day kicked off with the reveal of the jam theme 'Collaborate with AI'. I immediately threw out all my ideas from yesterday and latched onto the idea of building a Vampire Survivors game with an AI companion to help.

I listed out minimum requirements for the game as well as some stretch goals to shoot for after the minimum had been met.

I think this was an important step for me, because it allowed me to take things one step at a time and feel comfortable when I hit the threshold for my minimum viable product.

Things started as they do for most everyone. I got the architecture set up to render a screen, then added a player and companion with some basic WASD movement.

Getting smooth movement was difficult, as I'd only ever made turn based games and prototypes. After some online research, I was able to find a solution that worked well enough for me.

I'm using the 16-bit Fantasy tileset from Oryx Design Lab, link in the description. I really like this set as well as their other work.

After movement, I focused on getting the player to shoot projectiles. This was all well and good, using effect sprites from the Oryx tileset. Eventually, the player and companion were shooting on their own on a timer that I could adjust. Additionally, the projectiles could move at variable speeds and travel for variable distances in variable directions before blinking out of existence.

Next was enemies. Enemies were set to spawn away from the player and companion and move slowly toward whichever was closer. There's no fancy pathfinding, just a straight line to the closest enemy.

With enemies chasing the player down, we had need for collisions, lose conditions, scores, and an easy way to restart. This was bringing us much closer to an actual 'game'.

The final feature added on day 1 was the companion AI. It's remarkably simple and is driven by 2 rules:
- get away from enemies
- stay close to the player

Each frame, the companion finds enemies that are too close and calculates which direction to go to get away from them (on average). If the player is too far away, that will get included in the calculation as well. In my opinion, the companion 'danger zone' is a little too big; it will run away from enemies before they are really close enough for them to get hit with projectiles.

At the end of day 1, there were only 3 'needs' missing from our game: stored high scores, screenshake, and sounds. I'd spent ~4 hours developing the game so far, which was more than I'd expected to be able spend the entire weekend.

## Jam Day 2
