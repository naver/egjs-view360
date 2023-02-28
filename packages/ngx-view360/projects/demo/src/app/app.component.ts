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
    projection: new EquirectProjection({
      src: "https://iili.io/HGJ5sVa.jpg"
    })
  }

  change() {
    this.options = {
      ...this.options,
      projection: new EquirectProjection({
        src: "https://iili.io/HGJ5yNt.jpg"
      })
    };
  }
}
