export interface ITableHeader {
  name: string;
  col: string;
  property: string;
  action: boolean;
  sort: boolean;
  sortActive: boolean;
  sortDesc: boolean;
  variableType: 'string' | 'boolean' | 'number' | 'date';
}
