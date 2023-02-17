/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import {
  Projection,
  View360Events,
  View360Options,
} from "@egjs/view360";
import { PropType } from "vue";

export type View360Props = {
  [key in keyof View360Options]: {
    type: PropType<View360Options[key]>;
    required: false;
  }
} & {
  tag: PropType<string>;
  canvasClass: PropType<string>;
  projection: PropType<Omit<Projection, "_mesh">>
}

export type VueView360Events = {
  [key in keyof View360Events]: (evt: View360Events[key]) => void;
};
