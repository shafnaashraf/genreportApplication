// dimensions-report.component.ts
import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

interface DimensionItem {
  id?: number;
  drawingNo: string;
  qty: string;
  details: string;
  drawingDimension: number | null;
  actualDimension: number | null;
  variation: number | null;
  result: string;
  reportNumber: string;
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
  searchForm: FormGroup;
  materialItems: DimensionItem[] = [];
  showResults: boolean = false;
  allSelected: boolean = false;
  currentReportNumber: string = '';
  drawingNo : string = '';

  // Object for the new item input row
  newItem: DimensionItem = this.getEmptyDimensionItem();

  // For editing functionality
  originalEditItem: DimensionItem | null = null;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      jobNumber: [''],
      subJobNumber: [''],
      drawingNo: ['']
    });
  }

  ngOnInit(): void {
    // Any initialization code
  }

  // Initialize an empty dimension item
  getEmptyDimensionItem(): DimensionItem {
    return {
      drawingNo: '',
      qty: '',
      details: '',
      drawingDimension: null,
      actualDimension: null,
      variation: null,
      result: '',
      reportNumber: '',
      isSelected: false,
      isEditing: false
    };
  }

  // Check field validity
  isFieldInvalid(value: string | number | null): boolean {
    if (value === null) return false;
    return value.toString().trim() === '';
  }

  // Search functionality
  search(): void {
    // Implement search logic - typically an API call
    // For demo, let's just show sample results
    this.showResults = true;
    this.drawingNo = this.searchForm.value.drawingNo;

    // Sample data - would normally come from API
    if (this.materialItems.length === 0) {
      this.materialItems = [
        {
          drawingNo: 'DRW-001',
          qty: '2',
          details: 'Flange Connection',
          drawingDimension: 120.5,
          actualDimension: 120.7,
          variation: 0.2,
          result: 'Pass',
          reportNumber: 'R-2024-001',
          isSelected: false,
          isEditing: false
        },
        {
          drawingNo: 'DRW-001',
          qty: '1',
          details: 'Support Bracket',
          drawingDimension: 85.0,
          actualDimension: 84.7,
          variation: -0.3,
          result: 'Pass',
          reportNumber: 'R-2024-001',
          isSelected: false,
          isEditing: false
        }
      ];
    }
  }

  // Save new item from input row
  saveNewItem(): void {
    // Basic validation
    if (this.isFieldInvalid(this.newItem.drawingNo)) {
      alert('Drawing No is required');
      return;
    }

    // Calculate variation if not provided
    if (this.newItem.drawingDimension !== null &&
      this.newItem.actualDimension !== null &&
      this.newItem.variation === null) {
      this.newItem.variation = this.newItem.actualDimension - this.newItem.drawingDimension;
    }

    // Add to the list - create a new object to avoid reference issues
    const itemToAdd: DimensionItem = {...this.newItem};
    this.materialItems.unshift(itemToAdd);

    // Reset the new item
    this.newItem = this.getEmptyDimensionItem();
  }

  // Toggle edit mode for an item
  toggleEditMode(item: DimensionItem): void {
    // Store original values before editing to allow cancel operation
    this.originalEditItem = {...item};

    // Set editing mode
    item.isEditing = true;

    // Ensure only one item is in edit mode at a time
    this.materialItems.forEach(i => {
      if (i !== item) {
        i.isEditing = false;
      }
    });
  }

  // Save edited item
  saveItem(item: DimensionItem): void {
    // Basic validation
    if (this.isFieldInvalid(item.drawingNo)) {
      alert('Drawing No is required');
      return;
    }

    // Calculate variation if needed
    if (item.drawingDimension !== null &&
      item.actualDimension !== null) {
      item.variation = item.actualDimension - item.drawingDimension;
    }

    // Exit edit mode
    item.isEditing = false;
    this.originalEditItem = null;
  }

  // Cancel editing
  cancelEdit(item: DimensionItem): void {
    if (this.originalEditItem) {
      // Restore original values
      Object.assign(item, this.originalEditItem);
    }

    // Exit edit mode
    item.isEditing = false;
    this.originalEditItem = null;
  }

  // Toggle selection of a single item
  toggleSelection(item: DimensionItem): void {
    item.isSelected = !item.isSelected;

    // Update allSelected status
    this.updateAllSelectedStatus();
  }

  // Toggle selection of all items
  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.materialItems.forEach(item => {
      item.isSelected = this.allSelected;
    });
  }

  // Check if any items are selected
  hasSelectedItems(): boolean {
    return this.materialItems.some(item => item.isSelected);
  }

  // Update all selected status based on individual selections
  updateAllSelectedStatus(): void {
    this.allSelected = this.materialItems.length > 0 &&
      this.materialItems.every(item => item.isSelected);
  }

  // Apply report number to selected items
  applyReportNumber(): void {
    if (!this.currentReportNumber.trim()) {
      alert('Please enter a report number');
      return;
    }

    this.materialItems.forEach(item => {
      if (item.isSelected) {
        item.reportNumber = this.currentReportNumber;
      }
    });
  }

  // Export functionality
  exportReport(): void {
    // Implement export functionality
    // This would typically generate a PDF, Excel, or other format
    alert('Exporting report...');

    // Example implementation would go here
    console.log('Exporting items:', this.materialItems);
  }
}
