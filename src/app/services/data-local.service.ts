import { Injectable } from '@angular/core';
import { ConfiguracionEmpresa, DETALLEUSUARIO } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  configuracion: ConfiguracionEmpresa;
  constructor(private storage: Storage,
              private toastController: ToastController) {
                // this.cargarConfiguracion();
              }

  /*+++++++CONFIGURACION+++++++++*/
  async cargarConfiguracion() {
    const configuracion = await this.storage.get('configuracion');
    this.configuracion = configuracion || [];
    return this.configuracion;
  }

  guardarConfiguracion(confi: ConfiguracionEmpresa) {
    // let existe = false;

   /*  console.log(confi);
    if (this.configuracion) {
        existe = true;
    }

    this.storage.set('configuracion', confi);
    this.configuracion = confi;

   if (existe) {
      if (confi.VERSION > this.configuracion.VERSION){
        this.storage.set('configuracion', confi);
      }
    } else{
      this.storage.set('configuracion', confi);
    }*/

    this.storage.set('configuracion', confi);
  }

  setLogin(usuario: DETALLEUSUARIO){
    this.storage.set('usuario', usuario);
  }

  async getLogin() {
    const login = await this.storage.get('usuario');
    return login || false;
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      mode: 'ios',
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }

}
