import { Component, OnInit } from '@angular/core';
import { TOOLBAR, BOTONES } from '../../interfaces/interfaces';
import { PopoverController, ModalController, MenuController } from '@ionic/angular';
import { PaisesComponent } from '../modals/paises/paises.component';
import { DataLocalService } from '../../services/data-local.service';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  pais = {
    id: '0',
    name: 'Colombia',
    code: '+57',
    isChecked: false,
    image: '/assets/flat/col.png',
  };
  popoverPais;
  seccion;
  isLogueado = false;
  iniciales = '';
  estiloToolbar: TOOLBAR = {
    COLOR_BACKGROUND: '',
    COLOR_TEXT: '',
    COLOR_BACKGROUND_SEARCH: '',
    COLOR_TEXT_SEARCH: ''
  };
  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };

  constructor(private popoverController: PopoverController,
              private modalService: ModalService,
              private router: Router,
              private menuController: MenuController,
              private dataLocal: DataLocalService) { }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloToolbar = resp.ESTILOS.TOOLBAR;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.getDetalleUsuario();
  }

  openMenu() {
    this.menuController.toggle();
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  gotoMiPerfil() {
    this.router.navigate(['/mi-perfil']);
  }

  async seleccionarPais(ev: any) {
    this.popoverPais = await this.popoverController.create({
      component: PaisesComponent,
      componentProps: {
        // tarjeta: JSON.stringify(this.tarjeta)
      },
      cssClass: 'popover-class-paises',
      event: ev,
      translucent: true,
      mode: 'ios',
    });
    return await this.popoverPais.present();
  }

  closePopOverPais(){
    // this.popoverPais.dismiss();
  }

  openModalRegistrate(){
    this.modalService.openModalRegistrate();
  }

  async openModalIniciarSesion(){
    const result = await this.modalService.openModalIniciarSesion();
    this.isLogueado = result;

    this.getDetalleUsuario();
  }

  async getDetalleUsuario(){
    await this.dataLocal.getLogin().then(resp => {
      if (resp !== false){
        this.isLogueado = true;
        this.iniciales = resp.usuarioIniciales;
      }
    });
  }

  setIsLogueado(isLogueado: boolean){
    this.isLogueado = isLogueado;
  }
}
