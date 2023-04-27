# Navy Game README
Below are useful notes that we may need to refer back to later.

## Overall Structure
This project was made using the following technologies/languages:
* **HTML** - the tool used to create the interactable elements of the game (our building blocks).
* **CSS** - the tool used to style the game & format the elements on the screen (make the game look & play well).
* **JavaScript** - the language that powers the interactability and features of the game (any complex dynamic behaviour).

By far, **CSS** and **JavaScript** are were the parts that took the most time. **CSS** takes a considerable amount of time in order to get the game to play well and look decent. Logically, it is not too difficult, but it takes time to test and see what looks good and what doesn't. There can also be times where CSS acts unpredictably (due to implicit behaviours). The **JavaScript** takes time when it comes to thinking out the logic behind the interactions in the scenes. In the scenario where this game is continued by others, being well versed in all three tools, as in understanding how they behave and why, is a *must*.

### Useful Terms
These terms will be useful throughout the README file. You can refer back to these terms as needed.

* **full dialogue** - dialogue that is displayed using the dialogue system. This pulls up splashes of the player character and the character the player is talking to and displays text on a special dialogue box for the player to read. It also allows images to be displayed during the dialogue interaction. It is meant to emphasize dialogue interactions. These dialogue prompts are critical to game play as they explain parts of the MBSE System and how to play parts of the game.
* **partial dialogue** - dialogue that is not necessarily critical to game play. These are just there to augment player experience when interacting with characters in a level. This dialogue does not have the extended capabilities of **full dialogue**; it just displays text where the player can read it. Although some levels use it to share some what important information, usually in Observation/Learn Levels.

### The Game Level Structure
The game is structed to follow a pattern where a player is first allowed to roam an open 2D-side-scroller type space, which is then followed by an mini-game themed around one of the 6 parts of the MBSE System (described below). In simpler terms, the concept is *Observe/Learn*, then *Play*. This cycle is repeated 5-6 times.

#### Observe/Learn Levels
**Observe/Learn** Levels allow player to walk left and right at a fixed height on the screen. These levels also allow the player to interact with characters in the environment, either displaying **full dialogue** (dialogue with character splashes) or **partial dialogue** (dialogue without character splashes).

Below is the general flow of the Observe/Learn Levels. They don't follow as strict a pattern, but generally:
1. Player enters the level. Player may be greeted by **full dialogue** without any prompt.
2. Player Uses the `W` and `D` keys to move (or the arrow keys). 

#### Mini Games (Play)
**Mini Games** consist of simple *point-and-click* mechanics. They start by displaying full dialogue that explains how to play. Next the player engages in gameplay. The player is unable to continue until they have completed the level. Once the player has finished the level, the game then displays full dialogue to drive home the mini game's core concept, which is based on the stage that the player is in in the MBSE System.

Here are the steps again:
1. Initial Dialogue with instructions on game play.
2. Player Plays the level (until they finish the level).
3. Final Dialogue displays what the player was supposed to learn.
4. (Transition to next Observation/Learn Level).

It is important to note that while this is the general process, the game play between mini games can be quite different and therefore has quite different code.

#### MBSE System
Here's a quick overview of the MBSE System's Stages:

* **System Analysis** - ADD SHORT DEFINITION HERE
* **Design Solution** - ADD SHORT DEFINITION HERE
* **Implementation** - ADD SHORT DEFINITION HERE
* **Integration** - ADD SHORT DEFINITION HERE
* **Verification** - ADD SHORT DEFINITION HERE
* **Transition** - ADD SHORT DEFINITION HERE
  
To reiterate, each one of these stages have a devoted *Observe/Learn* Level followed by a *Play* Level that is themed around the stage.

#### Levels
With the MBSE System being the driving factor in level design, 

### Individual Level Format

#### HTML

#### CSS

#### JavaScript

### Dialogue System

### Level Loading System

#### Potential Catches/Issues

* Event Listeners/setTimeouts (JavaScript)