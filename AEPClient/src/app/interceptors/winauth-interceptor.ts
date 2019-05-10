import { LoaderService } from './../loading/LoaderService';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';




/* import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
 */


@Injectable()
export class WinAuthInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });
    //console.log('WinAuthInterceptor')
    //console.log(req)
    //return next.handle(req);

    if (req.method === 'GET') {
      //  console.log(req.method);

        let d = new Date();
        let n = d.getTime();
        req = req.clone({ params: req.params.set('tt', n.toString()) });

      }

    this.showLoader();



    return next.handle(req).pipe(
      tap(
        event => {
          status = '';
          if (event instanceof HttpResponse) {
            status = 'succeeded';
          }
        },
        error => {
          status = 'failed'
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 || error.status === 403 ) {
            //  console.log('unauthorized');
              // redirect to the login route
              // or show a modal
             // this.loaderService.hide();
             // this.router.navigate(['unauthorized']);
            }
          }

        }
      ) ,
      finalize(() => {
        this.loaderService.hide();
       /*  const elapsedTime = Date.now() - startTime;
        const message = req.method + " " + req.urlWithParams +" "+ status
        + " in " + elapsedTime + "ms";

        this.logDetails(message); */
      })
  );

     /* return next.handle(req)
   .tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
    console.log("HttpInterceptor error ")
    console.log(err)
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403 ) {
          // redirect to the login route
          // or show a modal
        // this.loaderService.hide();
         // this.router.navigate(['unauthorized']);
        }
      }
    })
   .finally(()=> this.loaderService.hide()) */


;




  }


  private showLoader(): void {

     this.loaderService.show();
  }

  private hideLoader(): void {

     this.loaderService.hide();
  }
}
