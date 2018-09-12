import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Disease } from '../../models/disease';

/**
 * Generated class for the DiseasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disease-create',
  templateUrl: 'disease-create.html',
})
export class DiseaseCreatePage {

  dis = {} as Disease;
  diseaseRef$: AngularFireList<Disease>;
  name = "";
  sp_anno = "";
  desc = "";
  diseaseid = "";

  today = new Date().toISOString();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DiseasesPage');
  // }

  // show error toast message for blank required fields
  blank_create() {
    let toast = this.toastCtrl.create({
      message: "Please fill all the necessary fields",
      duration: 3000,
      position: "top",
      cssClass: "error_toast"
    });
    toast.present();
  }


  // create new need in firebase database or show error toast message for any errors
  async create(dis: Disease) {

    // since these fields are not required if they empty assign null value to them
    this.dis.name = this.dis.name || this.name;
    this.dis.desc = this.dis.desc || this.desc;
    this.dis.sp_anno = this.dis.sp_anno || this.sp_anno;

    // get current user uid and assign it to need's userid
    this.dis.diseaseid = this.afAuth.auth.currentUser.uid;

    // show the loader
    var loader = this.loadCtrl.create({
      spinner: "bubbles",
      content: "Please wait..."
    });
    loader.present();

    try {
      var userid = this.afAuth.auth.currentUser.uid;

      // try creating new need array
      this.diseaseRef$ = this.afDatabase.list(`Disease/${userid}`);
      var key = await this.diseaseRef$.push(this.dis).key;
      this.dis.diseaseid = key;
      await this.afDatabase.list(`Disease/${userid}`).update(key, { diseaseid: key })
        .then(() => loader.dismiss())
        .then(() => this.navCtrl.pop());

      // show toast message of successful creation of need
      let toast = this.toastCtrl.create({
        message: "Your blood request thread has been created",
        duration: 3000,
        position: "top",
        cssClass: "success_toast"
      });
      toast.present();
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