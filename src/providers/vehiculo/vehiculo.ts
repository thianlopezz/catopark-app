import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalConfigProvider } from '../global-config/global-config';

@Injectable()
export class VehiculoProvider {

  constructor(private http: Http,
    private globalConfig: GlobalConfigProvider) { }

  getAll() {

    const parker = JSON.parse(localStorage.getItem('parker'));

    const param = encodeURIComponent('<params accion="C" />');
    return this.http.get(this.globalConfig.getUrlBase() + '/api/vehiculos/all/' + param, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {

    const parker = JSON.parse(localStorage.getItem('parker'));

    if (parker && parker.token) {
      const headers = new Headers({ 'x-access-token': parker.token });
      return new RequestOptions({ headers: headers });
    }
  }

}
