import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { File } from '../../models/file';
import { FilesService } from '../../services/files-service.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoaderService } from '../../loading/LoaderService';
import { MessageService } from 'primeng/primeng';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-modal-my-alertme-list',
  templateUrl: './modal-my-alertme-list.component.html',
  styleUrls: ['./modal-my-alertme-list.component.css']
})
export class ModalMyAlertmeListComponent implements OnInit {
  @ViewChild(Table) dt: Table;
  myAlertmeList: File[];
  cols: any[];
  
  public onClose: Subject<any>;

  constructor(
    public bsModalRef: BsModalRef,
    private filesService: FilesService,
    private loaderService: LoaderService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.onClose = new Subject();

    this.cols = [
      { field: 'File Name', header: 'File Name'},
      { field: 'Path', header: 'Path'}
    ];
  }
  
  public showConfirmationModal(): void {
    this.viewMyAlertmeList();
  }
  public hideConfirmationModal(): void {
    //this.onClose.next(null);
    this.bsModalRef.hide();
  }


  viewMyAlertmeList() {
    this.filesService.getMyAlertMeList().subscribe(
      res => {
        this.myAlertmeList = <File[]>res;
        console.log(this.myAlertmeList);
      },
      err => console.error(err),
      () => console.log('get myAlertme list done!')
    );
  }

}
