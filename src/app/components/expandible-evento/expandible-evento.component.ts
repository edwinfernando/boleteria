import { Component, Input, OnInit } from '@angular/core';
import { GENERAL, BOTONES, Notificacion, Boleteria } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';

@Component({
  selector: 'app-expandible-evento',
  templateUrl: './expandible-evento.component.html',
  styleUrls: ['./expandible-evento.component.scss'],
})
export class ExpandibleEventoComponent implements OnInit {

  @Input() notificacion: Notificacion = {
    nombre: '',
    valor: '',
    notificacion: '',
    evento: '',
    expanded: false,
    opened: false,
    transferible: false,
    received: false
  };

  @Input() boleta: Boleteria = {
    nombre: 'Evento prueba',
    valor: 30000,
    eventoFechaInicio: '2020-11-30 03:00:00.0',
    eventoCiudad: 'MEDELLIN',
    eventoDepartamento: 'ANTIOQUIA',
    eventoEscenario: 'Pascualito',
    eventoDireccion: 'Calle 123, Falsa',
    localidad: 'VIP',
    silla: '5',
    expanded: false
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
              private utilService: UtilidadesService,
              private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });
  }

  openModalTransferir(){
    // this.modalService.openModalTransferir();
    this.modalCtrl.dismiss();
    this.router.navigate(['/mi-perfil']);
    this.utilService.showAlert('Transferencia exitosa!', 'Ahora ' + this.notificacion.nombre + ' puede ver la entrada en su perfil.');
  }

  openModalAceptarEntrada() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/mi-perfil']);
    this.utilService.showAlert('Transferencia exitosa!', 'Ahora puedes ver la entrada en tu perfil.');
  }

  formatearValor(valor: any){
    this.utilService.formatearNumeroMonedaDecimas(valor);
  }
}
