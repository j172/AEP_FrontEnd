import { Component, OnInit , OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from '../LoaderService';
import { LoaderState } from '../LoaderState';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit , OnDestroy {

    show = false;

    private subscription: any;

    constructor(
        private loaderService: LoaderService
    ) { }

    ngOnInit() {

        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
             });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
