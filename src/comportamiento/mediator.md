# The Mediator Pattern

The Mediator pattern provides central authority over a group of objects by encapsulating how these objects interact. This model is useful for scenarios where there is a need to manage complex conditions in which every object is aware of any state change in any other object in the group.

The mediator pattern is best introduced with a simple analogy - think of your typical airport traffic control. The tower handles what planes can take off and land because all communications are done from the planes to the control tower, rather than from plane-to-plane.

A centralized controller is key to the success of this system and that's really what a mediator is.

In real-world terms, a mediator encapsulates how disparate modules interact with each other by acting as an intermediary. The pattern also promotes loose coupling by preventing objects from referring to each other explicitly - in our system, this helps to solve our module inter-dependency issues.

What other advantages does it have to offer? Well, mediators allow for actions of each module to vary independently, so it’s extremely flexible. If you've previously used the Observer (Pub/Sub) pattern to implement an event broadcast system between the modules in your system, you'll find mediators relatively easy to understand.

## Using mediator

The Mediator patterns are useful in the development of complex forms. Take for example a page in which you enter options to make a flight reservation. A simple Mediator rule would be: you must enter a valid departure date, a valid return date, the return date must be after the departure date, a valid departure airport, a valid arrival airport, a valid number of travelers, and only then the Search button can be activated.

Another example of Mediator is that of a control tower on an airport coordinating arrivals and departures of airplanes.

## Diagram



[Example](./mediator.ts)
