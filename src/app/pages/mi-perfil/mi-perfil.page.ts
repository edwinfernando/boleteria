import { Component, HostListener, OnInit } from '@angular/core';
import { BOTONES, GENERAL, DETALLEUSUARIO } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { ModalService } from '../../services/modal.service';

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
  detalleUsuario: DETALLEUSUARIO = {
    usuarioNombreLogin: '',
    usuarioNombrePersona: '',
    usuarioEmail: '',
    usuarioCelular: '',
    usuarioIniciales: '',
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

  constructor(private dataLocal: DataLocalService,
              private modalService: ModalService) {
  }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
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
          console.log(this.screenHeight, this.screenWidth);
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

  onClickEditarPerfil(){

  }

  async onClickCerrarSesion(){
    const result = await this.modalService.openModalCerrarSesion();
  }
}
