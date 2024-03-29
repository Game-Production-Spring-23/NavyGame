# Navy Game README
Below are useful notes that we may need to refer back to later.

## Overall Structure
This project was made using the following technologies/languages:
* **HTML** - the tool used to create the interactable elements of the game (our building blocks).
* **CSS** - the tool used to style the game & format the elements on the screen (make the game look & play well).
* **JavaScript** - the language that powers the interactability and features of the game (any complex dynamic behaviour).

By far, **CSS** and **JavaScript** are were the parts that took the most time. **CSS** takes a considerable amount of time in order to get the game to play well and look decent. Logically, it is not too difficult, but it takes time to test and see what looks good and what doesn't. There can also be times where CSS acts unpredictably (due to implicit behaviours). The **JavaScript** takes time when it comes to thinking out the logic behind the interactions in the scenes. In the scenario where this game is continued by others, being well versed in all three tools, as in understanding how they behave and why, is a *must*.

This project may seem to be structured in a wierd way (for instance, in the way levels are loaded). However, this structure was done out of necessity. The project is constrained by the security limitations of the client's devices. When building test applications for Unity and Unreal, the applications were not allowed to run on the client's devices. This led us to making the game using web components. The game is tested using an extension called **Live Server** on **VS Code**, which allows us to start and run the game without configuring any server backend. The game, when completed, is then compiled into a windows executable file using a software called **HtmlCompiler** by [DecSoft](https://www.decsoftutils.com/blog/new-decsoft-html-compiler). This was successful in running the application on the client's devices.

The details of how to interpret the `.html`, `.css`, and `.js` files for each level, as well as how we transition from level to level in the game, are in the **Individual Level Format** section.

## Miscellaneous Details
Below is a list of Miscellaneous details that had no other place in the documentation.

* **Resolution:** - The client's devices are all 1920 x 1080 pixels. This allowed us to avoid using flexible CSS in favor of an absolute position for elements on the screen. While not all elements are use absolute positioning, most game elements are fixed to work at this fixed resolution.

## Useful Terms
These terms will be useful throughout the README file. You can refer back to these terms as needed.

* **full dialogue** - dialogue that is displayed using the dialogue system. This pulls up splashes of the player character and the character the player is talking to and displays text on a special dialogue box for the player to read. It also allows images to be displayed during the dialogue interaction. It is meant to emphasize dialogue interactions. These dialogue prompts are critical to game play as they explain parts of the MBSE System and how to play parts of the game.
* **partial dialogue** - dialogue that is not necessarily critical to game play. These are just there to augment player experience when interacting with characters in a level. This dialogue does not have the extended capabilities of **full dialogue**; it just displays text where the player can read it. Although some levels use it to share some what important information, usually in Observation/Learn Levels.

## The Game Level Structure
The game is structed to follow a pattern where a player is first allowed to roam an open 2D-side-scroller type space, which is then followed by an mini-game themed around one of the 6 parts of the MBSE System (described below). In simpler terms, the concept is *Observe/Learn*, then *Play*. This cycle is repeated 5-6 times.

### Observe/Learn Levels
**Observe/Learn** Levels allow player to walk left and right at a fixed height on the screen. These levels also allow the player to interact with characters in the environment, either displaying **full dialogue** (dialogue with character splashes) or **partial dialogue** (dialogue without character splashes).

Below is the general flow of the Observe/Learn Levels. They don't follow as strict a pattern, but generally:
1. Player enters the level. Player may be greeted by **full dialogue** without any prompt.
2. Player Uses the `W` and `D` keys to move (or the arrow keys). 

### Mini Games (Play Levels)
**Mini Games** consist of simple *point-and-click* mechanics. They start by displaying full dialogue that explains how to play. Next the player engages in gameplay. The player is unable to continue until they have completed the level. Once the player has finished the level, the game then displays full dialogue to drive home the mini game's core concept, which is based on the stage that the player is in in the MBSE System.

Here are the steps again:
1. Initial Dialogue with instructions on game play.
2. Player Plays the level (until they finish the level).
3. Final Dialogue displays what the player was supposed to learn.
4. (Transition to next Observation/Learn Level).

It is important to note that while this is the general process, the game play between mini games can be quite different and therefore has quite different code.

### MBSE System
Here's a quick overview of the MBSE System's Stages:

* **System Analysis** - ADD SHORT DEFINITION HERE
* **Design Solution** - ADD SHORT DEFINITION HERE
* **Implementation** - ADD SHORT DEFINITION HERE
* **Integration** - ADD SHORT DEFINITION HERE
* **Verification** - ADD SHORT DEFINITION HERE
* **Transition** - ADD SHORT DEFINITION HERE
  
To reiterate, each one of these stages have a devoted *Observe/Learn* Level followed by a *Play* Level that is themed around the stage.

### Levels
With the MBSE System being the driving factor in level design, our levels are shown below:

1. Main Menu Screen
2. Player Select Screen
3. Boat Animation
4. Boat Deck Explore Scene (*Observe/Learn for STAGE 1*)
5. Pipe/Boiler Room Mini Game (*Play for STAGE 1*)
6. Beach Expore Scene (*Observe/Learn for STAGE 2*)
7. Priority Mini Game (*Play for STAGE 2*)
8. Jungle Explore Scene (*Observe/Learn for STAGE 3*)
9. Shopping Mini Game (*Play for STAGE 3*)
10. Return to Beach Explore Scene (*Observe/Learn for STAGE 4*)
11. Severity-Probability Mini Game (*Play for STAGE 4*)
12. Final Explore Scene (*Observe/Learn for STAGE 5*)
13. Ship Loading Mini Game (*Play for STAGE 5*)
14. MBSE Review Scene (*Signifies Transition STAGE in MBSE - returns to Main Menu*)

## Individual Level Format
Levels are broken down into parts in the *scenes/* folder in the project root directory. They in the order in which they are played, starting with *00-main-menu/*, which holds all of the files related to the main menu, and ending with *16-end-screen/*, which holds all of the files related to the end screen.

In each folder, there can be the following files:
* HTML files, which contain the body of html code that will be inserted into the main index.html file (this will be explained later).
* CSS files , which contain the stylings for any/all html elements for the specific page. These are loaded when the level is loaded.
* JavaScript files, which contain the logic for the level.
* JSON files, which can contain **full dialogue** data when there's a need for it, as well as other miscellaneous data that is better kept in a separate file.

This is not necessarily the only things in each folder; some level folders contain other folders or images that are specific to the levels. However, the above list make up the core parts of each level.

### Initializing the Game
The game works by first loading an initial html file (`index.html` in the root directory of the project), which is linked with the `style.css` and `index.js` files in the root directory. This html file is set up exactly like any normal html file. In it, there are several elements pertaining to parts of the game that need to persist between levels: things like the *Journal*, the *Map*, and the *Overlay*. These elements all reside in the `<body>` tag of the `index.html` file.

Also in the `<body>` tag of the `index.html` file, there is a `<div>` container width *id="htmlMainContainer"*. **This `<div>` element is important!** It is the container that each level is loaded into when a new level begins.

In order to break up the project into pieces that each person on the development team could tackle individually, we had to come up with a way to load between levels. Our solution was to make a function library in JavaScript (`lib.js` in the root directory) that contains functions for which each levels uses to load the next level.

From a high level perspective, each level's html & css is loaded into the `<div>` container width *id="htmlMainContainer"*, using a `lib.js` function. Each level calls this function, passing in the paths to each level's HTML and CSS files along with a callback function for the next level's JavaScript code. Whenever a level has been completed (ie. the player has completed all of the required tasks to move on), the level's JavaScript code will then call the function that loads the next level. One way to think of it is that the levels are chained together.

### HTML
What does this mean for the HTML components of each level? Since each level has its own set of HTML that needs to be loaded into the main `index.html` file, the level's `.html` file is *not* formatted like a normal html file. Rather than having all of the `<header>`, `<html>`, or `<body>` tags, these files only have the elements that the level would need inside the `<body>` of the html file. Other than that, they look like any other html file. Below we show the difference between a normal html file and the one we use:

**A Normal HTML File:** The root `index.html` file is formatted like this...
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- root CSS and root JavaScript are imported here -->
</head>
<body>
    <div id="htmlMainContainer">
        <!--
            Elements from a level's HTML File get loaded into here...
        -->
    </div>

    <!-- 
        Other Non-level specific elements go in here...
    -->
    <div id="myExampleNonLevelSpecificDiv">
        <div id="nonLevelSpecificStuff"></div>
    </div>
</body>
</html>
```

**Our HTML File Format:** The level html files are formatted like this...
```
<!-- 
    Level specific elements go in here. Whatever elements/containers are in here get loaded into the 'htmlMainContainer' div element in the root index.html file.
-->
<img id="exampleLevelSpecificHTMLElement" src="/assets/images/exampleBackgroundImage">
<div id="otherLevelSpecificElement">
    <div id="otherLevelSpecificStuff></div>
</div>
```

As you can see, other than the boilerplate html you would normally put in the html file, you would set up the level html files exactly how you would a normal html file: making elements that are displayed to the body of the html file. The only change is that the boilerplate html is not needed; everything else works the same.

### CSS
The CSS files work like normal CSS files - there is no change to the format. However, it is important to note the behaviour of the CSS between levels. Since each level has its own style sheet, the style sheet gets loaded in when the level gets loaded in. In the case that someone used the same name for any styles (tags, classes, or ids), this will be overwritten with the new stylings of the level being loaded in. **However, any stylings that were not changed between levels will remain.** That means if the previous level sets a styling for the `<div>` tag, but the next level doesn't, then the styling from the previous level will be used. That means if the next level makes use of any `<div>` tags, it will have the previous level's stylings (even if this wasn't the desired output).

At the initial load of the game, an initial style sheet is used. This can be where any default stylings go, when you think it won't need to be changed between levels.

This is the dynamic we chose for the CSS, but is by no means required. It is entirely possible to cut all of the styles from all of the levels and paste them into a single style sheet that is linked in the main html file. This would work **as long as you make sure there aren't any collisions with namings in the merged CSS file.** This would make updating/changing CSS a nightmare, so we suggest against doing this. 

Since CSS also has a built-in way to link multiple style sheets into one, you could make individual style sheets for each level, then link them to the main style sheet that is loaded in when the game first starts (initialization). This would probably be more clean than our implementation. Since CSS doesn't require an html element to exist for the styling to be set, all the stylings could be loaded at the game start, and when new elements are added to the html file, the stylings would automatically apply. Again, you would have to make sure there were no naming collisions between stylings, but otherwise it would be a great way to reimplement the CSS.

### JavaScript
This section goes over how we used JavaScript throughout the project. As mentioned previously in the **Initializing the Game** section, the game starts by loading the root `index.js` file through a script tag in the root `index.html` file. This subsequently loads in all of the JavaScript code of all of the linked files.

We made use of the JavaScript *module*. This means that our JavaScript code is broken up into separate files, with each file containing code for a level. Because we utilize *callbacks* in our level loading functions, each level's code **MUST be encapsulated in a function and exported.** This allows the a level to load in the next level's code as a function and pass it as a callback to the function that loads the next page. An example is shown below:

Example JavaScript file for a level:
```
// Imports

// This imports library functions that we use to move between levels
import { loadNewHTMLFile, devSkip } from "/lib.js";

/* 
    This will import the code that will be run when the next level starts.
    It is encapsulated in a function that will be called when this level has
    been completed.
*/ 
import { nextLevel } from "/scenes/nextLevel/nextLevelCode.js";


/* 
    The function that encapsulates this level's code. The previous level
    loads this function as a callback.
*/ 
export function thisLevel() {
    // This function enables us to skip past a level quickly (by pressing SHIFT and ~)
    devSkip(
        "/scenes/nextLevel/nextLevel.html", // HTML for the next level (in the level-html format)
        "/scenes/nextLevel/nextLevel.css", // CSS for the next level 
        nextLevel // the name of the function that encapsulates the code for the next level (similar to the 'thisLevel' function)
    ); // end devSkip

    /*
        Level Specific Code goes here... Add in whatever variables you need and whatever functions
        need to be executed. Set up a conditional so that when you have completed all of the tasks
        for this level, the next level is called.
    */

    bool isLevelOver = true;
    // check if the level has been completed
    if(isLevelOver) {
        // This function loads in the next Level's code
        loadNewHTMLFile(
            "/scenes/nextLevel/nextLevel.html", // HTML for the next level (in the level-html format)
            "/scenes/nextLevel/nextLevel.css", // CSS for the next level 
            nextLevel // the name of the function that encapsulates the code for the next level (similar to the 'thisLevel' function)
        ); // end loadNewHTMLFile
    } // end if
} // end thisLevel
```

Here, you can see all of the core components of a JavaScript file for a level:

1. First, all necessary functions are imported. This includes the **loadNewHTMLFile** function from **lib.js** (which allows you to load a new level) and the **devSkip** function (which does the same, but on a key binding). You also import the function that has all of the code for the next level.
2. Next, you create and export a function to encapsulate all of the code for this level. This will allow the *previous* level to load in *this* level's code (just as you are loading in the functionality of the *next* level).
3. You write any code you need to for this level. (This will be different for each level).

Here are a few things to remember:
* Make sure that you have a condition that decides when your level is over! When the player has met this condition, the **loadNewHTMLFile** function needs to be called with the next level's parameters.
* If you create any eventListeners, make sure to get rid of them when the level ends, *especially* if the eventListeners are attached to anything that exists between levels. If you don't they will stay and whenever the player does the same thing again, that same functionality will still be bound to that action and be triggered again. For example, if you bind a sound when whenever the player clicks the mouse in your level, that sound will also play in the next level if you don't remove the event!
* Understand that *all* of the level's JavaScript code will be loaded at initialization. While it is not all being called or accessed, it will be loaded since each file links to the next one. The root `index.js` file will load the first level's JavaScript file, then the first level will load the next level's file, and so on. That means a major syntax error in *any* file will cause the game to break, which is just something to be prepared for. Minor errors (errors caught at runtime) will not necessarily break other levels though.

## Dialogue System

## Potential Catches/Issues

* Event Listeners/setTimeouts (JavaScript)
