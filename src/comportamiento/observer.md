# The Observer pattern

With the observer pattern, we can subscribe certain objects, the observers, to another object, called the observable. Whenever an event occurs, the observable notifies all its observers!

An observable object usually contains 3 important parts:

* `observers`: an array of observers that will get notified whenever a specific event occurs.
* `subscribe()`: a method in order to add observers to the observers list.
* `unsubscribe()`: a method in order to remove observers from the observers list.
* `notify()`: a method to notify all observers whenever a specific event occurs.

[Example](./observer.ts)
