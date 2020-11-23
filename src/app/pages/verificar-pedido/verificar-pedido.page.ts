import { Component, Input, OnInit } from '@angular/core';
import { Boleteria, GENERAL, BOTONES, EVENTODISPONIBLE, DETALLEUSUARIO, SILLAS } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { ModalController, NavController } from '@ionic/angular';
import { ModalService } from '../../services/modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilidadesService } from '../../services/utilidades.service';

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
  isLogueado = false;
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
    //this.ordenarBoleteria();
  }

 /* ordenarBoleteria(){
    if (this.sillas.length > 0){
      this.sillas = this.sillas.filter( silla => silla.selected);

    }

    for (let index = 0; index < this.numeroSillas; index++) {
      let silla = '';
      if (this.sillas.length > 0){
        silla = this.sillas[index].silla.silleteriaNombre;
      }
      const boleta: Boleteria = {
        nombre: this.evento.eventoNombre,
        valor: this.zona.zonaValor,
        eventoFechaInicio: this.evento.eventoFechaInicio,
        eventoCiudad: this.evento.eventoCiudad,
        eventoDepartamento: this.evento.eventoDepartamento,
        eventoEscenario: this.evento.eventoEscenario,
        eventoDireccion: this.evento.eventoDireccion,
        localidad: this.zona.zonaNombre,
        silla,
        expanded: false
      };
      this.lBoleteria.push(boleta);
    }
  }*/

  async getDetalleUsuario(){
    await this.dataLocal.getLogin().then(resp => {
      if (resp !== false){
        this.isLogueado = true;
        this.detalleUsuario = resp;
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
    this.modalCtrl.dismiss();
  }

  async completarCompra() {
    this.modalCtrl.dismiss();
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

  formatearValor(valor: any){
    return this.utilService.formatearNumeroMonedaDecimas(valor);
  }
}
