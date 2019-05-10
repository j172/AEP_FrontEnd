import { Component, OnInit  , AfterViewInit , ElementRef , ViewChild , Input , Output , EventEmitter} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/operators';
import {pipe} from 'rxjs'


import * as models from '../../models';
import { UserADInfo } from '../../models/UserADInfo';
import { FolderAuthModel } from '../../models/FolderAuthModel';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DataService }  from '../../services/data-service.service';
import { FilesService }  from '../../services/files-service.service';
import { AuthenticationService }  from '../../services/authentication-service.service';


@Component({
  selector: 'app-query-ad-nopermission',
  templateUrl: './query-ad-nopermission.component.html',
  styleUrls: ['./query-ad-nopermission.component.css']
})
export class QueryAdNoPermissionComponent implements OnInit {


  public onClose: Subject<any>;
  public searchString: string;
  public modalPage: string ='customer';


   selectedValue: string = '1';


  public searchField: FormControl;



  adlist: UserADInfo[];
  cols: any[];
  selectedAD: UserADInfo;
  folderAuth: FolderAuthModel;

  // openDialog$ = new Subject<boolean>();

  constructor( private dataSvc: DataService,
              private filesService: FilesService,
              private authenticationService: AuthenticationService,
              public bsModalRef: BsModalRef) {
  //  console.log('QueryAdComponent constructor')

    this.folderAuth = new FolderAuthModel();
  }


  ngOnInit() {
    this.onClose = new Subject();
    this.cols = [
      { field: 'samaccountname', header: 'samaccountname' },
      { field: 'telephonenumber', header: 'telephonenumber' },
      { field: 'employeeid', header: 'employeeid' }
  ];


    this.searchField = new FormControl();
    this.searchField.valueChanges.pipe(
        debounceTime(400),
       distinctUntilChanged())
      .subscribe(value => {

        if (value && value.toString().length >3) {
              this.authenticationService.getAD(value).subscribe(
                res=>{
                     this.adlist = <UserADInfo[]>res;
                     // console.log(this.adlist );
                }
              );
        }//if

      }); // Need to call subscribe to make it hot!
  }



  onRowSelect(event) {
    //console.log('onRowSelect')
    //console.log(event)
    this.selectedAD = event;

 }
 onRowUnselect($event){
 // console.log('onRowUnselect')
 // console.log(event)

 }

 public showConfirmationModal(): void {

}

public onConfirm(): void {
  this.onClose.next(true);
  this.bsModalRef.hide();
}


public hideConfirmationModal(): void {
  this.onClose.next(null);
  this.bsModalRef.hide();
}




click(){

console.log('this.selectedAD.samaccountname')
console.log(this.selectedAD.samaccountname)
console.log(this.selectedAD)

let myselectedAD:any = this.selectedAD;
myselectedAD = myselectedAD.data.samaccountname;



    this.folderAuth.UserAD = myselectedAD;;
    this.folderAuth.FolderAuth = parseInt(this.selectedValue);


    this.searchString = null;
    this.modalPage = null;
    this.onClose.next(this.folderAuth);
    this.bsModalRef.hide();
}



}
