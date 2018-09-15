import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { PatientsProfilePage } from '../patients-profile/patients-profile';

@IonicPage()
@Component({
  selector: 'page-patients',
  templateUrl: 'patients.html',
})
export class PatientsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {
  }

  patientsRef$: AngularFireList<Profile[]>;
  patientsData: any;

  ionViewWillEnter() {

    this.patientsRef$ = this.afDatabase.list<Profile[]>(`Profile`, ref => ref.orderByChild("userrole").equalTo("patient"));
    this.patientsData = this.patientsRef$.valueChanges();
  }


  showPatients(ev: any) {

    var val = ev.target.value;

    if (val != "") {
      this.patientsRef$ = this.afDatabase.list<Profile[]>(`Profile`, ref => ref.orderByChild("firstname").equalTo(val));
      this.patientsData = this.patientsRef$.valueChanges();
    } else {
      this.showOriginal();
    }
  }

  showOriginal() {
    this.patientsRef$ = this.afDatabase.list<Profile[]>(`Profile`, ref => ref.orderByChild("userrole").equalTo("patient"));
    this.patientsData = this.patientsRef$.valueChanges();
  }

  push__patientsProfile_Page(userid: string) {
    this.navCtrl.push(PatientsProfilePage, { userid: userid });
  }

}
