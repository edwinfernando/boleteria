import { Component, OnInit } from '@angular/core';
import { GENERAL, BOTONES } from '../../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../../services/data-local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.scss'],
})
export class CerrarSesionComponent implements OnInit {

  titulo = 'Cerrar sesión';
  mensaje = '¿Estas seguro que quieres cerrar sesión?';
  estiloGeneral: GENERAL = {
    COLOR_BACKGROUND_GENERAL: '',
    COLOR_BACKGROUND_SLIDES: '',
    COLOR_BACKGROUND_EVENTOS: '',
    COLOR_BACKGROUND_CATEGORIAS: '',
    COLOR_TEXT: ''
  };
  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };
  constructor(private modalCtrl: ModalController,
              private dataLocal: DataLocalService,
              private router: Router) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });
  }

  onClickAceptar(){
    this.modalCtrl.dismiss(true);
    this.dataLocal.setLogin(null);
    this.router.navigateByUrl('/home', {
       replaceUrl: true,
       queryParams: {
         closeSesion: true
       }
    });
  }

  onClickCancelar(){
    this.modalCtrl.dismiss(false);
  }
}
