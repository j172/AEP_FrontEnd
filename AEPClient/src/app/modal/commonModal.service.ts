
import { QueryAdComponent } from './query-ad/query-ad.component';
import { QueryAdNoPermissionComponent } from './query-ad-nopermission/query-ad-nopermission.component';

import { Injectable , OnDestroy } from '@angular/core';
import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable,  Subject } from 'rxjs';
import { QueryGroupComponent } from './query-group/query-group.component';
import { ModalCheckinSinglefileComponent } from './modal-checkin-singlefile/modal-checkin-singlefile.component';
import { ModalCheckinMultifilesComponent } from './modal-checkin-multifiles/modal-checkin-multifiles.component';
import {MenuItem , TreeNode} from 'primeng/api';
//import { File, Folder, MyCreateFolder } from '../models/file';
import { File , Folder } from './../models/file';
import { GroupModel, GroupUserModel } from './../models/Group';
import { ModalNewFolderComponent } from './modal-new-folder/modal-new-folder.component';
import { ModalUploadMemberlistComponent } from './modal-upload-memberlist/modal-upload-memberlist.component';
import { ModalNewGroupComponent } from './modal-new-group/modal-new-group.component';
import { ModalFileInfoComponent } from './modal-file-info/modal-file-info.component';
import { ModalFileHistoryComponent } from './modal-file-history/modal-file-history.component';
import { ModalChangeFolderownerComponent } from './modal-change-folderowner/modal-change-folderowner.component';
import { ModalFolderPermissionComponent } from './modal-folder-permission/modal-folder-permission.component';
import { ModalFolderModifyComponent } from './modal-folder-modify/modal-folder-modify.component';
import { ModalMyCheckOutListComponent } from './modal-my-check-out-list/modal-my-check-out-list.component';
import { ModalMyAlertmeListComponent } from './modal-my-alertme-list/modal-my-alertme-list.component';
import { ModalSearchComponent } from './modal-search/modal-search.component';


@Injectable()
export class CommonModalService implements OnDestroy {

  config = {
    class: 'gray modal-lg',
    backdrop: true,
    ignoreBackdropClick: true
  };


  config2 = {
    class: 'gray modal-lg12',
    backdrop: true,
    ignoreBackdropClick: true
  };

  bsModalRef: BsModalRef;
  public subject = new Subject<any>();
  constructor(private modalService: BsModalService) {

  }
  ngOnDestroy() {
   // console.log('Service destroy')
  }
  public openSelectModal(modalPage: string, selectedFolder: TreeNode, selectedFile: File): Observable<any> {


    if(modalPage==='modalAD'){
      const modal = this.modalService.show(QueryAdComponent, this.config);
      (<QueryAdComponent>modal.content).showConfirmationModal();
       return (<QueryAdComponent>modal.content).onClose ;
    }
    if(modalPage==='modalADNoPermission'){
      const modal = this.modalService.show(QueryAdNoPermissionComponent, this.config);
      (<QueryAdNoPermissionComponent>modal.content).showConfirmationModal();
       return (<QueryAdNoPermissionComponent>modal.content).onClose ;
    }
    else if(modalPage==='modalGroup'){
      const modal = this.modalService.show(QueryGroupComponent, this.config);
      (<QueryGroupComponent>modal.content).showConfirmationModal(null);
       return (<QueryGroupComponent>modal.content).onClose ;
    }
    else if(modalPage==='modalCheckinSinglefile'){
      const modal = this.modalService.show(ModalCheckinSinglefileComponent, this.config);
      (<ModalCheckinSinglefileComponent>modal.content).showConfirmationModal(selectedFolder , selectedFile);
       return (<ModalCheckinSinglefileComponent>modal.content).onClose ;
    }
    else if(modalPage==='modalCheckinMultifiles'){
      const modal = this.modalService.show(ModalCheckinMultifilesComponent, this.config);
      (<ModalCheckinMultifilesComponent>modal.content).showConfirmationModal(selectedFolder, selectedFile);
       return (<ModalCheckinMultifilesComponent>modal.content).onClose ;
    }
    else if(modalPage==='modalNewFolder'){
      const modal = this.modalService.show(ModalNewFolderComponent, this.config);
      (<ModalNewFolderComponent>modal.content).showConfirmationModal(selectedFolder, selectedFile);
       return (<ModalNewFolderComponent>modal.content).onClose ;
    }
    else if(modalPage==='modalModifyFolder'){
      const modal = this.modalService.show(ModalFolderModifyComponent, this.config);
      (<ModalFolderModifyComponent>modal.content).showConfirmationModal(selectedFolder);
       return (<ModalFolderModifyComponent>modal.content).onClose ;
    }
    else if (modalPage==='modalNewGroup') {
      const modal = this.modalService.show(ModalNewGroupComponent, this.config);
      (<ModalNewGroupComponent>modal.content).showConfirmationModal(selectedFolder, selectedFile);
       return (<ModalNewGroupComponent>modal.content).onClose ;
    }
    else if (modalPage==='modalFileInfo') {
      const modal = this.modalService.show(ModalFileInfoComponent, this.config);
      (<ModalFileInfoComponent>modal.content).showConfirmationModal(selectedFile);
       return (<ModalFileInfoComponent>modal.content).onClose ;
    }
    else if (modalPage==='modalFileHistory') {
      const modal = this.modalService.show(ModalFileHistoryComponent, this.config2);
      (<ModalFileHistoryComponent>modal.content).showConfirmationModal(selectedFile);
       return (<ModalFileHistoryComponent>modal.content).onClose ;
    }
    else if(modalPage==='modalChangeOwner'){
      const modal = this.modalService.show(ModalChangeFolderownerComponent, this.config);
      (<ModalChangeFolderownerComponent>modal.content).showConfirmationModal(selectedFolder);
       return (<ModalChangeFolderownerComponent>modal.content).onClose ;
    }    
    else if (modalPage==='modalMyCheckOutList'){
      const modal = this.modalService.show(ModalMyCheckOutListComponent, this.config);
      (<ModalMyCheckOutListComponent>modal.content).showConfirmationModal();
       return (<ModalMyCheckOutListComponent>modal.content).onClose ;
    }
    else if (modalPage==='modalMyAlertMeList'){ 
      const modal = this.modalService.show(ModalMyAlertmeListComponent, this.config);
      (<ModalMyAlertmeListComponent>modal.content).showConfirmationModal();
       return (<ModalMyAlertmeListComponent>modal.content).onClose ;
    } 
   /*  else if(modalPage==='modalFolderPermission'){
       console.log('>>> selectedFolder <<<');
       console.log(selectedFolder);
       const modal = this.modalService.show(ModalFolderPermissionComponent, this.config);
       (<ModalFolderPermissionComponent>modal.content).showConfirmationModal(selectedFolder, selectedFile);
        return (<ModalFolderPermissionComponent>modal.content).onClose ;
     } */
    else if(modalPage==='modalUploadMemberList'){
      const modal = this.modalService.show(ModalUploadMemberlistComponent, this.config);
      (<ModalUploadMemberlistComponent>modal.content).showConfirmationModal(null,null);
       return (<ModalUploadMemberlistComponent>modal.content).onClose ;
    }
    else if(modalPage==='modalSearch'){
      const modal = this.modalService.show(ModalSearchComponent, this.config);
      (<ModalSearchComponent>modal.content).showConfirmationModal();
       return (<ModalSearchComponent>modal.content).onClose ;
    }
    
   }




}
