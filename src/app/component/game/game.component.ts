import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  isShowStartScreen = true;
  isShowBoard = false;

  startGame() {
    this.isShowStartScreen = false;
    this.isShowBoard = true;
  }

}
