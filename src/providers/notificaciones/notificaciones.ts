import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SessionProvider } from '../session/session';
import { GlobalConfigProvider } from '../global-config/global-config';

@Injectable()
export class NotificacionesProvider {

  constructor(public http: Http,
    private sessionProvider: SessionProvider,
    private globalConfig: GlobalConfigProvider) {
  }

  getNotificaciones() {

    const parker = this.sessionProvider.getLogin();
    const params = encodeURIComponent('<params accion="C" idPortero="' + parker.idUsuario +'" />')

    return this.http.get(this.globalConfig.getUrlBase() + '/api/notificaciones/' + params, this.jwt())
      .map((response: Response) => response.json());
  }

  mantenimiento(model) {

    const parker = this.sessionProvider.getLogin();
    model.idPortero = parker.idUsuario;
    model.guardia = parker.nombre;
debugger;
    return this.http.post(this.globalConfig.getUrlBase() + '/api/notificaciones', model, this.jwt())
      .map((response: Response) => response.json());
  }

  private jwt() {

    const parker = this.sessionProvider.getLogin();

    if (parker && parker.token) {
      const headers = new Headers({ 'x-access-token': parker.token });
      return new RequestOptions({ headers: headers });
    }
  }
}

