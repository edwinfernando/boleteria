import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Boleteria, GENERAL, BOTONES, EVENTODISPONIBLE, DETALLEUSUARIO, SILLAS } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { ModalController, NavController } from '@ionic/angular';
import { ModalService } from '../../services/modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

@Component({
  selector: 'app-verificar-pedido',
  templateUrl: './verificar-pedido.page.html',
  styleUrls: ['./verificar-pedido.page.scss'],
})
export class VerificarPedidoPage implements OnInit {

 //  @Input() evento: EVENTODISPONIBLE;
  // @Input() zona: any;
 // @Input() sillas: SILLAS[] = [];
 // @Input() numeroSillas: number;

  descripcion = '¿Aún no tienes una cuentas en BoletasWeb?. Crear una cuenta te permite acceder a des- cuentos especiales, enterarte de futuros eventos entes que otras personas y facilita tu proceso de compra.';
  isChecked: any;
  @Input() lBoleteria: Boleteria [] = [];
  eventoValorTransaccion = 0;
  isLogueado = false;
  lengthExpanded = false;
  detalleUsuario: DETALLEUSUARIO = {
    idUsuario: '',
    usuarioNombreLogin: '',
    usuarioNombrePersona: '',
    usuarioEmail: '',
    usuarioCelular: '',
    usuarioIniciales: '',
    usuarioDocumento: ''
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
              private navCtrl: NavController,
              private modalService: ModalService,
              private activeRouter: ActivatedRoute,
              private modalCtrl: ModalController,
              private utilService: UtilidadesService) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.getDetalleUsuario();
    this.eventoValorTransaccion = this.lBoleteria[0].eventoValorTransaccion;
    if (this.lBoleteria.length === 1){
      this.lengthExpanded = true;
    }
  }

  async getDetalleUsuario(){
    await this.dataLocal.getLogin().then(resp => {
      if (resp !== false){
        this.isLogueado = true;
        this.detalleUsuario = resp;
        this.detalleUsuario.usuarioNombrePersona = this.detalleUsuario.usuarioNombrePersona.toLowerCase();
      } else {
        this.isLogueado = false;
      }
    });
  }

  onClick(){}

  onClickEvento(boleteria: Boleteria){
      boleteria.expanded =  !boleteria.expanded;
  }

  closeModal() {
    // this.navCtrl.pop();
    this.modalCtrl.dismiss(
      this.isLogueado
    );
  }

  async completarCompra() {
    this.modalCtrl.dismiss(
      this.isLogueado
    );
    const data = await this.modalService.openModalTuPedido(this.lBoleteria);
    console.log(data);
  }

  async openModalRegistrate(){
    const result = await this.modalService.openModalRegistrate(this.modalCtrl, false);
    console.log(result);

    if (result){
      this.getDetalleUsuario();
    }
  }

  async openModalIniciarSesion(){
    const result = await this.modalService.openModalIniciarSesion();
    this.isLogueado = result;

    if (result){
      this.getDetalleUsuario();
    }
  }

  formatearValor(valor: any){
    return this.utilService.formatearNumeroMonedaDecimas(valor);
  }
}
