import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConfigProvider {

  public getUrlBase() {
    // return 'http://200.69.184.189:9000'
    // return 'http://localhost:5003';
    return 'https://catopark.herokuapp.com';
  }
}
