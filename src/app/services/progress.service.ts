// src/app/services/material-tracking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from "../environments/environment";
import {catchError} from "rxjs/operators";
import {SupportDetail} from '../models/SupportDetail';
import {ProgressVO} from '../models/ProgressVO';


@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private apiUrl = environment.apiUrl + '/api/production';

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  constructor(private http: HttpClient) { }

  // Get material items by search criteria
  addProgressDetails(supportDetail: ProgressVO): Observable<ProgressVO> {
    return this.http.post<ProgressVO>(`${this.apiUrl}/createProgress`, supportDetail)
      .pipe(catchError(this.handleError));
  }

  // Update material item
  updateSupportDetails(supportDetail: SupportDetail): Observable<SupportDetail> {
    return this.http.put<any>(`${this.apiUrl}/editSupport`, supportDetail);
  }

  fetchProgressDetails(jobNumber: string, subJobNumber: string[]): Observable<ProgressVO[]> {
    let params = new HttpParams();

    if (jobNumber) {
      params = params.append('jobNumber', jobNumber);
    }

    if (subJobNumber && subJobNumber.length > 0) {
      subJobNumber.forEach(subJob => {
        params = params.append('subJobNumber', subJob);
      });
    }

    return this.http.get<ProgressVO[]>(`${this.apiUrl}/getProgressDetails`, { params })
      .pipe(catchError(this.handleError));
  }

}
