import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { NotificacionesProvider } from '../../providers/notificaciones/notificaciones';

@Component({
  selector: 'page-notificacion-form',
  templateUrl: 'notificacion-form.html',
})
export class NotificacionFormPage {

  paso = 1;

  placa: string = '';

  model: any = {};

  vehiculos: any[] = [];
  vehiculosFiltrados = [];

  vehiculo: any = {};

  ocupantesFormat: string = '';

  constructor(params: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private notificacionProvider: NotificacionesProvider) {
    this.paso = 1;
    this.vehiculos = params.get('vehiculos');
  }

  onSelect(vehiculo) {
    this.model.idVehiculo = vehiculo.idVehiculo;
    this.vehiculo = vehiculo;

    this.ocupantesFormat = vehiculo.ocupantes.map(ocupante => ocupante.correo).join(', ')
  }

  onSiguiente() {
    this.paso = 2;
  }

  enviarNotificacion() {

    if (this.model.notificacion && this.model.notificacion.trim() === ''){
      this.showToast('Debes llenar el mensaje.')
      return;
    }

    let loading = this.loadingCtrl.create({
      content: 'Enviando...'
    });

    loading.present();

    this.model.accion = 'I';
    this.model.placa = this.vehiculo.placa;
    this.model.tipoVehiculo = this.vehiculo.tipoVehiculo;
    this.model.correos = this.ocupantesFormat.replace(',', ';');

    this.notificacionProvider.mantenimiento(this.model)
      .subscribe(result => {

        loading.dismiss();
        if(result.success) {
          this.showToast('Notificación enviada.');
          this.viewCtrl.dismiss();
        } else {
          this.showToast('Ocurrió un error inténtalo más tarde.');
        }
      },
        error => {
          loading.dismiss();
          this.showToast('Revisa que tengas una conexión a internet activa.');
        });
  }

  onInputSearch(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.vehiculosFiltrados = this.vehiculos.filter((vehiculo) => {
        return (vehiculo.placa.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  showToast(mensaje: string) {

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      // showCloseButton: true,
      // closeButtonText: 'Ok'
    });

    toast.present(toast);
  }

  // onInputSearch(text) {

  //   this.vehiculosFiltrados = this.vehiculos.filter(x => {

  //     const index = x.placa.indexOf(text);
  //     if (index === -1) {
  //       return false;
  //     }

  //     return true;
  //   });
  //   debugger;
  // }

}
