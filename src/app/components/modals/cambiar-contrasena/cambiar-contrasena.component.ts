import { Component, OnInit, Input } from '@angular/core';
import { GENERAL, BOTONES } from '../../../interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UtilidadesService } from '../../../services/utilidades.service';
import { DataLocalService } from '../../../services/data-local.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss'],
})
export class CambiarContrasenaComponent implements OnInit {

  marca = 'Marca blanca';
  isLogueado = false;
  descripcion = 'Crear una cuenta te permite acceder a descuentos especiales, enterarse de futuros eventos antes que otras personas y facilita tu proceso de compra.';
  @Input() correo: string;
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

  cambiarForm: FormGroup;
  isPasswordValido = false;
  isPasswordValidoNuevo = false;
  isPasswordValidoConfirmar = false;
  constructor(private modalCtlr: ModalController,
              private utilService: UtilidadesService,
              private formBuilder: FormBuilder,
              private dataLocal: DataLocalService,
              private dataService: DataService) {
    this.cambiarForm = this.formBuilder.group({
      contrasenaActual: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9\s]{6,10}$')
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      contrasenaNueva: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9\s]{6,10}$')
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      contrasenaConfirmar: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9\s]{6,10}$')
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
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

  onClickCambiarContrasena() {
    this.utilService.showLoading();
    const request = {
      strPeticion: JSON.stringify({
        correo: this.correo,
        claveAnterior: this.cambiarForm.value.contrasenaActual,
        claveNueva: this.cambiarForm.value.contrasenaNueva,
      })
    };

    this.dataService.cambiarClave(request)
        .then( (resp: string) => {
          this.utilService.dissmisLoading();
          this.utilService.showAlert('', resp);
          this.modalCtlr.dismiss(
            true
          );
          // this.router.navigateByUrl('/home', { skipLocationChange: true });
        }).catch( resp => {
          this.utilService.dissmisLoading();
          this.utilService.showAlert('Algo salio mal', resp);
        });
  }

  validarCampo(event) {
    if (event === 'contrasenaActual') {
      if (this.cambiarForm.value.contrasenaActual !== ''){
        this.isPasswordValido = this.cambiarForm.controls.contrasenaActual.invalid;
      }
    }else if (event === 'contrasenaNueva'){
      if (this.cambiarForm.value.contrasenaNueva !== ''){
        this.isPasswordValidoNuevo = this.cambiarForm.controls.contrasenaNueva.invalid;
      }
      this.validarCampo('contrasenaConfirmar');
    }else {
      if (this.cambiarForm.value.contrasenaConfirmar !== ''){
        if (this.cambiarForm.value.contrasenaNueva === this.cambiarForm.value.contrasenaConfirmar){
          this.isPasswordValidoConfirmar = false;
        } else {
          this.isPasswordValidoConfirmar = true;
        }
      }
    }
  }

  validarCampoChange(event){
    if (event === 'contrasenaActual') {
      if (this.cambiarForm.value.contrasenaActual === ''){
        this.isPasswordValido = false;
      }
    }else if (event === 'contrasenaNueva') {
      if (this.cambiarForm.value.contrasenaNueva === ''){
        this.isPasswordValidoNuevo = false;
      }
    }else {
      if (this.cambiarForm.value.contrasenaConfirmar === ''){
        this.isPasswordValidoConfirmar = false;
      }
    }
  }
}
