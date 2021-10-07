/*
 * Copyright (c) 2017 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable @typescript-eslint/naming-convention */
import * as PanoViewer from "./PanoViewer";
import * as SpinViewer from "./SpinViewer";
import * as CFC from "./cfc";
import { merge } from "./utils/utils";

const View360: any = {};

merge(View360, PanoViewer);
merge(View360, SpinViewer);
merge(View360, CFC);

export default View360;
