import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertaComponent } from '../components/modals/alerta/alerta.component';
import { TransferirEntradaComponent } from '../components/modals/transferir-entrada/transferir-entrada.component';
import { SolicitarEntradaComponent } from '../components/modals/solicitar-entrada/solicitar-entrada.component';
import { RegistrateComponent } from '../components/modals/registrate/registrate.component';
import { IniciarSesionComponent } from '../components/modals/iniciar-sesion/iniciar-sesion.component';
import { TuPedidoComponent } from '../components/modals/tu-pedido/tu-pedido.component';
import { CerrarSesionComponent } from '../components/modals/cerrar-sesion/cerrar-sesion.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalCtrl: ModalController) { }

  async showAlert(titulo: string, mensaje: string) {
     const modal = await this.modalCtrl.create({
       component: AlertaComponent,
       cssClass: 'modal-class-alerta',
       componentProps: {
         titulo,
         mensaje
       },
       mode: 'ios'
     });

     await modal.present();
     modal.onDidDismiss();
   }

  async openModalRegistrate(){
    const modal = await this.modalCtrl.create({
      component: RegistrateComponent,
      componentProps: {
        // tarjeta: JSON.stringify(this.tarjeta)
      },
      cssClass: 'modal-class-registrate',
      mode: 'ios',
      swipeToClose: false,
      keyboardClose: true,
      backdropDismiss: false
    });
    await modal.present();
  }

  async openModalIniciarSesion(){
    const modal = await this.modalCtrl.create({
      component: IniciarSesionComponent,
      componentProps: {
        // tarjeta: JSON.stringify(this.tarjeta)
      },
      cssClass: 'modal-class-iniciar-sesion',
      mode: 'ios',
      swipeToClose: false,
      keyboardClose: true,
      backdropDismiss: false
    });
    await modal.present();
    const data = await modal.onDidDismiss();

    if (data.data !== undefined) {
      return data.data;
    } else {
      return false;
    }
  }

  async openModalCerrarSesion(){
    const modal = await this.modalCtrl.create({
      component: CerrarSesionComponent,
      componentProps: {
        // tarjeta: JSON.stringify(this.tarjeta)
      },
      cssClass: 'modal-class-cerrar-sesion',
      mode: 'ios',
      swipeToClose: false,
      keyboardClose: true,
      backdropDismiss: false
    });
    await modal.present();
    const data = await modal.onDidDismiss();

    if (data.data !== undefined) {
      return data.data;
    } else {
      return false;
    }
  }

  async openModalTransferir(){
    const modal = await this.modalCtrl.create({
      component: TransferirEntradaComponent,
      componentProps: {
        // tarjeta: JSON.stringify(this.tarjeta)
      },
      cssClass: 'modal-class-transferir',
      mode: 'ios',
    });
    await modal.present();
  }

  async openModalSolicitar(){
    const modal = await this.modalCtrl.create({
      component: SolicitarEntradaComponent,
      componentProps: {
        // tarjeta: JSON.stringify(this.tarjeta)
      },
      cssClass: 'modal-class-solicitar',
      mode: 'ios',
    });
    await modal.present();
  }

  async openModalTuPedido(){
    const modal = await this.modalCtrl.create({
      component: TuPedidoComponent,
      componentProps: {
        // tarjeta: JSON.stringify(this.tarjeta)
      },
      cssClass: 'modal-class-tu-pedido',
      mode: 'ios',
    });
    await modal.present();
  }
}
