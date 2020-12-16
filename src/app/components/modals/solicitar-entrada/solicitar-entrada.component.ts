import { Component, OnInit } from '@angular/core';
import { GENERAL, BOTONES, TIPODOCUMENTO } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { UtilidadesService } from '../../../services/utilidades.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-solicitar-entrada',
  templateUrl: './solicitar-entrada.component.html',
  styleUrls: ['./solicitar-entrada.component.scss'],
})
export class SolicitarEntradaComponent implements OnInit {

  expandedDatosUsuario = true;
  expandedCodigoQr = false;
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

  listTipoDocumento: TIPODOCUMENTO[] = [];
  isTipoDocumentoValido = false;
  isNumeroDocumentoValido = false;
  solicitarForm: FormGroup;
  constructor(private dataLocal: DataLocalService,
              private formBuilder: FormBuilder,
              private dataService: DataService,
              private utilService: UtilidadesService,
              private modalCtrl: ModalController) {
    this.solicitarForm = this.formBuilder.group({
      tipoDocumento: ['', Validators.compose([
        Validators.required,
      ])],
      numeroDocumento: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
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

    this.dataService.getTipoDocumentos().then( (resp: TIPODOCUMENTO[]) => {
      this.listTipoDocumento = resp;
    });
  }

  onClickExpandDatosUsuario(){
    this.expandedDatosUsuario =  !this.expandedDatosUsuario;
    this.expandedCodigoQr = false;
  }

  onClickExpandCodigoQr(){
    this.expandedCodigoQr =  !this.expandedCodigoQr;
    this.expandedDatosUsuario = false;
  }

  validarCampo(event) {
    switch (event){
      case 'tipoDocumento': {
        if (this.solicitarForm.value.tipoDocumento !== ''){
          this.isTipoDocumentoValido = this.solicitarForm.controls.tipoDocumento.invalid;
        }
        break;
      }
      case 'numeroDocumento': {
        if (this.solicitarForm.value.numeroDocumento !== ''){
          this.isNumeroDocumentoValido = this.solicitarForm.controls.numeroDocumento.invalid;
        }
        break;
      }
    }
  }

  validarCampoChange(event){
    switch (event){
      case 'tipoDocumento': {
        if (this.solicitarForm.value.tipoDocumento === ''){
          this.isTipoDocumentoValido = false;
        }
        break;
      }
      case 'numeroDocumento': {
        if (this.solicitarForm.value.numeroDocumento === ''){
          this.isNumeroDocumentoValido = false;
        }
        break;
      }
    }
  }

  onClickSolicitar() {
    this.utilService.showLoading();
    const request = {
      strPeticion: JSON.stringify({
        documento: this.solicitarForm.value.numeroDocumento,
        tipoDocumento: this.solicitarForm.value.tipoDocumento,
      })
    };

    console.log(request);

    this.dataService.solicitarBoleta(request)
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
