import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http:HttpClient) { }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe(
              tap( auth => this._auth = auth ),
              tap( auth => localStorage.setItem('token', auth.id) )
            );
  }

  get auth(){
    return {...this._auth}
  }

  // get auth(): Auth {
  //   return { ...this._auth! }
  // }

  verificaAutenticacion():Observable<boolean>/* | boolean*/{
    if( !localStorage.getItem('token') ){
      //return false;
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map( auth => {
        console.log('map', auth);
        this._auth = auth;
        return true;
      } )
    );
    //return of(true);
  }

}
