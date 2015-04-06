module Cell {

export interface CellModel {
  id:string;
  execution_count?: number;
  source: string;
  outputs?:any;
}

}
