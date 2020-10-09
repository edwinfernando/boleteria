import { Component, OnInit } from '@angular/core';
import { Boleteria, GENERAL, BOTONES, EVENTODISPONIBLE } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { ModalController, NavController } from '@ionic/angular';
import { ModalService } from '../../services/modal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verificar-pedido',
  templateUrl: './verificar-pedido.page.html',
  styleUrls: ['./verificar-pedido.page.scss'],
})
export class VerificarPedidoPage implements OnInit {

  evento: EVENTODISPONIBLE;
  descripcion = '¿Aún no tienes una cuentas en BoletasWeb?. Crear una cuenta te permite acceder a des- cuentos especiales, enterarte de futuros eventos entes que otras personas y facilita tu proceso de compra.';
  isChecked: any;
  lBoleteria: Boleteria [] = [
    {
      name: 'RollingStone',
      expanded: false
    },
    {
      name: 'RollingStone',
      expanded: false
    }
  ];
  isLogueado = false;
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
              private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.activeRouter.queryParams.subscribe( resp => {
      this.evento = JSON.parse(resp.evento);
    });
  }

  onClick(){}

  onClickEvento(boleteria: Boleteria){
      boleteria.expanded =  !boleteria.expanded;
  }

  closeModal() {
    this.navCtrl.pop();
  }

  completarCompra() {
    this.modalService.openModalTuPedido();
  }

  openModalRegistrate(){
    this.modalService.openModalRegistrate();
  }
}
