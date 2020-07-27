import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Game, Square, Board } from '../model/game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly ROOT_URL = 'https://tictactoetest11.herokuapp.com/';

  constructor(private http: HttpClient) { }

  createGame(): Observable<Game>{
    return this.http.post<Game>(this.ROOT_URL + 'game/create', null);
  }

  makeMove(squareId: number, isAiPlayer: boolean): Observable<Board>{
    const params = new HttpParams().set('squareId', squareId.toString()).set('isAiPlayer', isAiPlayer.toString());
    return this.http.put<Board>(this.ROOT_URL + 'game/move/', null, {params: params});
  }

  resetBoard(boardId: number): Observable<Board>{
    return this.http.put<Board>(this.ROOT_URL + 'game/reset/' + boardId, null);
  }

  simulateGames(gameId: number, numberOfGames: number){
    const params = new HttpParams().set('gameId', gameId.toString()).set('numberOfGames', numberOfGames.toString());
    return this.http.put(this.ROOT_URL + 'game/learn', null, {params: params});
  }

  checkWin(boardId: number): Observable<Number>{
    return this.http.get<number>(this.ROOT_URL + 'game/check/' + boardId);
  }

  deleteAllMoves(){
    return this.http.delete(this.ROOT_URL + 'move/deleteAll');
  }

  saveAi(fileName: string){
    const param = new HttpParams().set('fileName', fileName);
    return this.http.get(this.ROOT_URL + 'game/save', {params: param});
  }

  loadAi(fileName: string){
    const param = new HttpParams().set('fileName', fileName);
    return this.http.post(this.ROOT_URL + 'game/load', null, {params: param});
  }

}
