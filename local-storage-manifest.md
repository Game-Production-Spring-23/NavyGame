# Local Storage Manifest
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