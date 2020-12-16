import { Injectable } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SplashComponent } from '../components/modals/splash/splash.component';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class SplashService {

  loading: any;
  isLoading = false;
  constructor(private modalCtrl: ModalController,
              public loadingController: LoadingController) { }

  showSplash() {
    console.log('loading show');
   /* const modal = await this.modalCtrl.create({
       component: SplashComponent,
       cssClass: 'custom-splash',
       mode: 'md',
       animated: false
     });*/

  //  await modal.present();
    this.presentLoading();

   // const data = await modal.onDidDismiss();
   // console.log(data);
   // this.loadingController.dismiss();
   }

   async presentLoading() {
    if (!this.isLoading){
      this.loading = await this.loadingController.create({
        cssClass: 'class-loading',
      //  message: 'Please wait...',
      //  duration: 2000,
        mode: 'ios',
        spinner: 'dots'
      });

      this.isLoading = true;
      this.loading.present();

      const { role, data } = await this.loading.onDidDismiss();
      console.log('Loading dismissed!');
     // this.modalCtrl.dismiss();
    }
  }

  dissmissSplash(){
    console.log(this.isLoading);
    if (this.isLoading){
      this.loadingController.dismiss();
      this.isLoading = false;
    }
 //   this.modalCtrl.dismiss();
  }
}
