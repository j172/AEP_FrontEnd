import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { MenuItem, TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { File, Folder, MyCreateFolder } from '../../models/file';
import { FolderAuthModel, FolderAuthMainModel } from '../../models/FolderAuthModel';
import { GroupUserModel } from '../../models/group';
import { CommonModalService } from '../../modal/commonModal.service';


import { LoaderService } from '../../loading/LoaderService';
import { FilesService } from '../../services/files-service.service';
import { DataService } from '../../services/data-service.service';
import { GroupService } from '../../services/GroupService';

@Component({
  selector: 'app-modal-folder-permission',
  templateUrl: './modal-folder-permission.component.html',
  styleUrls: ['./modal-folder-permission.component.css']
})
export class ModalFolderPermissionComponent implements OnInit {

  @ViewChild(Table) dt: Table;
  selectedFolder: TreeNode;
  selectedFile: File;
  folderID: number;
  folderName: string;
  cols: any[];

  lstFolderAuth: FolderAuthModel[];
  myFolderAuthMain: FolderAuthMainModel;
  lstGroupUser: GroupUserModel[];

  public onClose: Subject<any>;

  constructor(
    private http: HttpClient,
    public bsModalRef: BsModalRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private commonModalService: CommonModalService,
    private dataService: DataService,
    private filesService: FilesService,
    private groupService: GroupService
  ) {
    this.lstFolderAuth = [];
    this.myFolderAuthMain = new FolderAuthMainModel();
    this.myFolderAuthMain.IsAuthInherit = true;
  }

  ngOnInit() {
    this.onClose = new Subject();
    console.log('folder permission OnInit');
    this.cols = [
      { field: 'ADName', header: 'ADName' }
    ];
  }

  public showConfirmationModal(selectedFolder): void {
    this.selectedFolder = selectedFolder;
    this.folderID = selectedFolder.data.id;
    this.folderName = selectedFolder.label;
    console.log('this is showConfirmationModal ==> FolderID = ' + this.folderID + '; name: ' + this.folderName);
    ///////// add by Amy, 2019/5/9 ////////////
    //if (this.folderID == 0) {
    //  this.myFolderAuthMain.IsAuthInherit = false;
    //}
    console.log('myFolderAuthMain.IsAuthInherit:' + this.myFolderAuthMain.IsAuthInherit);
    ////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    this.getFolderUser();
  }
  public hideConfirmationModal(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
  public onConfirm(): void {
    //this.onClose.next(true);
    //this.bsModalRef.hide();
  }


  getFolderUser() {
    console.log('this is getFolderUser ==> FolderID = ' + this.folderID);
    this.filesService.getFolderAuth(this.folderID)
      .subscribe(res => {
        this.myFolderAuthMain = <FolderAuthMainModel>res;
        this.lstFolderAuth = this.myFolderAuthMain.lstFolderAuth;
        console.log(this.lstFolderAuth);
      })
    //if (this.lstFolderAuth.i)
  }

  //>>>>>>>>>>> 原本是取消打勾，改成要繼承父階 >>>>>>>>>>>>
  GetParentAuth() {
    if (this.myFolderAuthMain.IsAuthInherit) {
      console.log('>>>>>> Checked Inherit >>>>>>>>>');
      console.log(this.selectedFolder.parent.data.id);
      console.log(this.folderID);

      this.filesService.getFolderAuth(this.selectedFolder.parent.data.id)
        .subscribe(res => {
          this.myFolderAuthMain = <FolderAuthMainModel>res;
          this.lstFolderAuth = this.myFolderAuthMain.lstFolderAuth;
          console.log(this.lstFolderAuth);
          ////////////////////////////////////////////////
          this.myFolderAuthMain.FolderID = this.folderID;
          this.myFolderAuthMain.lstFolderAuth.forEach(row => {
            row.FolderID = this.folderID;
          })
          this.myFolderAuthMain.IsAuthInherit = true;
        })

      console.log('>>> final Auth >>>');
      console.log(this.myFolderAuthMain);
    }
  }

  addFolderUser() {

    //this.displayAddUser = true;
    this.commonModalService.openSelectModal('modalAD', this.selectedFolder, this.selectedFile).
      subscribe(result => {
        console.log('this.commonModalService.openSelectModal');
        //console.log(result.data.samaccountname);
        //console.log(`typeof result: ${typeof result}`);
        console.log('=====> return result =====>');
        console.log(result);

        console.log('目前的資料夾名稱：');
        console.log(this.folderName);

        let m = new FolderAuthModel();
        m.FolderID = this.folderID;
        m.FolderName = this.folderName;
        m.UserAD = result.UserAD;//result.data.samaccountname;
        m.FolderAuth = result.FolderAuth;
        m.AuthType = 1;

        this.lstFolderAuth.push(m);

        console.log('/*/*/*/*/*/*/*/*/**/*/');
        console.log(this.lstFolderAuth);
      });
  }

  addFolderGroup() {
    this.commonModalService.openSelectModal('modalGroup', this.selectedFolder, this.selectedFile).
      subscribe(result => {
        console.log('addFolderGroup');
        //console.log(result.data.samaccountname);
        console.log('=====> return result =====>');
        console.log(result);
        //console.log(`typeof result: ${typeof result}`);
        let lstFolderGroupsAuthModel = <FolderAuthModel[]>result;

        lstFolderGroupsAuthModel.forEach(item => {

          let m = new FolderAuthModel();
          m.FolderID = this.folderID;
          m.FolderName = this.folderName;
          m.GroupID = item.GroupID;
          m.GroupName = item.GroupName;
          m.FolderAuth = item.FolderAuth;
          m.AuthType = 2;
          this.lstFolderAuth.push(m);
        });

        console.log('/*/*/*/*/*/*/*/*/**/*/');
        console.log(this.lstFolderAuth);
      });
  }

  showUpload() {
    console.log('////////////// Show Upload ///////////////');
    console.log(this.folderID);
    this.commonModalService.openSelectModal('modalUploadMemberList', null, null)
      .subscribe(result => {
        console.log('★ ★ ★ this is commonModalService.openUploadModal');
        console.log(result);

        result.forEach(row => {
          let m = new FolderAuthModel();
          m.FolderID = this.folderID;
          m.FolderName = this.folderName;
          m.UserAD = row;
          m.FolderAuth = 1;
          m.AuthType = 1;
          this.lstFolderAuth.push(m);
        });
        console.log(this.lstFolderAuth);
        console.log('^^^^^^^^^^^^^^^^^^^^^');
        this.dt.reset();
      });

  }

  showConfirm(AuthType, UserAD, GroupID) {
    //console.log('showConfirm del UserAD ==>' + userAD);
    this.confirmationService.confirm({
      message: 'Are you sure to delete this member?',
      header: 'Delete Confirmation',
      icon: 'fa fa-question-circle',  //'pi-exclamation-triangle',
      accept: () => {
        console.log('accept');
        this.deleteGroupUser(AuthType, UserAD, GroupID);
      },
      reject: () => {
        console.log('reject');
      }
    });
  }

  deleteGroupUser(AuthType, pUserAD, GroupID) {

    console.log('deleteGroupUser');
    console.log(AuthType);
    console.log(pUserAD);
    console.log(GroupID);

    let arrayNo = 0
    if (AuthType === 1) {
      console.log('///// AuthType: 1 (User) //////');
      arrayNo = this.lstFolderAuth.findIndex(item => item.UserAD == pUserAD);

    } else if (AuthType === 2) {
      console.log('///// AuthType: 2 (Group) //////');
      arrayNo = this.lstFolderAuth.findIndex(item => item.GroupID === GroupID);

    }

    this.lstFolderAuth.splice(arrayNo, 1);
    this.dt.reset();
  }

  saveFolderAuth() {
    console.log('● ● ● ● ● ● ● ● ● ● ●')
    this.filesService.saveFolderAuth(this.myFolderAuthMain)
      .subscribe(res => {
        console.log('>>>>> this is save Folder Auth <<<<<<');
        console.log(res);
        this.messageService.add({ severity: 'success', summary: 'Save Folder Auth', detail: 'Saved successfully.' });
      },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Save Folder Auth', life: 10000, detail: 'Saved failed.' });
        });
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
