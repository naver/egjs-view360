import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";

@Component({
  selector: "demo-video",
  templateUrl: "./video.component.html",
  styleUrls: ["../app.component.css", "./video.component.css"]
})
export class VideoComponent {
  public overlayHidden = false;
  public refresher: string = "";

  public get overlayClass() { return this.overlayHidden ? "overlay hidden" : "overlay"; }

  @ViewChild("pano") public panoViewer;

  public constructor(private _cdr: ChangeDetectorRef) { }

  public forceUpdate() {
    this.refresher = "SOME_TEMP_VALUE";
    this._cdr.detectChanges();
    this.refresher = "";
  }

  public startVideo() {
    if (!this.panoViewer) return;

    this.panoViewer.getVideo().play();
    this.overlayHidden = true;
  }
}
