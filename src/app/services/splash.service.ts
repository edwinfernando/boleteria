import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SplashComponent } from '../components/modals/splash/splash.component';

@Injectable({
  providedIn: 'root'
})
export class SplashService {

  constructor(private modalCtrl: ModalController) { }

  async showSplash() {
     const modal = await this.modalCtrl.create({
       component: SplashComponent,
       cssClass: 'custom-splash',
       mode: 'md',
       animated: false
     });

     await modal.present();
     modal.onDidDismiss();
   }
}
