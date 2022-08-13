# Jam Game for Wowie Jam 4.0
Wowie! It has been a long time since I participated in a game jam. The last one was 7DRL in 2020? I hope I can have fun this time.

I will be pretty busy this weekend, so I'm only planning to spend 2-3 hours jamming. This is pretty restricted, but I gotta start somewhere.

The Jam will start overnight, but I spent a little time today thinking about what mechanics I might want to include or build the game around. These are super simple, which will hopefully help me keep scope down.

## mechanics ideas
- dodging obstacles for high score
- collect or hit objects for high score
- jump up or down platforms infinitely
- gravity switch flappy bird
- click to jump
- roguelike dungeon (scope too large)
- shoot in a circle
- click to break, click to collect
- object is too heavy, player momentum
- infection game, x clicks or player to infect a group

# THEME: Collaborate with AI!
Idea: Vampire Survivors Style w/ Companion

Needs:
- [x] player that shoots projectiles
- [x] companion that shoots projectiles
- [ ] companion controlled by ai
- [x] enemies that spawn and pursue the player and companion
- [x] projectiles kill enemies
- [x] killed enemies add score for player + companion
- [x] enemies kill player, end the game
- [ ] high score is stored
- [ ] sound effects
- [ ] screenshake

Stretch: 
- fancy effects
- more music + sound effects
- varied enemies (with projectiles?)
- player progression (new projectiles/speed as score goes up?)
- enemy progression (increased spawn rates or speed as score goes up?)
- optional randomization of player/companion/enemy/world/projectile sprites

### Companion AI workshop

1. The AI needs to "collaborate" with us.
2. We can only control the AI movement direction
3. the AI wants to get away from the enemies
4. the AI wants to get closer to the player
5. the AI wants to get closer to the middle of the screen
