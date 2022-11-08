import { NotificationService } from '@services';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((errorEvent) => {
        if (errorEvent instanceof HttpErrorResponse) {
          this.notificationService.error(
            errorEvent.error.error?.detail || errorEvent.message
          );
        } else {
          this.notificationService.error('Unknown Error');
        }
      })
    );
  }
}
