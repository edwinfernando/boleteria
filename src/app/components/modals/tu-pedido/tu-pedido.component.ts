import { Component, Input, OnInit } from '@angular/core';
import { GENERAL, BOTONES, Boleteria, COMPRA, DETALLEUSUARIO } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { ModalService } from '../../../services/modal.service';
import { Router } from '@angular/router';
import { UtilidadesService } from '../../../services/utilidades.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-tu-pedido',
  templateUrl: './tu-pedido.component.html',
  styleUrls: ['./tu-pedido.component.scss'],
})
export class TuPedidoComponent implements OnInit {

  @Input() lBoleteria: Boleteria[];
  eventoId: number;
  usuarioId: string;
  listaCompra: COMPRA[] = [];
  compra: COMPRA = {
    cantidad: 0,
    zonaId: 0
  };
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
              private dataService: DataService,
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

    this.dataLocal.getLogin().then((resp: DETALLEUSUARIO) => {
      this.usuarioId = resp.idUsuario;
    });

   // console.log(this.lBoleteria[0]);
    this.nombreEvento = this.lBoleteria[0].nombre;
    this.eventoId = this.lBoleteria[0].eventoId;
    this.listaCompra = [];
    this.compra.zonaId = this.lBoleteria[0].zonaId;
    this.compra.cantidad = 0;
    this.lBoleteria.forEach( boleta => {
      this.valorBoletas += boleta.valor;
      this.compra.cantidad += 1;
    });

    this.listaCompra.push(this.compra);
    console.log(this.valorBoletas);

    this.factura = [
      {
      boleta: this.lBoleteria[0].localidad,
      precio: this.formatearValor(this.valorBoletas)
      },
      {
        boleta: 'Transacción',
        precio: this.formatearValor(this.lBoleteria[0].eventoValorTransaccion)
      },
      {
        boleta: 'Subtotal',
        precio: this.formatearValor(this.valorBoletas + this.lBoleteria[0].eventoValorTransaccion)
      }
    ];
  }

  cancelar() {
    this.modalCtlr.dismiss();
    this.modalService.openModalVerificarPedido(this.lBoleteria);
  }

  completarCompra() {
    this.utilService.showLoading();
    const request = {
      strPeticion: JSON.stringify({
        usuarioId: this.usuarioId,
        eventoId: this.eventoId,
        listaCompra: this.listaCompra
      })
    };
    this.dataService.realizarVenta(request)
        .then( (resp: string) => {
          this.utilService.dissmisLoading();
          this.modalCtlr.dismiss(true);
          this.utilService.showAlert('', resp);
          this.router.navigateByUrl('/home', { skipLocationChange: false });
        }).catch( resp => {
          this.utilService.dissmisLoading();
          this.utilService.showAlert('Algo salio mal', resp);
        });
   /* this.modalCtlr.dismiss(
            true
          );
    this.router.navigateByUrl('/home', { skipLocationChange: false });*/
  }

  formatearValor(valor: any){
    return this.utilService.formatearNumeroMonedaDecimas(valor);
  }
}
