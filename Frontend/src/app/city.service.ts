import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseURL = 'https://zany-puce-mite-wear.cyclic.cloud/api/weather';

  constructor(private httpClient: HttpClient) {}

  getCityData(cityName: string): Observable<any> {
    return this.httpClient.get(`${this.baseURL}?city=${cityName}`);
  }
  
  getAllCities(): Observable<any[]> {
    // Assuming your backend API has an endpoint to fetch all cities
    return this.httpClient.get<any[]>(`${this.baseURL}/all`);
 }
 
}
