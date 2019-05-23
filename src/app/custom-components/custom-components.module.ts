import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TelerupteurComponent } from '../telerupteur/telerupteur.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TelerupteurComponent
  ],
  entryComponents: [
    TelerupteurComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    TelerupteurComponent
  ]
})
export class CustomComponentsModule { }
