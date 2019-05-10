import { Component, OnInit  , AfterViewInit , ElementRef , ViewChild , Input , Output , EventEmitter} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/operators';
import {pipe} from 'rxjs';
import {MenuItem , TreeNode} from 'primeng/api';
import * as svcs from '../services/';
import * as models from '../models/';
import { UserADInfo } from '../models/UserADInfo';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { File , Folder } from './../models/file';
@Component({
  selector: 'app-modal-new-folder',
  template: ''
})
export class ModalBaseComponent implements OnInit {

  public onClose: Subject<any>;

  selectedFolder: TreeNode;
  selectedFile: File;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    //console.log('ModalBaseComponent ngOnInit')
     this.onClose = new Subject();
  }

  public showConfirmationModal( selectedFolder: TreeNode , selectedFile: File): void {
    this.selectedFolder = selectedFolder ;
    this.selectedFile = selectedFile ;

  }

  // public onConfirm(): void {
  //   this.onClose.next(true);
  //   this.bsModalRef.hide();
  // }


  public hideConfirmationModal(): void {
    //this.onClose.next(null);
    this.bsModalRef.hide();
  }

  public click(event: any){
    this.onClose.next(event);
    this.bsModalRef.hide();
  }
}
