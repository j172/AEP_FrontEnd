import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data-service.service';
import { FilesService } from '../../services/files-service.service';
import { File, Folder, MyCreateFolder } from '../../models/file';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoaderService } from '../../loading/LoaderService';
import { MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-modal-file-history',
  templateUrl: './modal-file-history.component.html',
  styleUrls: ['./modal-file-history.component.css']
})
export class ModalFileHistoryComponent implements OnInit {

  docID: string;
  selectedFile: File;
  myFiles: File[];
  cols: any[];
  public onClose: Subject<any>;

  constructor(
    public bsModalRef: BsModalRef,
    private dataSvc: DataService,
    private filesService: FilesService,
    private loaderService: LoaderService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.onClose = new Subject();

    this.cols = [
      { field: 'name', header: 'File Name' },
      { field: 'checkInBy', header: 'Check-In By' },
      { field: 'updateDateTime', header: 'Check-In Time' },
      { field: 'version', header: 'Version' }
      // { field: '<i class="fas fa-download"></i>', header: 'Download' }
    ];
  }


  public showConfirmationModal(selectedFile): void {
    this.docID = selectedFile.id;
    // console.log('this is showConfirmationModal ==> DocID = ' + this.docID);
    this.viewFileHistory(this.docID);
  }
  public hideConfirmationModal(): void {
    //this.onClose.next(null);
    this.bsModalRef.hide();
  }


  viewFileHistory(DocID: string) {
    this.filesService.getFileHistory(DocID).subscribe(
      res => {
        this.myFiles = <File[]>res;
        //  console.log('view File History, this.myFiles 回傳值：');
        //   console.log(this.myFiles);
      },
      err => console.error(err),
      () => console.log('getHistory completed')
    );
  }

  /* download(row) {
    console.log('this is download function ==>');
    console.log(row);
  } */
  downloadFile(id, filename) {
    this.loaderService.show();
    this.filesService.downloadHistoryFile(id)
      .subscribe(blob => {


        if (navigator.appVersion.toString().indexOf('.NET') > 0) { // for IE browser
          window.navigator.msSaveBlob(blob, filename);
        } else { // for other browsers
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();
        }
        this.loaderService.hide();
      },
        error => {
          this.messageService.add({ severity: 'error', summary: 'download history file error', life: 10000, detail: error });
          this.loaderService.hide();
        },
        () => {
          console.log('downloadFile complete 1 ........................')

          this.loaderService.hide();
        })

  }
}
