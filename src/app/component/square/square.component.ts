import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { EventService } from '../../service/event.service'
import { Square, Board } from '../../model/game.model';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {

  @Output()
  changeBoardEvent = new EventEmitter<Board>();
  @Input()
  square: Square;
  isDisable: boolean;
  @Input()
  hardDisable: boolean = false;
  color: string = "secondary";
  @Input()
  squareColor: string = "secondary";

  constructor(private httpService: HttpService,
              private eventService: EventService) {}

  ngDoCheck(){
    this.disableButton();
    this.resetButtonColor();
  }

  convertToText(squareValue: number): string {
    if(squareValue === 0) {
      return "";
    } else {
      if (squareValue === 1) {
        this.color = "primary";
      } else {
        this.color = "accent";
      }
      return (squareValue === 1) ? "X" : "O"; 
    }
  }

  makeMove(): void {
    this.httpService.makeMove(this.square.id, true).subscribe( board => {
      this.eventService.emitChangeValueEvent(board);
      this.changeBoardEvent.emit(board);
    });
  }

  disableButton(): void {
    if (this.square.value === 0 && this.hardDisable) {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    };
  }

  resetButtonColor(): void {
    if (this.square.value === 0 && this.squareColor === "secondary") {
      this.color = "secondary";
    }
  }

}
