import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CureSinglePage } from './cure-single';

@NgModule({
  declarations: [
    CureSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(CureSinglePage),
  ],
})
export class CureSinglePageModule {}
