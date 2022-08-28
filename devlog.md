# Wizard Couple Survivors Devlog

by Nuzcraft

## Intro

I spent 3 days making a game in the style of Vampire Survivors for Wowie Jam 4.0 despite never actually playing Vampire Survivors.

Over 1,000 games were entered and I'm very happy with how my game was rated, landing it in the top 25%.

There are definitely some elements I can improve on, most importantly 'Fun', but I'm proud of the game nonetheless.

Well, you're here for a devlog, my name is Nuzcraft, and here's how I made Wizard Couple Survivors.

## Preparation

Prep for the Wowie Jam started the night before, when I created a GitHub repo and started thinking about what kind of game I might make.

Limited by my knowledge and skills, I knew I'd be making a simple 2D game with HTML and Javascript.

It's here that I give a shoutout to Jeremiah Reid and his wonderful Broughlike tutorial, I've left a link in the description.

https://nluqo.github.io/broughlike-tutorial/

I wrote down a bunch of ideas for basic mechanics that I hoped I could build out with a total jam time of 2-3 hours. Dodging or collecting objects for a high score isn't particularly engaging, but I was looking for broad ideas I could implement in a very short timeframe, maybe 2-3 hours.

Later that night, I happened across a cool video here on Youtube, where a couple of developers tried to recreate Vampire Survivors in 10 lines of code in Godot. Little did I know that this would serve as inspiration the next day. There's a link to the video in the description.

https://www.youtube.com/watch?v=LgvLbahJOTA

## Jam Day 1

Jam day kicked off with the reveal of the jam theme 'Collaborate with AI'. I immediately threw out all my ideas from yesterday and latched onto the idea of building a Vampire Survivors game with an AI companion to help.

I listed out minimum requirements for the game as well as some stretch goals to shoot for after the minimum had been met. I think this was an important step for me, because it allowed me to take things one step at a time and feel comfortable when I hit the threshold for my minimum viable product.

Things started as they do for most everyone. I got the architecture set up to render a screen, then added a player and companion with some basic WASD movement.

I pulled a bunch of boilerplate syntax, function logic, and class structures from a separate project of mine. Almost nothing was fully copy-pasted, but it was really helpful to see instances where I'd solved those problems before.

Getting smooth movement was difficult, as I'd only ever made turn based games and prototypes. After some research, I was able to find a solution that worked well enough for me.

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

The first thing I worked on Day 2 was high scores. I decided to score the player and companion separately and combine the scores for the high score. Most of the logic here was pulled from Jeremiah Reid's Broughlike tutorial, altered to make sense for the kinds of scores I was storing.

Screenshake went in as a quick feature, and all of a sudden I was only one feature away from my minimum viable product! Was it now time to work on sounds? No. I started pulling from my wishlist by starting to work on player progression.

At this point, the game could have been called done, but it was frightfully difficult to lose. Player progression made it so that the player fired different kinds of projectiles as they gained score, basically as a level up system to help them deal with higher volumes of enemies.

Both the player and companion would eventually transition through 5 different levels of projectiles, each expanding the previous one's ability to take out monsters. This took the majority of day 2. I knew that this progression had the opportunity to feel good for the player, and I wasn't too concerned with the state of the game since we'd gotten so many features in already. I spent about 2 hours developing on day 2, virtually all of it while watching Lord of the Rings: The Two Towers.

## Jam Day 3

On the final day, I wanted to wrap up a few things and get the game posted to itch.io. The first thing was enemy progression. I started by adding new enemy types. In addition to the basic, slow enemy, I added a fast one and a tanky one. The fast one would serve as a challenge to make sure players were moving around and the tanky one would add to the chaos toward the end of the run.

It was only here, on day 3, that I updated my sprites to actually match the theme of the game, swapping the knight and rogue sprites with red and purple wizards and changing the enemy to a zombie.

Sprite flipping was something I couldn't figure out with the regular spritesheet, so I flipped it in GIMP and added the fipped version as a second resource. Then I updated my draw logic to take into account the horizontal velocity to choose which spritesheet to use. I had to do hard maths to figure out how to use the same parameters to get the flipped sprite since the order in each row is backwards for the flipped version.

Enemy progression was finalized similar to player progression, everything scaling off the player score, with higher scores equating to more fast and tanky enemies in addition to a higher total volume of enemies.

Next up, I worked on adding a background. This included drawing a tile + a semi-random overlay to each section of the screen. I also made it so that when monsters die, bones appear on the background tile beneath them. Since the player kills A LOT of enemies, I figured this would equate to the screen filling up with bones.

Next, I added effects, like explosions, that would be rendered to the screen when enemies were hit with projectiles. This, with screenshake, adds a lot of impact to the player landing shots, and I'm pretty happy with how these turned out. Getting them to animate as expected was a bit of a pain for some reason, but I worked it out and it looks great.

Finally, towards the end of Day 3, I checked off the final box of my minimum viable product with sounds from SFXR, link in the description. I only included sounds for shooting a projectile and for an explosion. Ideally, I'd have added background music, but I didn't have time or energy for that.

The final pieces I aded before submitting: player spawning in a random location, and the letters WASD on screen around the player when a game is started. I'm not really pumped about this hacky way of showing the controls in-game, but it was getting late, the second half of the Two Towers had already finished, and I was ready for bed.

I zipped everything up, slapped together an itch page, submitted to the jam, and went to bed. I'd spent almost 3 hours developing. I don't remember when I'd landed on calling the game Wizard Couple Survivors, but it was sometime during this development stretch.

There's a link to the game as well as the source code in the description, please go play it.

## Conclusion

In conclusion, I'm really happy with how things went with this project. I learned a lot about being okay with spaghetti code when it serves a purpose. Taking the easy and obvious route to solve most problems was indeed correct most of the time over this weekend. I made a list, followed the list in small, easy steps, and the result was better than I expected. Feedback on the game was generally positive, which was confidence booster. A few things mentioned that I would have liked to do better:

- Scared Companion - the companion runs away from enemies before it really has a chance to hit them with a projectile, reducing the radius it scans for enemies to run away from might have helped the companion feel more involved, but might have also gotten it killed more often, which would frustrate the player.
- Bounding the map in some way - in the jam version, the player and companion can just leave the visible area to avoid enemies forever, I would have like to have a large bounded area with a moving camera
- Enemy and player progression - eventually, you just lose because your projectiles can't keep up and you can't see yourself dodging outside the camera view. Better tuned player and enemy progression could have made it more fun

That is how I made Wizard Couple Survivors for Wowie Jam 4.0. Total development time was around 9-10 hours spread over 3 days. Please like and subscribe if you enjoyed this or found it interesting. Thanks!
