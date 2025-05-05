// src/app/services/material-tracking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from "../environments/environment";
import {catchError} from "rxjs/operators";
import {JobDetailsVO} from '../models/JobDetailsVO';


@Injectable({
  providedIn: 'root'
})
export class jobService {

  private apiUrl = environment.apiUrl + '/api/jobs';

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
  addJob(job: JobDetailsVO): Observable<JobDetailsVO> {
    return this.http.post<JobDetailsVO>(`${this.apiUrl}/createJob`, job)
      .pipe(catchError(this.handleError));
  }

  searchSubJobs(jobNumber: string): Observable<JobDetailsVO> {
    let params = new HttpParams();
    if (jobNumber) {
      params = params.append('jobNumber', jobNumber);
    }
    return this.http.get<JobDetailsVO>(`${this.apiUrl}/searchSubJobs`, { params })
      .pipe(catchError(this.handleError));
  }

  // Update material item
  updateMaterialItem(item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${item.id}`, item);
  }

  // Export material items to report format
  exportMaterialItems(jobNumber: string, subJobNumber: string, drawingNo: string): Observable<Blob> {
    let params = new HttpParams();
    if (jobNumber) params = params.append('jobNumber', jobNumber);
    if (subJobNumber) params = params.append('subJobNumber', subJobNumber);
    if (drawingNo) params = params.append('drawingNo', drawingNo);

    return this.http.get(`${this.apiUrl}/export`, {
      params,
      responseType: 'blob'
    });
  }
}
