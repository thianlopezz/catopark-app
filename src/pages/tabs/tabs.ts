import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { NotificacionesPage } from '../notificaciones/notificaciones';
import { UsuarioPage } from '../usuario/usuario';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NotificacionesPage;
  tab3Root = UsuarioPage;

  constructor() {

  }
}
