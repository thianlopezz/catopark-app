import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { VehiculoProvider } from '../../providers/vehiculo/vehiculo';
import { NotificacionFormPage } from '../notificacion-form/notificacion-form';
import { NotificacionesProvider } from '../../providers/notificaciones/notificaciones';

@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {

  loading;

  vehiculos = [];

  notificaciones = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private vehiculoProvider: VehiculoProvider,
    private notificacionProvider: NotificacionesProvider) {
  }

  ionViewDidLoad() {
    this.getNotificaciones();
    this.getVehiculos();
  }

  nuevaNotificacion() {
    let notificacionModal = this.modalCtrl.create(NotificacionFormPage, { vehiculos: this.vehiculos });
    notificacionModal.onDidDismiss(() => {
      this.getNotificaciones();
    });

    notificacionModal.present();
  }

  getNotificaciones() {

    this.loading = true;

    this.notificacionProvider.getNotificaciones()
      .subscribe(result => {

        this.loading = false;

        if (result.success) {
          debugger;
          this.notificaciones = result.data
        } else {
          this.showToast('Ocurrió un error al cargar los vehículos.');
        }
      },
        error => {
          this.showToast('Revisa que tengas una conexión a internet activa.');
        })
  }

  getVehiculos() {
    this.vehiculoProvider.getAll()
      .subscribe(result => {
        if (result.success) {
          this.vehiculos = result.data;
        } else {
          this.showToast('Ocurrió un error al cargar los vehículos.');
          console.log(result.error);
        }
      },
        error => {
          this.showToast('Revisa que tengas una conexión a internet activa.');
          console.log(error);
        });
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

}
