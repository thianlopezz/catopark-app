import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionProvider {

  constructor(public http: Http) {

  }

  login(usuario: any) {

    localStorage.setItem('parker', JSON.stringify(usuario));
  }

  getLogin() {

    return JSON.parse(localStorage.getItem('parker'));
  }

  logout() {

    localStorage.removeItem('parker');
  }

  getImagenSesion() {

    const parker = this.getLogin();

    if (parker && parker.fbPicture) {

      return this.http.get(parker.fbPicture).map((response: Response) => response.json());
    }
  }

}

