import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private baseURL = 'https://zany-puce-mite-wear.cyclic.cloud/api/forecast';

  constructor(private httpClient: HttpClient) {}

  getForecastData(cityName: string): Observable<any> {
    return this.httpClient.get(`${this.baseURL}?city=${cityName}`);
  }
  addForecastData(cityName: string, forecast: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}?city=${cityName}`, forecast);
  }

  editForecastData(cityName: string, forecast: any): Observable<any> {
    return this.httpClient.put(`${this.baseURL}?city=${cityName}`, forecast);
  }
}
