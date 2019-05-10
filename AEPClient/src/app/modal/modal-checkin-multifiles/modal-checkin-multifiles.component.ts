import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { pipe } from 'rxjs'
import { MenuItem, TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/primeng';

import * as models from '../../models/';
import { UserADInfo } from '../../models/UserADInfo';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { File, Folder, AEPReturnUploadFile } from './../../models/file';
import { ModalBaseComponent } from './../modal-base.component';
import { DataService } from '../../services/data-service.service';
import { FilesService } from '../../services/files-service.service';
@Component({
  selector: 'app-modal-checkin-multifiles',
  templateUrl: './modal-checkin-multifiles.component.html',
  styleUrls: ['./modal-checkin-multifiles.component.css']
})
export class ModalCheckinMultifilesComponent extends ModalBaseComponent implements OnInit {

  memo: string;
  checked: boolean = false;

  selectedFolder: TreeNode;
  selectedFile: File;

  arrFileName: string[] = [];
  arrUploadFile: any[] = [];

  arrReturnUploadFile: AEPReturnUploadFile[] = [];

  get files(): File[] {

    return this.dataService.files;
  }
  set files(value: File[]) {

    this.dataService.files = value;
  }


  constructor(private http: HttpClient,
    private dataSvc: DataService,
    private filesService: FilesService,
    private messageService: MessageService,
    private dataService: DataService,
    public bsModalRef: BsModalRef) {
    super(bsModalRef);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  close() {
    super.click('OK');
  }

  myUploaderMulti(): void {

    if (!this.arrReturnUploadFile || this.getMemoLength() || this.getFileError()) {
      return;
    }

    if (this.arrFileName.length == 0) {
      super.click('error');
      return;
    }

    let input = new FormData();
    input.append('selectedFolder', JSON.stringify(this.selectedFolder.data));
    input.append('initializationData', JSON.stringify(this.arrFileName));
    input.append('comment', this.memo);
    input.append('checked', JSON.stringify(this.checked));

    for (let i = 0; i < this.arrUploadFile.length; i++) {
      input.append("jsonFile", this.arrUploadFile[i]);
    }

    let serviceUploadUrl = `${environment.serviceBaseUrl}api/AEPFiles/UploadXls2`;

    this.http.post(serviceUploadUrl, input)
      .subscribe(res => {
        this.arrReturnUploadFile = <AEPReturnUploadFile[]>res;
        //this.messageService.add({ severity: 'success', summary: 'Upload Multi File', detail: `upload OK` });
        super.click('OK');
        return;
      },
        error => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Upload Multi File false ', detail: error });

        });

  }


  // upload completed event
  //uploadedFiles: any[] = [];
  onUpload(event): void {

    this.arrFileName = [];
    this.arrUploadFile = [];
    this.arrReturnUploadFile = [];

    for (const file of event.files) {
      let filename = file.name;
      let fileToUpload = file;
      this.arrFileName.push(filename);
      this.arrUploadFile.push(fileToUpload);

      let myAEPReturnUploadFile: AEPReturnUploadFile = new AEPReturnUploadFile();
      myAEPReturnUploadFile.FileName = filename;

      let find = this.files.find(x => x.name === filename);
      if (find === undefined) {
        myAEPReturnUploadFile.IsOK = null;
        myAEPReturnUploadFile.message = '';
      } else {
        myAEPReturnUploadFile.IsOK = false;
        myAEPReturnUploadFile.message = 'file duplicated'

      }
      myAEPReturnUploadFile.file = fileToUpload;
      this.arrReturnUploadFile.push(myAEPReturnUploadFile);

    }

  }

  onBeforeSend(event): void {

    //event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());

  }

  getMemoLength() {
    let ret: boolean = true;
    if (this.memo) {
      if (this.memo.length > 1) {
        ret = false;
      }
    }
    return ret;
  }
  getFileError() {
    let ret: boolean = false;
    let finds = this.arrReturnUploadFile.filter(x => x.IsOK === false)
    if (finds) {
      if (finds.length > 0) {
        ret = true;
      }
    }
    console.log('getFileError:' + ret)
    return ret;
  }

}
