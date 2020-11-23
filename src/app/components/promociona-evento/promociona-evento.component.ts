import { Component, OnInit } from '@angular/core';
import { GENERAL, BOTONES, EMPRESA } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-promociona-evento',
  templateUrl: './promociona-evento.component.html',
  styleUrls: ['./promociona-evento.component.scss'],
})
export class PromocionaEventoComponent implements OnInit {

  empresa: EMPRESA = {
    nombreEmpresa: '',
    nitEmpresa: '',
    estadoEmpresa: '',
    correoEmpresa: '',
    telefonoEmpresa: '',
    direccionEmpresa: ''
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
  constructor(private dataLocal: DataLocalService) { }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.dataLocal.cargarEmpresa().then( resp => {
      this.empresa = resp;
    });
  }

}
