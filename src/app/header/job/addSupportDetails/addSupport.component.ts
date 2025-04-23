import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

interface SupportDetail {
  drawingNo: string;
  desc: string;
  qty: string;
  itemNo: string;
  itemDesc: string;
  specGrade: string;
}
@Component({
  selector: 'add-support',
  templateUrl: 'addSupport.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrl: 'addSupport.component.css'
})
export class AddSupportComponent{

  // Search form properties
  jobNumber: string = '';
  reportNumbers: string[] = [];
  selectedReport: string = '';
  showReportDropdown: boolean = false;
  showDetailsSection: boolean = false;

  // Job details
  jobDetails: {
    jobNumber: string;
    reportNumber: string;
    client: string;
    project: string;
    title: string
  } = {
    jobNumber: '',
    reportNumber: '',
    client: '',
    project: '',
    title: ''
  };

  // Support table properties
  newSupport: SupportDetail = {
    drawingNo: '',
    desc: '',
    qty: '',
    itemNo: '',
    itemDesc: '',
    specGrade: ''
  };

  supportList: SupportDetail[] = [];
  editingSupport: SupportDetail | null = null;
  editingIndex: number = -1;

  // Search job - simulating API call
  searchJob() {
    if (this.jobNumber) {
      // Mock API response - in real app, this would be an API call
      setTimeout(() => {
        this.reportNumbers = ['REP-2023-001', 'REP-2023-002', 'REP-2023-003'];
        this.showReportDropdown = true;
      }, 500);
    }
  }

  // Load report details
  loadReportDetails() {
    if (this.selectedReport) {
      // Mock API response - in real app, this would be an API call
      setTimeout(() => {
        this.jobDetails = {
          jobNumber: this.jobNumber,
          reportNumber: this.selectedReport,
          client: 'ABC Corporation',
          project: 'Industrial Complex Renovation',
          title: 'Support Details Report'
        };

        // Initialize empty list - would normally be populated from API
        this.supportList = [];

        // Show details section
        this.showDetailsSection = true;
      }, 500);
    }
  }

  // Toggle search section visibility
  toggleSearchSection() {
    if (this.showDetailsSection) {
      this.showDetailsSection = false;
    }
  }

  // Go back to search
  backToSearch() {
    this.showDetailsSection = false;
  }

  // Support table functions
  saveSupport() {
    if (this.newSupport.drawingNo !== '') {
      this.supportList.push({ ...this.newSupport });
      this.newSupport = {
        drawingNo: '',
        desc: '',
        qty: '',
        itemNo: '',
        itemDesc: '',
        specGrade: ''
      };
    }
  }

  isFieldInvalid(value: string): boolean {
    return value === '';
  }

  editSupport(support: SupportDetail, index: number) {
    // Create a clone of the support to edit
    this.editingSupport = { ...support };
    this.editingIndex = index;
  }

  saveEditedSupport() {
    if (this.editingSupport && this.editingIndex >= 0) {
      this.supportList[this.editingIndex] = { ...this.editingSupport };
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editingSupport = null;
    this.editingIndex = -1;
  }
}
