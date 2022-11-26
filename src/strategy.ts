interface Company {
  calculate: (package: Package) => string
};

type Package = {
  from: string;
  to: string;
  weigth: string;
};

class Shipping {
  company: Company | undefined;

  setStrategy(c: Company): void  {
    this.company = c;
  };

  calculate(p: Package): string | null {
    if (!this?.company) {
      return null;
    }

    return this.company.calculate(p);
  }
};

class UPS implements Company {
    calculate(p: Package): string {
      // calculations...
      return "$45.95";
    }
};

class USPS implements Company {
    calculate(p: Package): string {
        // calculations...
        return "$39.40";
    }
};

class Fedex implements Company {
    calculate (p: Package): string {
        // calculations...
        return "$43.20";
    }
};

const package = {
  from: "76712",
  to: "10012",
  weigth: "lkg"
};

// the 3 strategies

const ups = new UPS();
const usps = new USPS();
const fedex = new Fedex();

const shipping = new Shipping();

shipping.setStrategy(ups);
console.log("UPS Strategy: " + shipping.calculate(package));
// Output
// 'UPS Strategy: $45.95'

shipping.setStrategy(usps);
console.log("USPS Strategy: " + shipping.calculate(package));
// Output
// 'USPS Strategy: $39.40'

shipping.setStrategy(fedex);
console.log("Fedex Strategy: " + shipping.calculate(package));
// Output
// 'Fedex Strategy: $43.20'

