import { Component, OnInit } from '@angular/core';
import { ModalBaseComponent } from './../modal-base.component';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MessageService } from 'primeng/primeng';
//import { CommonModalService } from '../../modal/commonModal.service';
//import { Group, GroupUser } from '../../models/Group';

@Component({
  selector: 'app-modal-new-group',
  templateUrl: './modal-new-group.component.html',
  styleUrls: ['./modal-new-group.component.css']
})
export class ModalNewGroupComponent extends ModalBaseComponent implements OnInit {

  public isValid: boolean = true;
  groupName: string;
  groupID: number;
  // groups: Group[];
  // myGroup: Group;
  // lstGroupUser: GroupUser[];

  constructor(public bsModalRef: BsModalRef,
    private messageService: MessageService,
    //private commonModalService: CommonModalService,
  ) {
    super(bsModalRef);
  }

  ngOnInit() {
    //console.log('isValid ==> '+ this.isValid);
    //console.log('ModalNewGroupComponent ngOnInit')
    super.ngOnInit();
  }
  click() {

      super.click(this.groupName);

  }



  // addGroupUser() {
  //   //this.displayAddUser = true;
  //   this.commonModalService.openSelectModal('modalAD', this.selectedFolder, this.selectedFile).
  //     subscribe(result => {
  //       console.log('this.commonModalService.openSelectModal');
  //       console.log(result.data.samaccountname);
  //       console.log(`typeof result: ${typeof result}`);

  //       let m = new GroupUser();
  //       m.GroupID = this.groupID;
  //       m.UserAD = result.data.samaccountname;

  //       this.lstGroupUser.push(m);
  //       // this.groupService
  //       //   .addGroupUser(this.groupID, result.data.samaccountname)
  //       //   .subscribe(res => {
  //       //     console.log('this is this.groupService - addGroupUser');
  //       //     console.log(res);
  //       //     this.messageService.add({ severity: 'success', summary: 'Add Group Member', detail: `Add OK!` });
  //       //   });

  //     });
  // }

  // showUpload() {
  //   this.commonModalService.openUploadModal('modalUploadMemberList', this.myGroup, null)
  //     .subscribe(result => {
  //       console.log('this is commonModalService.openUploadModal');
  //       console.log(result);

  //     });
  // }

}
