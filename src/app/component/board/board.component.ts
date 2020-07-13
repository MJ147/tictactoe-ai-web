import { Component, Input, ViewChild } from '@angular/core';
import { Board } from '../../model/game.model';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  @ViewChild(SquareComponent) squareComponent:SquareComponent;
  @Input()
  board: Board;
  squares = Array(9);
  hardDisable = false;

  disableButtons(hardDisable: boolean): void {
    this.hardDisable = hardDisable;
  }
}
