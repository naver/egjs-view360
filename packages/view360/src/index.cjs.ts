/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import View360, * as modules from "./index";
import { merge } from "./utils";

merge(View360, modules);

declare const module: any;
module.exports = View360;
export default View360;
export * from "./index";
