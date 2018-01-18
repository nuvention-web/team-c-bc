import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatInputModule, FormsModule],
  exports: [MatButtonModule, MatInputModule, FormsModule],
})
export class MaterialModule { }
