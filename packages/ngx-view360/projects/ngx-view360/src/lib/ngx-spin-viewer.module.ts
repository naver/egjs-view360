import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxSpinViewerComponent } from "./ngx-spin-viewer.component";

@NgModule({
  declarations: [NgxSpinViewerComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxSpinViewerComponent]
})
export class NgxSpinViewerModule { }
