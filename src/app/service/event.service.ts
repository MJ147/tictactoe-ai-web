import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Square } from '../model/game.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private changeValueEvent = new BehaviorSubject<Square>(null);

  emitChangeValueEvent(square: Square){
    this.changeValueEvent.next(square);
  }

  changeValueListener(){
    return this.changeValueEvent.asObservable();
  }
}
