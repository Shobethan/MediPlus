// imports necessary packages for the welcome page
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { PatientsPage } from '../patients/patients';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { DiseasesPage } from '../diseases/diseases';
import { TasksPage } from '../tasks/tasks';
import { Profile } from '../../models/profile';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tab1Root = PatientsPage;
  tab2Root = DiseasesPage;
  tab3Root = ProfilePage;
  tab4Root = SettingsPage;
  tab5Root = TasksPage;

  profileRef$: AngularFireObject<Profile>;
  profileData: any;

  isPatient: Boolean;
  isDoctor: Boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) {

    }

    ionViewWillEnter() {

      var userId = this.afAuth.auth.currentUser.uid;

      this.profileRef$ = this.afDatabase.object<Profile>(`Profile/${userId}`);
      this.profileData = this.profileRef$.valueChanges().subscribe(data => {
        if (data.userrole == "patient") {
          this.isPatient = true;
          this.isDoctor = false;
        }
        else {
          this.isPatient = false;
          this.isDoctor = true;
        }
      });
    }
     

  
}
