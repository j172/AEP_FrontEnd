import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { MenuItem, TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/primeng';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import * as svcs from '../services';
import { File, Folder, MyCreateFolder } from '../models/file';
import { GroupModel, GroupUserModel } from '../models/Group';

import { CommonModalService } from '../modal/commonModal.service';
import { environment } from '../../environments/environment';

import { DataService }  from '../services/data-service.service';
import { FilesService }  from '../services/files-service.service';
import { AuthenticationService }  from '../services/authentication-service.service';
import { GroupService } from '../services/GroupService';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-page-group',
  templateUrl: './page-group.component.html',
  styleUrls: ['./page-group.component.css']
})
export class PageGroupComponent implements OnInit {
  @ViewChild(Table) dt: Table;
  groups: GroupModel[];
  myGroup: GroupModel;
  lstUser: GroupUserModel[];/////<--
  isDisabled: boolean = false;

  ADUserName: string;
  selectedFolder: TreeNode;
  selectedFile: File;
  selectedGroup: GroupModel;
  message: string = '';
  errMsgs: Message[] = [];

  get ADName(): string  {
    return this.dataSvc.ADName;
   }
   set ADName(value: string ) {
     this.dataSvc.ADName = value;
   }
   get IsAdmin(): boolean  {
    return this.dataSvc.IsAdmin;
   }
   set IsAdmin(value: boolean ) {
     this.dataSvc.IsAdmin = value;
   }
   get IsAuth(): boolean  {
    return this.dataSvc.IsAuth;
   }
   set IsAuth(value: boolean ) {
     this.dataSvc.IsAuth = value;
   }

  private breadcrumbitems: MenuItem[];


  constructor(
    private http: HttpClient,
    private dataSvc: DataService,
    private filesService: FilesService,
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private groupService: GroupService,
    private commonModalService: CommonModalService,

  ) { }

  ngOnInit() {

    this.getGroup();

  }


  queryGroup() {
    this.commonModalService.openSelectModal('modalGroup', this.selectedFolder, this.selectedFile).
      subscribe(result => {
       // console.log('this.commonModalService.openSelectModal');
       // console.log(`typeof result: ${typeof result}`);

      });
  }


  ////////////////////////////////////////////////

  public groupName: string;
  public groupID: number;
  public UserAD: string;


  getGroup() {
    this.groupService.getGroup().subscribe(
      data => {
       // console.log('this.groupService.getGroup()');
        console.log(data);
        this.groups = <GroupModel[]>data;
        this.selectedGroup = this.groups[0];
        console.log(this.groups[0]);
        this.openGroup(this.selectedGroup);
      }
    );
  }


  openGroup(selectGroup) {
    this.selectedGroup = selectGroup;
    if(!Array.isArray(this.selectedGroup.lstGroupUser)){
      this.selectedGroup.lstGroupUser = [];
    }

    //console.log('****** open Group *********');
    //console.log(selectGroup);

    this.myGroup = selectGroup;
    this.groupName = selectGroup.GroupName;
    this.lstUser = selectGroup.lstGroupUser;/////<--
    this.groupID = selectGroup.GroupID;
    this.isDisabled = false;
    //this.checkDuplicate(this.myGroup);
  }

  deleteGroupUser(userAD) {
   console.log('deleteGroupUser');
    console.log(userAD);


    let arrayNo = this.selectedGroup.lstGroupUser.findIndex(x=>x.UserAD === userAD);


    this.selectedGroup.lstGroupUser.splice(arrayNo,1);
    //this.myGroup.lstGroupUser.pop();
	  this.dt.reset();
    this.checkDuplicate(this.myGroup);
  }


  newGroup() {

    this.commonModalService.openSelectModal('modalNewGroup', this.selectedFolder, this.selectedFile).
      subscribe(result => {
       // console.log('********** newGroup ************');
       // console.log(result);
        let groupname = result;
        let group = new GroupModel();

        this.groupService.createGroup(groupname)
          .subscribe(res => {
         //   console.log('this.groupService.createGroup');
         //   console.log(res);
            if (res === -1) {
              this.messageService.add({ severity: 'error', summary: 'New Group', life: 10000, detail: `Group Name cannot be empty!` });
            }
            else if (res === 0) {
              this.messageService.add({ severity: 'error', summary: 'New Group', life: 10000, detail: `Group Name: ${groupname} 已存在，請重新命名!` });
            }
            else {
              const newGroup: GroupModel = <GroupModel>res;
              this.groups.push(newGroup);
              this.messageService.add({ severity: 'success', summary: 'New Group', detail: `${groupname} have been created` });
              this.getGroup();
            }
          })

      });

  }


  saveGroup() {
    this.myGroup.GroupName = this.groupName;
   // console.log(this.myGroup);
    this.groupService.saveGroup(this.myGroup)
      .subscribe(res => {
       // console.log('this.groupService.saveGroup');
       // console.log(res);
        this.messageService.add({ severity: 'success', summary: 'Save Group', detail: `${this.myGroup.GroupName} saved successfully.` });
        //this.getGroup();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Save Group', life: 10000, detail: `${this.myGroup.GroupName} saved failed!` });
      })
  }


