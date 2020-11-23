import { Injectable } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SplashComponent } from '../components/modals/splash/splash.component';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class SplashService {

  loading: any;
  constructor(private modalCtrl: ModalController,
              public loadingController: LoadingController) { }

  async showSplash() {
    console.log('loading show');
   /* const modal = await this.modalCtrl.create({
       component: SplashComponent,
       cssClass: 'custom-splash',
       mode: 'md',
       animated: false
     });*/

  //  await modal.present();
    await this.presentLoading();

   // const data = await modal.onDidDismiss();
   // console.log(data);
   // this.loadingController.dismiss();
   }

   async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'class-loading',
    //  message: 'Please wait...',
    //  duration: 2000,
      mode: 'ios',
      spinner: 'dots'
    });

    this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
   // this.modalCtrl.dismiss();
  }

  dissmissSplash(){
    console.log('dismiss');
    this.loadingController.dismiss();
 //   this.modalCtrl.dismiss();
  }
}
