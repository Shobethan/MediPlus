// imports all the necessary packages for the app
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// imports all the necessary packages related firebase for the app
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';

// imports all the pages that the app have
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { NeedsCreatePage } from '../pages/needs-create/needs-create';
import { NeedsSinglePage } from '../pages/needs-single/needs-single';
import { NeedsCreatedPage } from '../pages/needs-created/needs-created';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileFirstPage } from '../pages/profile-first/profile-first';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { SettingsPage } from '../pages/settings/settings';
import { NotificationsPage } from '../pages/notifications/notifications';
import { EventsCreatePage } from '../pages/events-create/events-create';

import { PatientsPage } from '../pages/patients/patients';
import { DiseasesPage } from '../pages/diseases/diseases';

// imports miscellaneous packages for the app
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { DiseaseCreatePage } from '../pages/disease-create/disease-create';
import { PatientsProfilePage } from '../pages/patients-profile/patients-profile';
import { TasksPage } from '../pages/tasks/tasks';
import { CureSinglePage } from '../pages/cure-single/cure-single';
import { CureSingle2Page } from '../pages/cure-single2/cure-single2';


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    RegisterPage,
    NeedsCreatePage,
    NeedsSinglePage,
    NeedsCreatedPage,
    EventsCreatePage,
    ProfilePage,
    ProfileFirstPage,
    ProfileEditPage,
    SettingsPage,
    NotificationsPage,
    TabsPage,
    PatientsPage,
    DiseasesPage,
    DiseaseCreatePage,
    PatientsProfilePage,
    TasksPage,
    CureSinglePage,
    CureSingle2Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    RegisterPage,
    NeedsCreatePage,
    NeedsSinglePage,
    NeedsCreatedPage,
    EventsCreatePage,
    ProfilePage,
    ProfileFirstPage,
    ProfileEditPage,
    SettingsPage,
    NotificationsPage,
    TabsPage,
    PatientsPage,
    DiseasesPage,
    DiseaseCreatePage,
    PatientsProfilePage,
    TasksPage,
    CureSinglePage,
    CureSingle2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
