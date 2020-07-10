import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../model/game.model';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input()
  isShowBoard;
  id: number = 99;
  squares = Array(9)
  game: Game;
  gameSubject = new Subject<Game>();

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.createGame();
  }

  createGame(): void {
    this.httpService.createGame().subscribe(game => {
      this.game = game;
    });
  }

  resetBoard(boardId: number): void {
    this.httpService.resetBoard(boardId).subscribe(board => {
      this.game.board = board;
    });
  }

}
