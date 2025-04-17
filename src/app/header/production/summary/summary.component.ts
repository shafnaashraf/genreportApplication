import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: 'summary.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    FormsModule,
    NgForOf
  ],
  styleUrls: ['summary.component.css']
})
export class SummaryComponent{
  searchJobNumber: string = '';
  selectedReportNumbers: string[] = [];

  availableReportNumbers: string[] = ['RPT001', 'RPT002', 'RPT003'];

  jobNumber: string = '';
  reportNumber: string = '';
  showReportHeader: boolean = false;

  searchReport() {
    // You can add actual logic here to fetch report data
    this.jobNumber = this.searchJobNumber;
    //this.reportNumber = this.searchReportNumber;

    this.showReportHeader = true;
  }

  toggleReportSelection(report: string, isChecked: Event) {
    if (isChecked) {
      this.selectedReportNumbers.push(report);
    } else {
      this.selectedReportNumbers = this.selectedReportNumbers.filter(r => r !== report);
    }
  }

  search() {
    return 1;
  }
}
