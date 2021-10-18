import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";

@Component({
  selector: "demo-rerender",
  templateUrl: "./rerender.component.html",
  styleUrls: ["../app.component.css", "./rerender.component.css"]
})
export class RerenderComponent {
  public imageIndex = 1;
  public refresher: string = "";
  public get imageUrl() { return `https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube${this.imageIndex}.jpg`; }

  @ViewChild("pano") public panoViewer;

  public constructor(private _cdr: ChangeDetectorRef) { }

  public changeImage() {
    this.imageIndex = this.imageIndex === 1 ? 2 : 1;
  }

  public forceUpdate() {
    this.refresher = "SOME_TEMP_VALUE";
    this._cdr.detectChanges();
    this.refresher = "";
  }

  public fullscreen() {
    console.log(this.panoViewer.element.requestFullscreen());
  }
}
