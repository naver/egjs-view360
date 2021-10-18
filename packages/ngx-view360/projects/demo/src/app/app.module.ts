import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NgxPanoViewerModule } from "./../../../ngx-view360/src/lib/ngx-pano-viewer.module";
import { NgxSpinViewerModule } from "./../../../ngx-view360/src/lib/ngx-spin-viewer.module";
import { AppComponent } from "./app.component";
import { RerenderComponent } from "./rerender/rerender.component";
import { VideoComponent } from "./video/video.component";
import { SpinComponent } from "./spin/spin.component";

const appRoutes: Routes = [
  { path: "rerender", component: RerenderComponent },
  { path: "video", component: VideoComponent },
  { path: "spin", component: SpinComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RerenderComponent,
    VideoComponent,
    SpinComponent
  ],
  imports: [
    BrowserModule,
    NgxPanoViewerModule,
    NgxSpinViewerModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
