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
- [x] companion controlled by ai
- [x] enemies that spawn and pursue the player and companion
- [x] projectiles kill enemies
- [x] killed enemies add score for player + companion
- [x] enemies kill player, end the game
- [x] high score is stored
- [x] sound effects
- [x] screenshake
- [x] player progression (new projectiles/speed as score goes up?)
- [x] enemy progression (increased spawn rates or speed as score goes up?)
- [x] varied enemies
- [x] background tiles
- [x] character sprites that make sense (wizards I guess)
- [x] character sprites that flip horizontally based on velocity
- [x] fancy effects

Stretch:

- more music + sound effects
- optional randomization of player/companion/enemy/world/projectile sprites

### Companion AI workshop

1. The AI needs to "collaborate" with us.
2. We can only control the AI movement direction
3. the AI wants to get away from the enemies
4. the AI wants to get closer to the player
5. the AI wants to get closer to the middle of the screen

# End of Day1

Total Dev Time: ~4.5 hours

At the end of day 1, the project has a player, companion, and enemies. The player and companion can shoot projectiles that defeat enemies and raise the score. The enemies move towards the player and companion and defeat them. The companion tries to avoid the enemies and remain close to the player.

## Ideas for player progression

- [x] add player and companion levels, tied to score, maybe up to 5?
- [x] levels tied to new projectiles and patterns
- [x] add incrementing shot number for interesting patterns, up to 6?

Sprites by Oryx @ https://www.oryxdesignlab.com/
Sounds by SFXR @ https://sfxr.me/
