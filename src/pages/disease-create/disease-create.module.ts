import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiseaseCreatePage } from './disease-create';

@NgModule({
  declarations: [
    DiseaseCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DiseaseCreatePage),
  ],
})
export class DiseaseCreatePageModule {}
