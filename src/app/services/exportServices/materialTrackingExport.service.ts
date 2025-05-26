import * as XLSX from 'xlsx';
import {MaterialItemVO} from '../../models/MaterialItemVO';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialTrackingExportService {

  /**
   * Export material data to Excel file
   * @param materialData Array of material data
   * @param jobNumber Job number for filename
   * @param subJobNumber Sub job number for filename
   * @param drawingNumber Drawing number for filename
   */
  exportToExcel(
    materialData: MaterialItemVO[],
    jobNumber: string,
    subJobNumber: string,
    drawingNumber: string
  ): void {

    // Prepare data for Excel export
    const exportData = materialData.map((item, index) => ({
      'Sl No.': item.slNo || index + 1,
      'Drawing no': item.drawingNumber,
      'Description /Assembly Tag No': item.assemblyTagNo,
      'Qty': item.qty,
      'Item No': item.itemNo,
      'Item Description': item.itemDesc,
      'Specification Grade': item.specifGrade,
      'Thk/Size': item.thkSize,
      'Heat No': item.heatNo,
      'MTC No': item.mtcNo,
      'IGIR No': item.igirNo,
      'Remarks': item.remarks,
      'Report Number': item.reportNo
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths for better readability
    const columnWidths = [
      { wch: 8 },   // Sl No.
      { wch: 15 },  // Drawing no
      { wch: 25 },  // Description
      { wch: 8 },   // Qty
      { wch: 12 },  // Item No
      { wch: 20 },  // Item Description
      { wch: 18 },  // Specification Grade
      { wch: 12 },  // Thk/Size
      { wch: 12 },  // Heat No
      { wch: 12 },  // MTC No
      { wch: 12 },  // IGIR No
      { wch: 15 },  // Remarks
      { wch: 15 }   // Report Number
    ];
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Material Data');

    // Generate filename: jobnumber_subjobnumber_drawingnumber.xlsx
    const fileName = `${jobNumber}_${subJobNumber}_${drawingNumber}.xlsx`;

    // Export and download the file
    XLSX.writeFile(workbook, fileName);
  }

  /**
   * Alternative method if you're getting data from table DOM elements
   */
  exportTableToExcel(
    tableElementId: string,
    jobNumber: string,
    subJobNumber: string,
    drawingNumber: string
  ): void {

    const table = document.getElementById(tableElementId);
    if (!table) {
      console.error('Table element not found');
      return;
    }

    // Convert HTML table to workbook
    const workbook = XLSX.utils.table_to_book(table, { sheet: 'Material Data' });

    // Generate filename
    const fileName = `${jobNumber}_${subJobNumber}_${drawingNumber}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, fileName);
  }

  /**
   * Method to export selected rows only (based on checkboxes)
   */
  exportSelectedRowsToExcel(
    materialData: MaterialItemVO[],
    selectedIndices: number[],
    jobNumber: string,
    subJobNumber: string,
    drawingNumber: string
  ): void {

    // Filter only selected rows
    const selectedData = materialData.filter((_, index) =>
      selectedIndices.includes(index)
    );

    if (selectedData.length === 0) {
      alert('Please select at least one row to export.');
      return;
    }

    // Export selected data
    this.exportToExcel(selectedData, jobNumber, subJobNumber, drawingNumber);
  }
}
