import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { DiseaseCreatePage } from '../disease-create/disease-create';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { database } from 'firebase';

/**
 * Generated class for the DiseasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diseases',
  templateUrl: 'diseases.html',
})
export class DiseasesPage {






  disRef$: AngularFireList<String>;
  disData: any;



  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DiseasesPage');
  // }


  push__needs_create_page() {

    this.navCtrl.push(DiseaseCreatePage)


  }

  async ionViewWillEnter() {

    // show the loader
    var loader = this.loadCtrl.create({
      spinner: "bubbles",
      content: "Please wait..."
    });
    loader.present();

   

    try {
      // Get the current userId
      var userid = this.afAuth.auth.currentUser.uid;


      this.disRef$ = this.afDatabase.list<string>(`Disease/${userid}`);
      this.disData =this.disRef$.valueChanges()
      loader.dismiss();
    
    }
    catch (e) {
      
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
