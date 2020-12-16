import { Component, Input, OnInit } from '@angular/core';
import { GENERAL, BOTONES, Notificacion, Boleteria } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-expandible-evento',
  templateUrl: './expandible-evento.component.html',
  styleUrls: ['./expandible-evento.component.scss'],
})
export class ExpandibleEventoComponent implements OnInit {

  @Input() notificacion: Notificacion = {
    idTransferencia: 1,
    nombrePersonaEnvia: '',
    notificacion: '',
    boleta: null,
    expanded: false,
    opened: false,
    solicitudTransferir: false
  };

  @Input() boleta: Boleteria = {
    nombre: 'Evento prueba',
    valor: 30000,
    eventoId: 1,
    eventoFechaInicio: '2020-11-30 03:00:00.0',
    eventoCiudad: 'MEDELLIN',
    eventoDepartamento: 'ANTIOQUIA',
    eventoEscenario: 'Pascualito',
    eventoDireccion: 'Calle 123, Falsa',
    eventoValorTransaccion: 1200,
    localidad: 'VIP',
    zonaId: 1,
    silla: '5',
    expanded: false
  };

  @Input() expanded: boolean;

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
              private dataService: DataService,
              private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.notificacion.boleta = this.boleta;
    this.boleta.expanded = this.expanded;
  }

  openModalTransferir(){
    this.utilService.showLoading();
    const request = {
      strPeticion: JSON.stringify({
        notificacionId: this.notificacion.idTransferencia,
      })
    };

    console.log(request);

    this.dataService.transferirBoletaPorNotificacion(request)
      .then( resp => {
        // console.log (resp);
        this.utilService.dissmisLoading();
        this.utilService.showAlert('Transferencia exitosa!', 'Ahora ' + this.notificacion.nombrePersonaEnvia + ' puede ver la entrada en su perfil.');
      })
      .catch( resp => {
        // console.log(resp);
        this.utilService.dissmisLoading();
        this.utilService.showAlert('Algo salio mal', resp);
      });
  }

  openModalAceptarEntrada() {
    this.modalCtrl.dismiss();
    // this.router.navigate(['/mi-perfil']);
    this.utilService.showAlert('Transferencia exitosa!', 'Ahora puedes ver la entrada en tu perfil.');
  }

  formatearValor(valor: any){
    this.utilService.formatearNumeroMonedaDecimas(valor);
  }
}
