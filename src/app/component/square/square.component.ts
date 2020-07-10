import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Square } from 'src/app/model/game.model';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent{

  @Input()
  square: Square;

  constructor(private httpService: HttpService, private boardComponent: BoardComponent) {}

  convertToText(squareValue: number): string {
    if(squareValue === 0) {
      return "";
    } else {
      return (squareValue === 1) ? "X" : "O"; 
    }
  }

  makeMove(): void {
    console.log(this.square);
    this.httpService.makeMove(this.square.id).subscribe( square => {
      this.square = square;
    });
  }
}
