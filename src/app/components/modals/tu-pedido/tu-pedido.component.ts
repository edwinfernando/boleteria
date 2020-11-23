import { Component, Input, OnInit } from '@angular/core';
import { GENERAL, BOTONES, Boleteria } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { ModalService } from '../../../services/modal.service';
import { Router } from '@angular/router';
import { UtilidadesService } from '../../../services/utilidades.service';

@Component({
  selector: 'app-tu-pedido',
  templateUrl: './tu-pedido.component.html',
  styleUrls: ['./tu-pedido.component.scss'],
})
export class TuPedidoComponent implements OnInit {

  @Input() lBoleteria: Boleteria[];
  nombreEvento: string;
  valorBoletas = 0;
  factura = [];
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
              private utilService: UtilidadesService,
              private router: Router) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.nombreEvento = this.lBoleteria[0].nombre;
    this.lBoleteria.forEach( boleta => {
      this.valorBoletas += boleta.valor;
      console.log(boleta.valor);
    });

    console.log(this.valorBoletas);

    this.factura = [
      {
      boleta: this.lBoleteria[0].localidad,
      precio: this.formatearValor(this.valorBoletas)
      },
      {
        boleta: 'Transacción',
        precio: '$10.000'
      },
      {
        boleta: 'Subtotal',
        precio: this.formatearValor(this.valorBoletas + 10000)
      }
    ];
  }

  cancelar() {
    this.modalCtlr.dismiss();
    this.modalService.openModalVerificarPedido(this.lBoleteria);
  }

  completarCompra() {
    this.modalCtlr.dismiss(true);
    this.router.navigateByUrl('/home', { skipLocationChange: false });
  }

  formatearValor(valor: any){
    return this.utilService.formatearNumeroMonedaDecimas(valor);
  }
}
