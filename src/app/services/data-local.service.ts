import { Injectable } from '@angular/core';
import { ConfiguracionEmpresa, DETALLEUSUARIO, EMPRESA, SOLICITUDEVENTO } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  configuracion: ConfiguracionEmpresa;
  empresa: EMPRESA;
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
    this.storage.set('configuracion', confi);
  }

  setLogin(usuario: DETALLEUSUARIO){
    this.storage.set('usuario', usuario);
  }

  guardarEmpresa(empresa: EMPRESA) {
    this.storage.set('empresa', empresa);
  }

  async cargarEmpresa() {
    const empresa = await this.storage.get('empresa');
    this.empresa = empresa || [];
    return this.empresa;
  }

  /*+++++++USUARIO+++++++++*/
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

  setPage(page: string){
    this.storage.set('page', page);
  }

  async getPage() {
    const page = await this.storage.get('page');
    return page || '';
  }

  setEventosSolicitud(listSolicitudEventos: SOLICITUDEVENTO[]){
    this.storage.set('solicitudEventos', listSolicitudEventos);
  }

  async getEventosSolicitud() {
    const listSolicitudEventos = await this.storage.get('solicitudEventos');
    return listSolicitudEventos || [];
  }
}
