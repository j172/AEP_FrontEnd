import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from './LoaderState';
@Injectable()
export class LoaderService {
private loaderSubject = new Subject<LoaderState>();
loaderState = this.loaderSubject.asObservable();
count: number;
constructor() {
  this.count = 0 ;
}
show() {
        this.count++;
        this.loaderSubject.next(<LoaderState>{show: true});
    }
hide() {
    this.count--;
    if(this.count<=0) {
      this.loaderSubject.next(<LoaderState>{show: false});
    }
  }
}
