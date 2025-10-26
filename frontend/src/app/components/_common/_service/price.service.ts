// price.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

export interface PriceRequest {
  carGroupName: string;
  checkOutDate: string;
  expectedCheckInDate: string;
}

export interface PriceResponse {
  netPrice: number;
  grossPrice: number;
  taxRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  constructor(private http: HttpClient) {}

  calculatePrice(payload: PriceRequest): Observable<PriceResponse> {
    return this.http.post<PriceResponse>(`${environment.apiUrl}/price`, payload);
  }
}
