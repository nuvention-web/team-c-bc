import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatChipsModule
} from '@angular/material';


@NgModule({
  imports:
  [MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatChipsModule],
  exports:
  [MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatChipsModule],
})
export class MaterialModule { }
