import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  events: string[] = [];
  opened: boolean = false;

  toggle = () => {
    this.opened = !this.opened;
  };
}