import { TableDirective } from '../../directives/table.directive';

import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { ITableHeader } from '@models/interfaces/ITableHeader';

@Component({
  selector: 'app-table-body',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss'],
})
export class TableBodyComponent implements OnInit {
  @ContentChildren(TableDirective) contents!: QueryList<TableDirective>;

  @Input() loading = true;

  @Input() header: ITableHeader[] = [];

  @Input() list: any[] = [];

  @Output() clickOnRow = new EventEmitter<any>();

  @Input() rowsClickable = false;

  gridTemplateColumns = '';

  ngOnInit(): void {
    for (const h of this.header) {
      this.gridTemplateColumns += `${h.col} `;
    }
  }

  emitRowClick(row: any) {
    if (this.rowsClickable === false) {
      return;
    }
    this.clickOnRow.emit(row);
  }

  getContent(keyToSearch: string) {
    return this.contents.find((td) => td.key === keyToSearch);
  }
}
