import { Component } from '@angular/core';
import { CubemapProjection, EquirectProjection } from 'projects/ngx-view360/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  options: any = {
    projection: new CubemapProjection({
      src: "https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube1.jpg"
    })
  }

  change() {
    this.options = {
      ...this.options,
      projection: new EquirectProjection({
        src: "https://naver.github.io/egjs-view360/examples/panoviewer/etc/img/bookcube1.jpg"
      })
    };
  }
}
