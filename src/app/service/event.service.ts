import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board } from '../model/game.model';
import { BoardComponent } from '../component/board/board.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private changeValueEvent = new BehaviorSubject<Board>(null);

  emitChangeValueEvent(board: Board){
    this.changeValueEvent.next(board);
  }

  changeValueListener(){
    return this.changeValueEvent.asObservable();
  }
}
