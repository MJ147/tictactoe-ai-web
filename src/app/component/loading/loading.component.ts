import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  template: `
  <mat-spinner color="accent">Loading...</mat-spinner>
  `,
  styles: [
  ]
})
export class LoadingComponent{
  constructor(private dialogRef: MatDialogRef<LoadingComponent>){
    dialogRef.disableClose = true;
  }
}
