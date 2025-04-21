// dimensions-report.component.ts
import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

interface MaterialItem {
  slNo: number;
  drawingNo: string;
  qty: string;
  details: string;
  drawingDimension: number;
  actualDimension: number;
  variation: number;
  result: string;
  isSelected: boolean;
  isEditing: boolean;
}
@Component({
  selector: 'app-dimensions-report',
  templateUrl: './dimensions.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    FormsModule
  ],
  styleUrls: ['./dimensions.component.css']
})
export class DimensionsComponent implements OnInit {
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
        slNo: 1,
        drawingNo: 'AW-D-100-16"-CS',
        qty: '3 NOS',
        details: 'A',
        drawingDimension: 300,
        actualDimension: 300,
        variation: 0.00,
        result: 'ACC',
        isSelected: false,
        isEditing: false
      },
      {
        slNo: 2,
        drawingNo: 'AW-D-100-16"-CS',
        qty: '1 SET',
        details: 'B',
        drawingDimension: 100,
        actualDimension: 100,
        variation: 0.00,
        result: 'ACC',
        isSelected: false,
        isEditing: false
      },
      {
        slNo: 3,
        drawingNo: 'SW-450-100-16"-CS',
        qty: '1 NOS',
        details: 'C',
        drawingDimension: 450,
        actualDimension: 450,
        variation: 0.00,
        result: 'ACC',
        isSelected: false,
        isEditing: false
      },
      {
        slNo: 4,
        drawingNo: 'SW-300-100-12"-CS',
        qty: '1 NOS',
        details: 'D',
        drawingDimension: 300,
        actualDimension: 300,
        variation: 0.00,
        result: 'ACC',
        isSelected: false,
        isEditing: false
      },
      {
        slNo: 5,
        drawingNo: 'SW-300-100-10"-CS',
        qty: '2 NOS',
        details: 'E',
        drawingDimension: 300,
        actualDimension: 298,
        variation: -2.00,
        result: 'ACC',
        isSelected: false,
        isEditing: false
      },
      {
        slNo: 6,
        drawingNo: 'SW-300-100-8"-CS',
        qty: '1 NOS',
        details: 'F',
        drawingDimension: 300,
        actualDimension: 301,
        variation: 1.00,
        result: 'ACC',
        isSelected: false,
        isEditing: false
      }
    ];
  }
}
