import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class FlowserviceService {
  private authUrl = 'http://localhost/api-suite/addflow.php';
  private questUrl = 'http://localhost/api-suite/addquest.php';

  constructor(private http: Http) { }

  addQuestions(login: any): Observable<any> {
  let headers = new Headers({ 'Content-type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  console.log(login);
  return this.http.post(this.questUrl, JSON.stringify(login) , options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  addFlow(login: any): Observable<any> {
  let headers = new Headers({ 'Content-type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  console.log(login);
  return this.http.post(this.authUrl, JSON.stringify(login) , options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
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
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
