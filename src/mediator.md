# The Mediator Pattern

The mediator pattern is best introduced with a simple analogy - think of your typical airport traffic control. The tower handles what planes can take off and land because all communications are done from the planes to the control tower, rather than from plane-to-plane.

A centralized controller is key to the success of this system and that's really what a mediator is.

In real-world terms, a mediator encapsulates how disparate modules interact with each other by acting as an intermediary. The pattern also promotes loose coupling by preventing objects from referring to each other explicitly - in our system, this helps to solve our module inter-dependency issues.

What other advantages does it have to offer? Well, mediators allow for actions of each module to vary independently, so it’s extremely flexible. If you've previously used the Observer (Pub/Sub) pattern to implement an event broadcast system between the modules in your system, you'll find mediators relatively easy to understand.

## Source Code

```typescript
interface Mediator {
  logMessage(pilot: Pilot, message: string): void;
}

class ChatChannel implements Mediator{
  constructor() {}

  public logMessage(pilot: Pilot, message: string): void {
    const time = new Date();
    const sender = pilot.getName();

    console.log(`${time} [${sender}]: ${message}`);
  }
}

interface User {
  getName(): string;
  send(message: string): void;
}

class Pilot implements User {
  private name: string;

  private chatChannel: ChatChannel;

  constructor(name: string, chatChannel: ChatChannel) {
    this.name = name;
    this.chatChannel = chatChannel;
  }

  public getName(): string {
    return this.name;
  }

  public send(message: string): void {
    this.chatChannel.logMessage(this, message);
  }
}
```

## Usage

```typescript
const chatChannel = new ChatChannel();

const johnPilot = new Pilot('John', chatChannel);
const markPilot = new Pilot('Mark', chatChannel);

johnPilot.send('Hello Mark');
markPilot.send('Hello John');

// output =>
// 'Sun Apr 10 2022 13:07:53 GMT+0200 [John]: Hello Mark'
// 'Sun Apr 10 2022 13:07:53 GMT+0200 [Mark]: Hello John'
```
