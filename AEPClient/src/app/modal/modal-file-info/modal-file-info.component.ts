import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService }  from '../../services/data-service.service';
import { FilesService }  from '../../services/files-service.service';
import { File, Folder, MyCreateFolder } from '../../models/file';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-modal-file-info',
  templateUrl: './modal-file-info.component.html',
  styleUrls: ['./modal-file-info.component.css']
})
export class ModalFileInfoComponent implements OnInit {

  docID: string;
  selectedFile: File;
  cols: any[];
  public onClose: Subject<any>;

  constructor(
    public bsModalRef: BsModalRef,
    private dataSvc: DataService,
    private filesService: FilesService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();


  }

  public showConfirmationModal(selectedFile): void {
    this.docID = selectedFile.id;
   // console.log('this is showConfirmationModal ==> DocID = ' + this.docID);
    this.viewFileInfo(this.docID);
  }
  public hideConfirmationModal(): void {
    //this.onClose.next(null);
    this.bsModalRef.hide();
  }
  // this.onClose.next(this.lstGroupUser);
  // this.bsModalRef.hide();



  viewFileInfo(DocID: string) {

    //let selFileInfo: File;
    this.filesService.getFileInfo(DocID).subscribe(
      res => {
        this.selectedFile = <File>res;

        //selFileInfo = this.selectedFile;
      //  console.log('view File Infomation, this.selectedFile 回傳值：');
       // console.log(this.selectedFile);
        //console.log(this.selectedFile);
        //this.onClose.next(this.mySelFile);
      },
      err => console.error(err),
      () => console.log('getBooks completed')
    );
    //this.bsModalRef.hide();
  }

}
