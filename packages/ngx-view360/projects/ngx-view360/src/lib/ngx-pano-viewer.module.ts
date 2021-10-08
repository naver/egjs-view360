import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxPanoViewerComponent } from "./ngx-pano-viewer.component";

@NgModule({
  declarations: [NgxPanoViewerComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxPanoViewerComponent]
})
export class NgxPanoViewerModule { }
