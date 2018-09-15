// imports necessary packages for the needs single page
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { database } from 'firebase';
import { Needs } from '../../models/needs';
import { Profile } from '../../models/profile';
import { Notifications } from '../../models/notifications';
import { Disease } from '../../models/disease';

@IonicPage()
@Component({
  selector: 'page-cure-single',
  templateUrl: 'cure-single.html',
})

export class CureSinglePage {

  diseaseRef$: AngularFireObject<Disease>;
  diseaseData: any;

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
      const diseaseId = this.navParams.get('diseaseId');

      var userId = this.afAuth.auth.currentUser.uid;

      // try to get need details from firebase database
      this.diseaseRef$ = await this.afDatabase.object<Disease>(`Disease/${userId}/${diseaseId}`);
      this.diseaseData = await this.diseaseRef$.valueChanges();

      
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

  
}
