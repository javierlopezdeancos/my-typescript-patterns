- [El patrón Strategy](#el-patr%C3%B3n-strategy)
  - [Usando el patrón Strategy](#usando-el-patr%C3%B3n-strategy)
  - [Participantes del patrón Strategy](#participantes-del-patr%C3%B3n-strategy)
  - [Ejemplo](#ejemplo)
  - [Ejemplo en vivo](#ejemplo-en-vivo)
  - [Ejemplo de código](#ejemplo-de-c%C3%B3digo)

# El patrón Strategy

Strategy es un patrón de diseño de comportamiento que te permite definir una familia de algoritmos, colocar cada uno de ellos en una clase separada y hacer sus objetos intercambiables.

## Usando el patrón Strategy

Supongamos que nos gustaría probar el rendimiento de diferentes algoritmos de ordenación en un array de números: shell sort, heap sort, bubble sort, quicksort, etc. Aplicar el patrón Strategy a estos algoritmos permite que el programa de prueba recorra todos los algoritmos, simplemente cambiándolos en tiempo de ejecución y probando cada uno de ellos contra el array.

Usar el patrón Strategy aporta varias ventajas:

- Intercambiar algoritmos usados dentro de un objeto durante el tiempo de ejecución.
- Aislar los detalles de implementación de un algoritmo del código que lo utiliza.
- Sustituir la herencia por composición.
- `Principio de open/closed`: Puedes introducir nuevas estrategias sin tener que cambiar el contexto.

## Participantes del patrón Strategy

- `Context`: Mantiene una referencia al objeto de estrategia actual. Soporta la interfaz con el método `setStrategy` que permite permite cambiar la estrategia en tiempo de ejecución.

- `Strategy`: Implementa las acciones de la estrategia utilizando la interfaz Strategy.

## Ejemplo

```typescript
interface Strategy {
  calculate: (package: Package) => string;
}

type Package = {
  from: string;
  to: string;
  weight: string;
};

class Shipping {
  strategy: Strategy | undefined;

  setStrategy(s: Strategy): void {
    this.strategy = s;
  }

  calculate(p: Package): string | null {
    if (!this?.strategy) {
      return null;
    }

    return this.strategy.calculate(p);
  }
}

class UpsStrategy implements Strategy {
  calculate(p: Package): string {
    // calculations...
    return '$45.95';
  }
}

class UspsStrategy implements Strategy {
  calculate(p: Package): string {
    // calculations...
    return '$39.40';
  }
}

class FedexStrategy implements Strategy {
  calculate(p: Package): string {
    // calculations...
    return '$43.20';
  }
}

const package: Package = {
  from: '76712',
  to: '10012',
  weight: 'lkg',
};

// the 3 strategies
const upsStrategy = new UpsStrategy();
const uspsStrategy = new UspsStrategy();
const fedexStrategy = new FedexStrategy();

const shipping = new Shipping();

shipping.setStrategy(upsStrategy);
console.log('UPS Strategy: ' + shipping.calculate(package));

shipping.setStrategy(uspsStrategy);
console.log('USPS Strategy: ' + shipping.calculate(package));

shipping.setStrategy(fedexStrategy);
console.log('Fedex Strategy: ' + shipping.calculate(package));
```

Output

```text
UPS Strategy: $45.95
USPS Strategy: $39.40
Fedex Strategy: $43.20
```

## Ejemplo en vivo

[Ejemplo en vivo](https://www.typescriptlang.org/play/?#code/JYOwLgpgTgZghgYwgAgMpinSBzAnsgbwChlkE4AbBAVwqwgC5kAKABydQAthXXRsACogDWcbBACUyALwA+ZAGcM-ANxEAvkSJhcrFFx58QgkWJTTCJZDCgB7ALZMlUVVbC2ny42tIB3CMDYnGCeLt4aakQIdAoKaNy8-JakzvR4HBhp+AA+yNQgACYQMKAQBZEpEGDomDi4zAoZtRB4EkwAbrbABcmkyGDcCgB0qXUyij7ImlbkVLT0bBwJRiYIouJtil7YyLkgtBS9pMAwLACEA8AKAPwjmXVSxH19UFXUUCDI+xQUk6TTz1eYHen0uw1GLVwQ1mNDokDYEkmmmm0TgsWQAFVWAoallkMB7KwKBB7BBwHFcWMnmRKLCFux4oZ+EI1mZNs4ktTSAB6bk0uZw4C2EDDIZDKykIEg5AAcgAJAAWACsQwAnEqZUiNFpUeiMQpsZTIfjCcTSeS0PdjdSYfN4QyDIljCz1pJQpyJchefy6WAhSKxeLAW8PrK5QBmVVDBUABk1VmROpicQAYmUIAAPI14E1EklksAUq05m20u0QRaMp2rV3s7ZHL1822C4WioMvEOfeUK8NDABMca1KNbYEUy2ZpnESyZzsn5l6NgcTBlAHYAGwrgCMfZlABo3B5ZZuYzHt3urP5AsFlxRhNhz+pIt6Bihw1tmthgBAFFER3lDcW+AWCAEC+JiAEfvUiK-iKo7UAaOKAeMIFgfqEFZMw0EIH+MDplmSHAaByBpkU+GQZhkTYbBY4zjshFgY6KwUVoCjjsYIxVNm9TUOhDxqFRCi2MSQwULY2DMDKGICKglqQcuyAANQ0dW0JlnCFasbRLpstBRCaSpCicYBzDwbxkJYa2QkQCJYkSRiqDSbJWTyUp+krKpAoLG5E6shsuneexhnVMZuGkVxFkilZNniTKJGZk5dQucp7nNl5bE1jpahAA)

## Ejemplo de código

[Example](./strategy.ts)
