import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tictactoe-ai-angular';

  isShowStartScreen = true;
  isShowStartButton = true;
  isShowBoard = false;

  startGame() {
    this.isShowStartScreen = false;
    this.isShowStartButton = false;
    this.isShowBoard = true;
  }
}
