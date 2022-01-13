import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../model/User';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  REST_API: string = 'http://localhost:8001/api';

  // Http Header
  httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('x-auth-token', this.tokenStorage.getToken()!);

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  // Add user
  addUser(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/register`;
    return this.httpClient.post(API_URL, data);
  }

  // Get all users
  getAll(): Observable<any> {
    return this.httpClient.get(`${this.REST_API}/`, {
      headers: this.httpHeaders,
    });
  }

  // Get single user
  getUser(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders });
  }

  // Update user
  updateUser(id: string, user: User): Observable<any> {
    let API_URL = `${this.REST_API}/update/${id}`;
    return this.httpClient.put(
      API_URL,
      { user },
      { headers: this.httpHeaders }
    );
  }

  // Delete user
  deleteUser(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/delete/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders });
  }
}
