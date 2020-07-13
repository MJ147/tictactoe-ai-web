import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tictactoe-ai-angular';

  showStart = true;
  showGame = false;

  changeScreens(showStart: boolean) {
    this.showStart = showStart;
    this.showGame = !showStart;
  }
}
