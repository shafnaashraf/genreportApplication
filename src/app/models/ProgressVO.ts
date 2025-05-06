export interface ProgressVO {
  drawingNo: string;
  assemblyTagNo:string;
  weight?: number;
  qty: number;
  cutting?: number;
  fitup?: number;
  welding?: number;
  paintRelDate?: string;
  blastNPaint?: string;
  remarks?: string;
  editMode: boolean;
  isEdited?: boolean;
  supportId:number;
  progressId?:number;
  id?: number; //this is actually the progress id only, to handle 2 different api, wrote as seperate
}









