import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BOTONES, GENERAL, TIPODOCUMENTO } from '../../../interfaces/interfaces';
import { DataLocalService } from '../../../services/data-local.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { UtilidadesService } from '../../../services/utilidades.service';
import { ModalService } from '../../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.scss'],
})
export class RegistrateComponent implements OnInit {

  marca = 'Marca blanca';
  terminosHtml = {
    texto : 'Autorizo el tratamiento de mis datos personales conforme a la política de protección de datos personales.',
    links: [{
      palabra: 'política de protección de datos personales',
      link: ''
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
  isConfirDocumentoValido = false;
  isCorreoValido = false;
  isCelularValido = false;
  isContrasenaValido = false;
  constructor(private modalCtlr: ModalController,
              private modalService: ModalService,
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
        Validators.pattern('[0-9\s]{10}$')
      ])],
      confirmarDocumento: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9\s]{10}$')
      ])],
      correo: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      celular: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9\s]{10}$')
      ])],
      contrasena: ['', Validators.compose([
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      checkTerminos: [false, Validators.compose([
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
      }
    });

    this.terminos = this.utilService.funTransformTextToHTML(this.terminosHtml);

    this.dataService.getTipoDocumentos().then( (resp: TIPODOCUMENTO[]) => {
      this.listTipoDocumento = resp;
    });
  }

  closeModal() {
    this.modalCtlr.dismiss();
  }

  onClickRegistrate() {
    if (this.registroForm.value.numeroDocumento === this.registroForm.value.confirmarDocumento){
      const request = {
        strPeticion: JSON.stringify({
          documento: this.registroForm.value.numeroDocumento,
          tipoDocumento: this.registroForm.value.tipoDocumento,
          nombres: this.registroForm.value.nombre,
          apellidos: this.registroForm.value.apellido,
          celular: this.registroForm.value.celular,
          correo: this.registroForm.value.correo,
          idPersona: '',
          // telefono: '',
          // fechaNacimiento: '',
          usuarioContrasena: this.registroForm.value.contrasena
        })
      };

      console.log (request);
      this.dataService.crearUsuario(request)
        .then( resp => {
          console.log (resp);
          this.modalCtlr.dismiss();
          this.router.navigateByUrl('/home', { skipLocationChange: true });
        })
        .catch( resp => {
          console.log(resp);
          this.modalService.showAlert('Algo salio mal', resp);
        });
    } else {
      console.log('');
    }
  }

  validarCampo(event) {
    switch (event){
      case 'nombre': {
        this.isNombreValido = this.registroForm.controls.nombre.invalid;
        break;
      }
      case 'apellido': {
        this.isApellidoValido = this.registroForm.controls.apellido.invalid;
        break;
      }
      case 'tipoDocumento': {
        this.isTipoDocumentoValido = this.registroForm.controls.tipoDocumento.invalid;
        break;
      }
      case 'numeroDocumento': {
        this.isNumeroDocumentoValido = this.registroForm.controls.numeroDocumento.invalid;
        break;
      }
      case 'confirmarDocumento': {
        if (this.registroForm.value.numeroDocumento === this.registroForm.value.confirmarDocumento){
          this.isConfirDocumentoValido = false;
        } else {
          this.isConfirDocumentoValido = true;
        }
        break;
      }
      case 'correo': {
        this.isCorreoValido = this.registroForm.controls.correo.invalid;
        break;
      }
      case 'celular': {
        this.isCelularValido = this.registroForm.controls.celular.invalid;
        break;
      }
      case 'contrasena': {
        this.isContrasenaValido = this.registroForm.controls.contrasena.invalid;
        break;
      }
    }
  }
}
