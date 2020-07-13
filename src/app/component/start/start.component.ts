import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  @Output()
  eventShowStart = new EventEmitter<boolean>();
  showStart: boolean = true;

  startGame() {
    this.showStart = false;
    this.eventShowStart.emit(this.showStart);
  }

}
