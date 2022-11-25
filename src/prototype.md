# The Prototype pattern

The prototype pattern is a useful way to share properties among many objects of the same type.

The prototype is an object that's native to JavaScript, and can be accessed by objects through the prototype chain.

In our applications, we often have to create many objects of the same type. A useful way of doing this is by creating multiple instances of an ES6 class.

[Example](./prototype.ts)

## Object.create

The Object.create method lets us create a new object, to which we can explicitly pass the value of its prototype.

```typescript
const dog = {
  bark() {
    return `Woof!`;
  }
};

const pet1 = Object.create(dog);
```
