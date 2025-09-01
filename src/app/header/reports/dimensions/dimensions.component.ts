// dimensions-report.component.ts
import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {DimensionItemVO} from '../../../models/DimensionItemVO';
import {DimensionReportService} from '../../../services/dimensionReport.service';
import {MaterialTrackingService} from '../../../services/materialTracking.service';

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
  dimensionItems: DimensionItemVO[] = [];
  showResults: boolean = false;
  allSelected: boolean = false;
  currentReportNumber: string = '';
  drawingNo : string = '';


  // Object for the new item input row
  newItem: DimensionItemVO = this.getEmptyDimensionItem();

  // For editing functionality
  originalEditItem: DimensionItemVO | null = null;

  constructor(private fb: FormBuilder, private dimensionReportService: DimensionReportService) {
    this.searchForm = this.fb.group({
      jobNumber: ['DOWNTOWN-OFFICE-2024'],
      subJobNumber: ['WINDOWS'],
      drawingNo: ['FLOOR-2-WINDOWS-Rev-B']
    });
  }

  ngOnInit(): void {
    // Any initialization code
  }

  // Initialize an empty dimension item
  getEmptyDimensionItem(): DimensionItemVO {
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
  async search(): Promise<void> {
    // Implement search logic - typically an API call
    const {jobNumber, subJobNumber, drawingNo} = this.searchForm.value;

    if (jobNumber && subJobNumber && drawingNo) {
      this.dimensionItems = [];
      try {
        const response = await firstValueFrom(
          this.dimensionReportService.searchDimensionReportItems(jobNumber, subJobNumber, drawingNo)
        );
        this.showResults = true;
        this.drawingNo = this.searchForm.value.drawingNo;
        console.log('fetched dimension report details successfully:', response);

        response.forEach(dimension => {
          const dimensionDetails: DimensionItemVO = {
            id: dimension.id != undefined? dimension.id : undefined,
            drawingNo: dimension.drawingNo,
            qty: dimension.qty!= undefined ? dimension.qty : undefined,
            details: dimension.details != undefined ? dimension.details : undefined,
            drawingDimension: dimension.drawingDimension != undefined ? dimension.drawingDimension : undefined,
            actualDimension: dimension.actualDimension!= undefined ? dimension.actualDimension : undefined,
            variation: dimension.variation!= undefined ? dimension.variation : undefined,
            result: dimension.result != undefined ? dimension.result : undefined,
            reportNumber: dimension.reportNumber!= undefined ? dimension.reportNumber : undefined,
            isSelected: false,
            isEditing: false
          }
          this.dimensionItems.push(dimensionDetails);
        })

      } catch (error) {
        console.error('Error fetching material items:', error);
      }
    }
  }

  // Save new item from input row
  saveNewItem(): void {
    // Basic validation
    if (this.isFieldInvalid(this.newItem.drawingNo)) {
      alert('Drawing No is required');
      return;
    }

    if (this.newItem?.drawingDimension != null &&
      this.newItem?.actualDimension != null &&
      this.newItem?.variation == null) {
      this.newItem.variation = this.newItem.actualDimension - this.newItem.drawingDimension;
    }


    // Add to the list - create a new object to avoid reference issues
    const itemToAdd: DimensionItemVO = {...this.newItem};
    this.dimensionItems.unshift(itemToAdd);

    // Reset the new item
    this.newItem = this.getEmptyDimensionItem();
  }

  // Toggle edit mode for an item
  toggleEditMode(item: DimensionItemVO): void {
    // Store original values before editing to allow cancel operation
    this.originalEditItem = {...item};

    // Set editing mode
    item.isEditing = true;

    // Ensure only one item is in edit mode at a time
    this.dimensionItems.forEach(i => {
      if (i !== item) {
        i.isEditing = false;
      }
    });
  }

  // Save edited item
  saveItem(item: DimensionItemVO): void {
    // Basic validation
    if (this.isFieldInvalid(item.drawingNo)) {
      alert('Drawing No is required');
      return;
    }

    /* // Calculate variation if needed
    if (item.drawingDimension !== null &&
      item.actualDimension !== null) {
      item.variation = item.actualDimension - item.drawingDimension;
    }

     */

    // Exit edit mode
    item.isEditing = false;
    this.originalEditItem = null;
  }

  // Cancel editing
  cancelEdit(item: DimensionItemVO): void {
    if (this.originalEditItem) {
      // Restore original values
      Object.assign(item, this.originalEditItem);
    }

    // Exit edit mode
    item.isEditing = false;
    this.originalEditItem = null;
  }

  // Toggle selection of a single item
  toggleSelection(item: DimensionItemVO): void {
    item.isSelected = !item.isSelected;

    // Update allSelected status
    this.updateAllSelectedStatus();
  }

  // Toggle selection of all items
  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.dimensionItems.forEach(item => {
      item.isSelected = this.allSelected;
    });
  }

  // Check if any items are selected
  hasSelectedItems(): boolean {
    return this.dimensionItems.some(item => item.isSelected);
  }

  // Update all selected status based on individual selections
  updateAllSelectedStatus(): void {
    this.allSelected = this.dimensionItems.length > 0 &&
      this.dimensionItems.every(item => item.isSelected);
  }

  // Apply report number to selected items
  applyReportNumber(): void {
    if (!this.currentReportNumber.trim()) {
      alert('Please enter a report number');
      return;
    }

    this.dimensionItems.forEach(item => {
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
    console.log('Exporting items:', this.dimensionItems);
  }
}
