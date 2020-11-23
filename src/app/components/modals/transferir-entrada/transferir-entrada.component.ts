import { Component, OnInit } from '@angular/core';
import { GENERAL, BOTONES } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UtilidadesService } from '../../../services/utilidades.service';

@Component({
  selector: 'app-transferir-entrada',
  templateUrl: './transferir-entrada.component.html',
  styleUrls: ['./transferir-entrada.component.scss'],
})
export class TransferirEntradaComponent implements OnInit {

  expandedDatosUsuario = true;
  expandedCodigoQr = false;
  nombre = 'Jhonny Velasco';
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
              private utilService: UtilidadesService,
              private modalCtrl: ModalController,
              private router: Router) { }

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

  transferirBoleta() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/mi-perfil']);
   // this.modalService.showAlert('Transferencia exitosa!', this.nombre + ' recibió tu entrada.');
    this.utilService.showAlert('Transferencia exitosa!', 'Espera que la persona a la que le enviaste la entrada acepte. Recibirás una notificación de confirmación. \n *En caso de no aceptar la entrada volverá a ti.');

  }
}
