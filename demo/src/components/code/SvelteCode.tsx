import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default ({ name, options }) => {
  const optionsAsProp = Object.keys(options).map(key => {
    const val = (typeof options[key] === "string")
      ? `"${options[key]}"`
      : `{${JSON.stringify(options[key])}}`;

    return `${key}=${val}`
  }).join("\n  ");

  return <CodeBlock className="language-jsx">{
    `<${name} ${optionsAsProp} />`
  }</CodeBlock>
}
