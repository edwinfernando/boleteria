import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertaComponent } from '../components/modals/alerta/alerta.component';
import { TransferirEntradaComponent } from '../components/modals/transferir-entrada/transferir-entrada.component';
import { SolicitarEntradaComponent } from '../components/modals/solicitar-entrada/solicitar-entrada.component';
import { RegistrateComponent } from '../components/modals/registrate/registrate.component';
import { IniciarSesionComponent } from '../components/modals/iniciar-sesion/iniciar-sesion.component';
import { TuPedidoComponent } from '../components/modals/tu-pedido/tu-pedido.component';
import { CerrarSesionComponent } from '../components/modals/cerrar-sesion/cerrar-sesion.component';
import { EditarPerfilComponent } from '../components/modals/editar-perfil/editar-perfil.component';
import { RecuperarContrasenaComponent } from '../components/modals/recuperar-contrasena/recuperar-contrasena.component';
import { CambiarContrasenaComponent } from '../components/modals/cambiar-contrasena/cambiar-contrasena.component';
import { ErrorConexionComponent } from '../components/modals/error-conexion/error-conexion.component';
import { VerificarPedidoPage } from '../pages/verificar-pedido/verificar-pedido.page';
import { EVENTODISPONIBLE, SILLAS, Boleteria } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalCtrl: ModalController) { }

  async openModalRecuperarContrasena(){
    const modal = await this.modalCtrl.create({
      component: RecuperarContrasenaComponent,
      cssClass: 'modal-class-recuperar-contrasena',
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

  async openModalCambiarContrasena(correo: string){
    const modal = await this.modalCtrl.create({
      component: CambiarContrasenaComponent,
      componentProps: {
        correo
      },
      cssClass: 'modal-class-cambiar-contrasena',
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

  async openModalRegistrate(modalPadre: ModalController, openInicio: boolean){
    const modal = await modalPadre.create({
      component: RegistrateComponent,
      componentProps: {
         modalPadre
      },
      cssClass: 'modal-class-registrate',
      mode: 'ios',
      swipeToClose: false,
      keyboardClose: true,
      backdropDismiss: false
    });
    await modal.present();

    if (openInicio) {
      await modal.onDidDismiss()
      .then( result => this.inception(result.data, modalPadre));
    } else {
      const data = await modal.onDidDismiss();

      if (data.data !== undefined) {
        return data.data;
      } else {
        return false;
      }
    }
  }

  async inception(bluePill, modalPadre){
    if (bluePill) {
      await modalPadre.dismiss(true);
    }
  }

  async openModalEditarPerfil(correo: string, idUsuario: string){
    const modal = await this.modalCtrl.create({
      component: EditarPerfilComponent,
      componentProps: {
        correo,
        idUsuario
      },
      cssClass: 'modal-class-editar-perfil',
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

  async openModalVerificarPedido(lBoleteria: Boleteria[]){
    const modal = await this.modalCtrl.create({
      component: VerificarPedidoPage,
      componentProps: {
        lBoleteria
      },
      cssClass: 'modal-class-verificar-pedido',
      mode: 'ios',
    });
    await modal.present();
  }

  async openModalTuPedido(lBoleteria: Boleteria[]){
    const modal = await this.modalCtrl.create({
      component: TuPedidoComponent,
      componentProps: {
        lBoleteria
      },
      cssClass: 'modal-class-tu-pedido',
      mode: 'ios',
    });
    await modal.present();
    const data = await modal.onDidDismiss();

    if (data.data !== undefined) {
      return data.data;
    } else {
      return false;
    }
  }

  async openModalError(){
    const modal = await this.modalCtrl.create({
      component: ErrorConexionComponent,
      componentProps: {
        // tarjeta: JSON.stringify(this.tarjeta)
      },
      cssClass: 'custom-splash',
      mode: 'md',
    });
    await modal.present();
  }
}
