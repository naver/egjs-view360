export interface IdentifierGroups {
  kind: number;
  name: string;
  comment: string;
  sources: Array<{
    fileName: string;
    line: number;
    character: number;
  }>;
  extends: Array<{
    name: string;
  }>;
  implements: Array<{
    name: string;
    typeArguments: Array<{
      type: string;
      name: string;
    }>
  }>;
  properties: Array<{
    name: string;
    type: {
      type: string;
      name: string;
    };
    defaultValue?: string;
    comment: string;
  }>;
}

type Getter<T> = { [K in keyof T]: T[K] };

class Identifier {
  public constructor(values: IdentifierGroups) {
    Object.keys(values).forEach(key => {
      this[key] = values[key];
    });
  }
}

interface Identifier extends Getter<IdentifierGroups> {}

export default Identifier;
