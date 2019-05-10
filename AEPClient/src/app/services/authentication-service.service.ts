import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    let serviceUrl: string = `${environment.serviceBaseUrl}auth/login`;
    return this.http.get(serviceUrl, { responseType: 'json'});

  }

  getAD(SamAccountName) {
    //  console.log('Calling getUser');
      let serviceUrl: string = `${environment.serviceBaseUrl}auth/getADNameList?SamAccountName=${SamAccountName}`;
      return this.http.get(serviceUrl, { responseType: 'json'});

    }

  saveColor(color) {
    console.log('saveColor=>' + color);
    let serviceUrl: string = `${environment.serviceBaseUrl}auth/saveColor?color=${color}`;
    return this.http.get(serviceUrl, { responseType: 'json'} );
  }

}
