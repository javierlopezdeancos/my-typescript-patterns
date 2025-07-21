- [El patron Singleton](#el-patron-singleton)
  - [Ejemplo](#ejemplo)
  - [Ejemplo en vivo](#ejemplo-en-vivo)
  - [Ver un ejemplo de código](#ver-un-ejemplo-de-c%C3%B3digo)

# El patron Singleton

Los Singletons son clases que solo pueden ser instanciadas una vez y pueden ser accedidas globalmente. Esta única instancia puede ser compartida en toda nuestra aplicación.

Singleton es un patrón de diseño creacional que nos permite asegurarnos de que una clase tenga una única instancia, a la vez que proporciona un punto de acceso global a dicha instancia.

El patron singleton es útil cuando necesitamos controlar el acceso a un recurso compartido, como una conexión a una base de datos o un archivo de configuración y para esto debemos manejar una única instancia de la clase..

Cómo debería ser un singleton:

- `getInstance` método que devuelve el valor de la instancia

Usar el patrón Singleton nos brinda ciertas ventajas:

- `Control de acceso`: Puedes tener la certeza de que una clase tiene una única instancia.
- `Punto de acceso global`: Obtienes un punto de acceso global a dicha instancia.
- `Inicialización bajo demanda`: El objeto Singleton solo se inicializa cuando se requiere por primera vez.

## Ejemplo

```typescript
interface Singleton {
  getInstance(): Singleton;
}

class Counter implements Singleton {
  private instance: Counter;

  private counter: number = 0;

  constructor() {
    this.instance = this;

    if (this.instance) {
      throw new Error('You can only create one instance!');
    }

  }

  getInstance(): Singleton {
    return this;
  }

  getCount() {
    return this.counter;
  }

  increment() {
    return ++this.counter;
  }

  decrement() {
    return --this.counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();
// Error: You can only create one instance!
```

Output:

```text
counter1 0
Error: You can only create one instance!
```

## Ejemplo en vivo

[Ejemplo en vivo](https://www.typescriptlang.org/play/?#code/JYOwLgpgTgZghgYwgAgMqgOYBsJgPYjIDeAUMshrgJIgDOYcISAFAJQBcamO+IA3CQC+JEgixxatZAGE8AV3DRkwALYAHHCojgp6ENlwFiZZGqjAAbnEjK6DJhE6yFkKAJNnL1lAnmKonCByKgBGSgC8yAAM7uS+dlByCPhQbMbk5GAAFsC0AHSg9IxIyJHZubEZwDDIzOX5hfZIrOkZmVlQeADuyCAQPQCiUJ2pAOQAmvLICIzIBFgAntNQEN5zfbZFDgCEo6wCbcLkwiaUYDRbLBxc+jxGpG0rYHJQhPUHyCfkZ87gaQ8ZJ4vN45fK+FzQD5fWwIFZaP4tAHkIGvZAAajR9Ty4P8UJE5AAJhBYRB4WB-iZkbhgcgALS0rE41x4k7xejTPyuACMpV6-RknOgbAEbLwODyWDwGGYACImdAuTKADQciFQLl5H6ctisERgKBLAFssCq-wAJl5fR6v1cwpMovFkulcsFUDNytNrjNmtwNp1Qmm1gQWWY0BGiPtBFoYogEqloeGeCgupOAHpU8ghiNOJM5IHCPMliS1gQUI1ihBtkA)

## Ver un ejemplo de código

[Ejemplo en vivo](./singleton.ts)
