import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";

@Component({
  selector: "demo-spin",
  templateUrl: "./spin.component.html",
  styleUrls: ["../app.component.css", "./spin.component.css"]
})
export class SpinComponent {
  public refresher: string = "";

  @ViewChild("viewer") public spinViewer;

  public constructor(private _cdr: ChangeDetectorRef) { }

  public forceUpdate() {
    this.refresher = "SOME_TEMP_VALUE";
    this._cdr.detectChanges();
    this.refresher = "";
  }

  public spinBy() {
    if (!this.spinViewer) return;

    this.spinViewer.spinBy(720, { duration: 500 });
  }

  public onLoad(evt) {
    console.log(evt);
  }
}
