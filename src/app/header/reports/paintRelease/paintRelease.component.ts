import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-paint-release-report',
    templateUrl: './paintRelease.component.html',
    standalone: true,
    imports: [
        NgForOf
    ],
    styleUrls: ['./paintRelease.component.css']
})
export class PaintReleaseComponent implements OnInit {
    jobInfo = {
        jobNumber: '2403',
        subJobNumber: '001',
        drawingNo: 'AW-D-100-16"-CS',
        reportNumber: 'AR-QC-2403-PNT-R-S- 1'
    };

    paintData = [
        { slNo: 1, component: 'HEADER SECTION 1', surfacePrep: 'SA 2.5', paintSpec: 'PS-01', primer: 'Applied', intermediate: 'Applied', finish: 'Applied', dft: '250 μm', inspectionDate: '2025-04-10', result: 'ACC' },
        { slNo: 2, component: 'HEADER SECTION 2', surfacePrep: 'SA 2.5', paintSpec: 'PS-01', primer: 'Applied', intermediate: 'Applied', finish: 'Applied', dft: '250 μm', inspectionDate: '2025-04-10', result: 'ACC' },
        { slNo: 3, component: 'HEADER SECTION 3', surfacePrep: 'SA 2.5', paintSpec: 'PS-01', primer: 'Applied', intermediate: 'Applied', finish: 'Applied', dft: '250 μm', inspectionDate: '2025-04-11', result: 'ACC' },
        { slNo: 4, component: 'HEADER SECTION 4', surfacePrep: 'SA 2.5', paintSpec: 'PS-01', primer: 'Applied', intermediate: 'Applied', finish: 'Pending', dft: 'N/A', inspectionDate: '2025-04-15', result: 'Pending' }
    ];

    constructor() { }

    ngOnInit(): void {
    }

    exportReport(): void {
        console.log('Exporting paint release report');
    }
}
