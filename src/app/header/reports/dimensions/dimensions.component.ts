// dimensions-report.component.ts
import { Component, OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-dimensions-report',
  templateUrl: './dimensions.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./dimensions.component.css']
})
export class DimensionsComponent implements OnInit {
  jobInfo = {
    jobNumber: '2403',
    subJobNumber: '001',
    drawingNo: 'AW-D-100-16"-CS',
    reportNumber: 'AR-QC-2403-DIM-R-S- 1'
  };

  dimensionData = [
    { slNo: 1, details: 'A', asPerDrg: 300, actual: 300, variation: 0.00, result: 'ACC' },
    { slNo: 2, details: 'B', asPerDrg: 100, actual: 100, variation: 0.00, result: 'ACC' },
    { slNo: 3, details: 'C', asPerDrg: 450, actual: 450, variation: 0.00, result: 'ACC' },
    { slNo: 4, details: 'D', asPerDrg: 300, actual: 300, variation: 0.00, result: 'ACC' },
    { slNo: 5, details: 'E', asPerDrg: 300, actual: 300, variation: 0.00, result: 'ACC' },
    { slNo: 6, details: 'F', asPerDrg: 300, actual: 300, variation: 0.00, result: 'ACC' },
    { slNo: 7, details: 'G', asPerDrg: null, actual: null, variation: null, result: null },
    { slNo: 8, details: 'H', asPerDrg: null, actual: null, variation: null, result: null },
    { slNo: 9, details: 'I', asPerDrg: null, actual: null, variation: null, result: null },
    { slNo: 10, details: 'J', asPerDrg: null, actual: null, variation: null, result: null },
    { slNo: 11, details: 'K', asPerDrg: null, actual: null, variation: null, result: null },
    { slNo: 12, details: 'L', asPerDrg: null, actual: null, variation: null, result: null },
    { slNo: 13, details: 'M', asPerDrg: null, actual: null, variation: null, result: null },
    { slNo: 14, details: 'N', asPerDrg: null, actual: null, variation: null, result: null }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  exportReport(): void {
    console.log('Exporting dimensions report');
  }
}
