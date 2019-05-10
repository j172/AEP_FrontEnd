import { Component, OnInit  , AfterViewInit , ElementRef , ViewChild , Input , Output , EventEmitter} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/operators';
import {pipe} from 'rxjs'
import {MenuItem , TreeNode} from 'primeng/api';

import * as models from '../../models/';
import { UserADInfo } from '../../models/UserADInfo';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { File , Folder } from './../../models/file';
import { ModalBaseComponent } from './../modal-base.component';
import { DataService }  from '../../services/data-service.service';
import { FilesService }  from '../../services/files-service.service';
@Component({
  selector: 'app-modal-checkin-singlefile',
  templateUrl: './modal-checkin-singlefile.component.html',
  styleUrls: ['./modal-checkin-singlefile.component.css']
})
export class ModalCheckinSinglefileComponent extends   ModalBaseComponent  implements OnInit {

memo: string;
checked: boolean = false;

fileToUpload: any;
filename: string;
invalidFileSizeMessageSummary: string;
invalidFileSizeMessageDetail: string;
  constructor(private http: HttpClient,
    private dataSvc: DataService,
    private filesService: FilesService,
    public bsModalRef: BsModalRef) {
    super(bsModalRef);
   }

  ngOnInit() {
    super.ngOnInit();
  }




  //////checkin//////////////////////////////////////
    myUploader():void{

     // console.log('myUploader1')

     // console.log('My File upload',event);

      if (!this.fileToUpload || this.getMemoLength() || this.getCheckFileName()) {
        return;
      }

       if(!this.fileToUpload){
          super.click('error');
       }

       if(this.filename != this.selectedFile.name){
          super.click('error');
      } else {


      let input = new FormData();
      input.append('selectedFolder',  JSON.stringify(this.selectedFolder.data));
      input.append('selectedFile',  JSON.stringify(this.selectedFile));
      input.append('initializationData', this.filename);
      input.append('comment', this.memo);
      input.append('checked', JSON.stringify(this.checked));
      input.append("jsonFile", this.fileToUpload);
      console.log('myUploader3')
      let serviceUploadUrl = `${environment.serviceBaseUrl}api/AEPFiles/UploadXls`;
      this.http.post(serviceUploadUrl, input)
               .subscribe(res => {
                  super.click('OK');
                });
      }
    }

    // upload completed event
    //uploadedFiles: any[] = [];
    onUpload(event): void {

     console.log(event)
      this.fileToUpload = event.files[0];
      this.filename = event.files[0].name;

      console.log(this.fileToUpload)
      console.log(this.filename)



    }

    onBeforeSend(event): void {

      //event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());

    }
    onError($event){
      console.log('onError')
      console.log($event)

    }
    close(){
      super.click('');
    }
    getMemoLength(){
      let ret:boolean = true;
      if(this.memo){
        if(this.memo.length>1){
          ret=false;
        }
      }
      return ret;
    }
    getCheckFileName(){
      let ret:boolean = true;
      if(this.selectedFile){
        if(this.filename === this.selectedFile.name){
          ret=false;
        }
      }


      return ret;
    }
}
