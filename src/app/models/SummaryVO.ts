export interface SummaryVO{
  title: string;
  totalQty: number;
  UOM?: string;
  cutting: number;
  fitup: number;
  welding: number;
  fabCompPercent?: number;
  paintReleaseDate?: string;
  blastPaint?: number;
  compPercent?:number;
  remarks?: string;
  editMode: boolean;
  isEdited?: boolean;
  jobNumber: string;
  subJobNumber: string;
}
