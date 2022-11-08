import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TppLibRefreshService } from 'tpp-lib-refresh';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeModule } from './prime.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule as InternalSharedModule } from '@shared';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { BlockUIModule } from 'ng-block-ui';
import { ExampleComponent } from './components/example/example.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent, ExampleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InternalSharedModule,
    PrimeModule,
    BlockUIModule.forRoot(),
    // TppLibRefreshModule.forRoot({ url: environment.credentialsEndpoint }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-PE' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TppLibRefreshService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
