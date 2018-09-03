import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { SessionProvider } from '../../providers/session/session';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  parker: any = {};
  img;

  constructor(public appCtrl: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private sessionProvider: SessionProvider) {
  }

  ionViewDidLoad() {
    // this.getImg();
  }

  ionViewDidEnter() {
    this.parker = this.sessionProvider.getLogin();
  }

  cerrarSesion() {

    let loading = this.loadingCtrl.create({
      content: 'Cerrando sesión...'
    });

    loading.present();

    this.sessionProvider.logout();
    this.appCtrl.getRootNav().setRoot(LoginPage);

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  goLogin() {
    this.appCtrl.getRootNav().push(LoginPage, { desdeTabs: true });
  }

}
