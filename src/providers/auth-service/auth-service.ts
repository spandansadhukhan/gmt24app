import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {  Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';
//import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { Config } from './../../config';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  apiUrl = Config.baseUrl;
  constructor(
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }
  public details ;
  postData(credentials, type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    //console.log(credentials);
    //console.log(type);
    return new Promise((resolve, reject) => {
     // let headers = new Headers();

      this.http.post(this.apiUrl + type, JSON.stringify(credentials))
        .subscribe(res => {
          //console.log(res);
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          //console.log(err);
          reject(err);
          loading.dismiss();
        });
    });

  }

  signup(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'userSignup',data).map((res:Response)=>{
      return res.json();
    });
  }

  countrylist(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'listcountry',data).map((res:Response)=>{
      return res.json();
    });
  }

  satelist(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'liststate',data).map((res:Response)=>{
      return res.json();
    });
  }

  otpverify(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'tomobileverifying',data).map((res:Response)=>{
      return res.json();
    });
  }

  login(data: object): Observable<any> {
    console.log(data);
    return this.http.post(this.apiUrl +'userLogin', data).map((res: Response) => {
      return res.json();
    });
  }

  resendotp(data: object): Observable<any> {
    console.log('spandan',data);
    return this.http.post(this.apiUrl +'resend_app', data).map((res: Response) => {
      return res.json();
    });
  }

  forgetpass(data: object): Observable < any > {
    console.log(data);
    let requestforgetoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'users/apiforgot_password',
      body: JSON.stringify(data)
    });
    console.log(requestforgetoptions);
    return this.http.request(new Request(requestforgetoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
   }

   getdetails(data: object): Observable<any> {
    let requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'userprofile',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
    
  }

  updateprofile(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'updateProfile_app', data).map((res: Response) => {
      return res.json();
    });
  }
 
  changepass(data: object): Observable<any> {
    
    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'changepassword',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }

  productadd(data: object): Observable<any> {
    
    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'addProductNew_app',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }
  
  /*productadd(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'addProductNew_app',data).map((res:Response)=>{
      return res.json();
    });
  }*/


  getData(type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    //console.log(type);
    return new Promise((resolve, reject) => {
      //let headers = new Headers();

      this.http.get(this.apiUrl + type)
        .subscribe(res => {
          //let details = res;
          //console.log(details);
          //console.log(res);
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          console.log(err);
          reject(err);
          loading.dismiss(); 
        });
    });

  }



  removeimage(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'removeImage_app', data).map((res: Response) => {
      return res.json();
    });
  }

  

  
}
