import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default ({ options, serializer }) => {
  const { projection } = options["projection"];

  const importTxt = [
    "import { Component } from \"@angular/core\";",
    `import { ${projection} } from "@egjs/ngx-view360";`
  ].join("\n");

  return <>
  <CodeBlock className="language-ts" title="app.module.ts">{`import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NgxView360Module } from "@egjs/ngx-view360";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxView360Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`}</CodeBlock>
  <CodeBlock className="language-ts" title="demo.component.ts">{`${importTxt}

@Component({
  selector: "some-demo-component",
  template: \`
    <ngx-view360 [options]="options" />
  \`
})
export class View360Demo {
  options = ${serializer.serialize(options, 2, 1)}
}`
  }</CodeBlock>
  </>
}
