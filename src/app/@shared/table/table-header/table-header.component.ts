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
import { TableDirective } from '../../directives/table.directive';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent implements OnInit {
  @Input() header: ITableHeader[] = [];
  @Output() changeSort = new EventEmitter<ITableHeader>();
  @ContentChildren(TableDirective) contents!: QueryList<TableDirective>;

  gridTemplateColumns = '';

  ngOnInit(): void {
    for (const h of this.header) {
      this.gridTemplateColumns += `${h.col} `;
    }
  }

  setOrder(e: ITableHeader) {
    this.header.forEach((h) => (h.sortActive = false));
    e.sortActive = true;
    e.sortDesc = !e.sortDesc;
    this.changeSort.emit(e);
  }

  getContent(keyToSearch: string) {
    return this.contents.find((td) => td.key === keyToSearch);
  }
}
