import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';


interface MaterialItem {
  drawingNo: string;
  jointNo: number;
  itemDescription: string;
  materialDesc: string;
  material: string;
  wps: string;
  welderId: number;
  fitup: string;
  visual: string;
  pt: string;
  mt: string;
  rtut:string,
  remarks: string;
  reportNumber?: string;
  isSelected: boolean;
  isEditing: boolean;
}
@Component({
  selector: 'app-weld-history-report',
  templateUrl: './weldHistory.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  styleUrls: ['./weldHistory.component.css']
})
export class WeldHistoryComponent implements OnInit {
  searchForm!: FormGroup;
  materialItems: MaterialItem[] = [];
  showResults = false;
  currentReportNumber = '';
  allSelected = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initSearchForm();
    // Mock data for demonstration
    this.materialItems = this.getMockData();
  }

  initSearchForm(): void {
    this.searchForm = this.fb.group({
      jobNumber: ['2403', Validators.required],
      subJobNumber: ['001', Validators.required],
      drawingNo: ['AW-D-100-16"-CS', Validators.required]
    });
  }

  search(): void {
    // In a real application, you would call an API here
    // For demo, we'll just show the mock data
    this.showResults = true;
  }

  exportReport(): void {
    // Implement export functionality
    console.log('Exporting report...');
    alert('Report exported successfully!');
  }

  toggleSelection(item: MaterialItem): void {
    item.isSelected = !item.isSelected;
    this.updateAllSelectedState();
  }

  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.materialItems.forEach(item => {
      item.isSelected = this.allSelected;
    });
  }

  updateAllSelectedState(): void {
    this.allSelected = this.materialItems.length > 0 &&
      this.materialItems.every(item => item.isSelected);
  }

  toggleEditMode(item: MaterialItem): void {
    // First close any other items being edited
    this.materialItems.forEach(i => {
      if (i !== item && i.isEditing) {
        i.isEditing = false;
      }
    });

    item.isEditing = !item.isEditing;
  }

  saveItem(item: MaterialItem): void {
    item.isEditing = false;
    // Here you would typically send the updated item to your backend
    console.log('Saving item:', item);
    // Show success message
    this.showToast('Item updated successfully!');
  }

  hasSelectedItems(): boolean {
    return this.materialItems.some(item => item.isSelected);
  }

  applyReportNumber(): void {
    if (!this.currentReportNumber) {
      alert('Please enter a report number');
      return;
    }

    const selectedItems = this.materialItems.filter(item => item.isSelected);
    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }

    // Assign the report number to all selected items
    selectedItems.forEach(item => {
      item.reportNumber = this.currentReportNumber;
    });

    // Show success message
    this.showToast(`Report number ${this.currentReportNumber} applied to ${selectedItems.length} items`);

    // Clear selections and report number
    this.materialItems.forEach(item => item.isSelected = false);
    this.allSelected = false;
    this.currentReportNumber = '';
  }

  showToast(message: string): void {
    // Simple toast implementation - in a real app you'd use a proper toast/notification service
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 3000);
    }, 100);
  }

  // Mock data for demonstration
  getMockData(): MaterialItem[] {
    return [
      {
        drawingNo: 'SW-300-100-16"-CS',
        material: 'BM-1',
        welderId: 1,
        jointNo: 156,
        itemDescription: 'BEAM, HEA 100, EN 10025 S275JR',
        materialDesc: 'S275JR',
        wps: '',
        fitup: '',
        visual: '',
        pt: '',
        mt:'',
        rtut:'',
        remarks: '',
        isSelected: false,
        isEditing: false
      },
      {
        drawingNo: 'AW-D-100-16"-CS',
        material: 'BM-2',
        welderId: 1,
        jointNo: 2,
        itemDescription: 'BEAM, HEA 100, EN 10025 S275JR',
        materialDesc: 'S275JR',
        wps: '',
        fitup: '',
        visual: '',
        pt: '',
        mt:'',
        rtut:'',
        remarks: '',
        isSelected: false,
        isEditing: false
      },
      {
        drawingNo: 'SW-450-100-16"-CS',
        material: 'BM-3',
        welderId: 1,
        jointNo: 343,
        itemDescription: 'PLATE THK 10MM, EN 10025 S275JR',
        materialDesc: 'S275JR',
        wps: '',
        fitup: '',
        visual: '',
        pt: '',
        mt:'',
        rtut:'',
        remarks: '',
        isSelected: false,
        isEditing: false
      },
      {
        drawingNo: 'SW-300-100-12"-CS',
        material: 'BM-4',
        welderId: 1,
        jointNo: 498,
        itemDescription: 'PLATE THK 10MM, EN 10025 S275JR',
        materialDesc: 'S275JR',
        wps: '',
        fitup: '',
        visual: '',
        pt: '',
        mt:'',
        rtut:'',
        remarks: '',
        isSelected: false,
        isEditing: false
      },
      {
        drawingNo: 'SW-300-100-12"-CS',
        material: 'BM-4',
        welderId: 1,
        jointNo: 235,
        itemDescription: 'BEAM, HEA 100, EN 10025 S275JR',
        materialDesc: 'S275JR',
        wps: 'e',
        fitup: 'ecew',
        visual: 'wec',
        pt: 'gtr',
        mt:'6445',
        rtut:'645',
        remarks: 'hello',
        isSelected: false,
        isEditing: false
      },
      {
        drawingNo: 'SW-300-100-8"-CS',
        material: 'BM-5',
        welderId: 1,
        jointNo: 590,
        itemDescription: 'PLATE THK 10MM, EN 10025 S275JR',
        materialDesc: 'S275JR',
        wps: 're',
        fitup: 'wre',
        visual: 'gb',
        pt: 'gfd',
        mt:'gsd',
        rtut:'fds',
        remarks: 'sgd',
        isSelected: false,
        isEditing: false
      }
    ];
  }
}
