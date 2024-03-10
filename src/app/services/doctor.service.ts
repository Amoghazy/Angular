import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDoctor } from '../Models/doctor';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  options;
  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  getAllDoctors(): Observable<IDoctor[]> {
    return this.http.get<IDoctor[]>(`${environment.baseUrl}/doctors`);
  }
}
