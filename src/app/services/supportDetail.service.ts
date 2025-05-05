// src/app/services/material-tracking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from "../environments/environment";
import {catchError} from "rxjs/operators";
import {JobDetailsVO} from '../models/JobDetailsVO';
import {SupportDetail} from '../models/SupportDetail';


@Injectable({
  providedIn: 'root'
})
export class SupportDetailService {

  private apiUrl = environment.apiUrl + '/api/supportDetails';

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
  addSupportDetails(supportDetail: SupportDetail): Observable<SupportDetail> {
    return this.http.post<SupportDetail>(`${this.apiUrl}/createSupport`, supportDetail)
      .pipe(catchError(this.handleError));
  }

  // Update material item
  updateSupportDetails(supportDetail: SupportDetail): Observable<SupportDetail> {
    return this.http.put<any>(`${this.apiUrl}/editSupport`, supportDetail);
  }

  searchSubJobDetails(jobNumber: string,subJobNumber:string): Observable<SupportDetail[]> {
    let params = new HttpParams();
    if (jobNumber) {
      params = params.append('jobNumber', jobNumber);
      params = params.append('subJobNumber', subJobNumber);
    }
    return this.http.get<SupportDetail[]>(`${this.apiUrl}/getSupportDetails`, { params })
      .pipe(catchError(this.handleError));
  }

  searchSubJobDetailsForSubJobs(jobNumber: string, subJobNumber: string[]): Observable<SupportDetail[]> {
    let params = new HttpParams();

    if (jobNumber) {
      params = params.append('jobNumber', jobNumber);
    }

    if (subJobNumber && subJobNumber.length > 0) {
      subJobNumber.forEach(subJob => {
        params = params.append('subJobNumber', subJob);
      });
    }

    return this.http.get<SupportDetail[]>(`${this.apiUrl}/getSupportDetailsBySubJobs`, { params })
      .pipe(catchError(this.handleError));
  }

}
