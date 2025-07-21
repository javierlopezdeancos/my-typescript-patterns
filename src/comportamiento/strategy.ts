interface Strategy {
  calculate: (p: Package) => string;
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
