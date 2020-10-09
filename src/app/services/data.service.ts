import { Injectable } from '@angular/core';
import { Pais, Menu, Evento, Slide, Categoria, ConfiguracionEmpresa, RespuestaServidor, EVENTODISPONIBLE } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataLocalService } from './data-local.service';
import jwt_decode from 'jwt-decode';

const URL = environment.url;
const NIT_EMPRESA = environment.nitEmpresa;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions: any;
  constructor(private http: HttpClient,
              private dataLocal: DataLocalService) {
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
  };
  }

  getConfiguracion() {
    /*this.http.get<ConfiguracionEmpresa>('/assets/data/configuracion.json')
        .subscribe( resp => {
          this.dataLocal.guardarConfiguracion(resp);
        });*/

    const empresa = {
      strPeticion: JSON.stringify({
        nitEmpresa: NIT_EMPRESA
      })};

    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/configuracion/consultarConfiguracion`,
                      empresa,
                      { headers: this.httpOptions }).subscribe( resp => {
                        let strRespuesta: RespuestaServidor;
                        strRespuesta = JSON.parse(resp['strRespuesta']);
                        console.log(strRespuesta);
                        if (strRespuesta.codigoRespuesta === '0'){
                          resolve(strRespuesta.respuesta);
                        //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                        }else {
                          reject(strRespuesta.mensajeRespuesta);
                        }
                      });
    });
  }

  loginUsuario(login: string, password: string) {
    const request = {
      strPeticion: JSON.stringify({
        usuarioLogin: login,
        usuarioContrasena: password
      })};

    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/cliente/login`,
                      request,
                      { headers: this.httpOptions }).subscribe( (strRespuesta: RespuestaServidor) => {
                        console.log(strRespuesta);
                        if (strRespuesta.codigoRespuesta === '0'){
                          const decoded = jwt_decode(strRespuesta.respuesta);
                          resolve(decoded);
                          // this.dataLocal.setLogin(decoded.sub);
                          this.getObtenerDetalleUsuario(decoded.sub);
                        }else {
                          reject(strRespuesta.mensajeRespuesta);
                        }
                      });
    });
  }

  crearUsuario(request: any) {
    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/cliente/crearCliente`,
                      request,
                      { headers: this.httpOptions }).subscribe( (strRespuesta: RespuestaServidor)  => {
                        console.log(strRespuesta);
                        if (strRespuesta.codigoRespuesta === '0'){
                          resolve(strRespuesta.respuesta);
                          this.dataLocal.setLogin(strRespuesta.respuesta);
                        //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                        }else {
                          reject(strRespuesta.mensajeRespuesta);
                        }
                      });
    });
  }

  getObtenerDetalleUsuario(usuario: any) {
    const request = {
      strPeticion: JSON.stringify({
        nombreUsuario: usuario
      })};

    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/cliente/obtenerDetalleUsuarioPorNombre`,
                      request,
                      { headers: this.httpOptions }).subscribe( (strRespuesta: RespuestaServidor)  => {
                        console.log(strRespuesta);
                        if (strRespuesta.codigoRespuesta === '0'){
                          resolve(strRespuesta.respuesta);
                          this.dataLocal.setLogin(strRespuesta.respuesta);
                        //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                        }else {
                          reject(strRespuesta.mensajeRespuesta);
                        }
                      });
    });
  }

  getTipoDocumentos(){
    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/datos/obtenerTiposDeDocumentos`,
                      { headers: this.httpOptions }).subscribe( (strRespuesta: RespuestaServidor) => {
                        console.log(strRespuesta);
                        if (strRespuesta.codigoRespuesta === '0'){
                          resolve(strRespuesta.respuesta);
                        //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                        }else {
                          reject(strRespuesta.mensajeRespuesta);
                        }
                      });
    });
  }

  getEventosDisponibles(){
    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/portal/eventos/obtenerEventosDisponibles`,
                      { headers: this.httpOptions }).subscribe( (strRespuesta: RespuestaServidor) => {
                        if (strRespuesta.codigoRespuesta === '0'){
                          resolve(strRespuesta.respuesta);
                        }else {
                          reject(strRespuesta.mensajeRespuesta);
                        }
                      });
    });
  }

  getEventoPorId(idEvento: string){
    const request = {
      strPeticion: JSON.stringify({
        eventoId: idEvento
      })};

    return new Promise( (resolve, reject) => {
      this.http.post(`${URL}/portal/eventos/obtenerEventosPorId`,
                      request,
                      { headers: this.httpOptions }).subscribe( (strRespuesta: RespuestaServidor) => {
                        console.log(strRespuesta);
                        if (strRespuesta.codigoRespuesta === '0'){
                          resolve(strRespuesta.respuesta);
                        //  this.dataLocal.guardarConfiguracion(strRespuesta.configuracionEmpresa);
                        }else {
                          reject(strRespuesta.mensajeRespuesta);
                        }
                      });
    });
  }

  /** SIMULADO */
  getMenuOpts() {
    return this.http.get<Menu[]>('/assets/data/menu.json');
  }

  getPaises() {
    return this.http.get<Pais[]>('/assets/data/paises.json');
  }

  getEventos() {
    return this.http.get<Evento[]>('/assets/data/eventos.json');
  }

  getSlides() {
    return this.http.get<Slide[]>('/assets/data/slide.json');
  }

  getCategorias() {
    return this.http.get<Categoria[]>('/assets/data/categorias.json');
  }
}
