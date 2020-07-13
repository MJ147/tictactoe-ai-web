import { Component, ViewChild} from '@angular/core';
import { Game } from '../../model/game.model';
import { HttpService } from '../../service/http.service'
import { EventService } from 'src/app/service/event.service';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  
  @ViewChild(BoardComponent) boardComponent:BoardComponent;

  game: Game;
  info: String = "";

  constructor(private httpService: HttpService,
              private eventService: EventService) {}

  ngOnInit(): void {
    this.createGame();
  }

  createGame(): void {
    this.httpService.createGame().subscribe(game => {
      this.game = game;
      this.eventService.changeValueListener().subscribe(info => {
        this.checkWin()
      })
    });
  }

  resetBoard(boardId: number): void {
    this.httpService.resetBoard(boardId).subscribe(board => {
      this.game.board = board;
    });
    this.info = "";
    this.boardComponent.disableButtons(false);
  }

  checkWin(): void {
    this.httpService.checkWin(this.game.board.id).subscribe(winStatus => {
      switch(winStatus) {
        case 1: {
          this.info = "Player X won!";
          this.boardComponent.disableButtons(true);
          break;
        }
        case 2: {
          this.info = "Player O won!";
          this.boardComponent.disableButtons(true);
          break;
        }
        case 3: {
          this.info = "Draw!";
          break;
        }
      }
    });
  }

}
