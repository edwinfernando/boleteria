import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BOTONES, GENERAL } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { ModalService } from '../../../services/modal.service';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UtilidadesService } from '../../../services/utilidades.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss'],
})
export class IniciarSesionComponent implements OnInit {

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

  loginForm: FormGroup;
  isCorreoValido = false;
  isPasswordValido = false;
  constructor(private modalCtlr: ModalController,
              private modalService: ModalService,
              private utilService: UtilidadesService,
              private formBuilder: FormBuilder,
              private dataLocal: DataLocalService,
              private dataService: DataService,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      correo: ['', Validators.compose([
        Validators.required,
        // Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')
      ])],
      contrasena: ['', Validators.compose([
        Validators.required,
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

  onClickLogin() {
    this.utilService.showLoading();
    this.dataService.loginUsuario(this.loginForm.value.correo, this.loginForm.value.contrasena)
        .then( resp => {
          this.utilService.dissmisLoading();
          this.modalCtlr.dismiss(
            true
          );
          // this.router.navigateByUrl('/home', { skipLocationChange: true });
        }).catch( resp => {
          this.utilService.dissmisLoading();
          this.utilService.showAlert('Algo salio mal', resp);
        });
  }

  async openModalRecuperarContrasena(){
    const result = await this.modalService.openModalRecuperarContrasena();
    this.modalCtlr.dismiss(result);
  }

  async openModalRegistrate(){
    const result = await this.modalService.openModalRegistrate(this.modalCtlr, true);
    this.modalCtlr.dismiss(result);
  }

  validarCampo(event) {
    if (event === 'correo') {
      if (this.loginForm.value.correo !== ''){
        this.isCorreoValido = this.loginForm.controls.correo.invalid;
      }
    }else {
      if (this.loginForm.value.contrasena !== ''){
        this.isPasswordValido = this.loginForm.controls.contrasena.invalid;
      }
    }
  }

  validarCampoChange(event){
    if (event === 'correo') {
      if (this.loginForm.value.correo === ''){
        this.isCorreoValido = false;
      }
    }else {
      if (this.loginForm.value.contrasena === ''){
        this.isPasswordValido = false;
      }
    }
  }
}
