import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Board } from '../../model/game.model';
import { SquareComponent } from '../square/square.component';
import { EventService } from 'src/app/service/event.service';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent{

  @Input()
  board: Board;
  squares = Array(9);
  hardDisable: boolean = false;
  squareColor: string = "secondary";

  constructor(private eventService: EventService) {}

  disableButtons(hardDisable: boolean): void {
    this.hardDisable = hardDisable;
  }

  resetButtonsColor():void {
    this.squareColor = "secondary";
  }

  updateBoard(board: Board): void {
    this.board = board;
  }

}
