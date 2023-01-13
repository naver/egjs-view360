import ProjectionData from "./ProjectionData";

class OptionSerializer {
  public serialize(options: Record<string, any>, space: number, indentLevel = 0): string {
    const keys = Object.keys(options);
    const txt: string[] = [];
    const indent = " ".repeat(space * indentLevel);

    txt.push("{");

    keys.forEach((key, idx) => {
      txt.push(this._toText(key, options[key], space, indentLevel + 1, idx === keys.length - 1));
    });

    txt.push(`${indent}}`);

    return txt.join("\n");
  }

  public serializeJSX(options: Record<string, any>, space: number, indentLevel = 0) {
    const indent = " ".repeat(space * (indentLevel + 1));

    const optionsAsProp = Object.keys(options).map(key => {
      const val = (typeof options[key] === "string")
        ? `"${options[key]}"`
        : (options[key] instanceof ProjectionData)
          ? "{projection}"
          : `{${JSON.stringify(options[key], undefined, space)}}`;

      return `${key}=${val.replace(/\n/g, `\n${indent}`)}`
    }).join(`\n${indent}`);

    return optionsAsProp;
  }

  public serializeNGX(options: Record<string, any>, space: number, indentLevel = 0) {
    const indent = " ".repeat(space * (indentLevel + 1));

    const optionsAsProp = Object.keys(options).map(key => {
      const val = (typeof options[key] === "string")
        ? `"'${options[key]}'"`
        : (options[key] instanceof ProjectionData)
          ? "\"projection\""
          : `"${JSON.stringify(options[key]).replace(/\"/g, "'")}"`;

      return `[${key}]=${val}`
    }).join(`\n${indent}`);

    return optionsAsProp;
  }

  public serializeVue(options: Record<string, any>, space: number, indentLevel = 0) {
    const indent = " ".repeat(space * (indentLevel + 1));

    const optionsAsProp = Object.keys(options).map(key => {
      return (typeof options[key] === "string")
        ? `${key}="${options[key]}"`
        : (options[key] instanceof ProjectionData)
          ? ":projection=\"projection\""
          : `:${key}="${JSON.stringify(options[key]).replace(/\"/g, "'")}"`;
    }).join(`\n${indent}`);

    return optionsAsProp;
  }

  private _toText(key: string, val: any, space: number, indentLevel: number, isLast: boolean): string {
    const indent = " ".repeat(space * indentLevel);

    if (val instanceof ProjectionData) {
      const options = val.projectionOptions;
      let optionsTxt = Object.keys(options)
        .map((optionName, idx) => this._toText(optionName, options[optionName], space, indentLevel + 1, idx === options.length - 1))
        .join("\n");

      if (optionsTxt) {
        optionsTxt = `\n${optionsTxt}\n${indent}`;
      }

      return `${indent}${key}: new ${val.projection}({${optionsTxt}})${isLast ? "" : ","}`;
    } else if (!Array.isArray(val) && typeof val === "object") {
      const keys = Object.keys(val);
      let txt = keys.map((name, idx) => this._toText(name, val[name], space, indentLevel + 1, idx === keys.length - 1)).join("\n");

      if (txt) {
        txt = `\n${txt}\n${indent}`;
      }

      return `${indent}${key}: {${txt}}${isLast ? "" : ","}`;
    } else {
      const txt = JSON.stringify(val, undefined, 4)
        .replace(/"([^"]+)":/g, "$1:")
        .replace(/\n/g, `\n${indent}`);

      return `${indent}${key}: ${txt}${isLast ? "" : ","}`;
    }
  }
}

export default OptionSerializer;