  deleteGroup(groupID) {
    console.log('deleteGroup');
    console.log(groupID);
    this.groupService.deleteGroup(groupID)
        .subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Delete Group', detail: `Deleted group done.` });
          this.getGroup();
        })
  }

  //============ DELETE GROUP USER =============
  showConfirm(userAD) {
   // console.log('showConfirm del UserAD ==>' + userAD);
    this.confirmationService.confirm({
      message: 'Are you sure to delete this member?',
      header: 'Delete Confirmation',
      icon: 'fa fa-question-circle',  //'pi-exclamation-triangle',
      accept: () => {
        console.log('accept');
        console.log(this.selectedGroup);
        this.deleteGroupUser(userAD);
        this.openGroup(this.selectedGroup);
        // this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
       // console.log('reject');
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  //============ DELETE GROUP =============
  showDelGroupConfirm() {
    //console.log('showConfirm del GroupName ==>' + this.groupID);
    this.confirmationService.confirm({
      message: 'Are you sure to delete this group and all members of it?',
      header: 'Delete Confirmation',
      //icon: 'pi-exclamation-triangle',
      icon: 'fa fa-question-circle',
      accept: () => {
        //console.log('accept');
        this.deleteGroup(this.selectedGroup.GroupID);
        // this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
      },
      reject: () => {
        //console.log('reject');
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }



  addGroupUser() {

    //this.displayAddUser = true;
    this.commonModalService.openSelectModal('modalADNoPermission', this.selectedFolder, this.selectedFile).
      subscribe(result => {

        let userad = '';
        if (result.data === undefined) {
          userad = result.UserAD;
        } else {
          userad = result.data.samaccountname;
        }

        if(this.checkDuplicate_Single(this.selectedGroup , userad)===false)
        {
          let m = new GroupUserModel();
          m.GroupID = this.selectedGroup.GroupID;
          m.UserAD = userad;
          this.selectedGroup.lstGroupUser.push(m);
        }
        console.log('************ add Group User ***************')
        console.log(this.selectedGroup);
        console.log(this.groups);

        this.dt.reset();
        this.checkDuplicate(this.selectedGroup);

       });

  }

  showUpload() {
   // console.log('////////////// Show Upload ///////////////');
   // console.log(this.groupID);
    this.commonModalService.openSelectModal('modalUploadMemberList', null,null)
      .subscribe(result => {
        let s = 0;
        let t = 0;
        result.forEach(row => {

          if(this.checkDuplicate_Single(this.selectedGroup , row)===false)
          {
            let m = new GroupUserModel();
            m.GroupID = this.selectedGroup.GroupID;
            m.UserAD = row;
            
            this.selectedGroup.lstGroupUser.push(m);
          }
          
        });

        this.dt.reset();
        // let errRowCount = t - s;        
        console.log(this.selectedGroup.lstGroupUser);        
        this.checkDuplicate(this.selectedGroup);

      });

  }

  checkDuplicate_Single(myGroup , UserAD) {

    let isDuplicate: boolean = false; //檢查是否有重覆值
    this.isDisabled = false;
    let find = myGroup.lstGroupUser.find(x=>x.UserAD.toUpperCase() === UserAD.toUpperCase());
    if(find!==undefined){
         this.messageService.add({ severity: 'warn', summary: 'Group Member', life: 10000, detail: `userad: ${UserAD} is duplicated, system will ingore it!` });
         isDuplicate = true;
    }

    return isDuplicate;
  }


  checkDuplicate(myGroup) {

    let isDuplicate: boolean = false; //檢查是否有重覆
    let dupAD: string = "";
    this.isDisabled = false;


    console.log('checkDuplicate');
    console.log(myGroup.lstGroupUser);
    // let repeat = myGroup.lstGroupUser.filter(function (element, index, arr) {
    //   console.log(element);
    //   console.log(index);
    //   console.log(arr);
    //   console.log('//==========================//');
    //   return arr.indexOf(element) !== index;            
    // });
    // console.log('檢查是否有重覆===>');
    // console.log(repeat);
    // repeat.forEach(item => {
    //   isDuplicate = true;
    //   dupAD += `${item}, `;
    //   console.log(dupAD);
    // })
    myGroup.lstGroupUser.forEach(item => {
      let users = myGroup.lstGroupUser.filter(x=>x.UserAD.toUpperCase() === item.UserAD.toUpperCase());
      if(Array.isArray(users) && users.length>1){
          isDuplicate = true;
          dupAD += users[0].UserAD + ", ";
      }
      //console.log(users)
    });


    if (isDuplicate) {
      this.isDisabled = true;
      this.messageService.add({ severity: 'warn', summary: 'Group Member', life: 10000, detail: `Please check your member list, user AD account has duplicate: ${dupAD}!` });
      //this.errMsgs.push({ severity: 'warn', summary: 'Warning Message', detail:`Please check your member list, user AD account has duplicate: ${dupAD}!` });
      console.log(`duplicate: ${dupAD}`);
      return false;
    }

  }
  

}
