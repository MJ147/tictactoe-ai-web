import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game, Square, Board } from '../model/game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly ROOT_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  createGame(): Observable<Game>{
    return this.http.post<Game>(this.ROOT_URL + 'game/create', null);
  }

  makeMove(squareId: number): Observable<Square>{
    return this.http.put<Square>(this.ROOT_URL + 'player/move/' + squareId, null);
  }

  resetBoard(boardId: number): Observable<Board>{
    return this.http.put<Board>(this.ROOT_URL + 'board/reset/' + boardId, null);
  }

}
