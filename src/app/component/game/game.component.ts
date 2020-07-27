import { Component, ViewChild} from '@angular/core';
import { Game, Board } from '../../model/game.model';
import { HttpService } from '../../service/http.service'
import { EventService } from 'src/app/service/event.service';
import { BoardComponent } from '../board/board.component';
import { LoadingComponent } from '../loading/loading.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  
  @ViewChild(BoardComponent) boardComponent:BoardComponent;

  game: Game;
  info: String = "";
  isDisable: boolean = false;
  isSideBarOpen = false;
  pvpColor: String = "primary";
  pvcColor: String = "secondary";
  aiPlayer = false;
  dialogRef;
  showBoard: boolean = false;
  showWarning: boolean = false;

  constructor(private httpService: HttpService,
              private eventService: EventService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showWarning = true;
    }, 1000);
    this.createGame();

  }

  createGame(): void {
    this.httpService.createGame().subscribe(game => {
      this.game = game;
      this.showBoard = true;
      this.eventService.changeValueListener().subscribe(square => {
        if (square != null) {
          this.makeMove(square.id, this.aiPlayer);
        }
      })
    });
  }

  makeMove(squareId: number, aiPlayer: boolean): void {
    this.httpService.makeMove(squareId, aiPlayer).subscribe( board => {
      this.game.board = board;
      this.checkWin(board);
    });
  }

  resetBoard(boardId: number): void {
    this.httpService.resetBoard(boardId).subscribe(board => {
      this.game.board = board;
    });
    this.info = "";
    this.boardComponent.disableButtons(false);
    this.boardComponent.resetButtonsColor()
  }

  siulateGames(gameId: number, numberOfGames: number): void {
    this.openDialog();
    this.httpService.simulateGames(gameId, numberOfGames).subscribe( () => {
      this.closeDialog();
    });
    this.resetBoard(this.game.board.id);
  }

  checkWin(board: Board): void {
    this.httpService.checkWin(board.id).subscribe(winStatus => {
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

  deleteAllMoves(){
    this.httpService.deleteAllMoves().subscribe();
  }

  saveAi(fileName: string){
    this.httpService.saveAi(fileName).subscribe();
  }

  loadAi(fileName: string){
    this.httpService.loadAi(fileName).subscribe();
  }

  pvpMode(): void {
    this.isAiPlayer(false);
    this.isSideBarOpen = false;
    this.pvpColor = "primary";
    this.pvcColor = "secondary";
    this.resetBoard(this.game.board.id);
  }

  pvcMode(): void {
    this.isAiPlayer(true);
    this.isSideBarOpen = true;
    this.pvpColor = "secondary";
    this.pvcColor = "primary";
    this.resetBoard(this.game.board.id);
  }

  isAiPlayer(aiPlayer: boolean): void {
    this.aiPlayer = aiPlayer;
  }

  openDialog() {
    this.dialogRef = this.dialog.open(LoadingComponent);
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
}
