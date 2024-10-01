import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { ToasterComponent } from './toaster/toaster.component';



@NgModule({
  declarations: [
    ToasterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    ToasterComponent
  ]
})
export class SharedModule { }
