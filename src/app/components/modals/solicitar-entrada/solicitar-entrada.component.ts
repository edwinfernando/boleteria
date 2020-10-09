import { Component, OnInit } from '@angular/core';
import { GENERAL, BOTONES } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';

@Component({
  selector: 'app-solicitar-entrada',
  templateUrl: './solicitar-entrada.component.html',
  styleUrls: ['./solicitar-entrada.component.scss'],
})
export class SolicitarEntradaComponent implements OnInit {

  expandedDatosUsuario = true;
  expandedCodigoQr = false;
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
  }

  onClickExpandDatosUsuario(){
    this.expandedDatosUsuario =  !this.expandedDatosUsuario;
    this.expandedCodigoQr = false;
  }

  onClickExpandCodigoQr(){
    this.expandedCodigoQr =  !this.expandedCodigoQr;
    this.expandedDatosUsuario = false;
  }

  transferirBoleta() {}
}
