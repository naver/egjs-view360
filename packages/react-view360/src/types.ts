/*
 * Copyright (c) 2023-present NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import {
  View360Options,
  View360Events
} from "@egjs/view360";

export type View360EventProps = {
  [key in keyof View360Events as `on${Capitalize<string & key>}`]: (evt: View360Events[key]) => any;
};

export type View360Props = {
  tag: keyof JSX.IntrinsicElements;
  canvasClass: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, keyof View360EventProps | keyof View360Options>
  & View360EventProps
  & View360Options;
