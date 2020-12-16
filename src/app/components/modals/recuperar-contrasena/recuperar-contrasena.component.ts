import { Component, OnInit } from '@angular/core';
import { GENERAL, BOTONES } from '../../../interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UtilidadesService } from '../../../services/utilidades.service';
import { DataLocalService } from '../../../services/data-local.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss'],
})
export class RecuperarContrasenaComponent implements OnInit {

  marca = 'Marca blanca';
  isLogueado = false;
  descripcion = 'Crear una cuenta te permite acceder a descuentos especiales, enterarse de futuros eventos antes que otras personas y facilita tu proceso de compra.';
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

  recuperarForm: FormGroup;
  isCorreoValido = false;
  isNumeroDocumentoValido = false;
  constructor(private modalCtlr: ModalController,
              private utilService: UtilidadesService,
              private formBuilder: FormBuilder,
              private dataLocal: DataLocalService,
              private dataService: DataService) {
    this.recuperarForm = this.formBuilder.group({
      correo: ['', Validators.compose([
        Validators.required,
        // Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])],
      numeroDocumento: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])]
    });
  }

  ngOnInit() {
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
        this.marca = resp.MARCA;
      }
    });
  }

  closeModal() {
    this.modalCtlr.dismiss(
      false
    );
  }

  onClickRecuperar() {
    this.utilService.showLoading();
    const request = {
      strPeticion: JSON.stringify({
        correo: this.recuperarForm.value.correo,
        identificacion: this.recuperarForm.value.numeroDocumento
      })
    };
    this.dataService.recuperarClave(request)
        .then( (resp: string) => {
          this.utilService.dissmisLoading();
          this.modalCtlr.dismiss(
            true
          );
          this.utilService.showAlert('Información', resp);
          // this.router.navigateByUrl('/home', { skipLocationChange: true });
        }).catch( resp => {
          this.utilService.dissmisLoading();
          this.utilService.showAlert('Algo salio mal', resp);
        });
  }

  validarCampo(event) {
    if (event === 'correo') {
      if (this.recuperarForm.value.correo !== ''){
        this.isCorreoValido = this.recuperarForm.controls.correo.invalid;
      }
    }else {
      if (this.recuperarForm.value.numeroDocumento !== ''){
        this.isNumeroDocumentoValido = this.recuperarForm.controls.numeroDocumento.invalid;
      }
    }
  }

  validarCampoChange(event){
    if (event === 'correo') {
      if (this.recuperarForm.value.correo === ''){
        this.isCorreoValido = false;
      }
    }else {
      if (this.recuperarForm.value.numeroDocumento === ''){
        this.isNumeroDocumentoValido = false;
      }
    }
  }
}
