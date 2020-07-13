import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private changeValueEvent = new BehaviorSubject<number>(0);

  emitChangeValueEvent(value: number){
    this.changeValueEvent.next(value);
  }

  changeValueListener(){
    return this.changeValueEvent.asObservable();
  }
}
