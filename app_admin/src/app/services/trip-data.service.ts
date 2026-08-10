import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthResponse } from '../models/auth-response';
import { Trip } from '../models/trip';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly tripsUrl = `${this.baseUrl}/trips`;

  constructor(private http: HttpClient) {}

  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  public getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.tripsUrl}/${encodeURIComponent(tripCode)}`
    );
  }

  public addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, trip);
  }

  public updateTrip(tripCode: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.tripsUrl}/${encodeURIComponent(tripCode)}`,
      trip
    );
  }

  public deleteTrip(tripCode: string): Observable<{ message: string; trip: Trip }> {
    return this.http.delete<{ message: string; trip: Trip }>(
      `${this.tripsUrl}/${encodeURIComponent(tripCode)}`
    );
  }

  public login(user: User, password: string): Observable<AuthResponse> {
    const body = new HttpParams()
      .set('email', user.email)
      .set('password', password);

    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  public register(user: User, password: string): Observable<AuthResponse> {
    const body = new HttpParams()
      .set('name', user.name)
      .set('email', user.email)
      .set('password', password);

    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}
