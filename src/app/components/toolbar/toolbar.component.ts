import { Component, Input, OnInit } from '@angular/core';
import { TOOLBAR, BOTONES } from '../../interfaces/interfaces';
import { MenuController } from '@ionic/angular';
// import { PaisesComponent } from '../modals/paises/paises.component';
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
  seccion;
  marca: string;
  imagen: string;
  @Input() isLogueado = false;
  @Input() page = '';
  replace = true;
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

  constructor(private modalService: ModalService,
              private router: Router,
              private menuController: MenuController,
              private dataLocal: DataLocalService) {
                this.getDetalleUsuario();
              }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloToolbar = resp.ESTILOS.TOOLBAR;
        this.estiloBotones = resp.ESTILOS.BOTONES;
        this.marca = resp.MARCA;
        this.imagen = resp.IMAGEN;
      }
    });

    this.getDetalleUsuario();
  }

  openMenu() {
    this.menuController.toggle();
  }

  gotoHome() {
    this.router.navigateByUrl('/home', {
      replaceUrl: true,
      skipLocationChange: false,
   });
  }

  gotoMiPerfil() {
    if (this.page === 'evento') {
      this.replace = this.isLogueado;
    }

    console.log(this.replace);
    this.router.navigate(['/mi-perfil'], {
    //  replaceUrl: this.replace,
   });
  }

  closePopOverPais(){
    // this.popoverPais.dismiss();
  }

  /*async openModalRegistrate(){
    const result = await this.modalService.openModalRegistrate();
    this.isLogueado = result;
    console.log('Auwi', this.isLogueado);

    this.getDetalleUsuario();
  }*/

  async openModalIniciarSesion(){
    const result = await this.modalService.openModalIniciarSesion();
    this.isLogueado = result;

    this.getDetalleUsuario();
  }

  async getDetalleUsuario(){
    await this.dataLocal.getLogin().then(resp => {
      if (resp !== false){
        // console.log(resp);
        this.isLogueado = true;
        this.iniciales = resp.usuarioIniciales;
      }
    });
  }

  setIsLogueado(isLogueado: boolean){
    this.isLogueado = isLogueado;
  }
}
