import { ModalBaseComponent } from './../modal-base.component';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Spinner } from '../../../../node_modules/primeng/primeng';

@Component({
  selector: 'app-modal-new-folder',
  templateUrl: './modal-new-folder.component.html',
  styleUrls: ['./modal-new-folder.component.css']
})
export class ModalNewFolderComponent    extends   ModalBaseComponent implements OnInit {
  foldername: string  ;
  constructor(public bsModalRef: BsModalRef) {

    super(bsModalRef);
  }

  ngOnInit() {
    console.log('ModalNewFolderComponent ngOnInit')
    super.ngOnInit();
  }
  click(){
    super.click(this.foldername);
  }
}
