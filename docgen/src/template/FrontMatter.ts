/*
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import DocumentPartial from "./DocumentTemplate";
import { DOC_FRONT_MATTER } from "../const";

class FrontMatter implements DocumentPartial {
  public render() {
    return DOC_FRONT_MATTER;
  }
}

export default FrontMatter;
