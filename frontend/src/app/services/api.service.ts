import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Placeholder function (when backend is ready)
  getCars(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cars`);
  }
}
