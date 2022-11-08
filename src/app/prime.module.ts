import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/api';

const MODULES = [SharedModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class PrimeModule {}
