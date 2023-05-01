import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { GlobalService } from '../services/global.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private snackBar: MatSnackBar,
        private router: Router,
        private globalService: GlobalService
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {

                if (err.error instanceof Error) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', err.error.message);
                } else {
                    if (err.status === 401) {
                        localStorage.removeItem("token");
                        this.snackBar.open("Ups! al parecer el token caduco", 'Cerrar', {
                            verticalPosition: this.verticalPosition,
                        });
                        this.router.navigate(["/home"]);
                        this.globalService.toggleLoading(false);
                    }
                }

                return new Observable();
            })
        )

    }
}