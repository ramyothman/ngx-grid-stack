import { NgModule } from '@angular/core';
import { GridStackComponent } from './grid-stack/grid-stack.component';
import { GridStackItemComponent } from './grid-stack-item/grid-stack-item.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GridStackComponent, GridStackItemComponent],
  exports: [GridStackComponent, GridStackItemComponent]
})
export class GridStackModule { }
