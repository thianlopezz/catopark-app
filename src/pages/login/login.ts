import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  model: any = {};
  desdeTabs;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private loginProvider: LoginProvider) {
      
  }

  ionViewDidLoad() {
  }

  login() {

    if (!this.model.usuario || this.model.usuario.trim().length === 0
      || !this.model.contrasena || this.model.contrasena.trim().length === 0) {

      this.showToast('Completa todos los campos para iniciar sesión');
      return;
    }

    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión...'
    });

    loading.present();

    this.loginProvider.login(this.model)
      .subscribe(result => {

        loading.dismiss();

        if (result.success) {
          this.navCtrl.setRoot(TabsPage);
        } else {

          this.showAlert(false, result.mensaje);
        }
      },
        error => {

          this.showAlert(false, 'Revisa que tengas una conexión a internet activa.');
          console.log(error);
        });
  }

  showAlert(success: boolean, mensaje: string) {

    let titulo = '';
    if (success) {
      titulo = 'Éxito';
    } else {
      titulo = 'Error';
    }

    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
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
