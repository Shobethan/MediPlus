import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientsProfilePage } from './patients-profile';

@NgModule({
  declarations: [
    PatientsProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PatientsProfilePage),
  ],
})
export class PatientsProfilePageModule {}
