import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { LoginProvider } from '../providers/login/login';
import { GlobalConfigProvider } from '../providers/global-config/global-config';
import { SessionProvider } from '../providers/session/session';
import { HttpModule } from '@angular/http';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { NotificacionesProvider } from '../providers/notificaciones/notificaciones';
import { VehiculoProvider } from '../providers/vehiculo/vehiculo';
import { NotificacionFormPage } from '../pages/notificacion-form/notificacion-form';
import { UsuarioPage } from '../pages/usuario/usuario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NotificacionesPage,
    TabsPage,
    LoginPage,
    NotificacionFormPage,
    UsuarioPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NotificacionesPage,
    TabsPage,
    LoginPage,
    NotificacionFormPage,
    UsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    GlobalConfigProvider,
    SessionProvider,
    NotificacionesProvider,
    VehiculoProvider
  ]
})
export class AppModule { }
