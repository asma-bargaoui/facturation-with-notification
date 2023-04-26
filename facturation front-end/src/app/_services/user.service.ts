import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8060/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  date_signature: any;
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  
  deleteUser(username: string): Observable<any> {
    const url = `${API_URL}delete/${username}`;
    return this.http.delete(url);
  }
  
  registerapp(code: string, libelle: string, sujet: string, prix:number): Observable<any> {
    const url = `${API_URL}applications/createapp`;
    return this.http.post(url, {
      code,
      libelle,
      sujet,
      prix
    });
  }

  deleteApp(id: number): Observable<any> {
    const url = `${API_URL}applications/deleteapp/${id}`;
    return this.http.delete(url);
  }

  createConvention(convensionDuration:BigInteger,applicationCode: string, structure_id: string, nbr_reel: number, total_amount: number, nbr_min: string, nbr_max: string,date_signature :Date): Observable<any> {
    const url = `${API_URL}convensions`;
    return this.http.post(url, {
      applicationCode,
      structure_id,
      nbr_reel,
      date_signature,
      total_amount,
      nbr_min,
      nbr_max,
      convensionDuration,
    });
  }
  
  }



