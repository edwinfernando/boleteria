import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BOTONES, GENERAL, TIPODOCUMENTO } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { UtilidadesService } from '../../../services/utilidades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.scss'],
})
export class RegistrateComponent implements OnInit {

  @Input() modalPadre: ModalController;
  marca = 'Marca blanca';
  terminosHtml = {
    texto : 'Autorizo el tratamiento de mis datos personales conforme a la política de protección de datos personales.',
    links: [{
      palabra: 'política de protección de datos personales',
      link: 'https://www.google.com'
    }]
  };

  terminos = '';

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

  registroForm: FormGroup;
  listTipoDocumento: TIPODOCUMENTO[] = [];

  isNombreValido = false;
  isApellidoValido = false;
  isTipoDocumentoValido = false;
  isNumeroDocumentoValido = false;
  isConfirCorreoValido = false;
  isCorreoValido = false;
  isCelularValido = false;
  isContrasenaValido = false;
  constructor(private modalCtlr: ModalController,
              private dataLocal: DataLocalService,
              private dataService: DataService,
              private formBuilder: FormBuilder,
              private utilService: UtilidadesService,
              private router: Router) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZñÑ \s]*')
      ])],
      apellido: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZñÑ \s]*')
      ])],
      tipoDocumento: ['', Validators.compose([
        Validators.required,
      ])],
      numeroDocumento: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+')
      ])],
      correo: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),
        Validators.email
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      confirmarCorreo: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),
        Validators.email
      ])],
      celular: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9\s]{10}$')
      ])],
      contrasena: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9\s]{6,10}$')
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      checkTerminos: [false, Validators.compose([
        Validators.required,
        Validators.requiredTrue
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])]
    });
  }

  ngOnInit() {
    console.log(this.modalPadre);
    this.dataLocal.cargarConfiguracion().then( resp => {
      if ( resp.ESTILOS !== undefined) {
        this.estiloGeneral = resp.ESTILOS.GENERAL;
        this.estiloBotones = resp.ESTILOS.BOTONES;
        this.marca = resp.MARCA;
      }
    });

    this.terminos = this.utilService.funTransformTextToHTML(this.terminosHtml);

    this.dataService.getTipoDocumentos().then( (resp: TIPODOCUMENTO[]) => {
      this.listTipoDocumento = resp;
    });
  }

  closeModal() {
    this.modalCtlr.dismiss(
      false
    );
    this.modalPadre.dismiss(false);
  }

  onClickRegistrate() {
    this.utilService.showLoading();
    if (this.registroForm.value.correo === this.registroForm.value.confirmarCorreo){
      const request = {
        strPeticion: JSON.stringify({
          documento: this.registroForm.value.numeroDocumento,
          tipoDocumento: this.registroForm.value.tipoDocumento,
          primerNombre: this.registroForm.value.nombre,
          segundoNombre: '',
          primerApellido: this.registroForm.value.apellido,
          segundoApellido: '',
          celular: this.registroForm.value.celular,
          correo: this.registroForm.value.correo,
          idPersona: '',
          // telefono: '',
          fechaNacimiento: '',
          usuarioContrasena: this.registroForm.value.contrasena
        })
      };

      this.dataService.crearUsuario(request, this.registroForm.value.correo)
        .then( resp => {
          // console.log (resp);
          this.utilService.dissmisLoading();
          this.modalCtlr.dismiss(true);
          this.modalPadre.dismiss(true);
         // this.router.navigateByUrl('/home', { skipLocationChange: true });
        })
        .catch( resp => {
          console.log(resp);
          this.utilService.dissmisLoading();
          this.utilService.showAlert('Algo salio mal', resp);
        });
    } else {
      console.log('');
      this.utilService.dissmisLoading();
    }
  }

  validarCampo(event) {
    switch (event){
      case 'nombre': {
        if (this.registroForm.value.nombre !== ''){
          this.isNombreValido = this.registroForm.controls.nombre.invalid;
        }
        break;
      }
      case 'apellido': {
        if (this.registroForm.value.apellido !== ''){
          this.isApellidoValido = this.registroForm.controls.apellido.invalid;
        }
        break;
      }
      case 'tipoDocumento': {
        if (this.registroForm.value.tipoDocumento !== ''){
          this.isTipoDocumentoValido = this.registroForm.controls.tipoDocumento.invalid;
        }
        break;
      }
      case 'numeroDocumento': {
        if (this.registroForm.value.numeroDocumento !== ''){
          this.isNumeroDocumentoValido = this.registroForm.controls.numeroDocumento.invalid;
        }
        break;
      }
      case 'correo': {
        if (this.registroForm.value.correo !== ''){
          this.isCorreoValido = this.registroForm.controls.correo.invalid;
        }
        this.validarCampo('confirmarCorreo');
        break;
      }
      case 'confirmarCorreo': {
        if (this.registroForm.value.confirmarCorreo !== ''){
          if (this.registroForm.value.correo === this.registroForm.value.confirmarCorreo){
            this.isConfirCorreoValido = false;
          } else {
            this.isConfirCorreoValido = true;
          }
        }
        break;
      }
      case 'celular': {
        if (this.registroForm.value.celular !== ''){
          this.isCelularValido = this.registroForm.controls.celular.invalid;
        }
        break;
      }
      case 'contrasena': {
        if (this.registroForm.value.contrasena !== ''){
          this.isContrasenaValido = this.registroForm.controls.contrasena.invalid;
        }
        break;
      }
    }
  }

  validarCampoChange(event){
    switch (event){
      case 'nombre': {
        if (this.registroForm.value.nombre === ''){
          this.isNombreValido = false;
        }
        break;
      }
      case 'apellido': {
        if (this.registroForm.value.apellido === ''){
          this.isApellidoValido = false;
        }
        break;
      }
      case 'tipoDocumento': {
        if (this.registroForm.value.tipoDocumento === ''){
          this.isTipoDocumentoValido = false;
        }
        break;
      }
      case 'numeroDocumento': {
        if (this.registroForm.value.numeroDocumento === ''){
          this.isNumeroDocumentoValido = false;
        }
        break;
      }
      case 'correo': {
        if (this.registroForm.value.correo === ''){
          this.isCorreoValido = false;
        }
        break;
      }
      case 'confirmarCorreo': {
        if (this.registroForm.value.confirmarCorreo === ''){
          this.isConfirCorreoValido = false;
        }
        break;
      }
      case 'celular': {
        if (this.registroForm.value.celular === ''){
          this.isCelularValido = false;
        }
        break;
      }
      case 'contrasena': {
        if (this.registroForm.value.contrasena === ''){
          this.isContrasenaValido = false;
        }
        break;
      }
    }
  }
}
