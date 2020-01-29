import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Observable } from 'rxjs';
import { Produit } from '../models/produits';
import { User } from '../models/user';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http:HttpClient) { }
    public getProduits () : Observable<Produit[]> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        })
      };
      return this.http.get<Produit[]>(environment.backendProduit, httpOptions);
    }
    public getProduit(id:number) : Observable<Produit[]> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        })
      };
      return this.http.get<Produit[]>(environment.backendProduit, httpOptions).pipe(map(p => p.filter(p=>p.id == +id)));
    }
    public postRegister(user:User) : Observable<User>{
      return this.http.post<User>(environment.register, user);  
    }
    public postLogin(user:User) : Observable<any>{
      return this.http.post(environment.login, {"email":user.email,"mdp":user.mdp});
    }
}