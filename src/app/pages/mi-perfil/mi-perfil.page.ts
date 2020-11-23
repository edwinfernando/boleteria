import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BOTONES, GENERAL, DETALLEUSUARIO } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

  seccion = 'eventos';
  screenWidth: any;
  screenHeight: any;
  ajustarFooter = false;
  ajustarTemp = false;
  pagePadre = '';
  detalleUsuario: DETALLEUSUARIO = {
    idUsuario: '',
    usuarioNombreLogin: '',
    usuarioNombrePersona: '',
    usuarioEmail: '',
    usuarioCelular: '',
    usuarioIniciales: '',
    usuarioDocumento: ''
  };

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

  @ViewChild(ToolbarComponent) toolbarComponent: ToolbarComponent;

  constructor(private dataLocal: DataLocalService,
              private modalService: ModalService,
              private navCtrl: NavController,
              private router: Router) {
  }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.dataLocal.getPage().then( page => {
      this.pagePadre = page;
    });

    this.getDetalleUsuario();
  }

  ajustarFooterEmitter(event) {
    this.ajustarTemp = event;
    this.ajustarFooter = event;
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          // console.log(this.screenHeight, this.screenWidth);
          if (this.screenWidth < 768){
            this.ajustarFooter = true;
          } else if (!this.ajustarTemp){
            this.ajustarFooter = false;
          }
    }

  async getDetalleUsuario(){
    await this.dataLocal.getLogin().then(resp => {
      if (resp !== false){
        this.detalleUsuario = resp;
      }
    });
  }

  async openModalEditarPerfil(){
    const result = await this.modalService.openModalEditarPerfil(this.detalleUsuario.usuarioEmail, this.detalleUsuario.idUsuario);
    if (result) {
      this.getDetalleUsuario();
      this.toolbarComponent.getDetalleUsuario();
    }
  }

  async openModalCambiarContrasena(){
    const result = await this.modalService.openModalCambiarContrasena(this.detalleUsuario.usuarioEmail);
  }

  async openModalCerrarSesion(){
    const result = await this.modalService.openModalCerrarSesion();
  }

  onClickSalir(){
    this.navCtrl.back();
  }
}
