import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConfigProvider } from '../global-config/global-config';
import { Http, Response } from '@angular/http';
import { SessionProvider } from '../session/session';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginProvider {

  constructor(public http: Http,
    private globalConfig: GlobalConfigProvider,
    private sessionProvider: SessionProvider) {
  }

  login(model: any) {

    return this.http.post(this.globalConfig.getUrlBase() + '/api/login/app', model)
      .map((response: Response) => {

        const _response = response.json();

        if (_response.success) {

          const usuario = _response.usuario;

          if (usuario && usuario.token) {

            this.sessionProvider.login(usuario);
            return _response;
          }
        } else {
          return _response;
        }
      });
  }

  fbLogin(login: any, idUsuario) {

    return this.http.post(this.globalConfig.getUrlBase() + '/api/fbLogin/app/' + idUsuario, login)
      .map((response: Response) => {

        const _response = response.json();

        if (_response.success) {

          const usuario = _response.usuario;

          if (usuario && usuario.token) {

            this.sessionProvider.login(usuario);
            return _response;
          }
        } else {
          return _response;
        }
      });
  }

}
