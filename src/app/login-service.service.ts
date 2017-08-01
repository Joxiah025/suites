import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  private isUserLoggedIn;

  private authUrl = 'http://localhost/api-suite/login.php';

  constructor(private http: Http) { 
    this.isUserLoggedIn = false;
  }

  getHeroes(): Observable<any> {
    return this.http.get(this.authUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  loggedIn(){
    
    //is logged in
    if(localStorage.getItem('lwUser')){
      return true;
    }
    
    //not logged in
    return false;
    
  }

  loginCheck(login: any): Observable<any> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
 
  return this.http.post(this.authUrl, JSON.stringify({ 'email':login.email,'password':login.password,'login': true }), options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    localStorage.setItem('lwUser', JSON.stringify(body.message));
    return body;
  }
 
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
