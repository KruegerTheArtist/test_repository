import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApplicationEventService } from './application-event.service';
import { ResponseCodeExt } from '../enum/response-code.enum';
import { Response } from '../models/response.model';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InternalServerErrorInterceptorService implements HttpInterceptor {
    sub: Subscription;
    constructor(private snackBar: MatSnackBar,
        private eventService: ApplicationEventService) {
        this.sub = eventService.listenErrorEvent().subscribe(error => this.showErrorMessage(error));
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req);
    };

    showErrorMessage(error: Response) {
        if (ResponseCodeExt.isErrorResponse(error.code) && error.message) {
            console.warn(error.message);
            this.snackBar.open(error.message, 'Закрыть', {
                duration: 3600000, // 1 час
            });
        }
    }
}
