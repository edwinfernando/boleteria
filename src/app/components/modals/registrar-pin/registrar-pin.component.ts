import { Component, OnInit } from '@angular/core';
import { GENERAL, BOTONES, DETALLEUSUARIO } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilidadesService } from '../../../services/utilidades.service';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-registrar-pin',
  templateUrl: './registrar-pin.component.html',
  styleUrls: ['./registrar-pin.component.scss'],
})
export class RegistrarPinComponent implements OnInit {

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

  usuarioId: string;
  pinForm: FormGroup;
  isPinValido = false;
  constructor(private dataLocal: DataLocalService,
              private formBuilder: FormBuilder,
              private utilService: UtilidadesService,
              private dataService: DataService,
              private modalCtrl: ModalController) { 
    this.pinForm = this.formBuilder.group({
      numeroPin: ['', Validators.compose([
        Validators.required,
       // Validators.pattern('[0-9]+')
      ])]
    });
  }

  async ngOnInit() {
    await this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
      }
    });

    this.dataLocal.getLogin().then((resp: DETALLEUSUARIO) => {
      this.usuarioId = resp.idUsuario;
    });
  }


  validarCampo(event) {
    switch (event){
      case 'numeroPin': {
        if (this.pinForm.value.numeroPin !== ''){
          this.isPinValido = this.pinForm.controls.numeroPin.invalid;
        }
        break;
      }
    }
  }

  validarCampoChange(event){
    switch (event){
      case 'numeroPin': {
        if (this.pinForm.value.numeroPin === ''){
          this.isPinValido = false;
        }
        break;
      }
    }
  }

  onClickRegistrar() {
    this.utilService.showLoading();
    const request = {
      strPeticion: JSON.stringify({
        usuarioId: this.usuarioId,
        numeroPin: this.pinForm.value.numeroPin
      })
    };

    console.log(request);

    this.dataService.registrarBoleta(request)
      .then( resp => {
        // console.log (resp);
        this.utilService.dissmisLoading();
        this.modalCtrl.dismiss(true);
      })
      .catch( resp => {
        // console.log(resp);
        this.utilService.dissmisLoading();
        this.utilService.showAlert('Algo salio mal', resp);
      });
  }
}
