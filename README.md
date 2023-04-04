# Navy Game README
Below are useful notes that we may need to refer back to later.

1. **Local Storage Manifest**
2. **Local Storage Demo**
3. **Manifest List**
4. **Implementing Dev Skip**

## Local Storage Manifest
This file contains all of the **key - value pairs** that each level has in local storage,
so that we all know what key - value pairs are being used and what data is being stored.

You can be as descripted as you'd like, but really this is to avoid collisions (people using the same key values) as well as let others know how they can access data that you have stored for them to access.

## Local Storage Demo
```
/*
    Demonstrates how to use local storage

    The best way is to store an object, which you can define
    however you want, rather than storing a bunch of key-value
    pairs in local storage. that way you can pack all of your
    data into one object and then reference different parts
    of that object to get specific information.
*/


// define an object / string / integer / data however you want
let myObj = {
    "text": "This is a message!",
    "screen_data": {
        "array": [0, 1, 2, 3, 4]
    },
    "some_other_data": [{
        "key": "value"
    }]
}


// store the data in local storage...
localStorage.setItem("myObj", myObj);


// ... read the data in local storage
let myData = localStorage.getItem("myObj"); // same as 'myObj'
console.log(myData);
```

## Manifest List
Add key - value pairs below.
* **KEY:** Value (or description)

## Implementing Dev Skip
To implement `devSkip` to skip scenes, you need to add the following to your javascript level code:

> Skip a Scene by pressing: **SHIFT** AND **`** (or **SHIFT** AND **~**).

```
// what to skip to
  devSkip(
    "/path/to/file.html",
    "/path/to/style.css",
    nextFunction
  );
```

It is implemented similarly to `loadNewHTMLFile`, as in it has the exact same parameters. It created an event listener that is listening for **SHIFT + `** (or **~**).

### Note
It is important to note that to work properly, `devSkip` has to remove all of the `setTimeout`s created in the level or else those `setTimeout` scripts will be called even after the level has completed! `lib.js` functions already handle this, but if you add a `setTimeout` to your code, remember to create it like this:

```
document.globalTimeouts.push(
    setTimeout(() => {
        // your setTimeout code here...
    }, 1000)
); // end document.globalTimeouts.push
```

By wrapping `setTimeout` in this `push` call on `document.globalTimeouts`, the `devSkip` function will know to remove it later if you decide you want to skip the level. Otherwise, the `setTimeout` will call as scheduled, long after you have skipped past that level, which could cause issues.