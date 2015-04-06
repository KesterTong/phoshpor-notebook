module Notebook {

export interface CellModel {
  id:string;
  execution_count?: number;
  value: string;
}

}
