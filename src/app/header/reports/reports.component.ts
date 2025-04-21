// report.component.ts
import { Component, OnInit } from '@angular/core';
import {NgIf} from '@angular/common';
import {DimensionsComponent} from './dimensions/dimensions.component';
import {WeldingComponent} from './welding/welding.component';
import {PaintReleaseComponent} from './paintRelease/paintRelease.component';
import {WeldHistoryComponent} from './weldHistory/weldHistory.cmponent';

@Component({
  selector: 'app-report',
  templateUrl: './reports.component.html',
  standalone: true,
  imports: [
    NgIf,
    DimensionsComponent,
    WeldingComponent,
    PaintReleaseComponent,
    WeldHistoryComponent
  ],
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  activeTab = 'dimensions';

  constructor() { }

  ngOnInit(): void {
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
