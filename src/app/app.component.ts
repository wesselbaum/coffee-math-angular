import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  events: string[] = [];
  opened = false;

  toggle = () => {
    this.opened = !this.opened;
  };

  close() {
    this.opened = false;
  }
}
