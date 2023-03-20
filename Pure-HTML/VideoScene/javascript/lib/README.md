Edwin Sanchez - Navy Game
# Function Library
This is the documentation for functions in the function library. The function library contains functions that may be useful across multiple levels.

## How To Use
To use the function library, do the following in your javascript file:

```
// Import the useful function library - use path relative to YOUR javascript file.
import lib from './lib/lib.js';

// Use functions as needed:
lib.myLibraryFunction();
```

## Functions list
Below is a list of functions in the function library and a description of the function.

### loadNewHTMLFile
Loads a new html file. Be careful - this will completely re-write the html page!

#### Inputs
* **fileName** : *string* : The html file you want to load.

#### Outputs
* undefined

### loadHTMLOnVideoFinished
Loads a new html file when a video finishes. If that video is not already playing, it plays the video.

#### Inputs 
* **videoElementID** : *integer* : The id of the video html element to be played.
* **nextScreenPath** : *string* : The html file you want to load once the video finishes.

#### Outputs
* undefined


## Classes List
The library does not currently have classes.
