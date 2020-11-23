import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { BOTONES } from '../../interfaces/interfaces';

@Component({
  selector: 'app-toolbar-modal',
  templateUrl: './toolbar-modal.component.html',
  styleUrls: ['./toolbar-modal.component.scss'],
})
export class ToolbarModalComponent implements OnInit {

  @Input() isPopOver = false;

  estiloBotones: BOTONES = {
    COLOR_BACKGROUND_B_ACCESO: '',
    COLOR_BACKGROUND_B_PIN: '',
    COLOR_BACKGROUND_B_COMPARTIR: '',
    COLOR_TEXT: ''
  };

  constructor(private modalCtrl: ModalController,
              private popCtrl: PopoverController,
              private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });
  }

  closeModal() {
    if (this.isPopOver) {
      this.popCtrl.dismiss();
    } else {
      this.modalCtrl.dismiss(
        false
      );
    }
  }
}
