import { Component, OnInit } from '@angular/core';
import { GENERAL, BOTONES } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { ModalService } from '../../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tu-pedido',
  templateUrl: './tu-pedido.component.html',
  styleUrls: ['./tu-pedido.component.scss'],
})
export class TuPedidoComponent implements OnInit {

  items = [
    {
    boleta: 'VIP',
    precio: '$210.000'
    },
    {
      boleta: 'VIP',
      precio: '$300.000'
    },
    {
      boleta: 'Subtotal',
      precio: '$510.000'
    }
  ];
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
              private modalCtlr: ModalController,
              private modalService: ModalService,
              private router: Router) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });
  }

  cancelar() {
    this.modalCtlr.dismiss();
  }

  completarCompra() {
    this.modalCtlr.dismiss();
    this.router.navigateByUrl('/home', { skipLocationChange: true });
    this.modalService.showAlert('¡Compra exitosa!', 'Te hemos enviado un correo electrónico con tu entrada y un mensaje de texto con tu PIN de acceso a tu celular.');
  }

}
