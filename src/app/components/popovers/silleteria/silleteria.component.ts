import { Component, OnInit } from '@angular/core';
import { SILLETERIA, Sectore, GENERAL, BOTONES, SILLAS } from '../../../interfaces/interfaces';
import { NavParams, PopoverController, ModalController } from '@ionic/angular';
import { DataLocalService } from '../../../services/data-local.service';

@Component({
  selector: 'app-silleteria',
  templateUrl: './silleteria.component.html',
  styleUrls: ['./silleteria.component.scss'],
})
export class SilleteriaComponent implements OnInit {

  // paises: Pais[];
  /*
  45=disponible
  73=trasparente o espacio
  46=ocupada
  113=dañada]*/

  sillas: SILLAS[] = [];
  numeroSillas = 0;
//  silleteria: SILLETERIA[];
  fila: any = [];
  columna: any = [];
  sillaTemp: SILLAS = {
    silla: null,
    selected: false
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
              private navParam: NavParams,
              private popCtrl: PopoverController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.sillas = this.navParam.get('sillas');
    this.sillaTemp = this.sillas[this.sillas.length - 1];

    for (let index = 0; index <= this.sillaTemp.silla.silleteriaFila; index++) {
      this.fila.push(index);
    }

    for (let index = 0; index <= this.sillaTemp.silla.silleteriaColumna; index++) {
      this.columna.push(index);
    }

    this.getNumeroSillas();
  }

  seleccionaSilla(){
    this.popCtrl.dismiss(this.sillas);
    // this.modalCtrl.dismiss(this.sillas);
  }

  onClickSilla(a: number, b: number){
    this.getNumeroSillas();
    const lengthFila = this.fila.length - 1;
    const silla = (lengthFila * b) + (a + b);

    if (this.numeroSillas < 10){
      this.sillas[silla].selected = !this.sillas[silla].selected;
    } else {
      this.sillas[silla].selected = false;
    }
  }

  sillaIsSelected(a: number, b: number){
    const lengthFila = this.fila.length - 1;
    const silla = (lengthFila * b) + (a + b);
    return this.sillas[silla].selected;
  }

  sillaEstado(a: number, b: number){
    const lengthFila = this.fila.length - 1;
    const silla = (lengthFila * b) + (a + b);
    if (this.sillas[silla].silla.silleteriaEstado === 73){
      return false;
    }else {
      return true;
    }
  }

  sillaHabilitar(a: number, b: number){
    const lengthFila = this.fila.length - 1;
    const silla = (lengthFila * b) + (a + b);
    if (this.sillas[silla].silla.silleteriaEstado !== 45){
      return true;
    }else {
      return false;
    }
  }

  getNumeroSillas(){
    this.numeroSillas = 0;
    this.sillas.forEach( silla => {
      if (silla.selected) {
        this.numeroSillas += 1;
      }
    });
  }
}
