import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MenuItem, TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/primeng';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { pipe } from 'rxjs'

import { DataService } from '../../services/data-service.service';
import { FilesService } from '../../services/files-service.service';
import { AuthenticationService } from '../../services/authentication-service.service';

import * as models from '../../models/';
import { UserADInfo } from '../../models/UserADInfo';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { File, Folder } from './../../models/file';
import { ModalBaseComponent } from './../modal-base.component';

@Component({
  selector: 'app-modal-change-folderowner',
  templateUrl: './modal-change-folderowner.component.html',
  styleUrls: ['./modal-change-folderowner.component.css']
})
export class ModalChangeFolderownerComponent extends ModalBaseComponent implements OnInit {

  // public onClose: Subject<any>;
  public searchString: string;
  public modalPage: string = 'customer';

  //selectedFolder: TreeNode;
  //selectedFile: File;
  selectedValue: string = '1';
  public searchField: FormControl;

  adlist: UserADInfo[];
  cols: any[];
  selectedAD: UserADInfo;
  myfolderID: number;
  public folderOwner: string;

  constructor(
    private dataSvc: DataService,
    private filesService: FilesService,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,

    public bsModalRef: BsModalRef) {
    super(bsModalRef);
  }

  ngOnInit() {

    super.ngOnInit();
    console.log('this is modal-change-folderowner MODAL');
    //  this.onClose = new Subject();

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

        if (value && value.toString().length > 3) {
          this.authenticationService.getAD(value).subscribe(
            res => {
              this.adlist = <UserADInfo[]>res;
              //    console.log(this.adlist);
            }
          );
        }//if

      }); // Need to call subscribe to make it hot!
  }

  onRowSelect(event) {
    console.log('onRowSelect')
    console.log(event)
    this.selectedAD = event.data.samaccountname;


  }
  onRowUnselect($event) {
    console.log('onRowUnselect')
    console.log(event)

  }

  public showConfirmationModal(selectedFolder): void {
    console.log('>>>>> showCOnfirmationModal <<<<<<');
    console.log(selectedFolder);
    this.folderOwner = selectedFolder.data.owner;
    this.myfolderID = selectedFolder.data.id;
  }



  click() {

    console.log(this.myfolderID);
    console.log('^^^^^^^^^^^^');
    console.log(this.selectedAD);

    this.searchString = null;
    this.modalPage = null;
    // this.onClose.next(this.selectedAD);
    // this.bsModalRef.hide(); 
    this.filesService.changeFolderOwner(this.myfolderID, this.selectedAD)
      .subscribe(res => {
        location.reload();
        this.messageService.add({ severity: 'success', summary: 'Folder owner change', detail: `Folder owner changed to ${this.selectedAD} done.` });
      })
    this.bsModalRef.hide();
  }


}
