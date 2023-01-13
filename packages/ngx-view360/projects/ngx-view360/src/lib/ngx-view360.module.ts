/**
 * Copyright (c) 2022 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxView360Component } from "./ngx-view360.component";

@NgModule({
  declarations: [NgxView360Component],
  imports: [
    CommonModule
  ],
  exports: [NgxView360Component]
})
export class NgxView360Module { }
