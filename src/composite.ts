interface DomElement {
  render(): string;
}

class TagElement implements DomElement {
  private children: DomElement[] = [];

  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public appendChild(domElement: DomElement): void {
    this.children.push(domElement);
  }

  public render(): string {
    const children = this.children.map((child: DomElement) => child.render()).join('');
    return `<${this.name}>\n${children}</${this.name}>\n`;
  }
}

class TextElement implements DomElement {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  public render(): string {
    return `${this.text}\n`;
  }
}

function render(domElement: DomElement) {
  console.log(domElement.render());
}

const body = new TagElement('body');
const div = new TagElement('div');
const label = new TagElement('label');
const text = new TextElement('Hello World');

label.appendChild(text);
body.appendChild(div);
body.appendChild(label);

render(body);

/*
// Output:

'<body>
<div>
</div>
<label>
Hello World
</label>
</body>
'

*/
