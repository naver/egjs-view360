/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import * as TypeDoc from "typedoc";
import { DocumentItem, DocumentItems } from "./MDXGenerator";
import DocumentTemplate from "./template/DocumentTemplate";
import FrontMatter from "./template/FrontMatter";
import Header from "./template/Header";
import MainDescription from "./template/MainDescription";
import Declaration from "./template/Declaration";
import Inheritance from "./template/Inheritance";
import Comment from "./template/Comment";
import Summary from "./template/Summary";
import Constructor from "./template/Constructor";
import Properties from "./template/Properties";
import Methods from "./template/Methods";
import Events from "./template/Events";

export interface RenderContext {
  classPrefix: string;
  locales: string[];
  currentLocale: string | null;
  currentItem: DocumentItem;
  items: DocumentItems;
}

class DocumentRenderer {
  private _template: DocumentTemplate[];

  public constructor() {
    this._template = [
      new FrontMatter(),
      new Header(),
      new MainDescription(),
      new Declaration(),
      new Inheritance(),
      new Comment(),
      new Summary(),
      new Constructor(),
      new Properties(),
      new Methods(),
      new Events()
    ];
  }

  public render(data: TypeDoc.DeclarationReflection, ctx: RenderContext) {
    return this._template
      .map(item => item.render(data, ctx))
      .filter(val => !!val)
      .join("\n\n");
  }
}

export default DocumentRenderer;
