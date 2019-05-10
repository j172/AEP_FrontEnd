import { Component, OnInit } from '@angular/core';
import { ModalBaseComponent } from './../modal-base.component';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-modal-folder-modify',
  templateUrl: './modal-folder-modify.component.html',
  styleUrls: ['./modal-folder-modify.component.css']
})
export class ModalFolderModifyComponent extends ModalBaseComponent implements OnInit {

  myfolderID: number;
  folderName: string;

  constructor(public bsModalRef: BsModalRef,
              private messageService: MessageService) 
    {
      super(bsModalRef);
    }

  ngOnInit() {
    super.ngOnInit();
  }

  public showConfirmationModal(selectedFolder): void {
    console.log('>>>>> showCOnfirmationModal <<<<<<');
    console.log(selectedFolder);
    this.folderName = selectedFolder.label;
    this.myfolderID = selectedFolder.data.id;
    console.log(this.myfolderID, this.folderName);
  }
  public hideConfirmationModal(): void {    
    this.bsModalRef.hide();
    this.onClose.next(this.folderName);
  }


  click() {
    console.log('click. super.click(folderName)' + this.folderName);
    super.click(this.folderName);
  }

}
