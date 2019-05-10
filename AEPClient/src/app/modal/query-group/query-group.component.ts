import { Component, OnInit  , AfterViewInit , ElementRef , ViewChild , Input , Output , EventEmitter} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl } from '@angular/forms';

import { pipe } from 'rxjs'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/operators';
import {MenuItem , TreeNode} from 'primeng/api';


import * as models from '../../models/';
import { UserADInfo } from '../../models/UserADInfo';
import { GroupModel, GroupUserModel } from '../../models/Group';
import { FolderAuthModel } from '../../models/FolderAuthModel';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DataService }  from '../../services/data-service.service';
import { FilesService }  from '../../services/files-service.service';
import { AuthenticationService }  from '../../services/authentication-service.service';
import { GroupService } from '../../services/GroupService';



@Component({
  selector: 'app-query-group',
  templateUrl: './query-group.component.html',
  styleUrls: ['./query-group.component.css']
})
export class QueryGroupComponent implements OnInit {

  selectedFolder: TreeNode;
  public searchField: FormControl;
  public onClose: Subject<any>;
  public searchString: string;
  public modalPage: string = 'customer';

  selectedValue: string = '1';



  grouplist: GroupModel[];
  cols: any[];
  gcols: any[];
  selectedGroups: GroupModel[];
  lstGroupUser: GroupUserModel[];

  lstFolderAuth: FolderAuthModel[];

  constructor(private dataSvc: DataService,
    private filesService: FilesService,
    private authenticationService: AuthenticationService,
    private groupService: GroupService,
    public bsModalRef: BsModalRef) {

      //this.folderAuth = new FolderAuthModel();
     }

  ngOnInit() {

    this.onClose = new Subject();
    this.cols = [
      { field: 'GroupID', header: 'GroupID' },
      { field: 'GroupName', header: 'GroupName' }
      // { field: 'samaccountname', header: 'samaccountname' },
      // { field: 'telephonenumber', header: 'telephonenumber' },
      // { field: 'employeeid', header: 'employeeid' }
    ];

    this.gcols = [
      { field: 'ADName', header: 'ADName' }
    ];

    //--- 預設將所有的group全帶出來
    this.groupService.getGroup()
      .subscribe(res => {
        this.grouplist = <GroupModel[]>res;
        console.log('********** this.grouplist **********');
        console.log(this.grouplist);
      });

    //--- 有輸入查詢的group時
    this.searchField = new FormControl();
    this.searchField.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(data => {
      if (data && data.toString().length > 1) {
        this.groupService.getGroupWithName(data)
          .subscribe(res => {
            this.grouplist = <GroupModel[]>res;
            console.log(this.grouplist);
          });
      }
    });

  }

  onRowSelect(event) {
    //console.log('onRowSelect')
    //console.log(event)
    //this.selectedGroups.push(event)// = event;
    //this.grouplist.push(event);
    //console.log(this.selectedGroup);

  }
  onRowUnselect($event) {
   // console.log('onRowUnselect')
    //console.log(event)
    //console.log(this.selectedGroup);

  }

  public showConfirmationModal(selectedFolder): void {
    console.log('>>>>> showCOnfirmationModal <<<<<<');
    console.log(selectedFolder);
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

    console.log(event);
    console.log('######### Show this.selectedGroups ##############');
    console.log(this.selectedGroups);
    console.log(this.selectedValue);

    if(this.lstFolderAuth==null && !Array.isArray(this.lstFolderAuth)){
      this.lstFolderAuth = [];
    }
    // ==> 多選 >>>
    this.selectedGroups.forEach(element => {
        let m = new FolderAuthModel();
        m.GroupID = element.GroupID;
        m.GroupName = element.GroupName;
        m.FolderAuth = parseInt(this.selectedValue);
        this.lstFolderAuth.push(m);
    });

    console.log(this.lstFolderAuth);


    this.searchString = null;
    this.modalPage = null;
    this.onClose.next(this.lstFolderAuth);
    this.bsModalRef.hide();
  }


  getGroupMember(gid) {
    console.log(gid);
    this.groupService.getGroupMember(gid)
      .subscribe(result => {
        console.log(result);
        /////////////////////////
        this.lstGroupUser = <GroupUserModel[]>result;
        
        console.log(this.lstGroupUser);

      });

  }

}
