import { Folder } from './../models/file';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as models from '../models/';
import { MyCreateFolder } from '../models/file';
import { Observable } from 'rxjs';
import { FolderAuthModel, FolderAuthMainModel } from '../models/FolderAuthModel';

import { MenuItem, TreeNode } from 'primeng/api';
import { DataService } from './data-service.service';

@Injectable()
export class FilesService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,


  ) { }


  get folderTree(): TreeNode[] {

    return this.dataService.folderTree;
  }
  set folderTree(value: TreeNode[]) {

    this.dataService.folderTree = value;
  }

  get ADName(): string {
    return this.dataService.ADName;
  }
  set ADName(value: string) {
    this.dataService.ADName = value;
  }
  get IsAdmin(): boolean {
    return this.dataService.IsAdmin;
  }
  set IsAdmin(value: boolean) {
    this.dataService.IsAdmin = value;
  }


  /* save(data) {

    let _url = `${environment.serviceBaseUrl}auth/save`;
    let body = JSON.stringify(data);

     const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(_url, body, httpOptions);


  } */

  getDir() {
    // console.log('Calling getUser');
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/dir`;
    return this.http.get(serviceUrl, { responseType: 'json' });

  }
  getDirByID(folderID) {
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/getDirByID?FolderID=${folderID}`;
    return this.http.get(serviceUrl, { responseType: 'json' });
  }
  getfiles(folder) {
    //  console.log('Calling getUser');
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/files?FolderID=${folder}`;
    return this.http.get(serviceUrl, { responseType: 'json' });

  }

  checkOutStatus(DocID) {
    let serviceUrl: string = `${environment.serviceBaseUrl}api/AEPFiles/CheckOutStatus?DocID=${DocID}`;
    return this.http.get(serviceUrl, { responseType: 'json' });
  }

  checkOutFile(DocID): Observable<Object[]> {
    let url1: string = `${environment.serviceBaseUrl}api/AEPFiles/CheckOut?DocID=${DocID}`;


    return Observable.create(observer => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url1, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.setRequestHeader('Cache-Control', 'no-cache');
      xhr.setRequestHeader('Cache-Control', 'no-store');
      xhr.setRequestHeader('Pragma', 'no-cache');
      xhr.withCredentials = true;
      xhr.responseType = 'blob';

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var contentType = 'application/octet-stream';
            var blob = new Blob([xhr.response], { type: contentType });
            observer.next(blob);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
        else if (xhr.readyState == 2) {
          if (xhr.status == 200) {
            xhr.responseType = "blob";
          } else {
            xhr.responseType = "text";
          }
        } // readyState == 2
      }
      xhr.send();
    });
  }

  deleteFile(DocID) {

    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/deleteFile?DocID=${DocID}`;
    return this.http.get(serviceUrl, { responseType: 'json' });



  }

  downloadFile(DocID): Observable<Object[]> {
    let url1: string = `${environment.serviceBaseUrl}api/AEPFiles/DownloadFile?DocID=${DocID}`;


    return Observable.create(observer => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url1, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.setRequestHeader('Cache-Control', 'no-cache');
      xhr.setRequestHeader('Cache-Control', 'no-store');
      xhr.setRequestHeader('Pragma', 'no-cache');
      xhr.withCredentials = true;
      xhr.responseType = 'blob';

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var contentType = 'application/octet-stream';
            var blob = new Blob([xhr.response], { type: contentType });
            observer.next(blob);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
        else if (xhr.readyState == 2) {
          if (xhr.status == 200) {
            xhr.responseType = "blob";
          } else {
            xhr.responseType = "text";
          }
        } // readyState == 2
      }
      xhr.send();
    });
  }

  downloadHistoryFile(HistoryID): Observable<Object[]> {
    let url1: string = `${environment.serviceBaseUrl}api/AEPFiles/DownloadHistoryFile?HistoryID=${HistoryID}`;


    return Observable.create(observer => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url1, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.setRequestHeader('Cache-Control', 'no-cache');
      xhr.setRequestHeader('Cache-Control', 'no-store');
      xhr.setRequestHeader('Pragma', 'no-cache');
      xhr.withCredentials = true;
      xhr.responseType = 'blob';

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var contentType = 'application/octet-stream';
            var blob = new Blob([xhr.response], { type: contentType });
            observer.next(blob);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
        else if (xhr.readyState == 2) {
          if (xhr.status == 200) {
            xhr.responseType = "blob";
          } else {
            xhr.responseType = "text";
          }
        } // readyState == 2
      }
      xhr.send();
    });
  }



  createFolder(data: MyCreateFolder) {
    // console.log('createFolder');

    let _url = `${environment.serviceBaseUrl}AEPFiles/createFolder`;
    let body = JSON.stringify(data);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(_url, body, httpOptions);


  }
  deleteFolder(FolderID) {
    console.log('===== getFileInfo =====');
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/deleteFolder?FolderID=${FolderID}`;
    return this.http.get(serviceUrl, { responseType: 'json' });

  }
  getFileInfo(DocID) {
    //console.log('===== getFileInfo =====');
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/getFileInfo?DocID=${DocID}`;
    return this.http.get(serviceUrl, { responseType: 'json' });

  }

  getFileHistory(DocID) {
    //console.log('===== getFileHistory =====');
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/getFileHistory?DocID=${DocID}`;
    return this.http.get(serviceUrl, { responseType: 'json' });

  }

  alertMe(DocID) {
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/setAlertMe?DocID=${DocID}`;
    return this.http.get(serviceUrl, { responseType: 'json' });

  }
  cancelAlertMe(DocID) {
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/setCancelAlertMe?DocID=${DocID}`;
    return this.http.get(serviceUrl, { responseType: 'json' });

  }
  disCheckOutFile(DocID) {
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/setDisCheckOutFile?DocID=${DocID}`;
    return this.http.get(serviceUrl, { responseType: 'json' });

  }
  getFolderAuth(FolderID) {
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/getFolderAuth?FolderID=${FolderID}`;
    return this.http.get(serviceUrl, { responseType: 'json' });
  }

  saveFolderAuth(lstFolderAuth: FolderAuthMainModel) {

    console.log('===== saveFolderAuth =====');
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/saveFolderAuth`;
    let body = JSON.stringify(lstFolderAuth)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(serviceUrl, body, httpOptions);
  }

  getDownloadLog() {

    console.log('===== Download Log =====');
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/getDownloadLog`;
    return this.http.get(serviceUrl, { responseType: 'json' });
  }

  changeFolderOwner(FolderID, OwnerAD) {
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/changeFolderOwner?FolderID=${FolderID}&OwnerAD=${OwnerAD}`;
    return this.http.get(serviceUrl, { responseType: 'json' });
  }

  modifyFolderName(FolderID, FolderName) {
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/modifyFolderName?FolderID=${FolderID}&FolderName=${FolderName}`;
    return this.http.get(serviceUrl, { responseType: 'json' });
  }

  getMyCheckOutList() {
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/getMyCheckOutList`;
    return this.http.get(serviceUrl, { responseType: 'json' });
  }

  getMyAlertMeList() {
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/getMyAlertMeList`;
    return this.http.get(serviceUrl, { responseType: 'json' });
  }

  getKeywordSearch(keyword) {
    let serviceUrl: string = `${environment.serviceBaseUrl}AEPFiles/getKeywordSearch?keyword=${keyword}`;
    return this.http.get(serviceUrl, { responseType: 'json' });
  }
}
