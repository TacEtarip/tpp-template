import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteFilterComponent } from './auto-complete-filter/auto-complete-filter.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { CheckFilterComponent } from './check-filter/check-filter.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { KeypressRestrictedDirective } from './directives/keypress-restricted.directive';
import { TableDirective } from './directives/table.directive';
import { TppBtnDirective } from './directives/tpp-btn.directive';
import { TppInputDirective } from './directives/tpp-input.directive';
import { IconsModule } from './icons/icons.module';
import { InputContainerComponent } from './input-container/input-container.component';
import { InputFilterComponent } from './input-filter/input-filter.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { LoadingFilterComponent } from './loading-filter/loading-filter.component';
import { LoadingTableComponent } from './loading-table/loading-table.component';
import { NotificationComponent } from './notification/notification.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { TableBodyComponent } from './table/table-body/table-body.component';
import { TableHeaderComponent } from './table/table-header/table-header.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TruncateTextComponent } from './truncate-text/truncate-text.component';

const COMPONENTS = [
  NotificationComponent,
  LoadingTableComponent,
  LoadingFilterComponent,
  LoadMoreComponent,
  ReplacePipe,
  DateRangePickerComponent,
  TruncateTextComponent,
  AutoCompleteComponent,
  TableHeaderComponent,
  TableBodyComponent,
  TableDirective,
  InputFilterComponent,
  AutoCompleteFilterComponent,
  CheckFilterComponent,
  KeypressRestrictedDirective,
  TextInputComponent,
  InputContainerComponent,
  TppInputDirective,
  TppBtnDirective,
];

const PRIME_MODULES = [
  TooltipModule,
  FormsModule,
  ButtonModule,
  AutoCompleteModule,
  CalendarModule,
  DialogModule,
  OverlayPanelModule,
];

const MODULES = [CommonModule, IconsModule, ReactiveFormsModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES, ...PRIME_MODULES],
  exports: [...COMPONENTS, ...MODULES, ...PRIME_MODULES],
  providers: [],
})
export class SharedModule {}
