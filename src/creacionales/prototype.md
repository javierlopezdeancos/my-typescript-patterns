- [El patrón Prototipo](#el-patr%C3%B3n-prototipo)
  - [Object.create](#objectcreate)
  - [Ejemplo](#ejemplo)
  - [Ejemplo en vivo](#ejemplo-en-vivo)
  - [Ver un ejemplo de código](#ver-un-ejemplo-de-c%C3%B3digo)

# El patrón Prototipo

Prototype es un patrón de diseño creacional que nos permite copiar objetos existentes sin que el código dependa de sus clases.

El patrón prototipo **es una forma útil de compartir propiedades entre muchos objetos del mismo tipo**.

En nuestras aplicaciones, a menudo tenemos que crear muchos objetos del mismo tipo. Una forma útil de hacerlo es creando múltiples instancias de una clase ES6.

Usar el patrón Constructor nos brinda ciertas ventajas:

- `Clonar objetos sin acoplarlos`: Puedes clonar objetos sin acoplarlos a sus clases concretas.
- `Evitar un código de inicialización repetido`: Puedes evitar un código de inicialización repetido clonando prototipos prefabricados.
- `Crear objetos complejos con más facilidad`: Puedes crear objetos complejos con más facilidad.
- `Alternativa a la herencia`: Puedes obtener una alternativa a la herencia al tratar con preajustes de configuración para objetos complejos.

## Object.create

El método `Object.create` nos permite crear un nuevo objeto, al que podemos pasar explícitamente el valor de un objeto para utilizar su prototipo para la copia.

Podemos añadir nuevas propiedades al objeto creado, o incluso sobrescribir las propiedades del prototipo.

```typescript
const dog = {
  bark() {
    return `Woof!`;
  }
};



const pet1 = Object.create(dog);

pet1.name = 'Rex';

pet1.bark = function() {
  return `Woof! My name is ${this.name}`;
};

console.log(pet1.name);
console.log(pet1.bark());
```

Output:

```text
Rex
Woof! My name is Rex
```

## Ejemplo

```typescript
class Prototype {
  public primitive: any;

  public component: object;

  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

function clientCode() {
  const prototypeA = new Prototype();

  prototypeA.primitive = 245;
  prototypeA.component = new Date();
  prototypeA.circularReference = new ComponentWithBackReference(prototypeA);

  const prototypeB = prototypeA.clone();

  if (prototypeA.primitive === prototypeB.primitive) {
    console.log('Primitive field values have been carried over to a clone. Yay!');
  } else {
    console.log('Primitive field values have not been copied. Booo!');
  }

  if (prototypeA.component === prototypeB.component) {
    console.log('Simple component has not been cloned. Booo!');
  } else {
    console.log('Simple component has been cloned. Yay!');
  }

  if (prototypeA.circularReference === prototypeB.circularReference) {
    console.log('Component with back reference has not been cloned. Booo!');
  } else {
    console.log('Component with back reference has been cloned. Yay!');
  }

  if (prototypeA.circularReference.prototype === prototypeB.circularReference.prototype) {
    console.log('Component with back reference is linked to original object. Booo!');
  } else {
    console.log('Component with back reference is linked to the clone. Yay!');
  }
}

clientCode();
```

Output:

```text
Primitive field values have been carried over to a clone. Yay!
Simple component has been cloned. Yay!
Component with back reference has been cloned. Yay!
Component with back reference is linked to the clone. Yay!
```

## Ejemplo en vivo

[Ejemplo en vivo](https://www.typescriptlang.org/play/?#code/MYGwhgzhAEAKBOB7ALigngBwKbQN4ChpoMBXAIxAEthj5KBbS5SgNywC5owA7NAbnyFi5KjWCJ6GRNyzdknRGQBWWYMgFDSFatGCV4wEuHgAlLADMs8WcA7QAwhKky5AdSYALAEJhgAazNLa25bDSItUV0QaSwACgBKTmQPShgCIiJxbghkKJjoAF5oAHllVWQAOmBrMGQ45NT4sIzQGKqnGLlCkrK1Kpq62IaIdslO5CbBDLyZKv1DY0CrGxwi9OnoCq3huYMjMFMLZZCsABohaYwkVGRMO1xN7ZSYAF9z6ZfmomtkEnhuGZYAREF74UH4UCQGCOMYuZDuZI+fxLYK2PCaEQ6K4odDYZpZHLwEhqRDwWLYm53TgIHG3bDxdHTHYU3GrWi0u7A6Cg8HmEghZjSKKUWTIRwAEziDPWBNyLLpWAAgt0ZAB3ODXVkJZryu6KipXBhMVhsgBMABYAKxc3XYfXiWGilVYdUAEVqUptmoV9vm+0OQRWzvVMOcooR3l8ASOqLitqVkyEsvZlOwXm68ft0Rk2qm0Eo5mg5O9eoNdEYzDYhQKRXjXjLRsrWGlF100ggiBAWAq0QA5rEAOQIRsm6DmEUgcXQFhgEAkLAwDxgKtkLCyXQHOhYKeINjwaCoLiAirQACaYDQAEIB5MQdAsCAIDh1pl253u33B8OK6Pxw+pzOc4LtAS5VtwKDQKu67iBgIriieXiIEh163tyeYFkWmajGGXQ1rWJZpth4wttMBLvj2iD9gOADKDAYF2baOl0S4wOBuRQQCrQyPB0CIchN5ci896Ps+rZkV2FFUbRkgMQ6OG5CxkFrpx2bbie55XgJQjgkQGHFhydq7AsBwokGeEpqy9Z6HsiwxisJEtG+EmfgOobjNAqqeJBUbQNYgYnCBkDQGxSnQapPF8YgKGCcJT6Mo52TkS5blwh5XlkD5fnHGiikcYCPEadF2noYW+mpkqRn+qZJxlgZqw1hZCpWX6tn+bYtXlQ5r6Jc5lGDilTqeck3n+L5dkBak0BUNwfjbgeiDQKSlC9pQ3CzotvSVLxSFRVpd4PnFL5tj1H59a5HSpUNHgjX4Y1tTgk3TbNU6HskOBcd2Z4XkVIJgoIoAinIEqekAA)

## Ver un ejemplo de código

[Example](./prototype.ts)
