// src/app/services/material-tracking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from "../environments/environment";
import {catchError} from "rxjs/operators";
import {MaterialItemVO} from '../models/MaterialItemVO';
import {ProgressVO} from '../models/ProgressVO';

@Injectable({
    providedIn: 'root'
})
export class MaterialTrackingService {
    private apiUrl = environment.apiUrl + '/api/material';
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

    searchMaterialItems(jobNumber: string, subJobNumber: string, drawingNo: string): Observable<MaterialItemVO[]> {
        let params = new HttpParams();
        if (jobNumber) params = params.append('jobNumber', jobNumber);
        if (subJobNumber) params = params.append('subJobNumber', subJobNumber);
        if (drawingNo) params = params.append('drawingNo', drawingNo);

        return this.http.get<any[]>(`${this.apiUrl}/getMaterialDetails`, { params })
            .pipe(catchError(this.handleError));
    }

  addMaterialDetails(materialDetail: MaterialItemVO): Observable<MaterialItemVO> {
    return this.http.post<MaterialItemVO>(`${this.apiUrl}/createMaterialDetails`, materialDetail)
      .pipe(catchError(this.handleError));
  }

  addMaterialDetailsForMultiple(materialDetail: MaterialItemVO[]): Observable<MaterialItemVO[]> {
    return this.http.post<MaterialItemVO[]>(`${this.apiUrl}/createMultipleMaterialDetails`, materialDetail)
      .pipe(catchError(this.handleError));
  }

  addReportNumber(materialIds: string[], reportNo: string): Observable<string> {
    let params = new HttpParams();

    materialIds.forEach(id => {
      params = params.append('materialIds', id);
    });
    params = params.set('reportNo', reportNo);

    return this.http.post(`${this.apiUrl}/addReportNo`, null, {
      params,
      responseType: 'text'  // Handle plain text response
    }).pipe(catchError(this.handleError));
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
