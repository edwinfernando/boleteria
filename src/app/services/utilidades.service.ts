import { Injectable } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertaComponent } from '../components/modals/alerta/alerta.component';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(private loadingCtrl: LoadingController,
              private modalCtrl: ModalController) { }

  async showAlert(titulo: string, mensaje: string) {
    const modal = await this.modalCtrl.create({
      component: AlertaComponent,
      cssClass: 'modal-class-alerta',
      componentProps: {
        titulo,
        mensaje
      },
      mode: 'ios'
    });

    await modal.present();
    modal.onDidDismiss();
  }

  formatearNumeroMonedaDecimas(valor: any) {
    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
    let valorFormato: any;
    if (valor !== '') {
      valorFormato = numberFormat.format(valor);
      valorFormato = valorFormato.split('.');
      valorFormato = valorFormato[0].replace(',', '.'); // + ',' + valorFormato[1];
    }
    return valorFormato;
  }

 /* compartir() {
    this.socialShare.share('Esto es Woaho');
  }*/

  maskString(inputTxt) {
    inputTxt = this.maskInputString(inputTxt);
    inputTxt = inputTxt[inputTxt.length - 1];
    return inputTxt;
  }

  maskInputString(inputTxt) {
    inputTxt = inputTxt.replace(/\D/g, '');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    inputTxt = inputTxt.replace(/(\d{4})(\d)/, '$1 $2');
    return inputTxt;
  }

  maskInputFecha(inputTxt){
    if (inputTxt !== ''){
      if (inputTxt === '00'){
        return '';
      } else {
        if (inputTxt !== '0' && inputTxt !== '1' && inputTxt.length < 2){
          inputTxt = '0' + inputTxt + '/';
          inputTxt = inputTxt.replace(/(\d{2})(\d)/, '$1/$2');
        }
        // inputTxt = inputTxt.replace(/\D/g, '');
        inputTxt = inputTxt.replace(/(\d{2})(\d)/, '$1/$2');
        inputTxt = inputTxt.replace(/(\d{2})(\d)/, '$1 $2');
      }

      return inputTxt;
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      mode: 'ios',
      translucent: true,
     // message: this.loadingText
    });

    loading.present();
  }

  dissmisLoading(){
    this.loadingCtrl.dismiss();
  }

  funTransformTextToHTML(terminos: any){
    const texto = terminos.texto;
    const links = terminos.links;
    const cadenaSplit = texto.split('.');
    let terminosHtml = '';
    let booNumber = false;

    console.log(terminos);

    for (let cadena of cadenaSplit) {
      if (cadena !== '') {

        if (cadena.length < 3){
          terminosHtml += '<h5>' + cadena + '.';
          booNumber = true;
        } else {
          if (!booNumber) {
            terminosHtml += '<h5>';
            booNumber = true;
          }
          for (const link of links) {
            if (cadena.includes(link.palabra)) {
              cadena = cadena.replace(link.palabra, '<a href=' + link.link + ' target="_blank">' + link.palabra + '</a>');
              }
          }
          terminosHtml += cadena;

          if (booNumber) {
            terminosHtml += '.</h5>';
            booNumber = false;
          }
        }
      }
    }

    return terminosHtml;
  }
}
