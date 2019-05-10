import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { File } from '../../models/file';
import { FilesService } from '../../services/files-service.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoaderService } from '../../loading/LoaderService';
import { MessageService } from 'primeng/primeng';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-modal-my-check-out-list',
  templateUrl: './modal-my-check-out-list.component.html',
  styleUrls: ['./modal-my-check-out-list.component.css']
})
export class ModalMyCheckOutListComponent implements OnInit {
  @ViewChild(Table) dt: Table;
  myCheckOutList: File[];
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
      { field: 'Check-Out By', header: 'Check-Out By'},
      { field: 'Check-Out Time', header: 'Check-Out Time'},
      { field: 'Path', header: 'Path'}
    ];
  }

  public showConfirmationModal(): void {
    this.viewMyCheckOutList();
  }
  public hideConfirmationModal(): void {
    //this.onClose.next(null);
    this.bsModalRef.hide();
  }


  viewMyCheckOutList() {
    this.filesService.getMyCheckOutList().subscribe(
      res => {
        this.myCheckOutList = <File[]>res;
        console.log(this.myCheckOutList);
      },
      err => console.error(err),
      () => console.log('get myCheck-Out list done!')
    );
  }
}
