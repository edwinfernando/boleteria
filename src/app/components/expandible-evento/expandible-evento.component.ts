import { Component, Input, OnInit } from '@angular/core';
import { GENERAL, BOTONES, Notificacion } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { ModalService } from '../../services/modal.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expandible-evento',
  templateUrl: './expandible-evento.component.html',
  styleUrls: ['./expandible-evento.component.scss'],
})
export class ExpandibleEventoComponent implements OnInit {

  @Input() notificacion: Notificacion = {
    notificacion: '',
    expanded: false,
    opened: false,
    transferible: false,
    received: false
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
              private modalService: ModalService,
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
    this.modalService.openModalTransferir();
  }

  openModalAceptarEntrada() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/mi-perfil']);
    this.modalService.showAlert('Transferencia exitosa!', 'Ahora puedes ver tu entrada en tu perfil.')
  }
}
