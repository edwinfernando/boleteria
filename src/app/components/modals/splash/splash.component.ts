import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  constructor(public loadingController: LoadingController,
              public modalController: ModalController) {
    // this.presentLoading();
   }

  ngOnInit() {}

  /*async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'class-loading',
    //  message: 'Please wait...',
    //  duration: 2000,
      mode: 'ios',
      spinner: 'dots'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
   // this.modalController.dismiss();
    console.log('Loading dismissed!');
  }*/

}
