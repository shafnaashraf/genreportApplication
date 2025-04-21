import { Component, OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-welding-report',
  templateUrl: './welding.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./welding.component.css']
})
export class WeldingComponent implements OnInit {
  jobInfo = {
    jobNumber: '2403',
    subJobNumber: '001',
    drawingNo: 'AW-D-100-16"-CS',
    reportNumber: 'AR-QC-2403-WLD-R-S- 1'
  };

  weldingData = [
    { slNo: 1, jointNo: 'W-001', weldProcess: 'SMAW', wps: 'WPS-01', welder: 'W-123', visualInspection: 'Accepted', rtRequired: 'Yes', rtReport: 'RT-001', result: 'ACC' },
    { slNo: 2, jointNo: 'W-002', weldProcess: 'GTAW', wps: 'WPS-02', welder: 'W-456', visualInspection: 'Accepted', rtRequired: 'No', rtReport: 'N/A', result: 'ACC' },
    { slNo: 3, jointNo: 'W-003', weldProcess: 'SMAW', wps: 'WPS-01', welder: 'W-123', visualInspection: 'Accepted', rtRequired: 'Yes', rtReport: 'RT-002', result: 'ACC' },
    { slNo: 4, jointNo: 'W-004', weldProcess: 'FCAW', wps: 'WPS-03', welder: 'W-789', visualInspection: 'Accepted', rtRequired: 'Yes', rtReport: 'RT-003', result: 'ACC' },
    { slNo: 5, jointNo: 'W-005', weldProcess: 'SMAW', wps: 'WPS-01', welder: 'W-456', visualInspection: 'Accepted', rtRequired: 'No', rtReport: 'N/A', result: 'ACC' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  exportReport(): void {
    console.log('Exporting welding report');
  }
}
