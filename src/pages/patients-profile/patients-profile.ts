// imports necessary packages for the profile page
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController, Alert } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Profile } from '../../models/profile';

import { ProfileEditPage } from '../profile-edit/profile-edit';
import { NotificationsPage } from '../notifications/notifications';

import { Notifications } from '../../models/notifications';
import { Disease } from '../../models/disease';

@IonicPage()
@Component({
  selector: 'page-patients-profile',
  templateUrl: 'patients-profile.html',
})

export class PatientsProfilePage {

  profile = {} as Profile;
  profileRef$: AngularFireObject<Profile>;
  profileData: any;

  diseaseRef$: AngularFireList<Disease[]>;
  diseaseData: Disease[][];

  patientId: string;

  userEmail: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
  }

  async ionViewWillEnter() {

    // show the loader
    var loader = this.loadCtrl.create({
      spinner: "bubbles",
      content: "Please wait..."
    });
    loader.present();

    try {

      // Capture the needId as a Navparameter
      this.patientId = this.navParams.get('userid');

      this.profileRef$ = this.afDatabase.object<Profile>(`Profile/${this.patientId}`);
      this.profileData = this.profileRef$.valueChanges();



      var curUserId = this.afAuth.auth.currentUser.uid;

      this.diseaseRef$ = this.afDatabase.list<Disease[]>(`Disease/${curUserId}`);
      this.diseaseRef$.valueChanges().subscribe(data => this.diseaseData = data);

      loader.dismiss();
    }

    // catch and show errors via toast message only if any errors occur
    catch (e) {
      loader.dismiss();

      let toast = this.toastCtrl.create({
        message: e,
        duration: 5000,
        position: "top",
        cssClass: "error_toast"
      });
      toast.present();
    }
  }

  // push notifications page on the top of this page
  push__notifications_page() {
    this.navCtrl.push(NotificationsPage);
  }

  // push profile edit page on the top of this page
  push__profile_edit_page() {
    this.navCtrl.push(ProfileEditPage);
  }

  show__assign_settings() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Disease');


    for (let entry of this.diseaseData) {
      var name = entry['name'];
      var id = entry['diseaseid'];
      alert.addInput({
        type: 'radio',
        label: name,
        value: id
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.assignCure(data);
      }
    });

    alert.present();
  }

  assignCure(id) {
    var userId = this.afAuth.auth.currentUser.uid
    var key;
    this.afDatabase.object<Disease>(`Disease/${userId}/${id}`).valueChanges().subscribe(data => {key = this.afDatabase.list<Disease>(`AssignedCure/${this.patientId}`).push(data).key;
    this.afDatabase.object(`AssignedCure/${this.patientId}/${key}/diseaseid`).set(key)
    .then(() => {
      let toast = this.toastCtrl.create({
        message: "Cure has been assigned Succesfully",
        duration: 5000,
        position: "top",
        cssClass: "success_toast"
      });
      toast.present();
    })
    .then(() => this.navCtrl.pop());
  });
    
    
  }
}
