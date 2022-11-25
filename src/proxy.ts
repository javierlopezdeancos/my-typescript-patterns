interface Person {
  name: string,
  age: number,
  nationality: string,
  hi: () => void,
}

const person: Person = {
  name: 'Luke Skywalker',
  age: 42,
  nationality: 'Tatooine',
  hi() {
    console.log(`Hi, I am ${this.name}`);
  }
};


const personProxy = new Proxy(person, {
  get: (obj: Person, prop: string | symbol): void => {
    if (prop === 'hi') {
      return Reflect.get(obj, prop).apply(obj);
    }

    console.log(`The value of ${String(prop)} is ${Reflect.get(obj, prop)}`);
  },

  set: (obj: Person, prop: string | symbol, value: string | number) => {
    console.log(`Changed ${String(prop)} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  },
});

console.log(personProxy.name)
console.log(personProxy.hi())

// output
// 'The value of name is Luke Skywalker'
// 'Hi, I am Luke Skywalker'
