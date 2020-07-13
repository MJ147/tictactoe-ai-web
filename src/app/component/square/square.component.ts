import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { EventService } from '../../service/event.service'
import { Square } from '../../model/game.model';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {

  @Input()
  square: Square;
  isDisable: boolean;
  @Input()
  hardDisable: boolean = false;

  constructor(private httpService: HttpService,
              private eventService: EventService) {}

  ngDoCheck(){
    this.disableButton();
  }

  convertToText(squareValue: number): string {
    if(squareValue === 0) {
      return "";
    } else {
      return (squareValue === 1) ? "X" : "O"; 
    }
  }

  makeMove(): void {
    this.httpService.makeMove(this.square.id).subscribe( square => {
      this.square = square;
      this.eventService.emitChangeValueEvent(square.value);
    });
  }

  disableButton(): void {
    if (this.square.value === 0 && !this.hardDisable) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    };
  }

}
