import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default ({ name, options }) => {
  const optionsAsProp = Object.keys(options).map(key => {
    const val = (typeof options[key] === "string")
      ? `"'${options[key]}'"`
      : `"${JSON.stringify(options[key]).replace(/\"/g, "'")}"`;

    return `[${key}]=${val}`
  }).join("\n  ");

  return <CodeBlock className="language-html">{
    `<ngx${name.replace(/([A-Z])/g, "-$1").toLowerCase()} ${optionsAsProp} />`
  }</CodeBlock>
}
