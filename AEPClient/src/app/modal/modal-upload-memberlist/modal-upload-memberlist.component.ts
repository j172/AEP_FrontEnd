import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ModalBaseComponent } from './../modal-base.component';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/primeng';
//import { Message } from 'primeng/api';
import { GroupModel, GroupUserModel, UserModel } from '../../models/Group';
import { GroupService } from '../../services/GroupService';
import { delay } from 'q';


@Component({
  selector: 'app-modal-upload-memberlist',
  templateUrl: './modal-upload-memberlist.component.html',
  styleUrls: ['./modal-upload-memberlist.component.css']
})

//export class ModalUploadMemberlistComponent extends ModalBaseComponent implements OnInit {
export class ModalUploadMemberlistComponent extends ModalBaseComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef,
    private messageService: MessageService,
    private groupService: GroupService, ) {
    super(bsModalRef);
  }


  //errMsgs: Message[] = [];

  //public onClose: Subject<any>;
  //groups: GroupModel[];
  //myGroup: GroupModel;
  //lstGroupUser: GroupUserModel[];
  //groupID: number;

  ngOnInit() {
    //this.onClose = new Subject();
    super.ngOnInit();
  }

  /* public showConfirmationModal(groupID: number): void {
    this.groupID = groupID;
    console.log('this is showConfirmationModal ==> groupID = ' + groupID);
  }

  // public onConfirm(): void {
  //   this.onClose.next(true);
  //   this.bsModalRef.hide();
  // }


  public hideConfirmationModal(): void {
    //this.onClose.next(null);
    this.bsModalRef.hide();
  } */


  /////////////// Upload Member List //////////////////
  //rowindex: number = 0;
  message: string = '';
  lstUser = [];
  lstGroupUser = [];

  onCompleted(event) {

    // var inputValue = event.target;
    // let fileName = inputValue.files[0].name;
    // let fileExtension = fileName.split('.').pop();
    // console.log('副檔名=> ' + fileExtension);

    // if (fileExtension != 'xls' && fileExtension != 'xlsx') {
    //   this.messageService.add({ severity: 'error', summary: 'Error Message', detail: `Please choose excel file!` });
    // 	return false;
    // }

    //console.log('this is in modal-upload-memberlist.component.ts ==> onCompleted()');
    //console.log('this.groupID ==> ' + this.groupID);
    //console.log(event);


    //let lstUser = [];
    //let lstGroupUser: GroupUserModel[] = [];
    let rowindex = 0;
    let errRowCount = 0;
    let complate: boolean = false;

    let totalRow: number = 0;
    event.forEach(element => {
      totalRow++;
    });
    console.log('totalRow = ' + totalRow);

    event.forEach(row => {
      rowindex++;
      // let m = new GroupUserModel();

      if (rowindex >= 1) {

        let user = row[0].trim();//.replace(' ', '');
        user = user.replace('　', '');
        user = user.replace('@compal.com', '');

        if (user) {

          if (user.indexOf('.') != -1 || user.indexOf('(') != -1 || user.indexOf('%') != -1 || user.indexOf('/') != -1 ||
            user.indexOf('|') != -1 || user.indexOf('$') != -1 || user.indexOf('#') != -1 || user.indexOf('<') != -1 ||
            user.indexOf('-') != -1 || user.indexOf('&') != -1 || user.indexOf('*') != -1 || user.indexOf('~') != -1 ||
            user.indexOf('?') != -1 || user.indexOf(',') != -1 || user.indexOf('\'') != -1 || user.indexOf('\\') != -1) {
            this.message += user + ', ';
            errRowCount = errRowCount + 1;
          } else {
            this.lstUser.push(user);
          }
        }
      }
    });
    this.message += " format error! ";

    //errRowCount + errRowCount + this.checkADAccount(this.lstUser);
    if (rowindex === totalRow) {
      this.checkADAccount(this.lstUser, totalRow, errRowCount);
    }

  }


  checkADAccount(lstUser, totalCount, errCount) {

    let errRowCount: number = errCount + 0;
    let i = 0;
    let lstResp = [];
    let lstTemp = [];

    this.groupService.checkADListIsExist(lstUser)
      .toPromise()
      .then(response => {
        console.log(response);
        //this.lstGroupUser = <[]>response;
        //super.click(this.lstGroupUser);

        lstResp = <UserModel[]>response;
        lstResp.forEach(row => {
          if (row.toString().indexOf('is not exist!') == -1) {
            lstTemp[i] = row;
          } else {
            errRowCount += 1;
            this.message += row + "\n";
          }
          i++;
        });
      })
      .then(response => {

        console.log('--------- lstTemp --------');
        console.log(lstTemp);

        let result = lstTemp.filter(function (element, index, arr) {
          return arr.indexOf(element) === index;            
        });
        let repeat = lstTemp.filter(function (element, index, arr) {
          return arr.indexOf(element) !== index;            
        });
         
        result.forEach(item => {
          this.lstGroupUser.push(item);
        })

        repeat.forEach(item => {
          errRowCount += 1;
          this.message += `${item} duplicate! \n`;
        })


        // console.log('--------- this.lstGroupUser.push(item) DONE --------');
        // console.log(this.lstGroupUser);
        // console.log(`此次上傳 ${totalCount} 筆，成功 ${totalCount - errRowCount} 筆，失敗 ${errRowCount} 筆. <br/>錯誤如下：<br/>${this.message}`);

          if (errRowCount > 0) {
            //this.errMsgs.push({ severity: 'error', summary: 'Error Message', detail: `此次上傳 ${totalCount} 筆，成功 ${totalCount - errRowCount} 筆，失敗 ${errRowCount} 筆. <br/>錯誤如下：<br/>${this.message}` });
            this.messageService.add({ severity: 'error', summary: 'Error Message', life: 10000, detail: `Total Upload Count: ${totalCount} , Successful Count: ${(totalCount - errRowCount)} , Failed Count: ${errRowCount} . Error Message：\n${this.message}` });
          } else {
            //this.errMsgs.push({ severity: 'success', summary: 'Success Message', detail: `此次上傳 ${totalCount} 筆，成功 ${totalCount - errRowCount} 筆，失敗 ${errRowCount} 筆.` });
            this.messageService.add({ severity: 'success', summary: 'Success Message', detail: `Total Upload Count: ${totalCount} , Successful Count: ${totalCount - errRowCount} , Failed Count: ${errRowCount} .` });
          }

        super.click(this.lstGroupUser);
      })
      .catch(error => {
        console.log(error);
        //return Observable.throw(error);
      });

      

  }

  // callSuperPage(totalCount, errRowCount) {

  //   if (errRowCount > 0) {
  //     console.log('Step 3 done. [error] ');
  //     this.errMsgs.push({ severity: 'error', summary: 'Error Message', detail: `此次上傳 ${totalCount} 筆，成功 ${totalCount - errRowCount} 筆，失敗 ${errRowCount} 筆. <br/>${this.message}` });
  //     console.log(`此次上傳 ${totalCount} 筆，成功 ${totalCount - errRowCount} 筆，失敗 ${errRowCount} 筆. <br/>${this.message}`);
  //     super.click(this.lstGroupUser);
  //   } else {
  //     console.log('Step 3 done. [success]');
  //     this.messageService.add({ severity: 'success', summary: 'Success Message', detail: `此次上傳 ${totalCount} 筆，成功 ${totalCount} 筆，失敗 ${errRowCount} 筆.` });
  //     super.click(this.lstGroupUser);
  //   }
  //   //super.click(this.lstGroupUser);
  // }


  /*  uploadUser(dataGroup: GroupUserModel[]) {
     this.groupService.uploadGroupUser(dataGroup)
         .subscribe(data => {
           this.messageService.add({ severity: 'success', summary: 'Upload Member', detail: `Upload ${dataGroup.length} records successful!` });
         }, error => {
           this.messageService.add({ severity: 'error', summary: 'Upload Member', detail: `Upload ${dataGroup.length} records faild!` });
         });
   } */



}
