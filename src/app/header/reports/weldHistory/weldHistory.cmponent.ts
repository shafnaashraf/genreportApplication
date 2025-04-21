import { Component, OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-weld-history-report',
  templateUrl: './weldHistory.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./weldHistory.component.css']
})
export class WeldHistoryComponent implements OnInit {
  jobInfo = {
    jobNumber: '2403',
    subJobNumber: '001',
    drawingNo: 'AW-D-100-16"-CS',
    reportNumber: 'AR-QC-2403-WH-R-S- 1'
  };

  weldHistoryData = [
    { slNo: 1, jointNo: 'W-001', initialWeld: '2025-03-15', welder: 'W-123', inspectionDate: '2025-03-16', result: 'Accepted', repairRequired: 'No', repairDate: 'N/A', repairWelder: 'N/A', finalResult: 'ACC' },
    { slNo: 2, jointNo: 'W-002', initialWeld: '2025-03-15', welder: 'W-456', inspectionDate: '2025-03-16', result: 'Rejected', repairRequired: 'Yes', repairDate: '2025-03-18', repairWelder: 'W-123', finalResult: 'ACC' },
    { slNo: 3, jointNo: 'W-003', initialWeld: '2025-03-16', welder: 'W-123', inspectionDate: '2025-03-17', result: 'Accepted', repairRequired: 'No', repairDate: 'N/A', repairWelder: 'N/A', finalResult: 'ACC' },
    { slNo: 4, jointNo: 'W-004', initialWeld: '2025-03-16', welder: 'W-789', inspectionDate: '2025-03-17', result: 'Rejected', repairRequired: 'Yes', repairDate: '2025-03-19', repairWelder: 'W-456', finalResult: 'ACC' },
    { slNo: 5, jointNo: 'W-005', initialWeld: '2025-03-17', welder: 'W-456', inspectionDate: '2025-03-18', result: 'Accepted', repairRequired: 'No', repairDate: 'N/A', repairWelder: 'N/A', finalResult: 'ACC' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  exportReport(): void {
    console.log('Exporting weld history report');
  }
}
