import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GENERAL, BOTONES } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
})
export class AlertaComponent implements OnInit {

  @Input() titulo = 'Algo salio mal';
  @Input() mensaje;
  @Input() isReturnResult = false;
  marca: string;
  imagen: string;
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
  constructor(private modalCtrl: ModalController,
              private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
        this.marca = resp.MARCA;
        this.imagen = resp.IMAGEN;
      }
    });
  }

  onClickAceptar(){
    this.modalCtrl.dismiss(
      true
    );
  }
}
