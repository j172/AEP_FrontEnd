import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TreeviewItem } from 'ngx-treeview';

import { MenuItem, TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { TreeDragDropService } from 'primeng/api';
import { MessageService } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


import * as models from '../models';
import { CommonModalService } from '../modal/commonModal.service';
import { AppUser } from '../models/AppUser';
import { PostDataModel } from '../models/PostData';
import { File, Folder, MyCreateFolder } from '../models/file';
import { ModalFolderPermissionComponent } from '../modal/modal-folder-permission/modal-folder-permission.component';
import { ModalChangeFolderownerComponent } from '../modal/modal-change-folderowner/modal-change-folderowner.component';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { LoaderService } from '../loading/LoaderService';
import { FilesService } from '../services/files-service.service';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-page-file',
  templateUrl: './page-file.component.html',
  styleUrls: ['./page-file.component.css']
})
export class PageFileComponent implements OnInit {

  foldername: string;
  // folderTree: TreeNode[];
  selectedFolder: TreeNode;
  returnFolder: TreeNode;

  get files(): File[] {

    return this.dataService.files;
  }
  set files(value: File[]) {

    this.dataService.files = value;
  }

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
  get IsAuth(): boolean {
    return this.dataService.IsAuth;
  }
  set IsAuth(value: boolean) {
    this.dataService.IsAuth = value;
  }


  options = {};

  private authRslt: string = '';
  private authBack: string = 'grey';
  private postRslt: string = '';
  private postBack: string = 'grey';

  config = {
    class: 'gray modal-lg',
    backdrop: true,
    ignoreBackdropClick: true
  };
  bsModalRef: BsModalRef;

  @ViewChild('expandingTree')

  cols: any[];
  selectedFile: File;
  folderContextItems: MenuItem[];
  fileviewItems: MenuItem[];

  serviceUploadUrl: string;
  contextMenu: boolean = true; //true: disabled

  public breadcrumbitems: MenuItem[];

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private dataService: DataService,
    private filesService: FilesService,
    private messageService: MessageService,
    private commonModalService: CommonModalService,
    private loaderService: LoaderService,
    private modalService: BsModalService,
    
  ) {

    this.serviceUploadUrl = `${environment.serviceBaseUrl}api/AEPFiles/UploadXls`;

  }

  ngOnInit() {


    this.selectedFolder = this.folderTree[0];
    this.viewFolder(this.selectedFolder);

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'name' },
      { field: 'isfolder', header: 'isfolder' },

    ];

  }


  /////////folder viewer////////////////////////////////////////////////////////


  nodeSelect(event) {

    this.viewFolder(this.selectedFolder)

  }


  nodeContextMenuSelect(event) {


    if (this.IsAdmin === true && this.selectedFolder.data.isDelete === false) {

      this.folderContextItems = [
        { label: 'View', icon: 'fa fa-search', command: (event) => this.viewFolder(this.selectedFolder) },
        { label: 'Create', icon: 'fa fa-plus', command: (event) => this.newFolder() },
        { label: 'Modify', icon: 'fa fa-wrench', command: (event) => this.modifyFolder(this.selectedFolder) },
        { label: 'Delete', icon: 'fa fa-minus', command: (event) => this.deleteFolder(this.selectedFolder) },
        { label: 'Permission', icon: 'fas fa-shield-alt', command: (event) => this.Permission(this.selectedFolder) },
        { label: 'OwnerChange', icon: 'fas fa-retweet', command: (event) => this.changeOwner(this.selectedFolder) }
      ];

    } else if (this.selectedFolder.data.isOwner === true && this.selectedFolder.data.isDelete === false) {

      this.folderContextItems = [
        { label: 'View', icon: 'fa fa-search', command: (event) => this.viewFolder(this.selectedFolder) },
        { label: 'Create', icon: 'fa fa-plus', command: (event) => this.newFolder() },
        { label: 'Modify', icon: 'fa fa-wrench', command: (event) => this.modifyFolder(this.selectedFolder) },
        { label: 'Delete', icon: 'fa fa-minus', command: (event) => this.deleteFolder(this.selectedFolder) },
        { label: 'Permission', icon: 'fas fa-shield-alt', command: (event) => this.Permission(this.selectedFolder) }
      ];

    } else
      if (this.selectedFolder.data.auth === 3 && this.selectedFolder.data.isDelete === false) {

        this.folderContextItems = [
          { label: 'View', icon: 'fa fa-search', command: (event) => this.viewFolder(this.selectedFolder) },
          { label: 'Create', icon: 'fa fa-plus', command: (event) => this.newFolder() },
          { label: 'Modify', icon: 'fa fa-wrench', command: (event) => this.modifyFolder(this.selectedFolder) },
          { label: 'Delete', icon: 'fa fa-minus', command: (event) => this.deleteFolder(this.selectedFolder) }
        ];

      } else if (this.selectedFolder.data.auth === 2 && this.selectedFolder.data.isDelete === false) {

        this.folderContextItems = [
          { label: 'View', icon: 'fa fa-search', command: (event) => this.viewFolder(this.selectedFolder) },
          { label: 'Create', icon: 'fa fa-plus', command: (event) => this.newFolder() },
          { label: 'Modify', icon: 'fa fa-wrench', command: (event) => this.modifyFolder(this.selectedFolder) },
        ];

      } else if (this.selectedFolder.data.auth === 1 && this.selectedFolder.data.isDelete === false) {

        this.folderContextItems = [
          { label: 'View', icon: 'fa fa-search', command: (event) => this.viewFolder(this.selectedFolder) },
        ];

      } else {

        this.folderContextItems = [
          { label: 'No Permission', icon: 'fa fa-search', },
        ];

      }

  }

  viewFolder(folder: TreeNode) {

    console.log('======= viewFolder =========');
    console.log(folder);

    let arr = folder.data.physicalPath.split('\\');

    this.breadcrumbitems = [];

    arr.forEach(element => {

      if (element != 'D:' && element != 'W:') {

        if (element == 'ROOT')
        {
          element = 'Documents';
        }
        let o = {
          label: element,
          //styleClass: 'ui-state-disabled: disabled'
          //ui-state-disabled: element.disabled
        };
  
        this.breadcrumbitems.push(o);
        console.log(this.breadcrumbitems);
      } 

      
    });


    if (folder.data.auth !== 0 || folder.data.isOwner === true || this.IsAdmin === true) {
      this.filesService.getfiles(folder.data.id).subscribe(
        res => {
          this.files = <File[]>res;
        }
      );

    }




    //  this.messageService.add({severity: 'info', summary: 'Node Selected with Right Click', detail: file.label});
  }


  Permission(selectedFolder) {
    console.log('Permission ==> selectedFolder');
    console.log(selectedFolder);
    const modal = this.modalService.show(ModalFolderPermissionComponent, this.config);
    (<ModalFolderPermissionComponent>modal.content).showConfirmationModal(selectedFolder);
    this.viewFolder(this.selectedFolder);
    return (<ModalFolderPermissionComponent>modal.content).onClose;
  }

  newFolder() {

    this.commonModalService.openSelectModal('modalNewFolder', this.selectedFolder, this.selectedFile).
      subscribe(result => {
        let foldername = result;
        let folder = new MyCreateFolder();
        folder.name = foldername;
        folder.parentID = this.selectedFolder.data.id;
        folder.parentPhysicalPath = this.selectedFolder.data.physicalPath;
        console.log(folder);

        this.filesService.createFolder(folder)
          .subscribe(
            res => {
              // console.log('this.dataSvc.createFolder')
              // console.log(res)
              const output: TreeNode = <TreeNode>res;
              //console.log(output)
              if (!Array.isArray(this.selectedFolder.children)) {
                this.selectedFolder.children = [];
              }
              this.selectedFolder.children.push(output)

              this.messageService.add({ severity: 'success', summary: 'New Folder', detail: `${foldername} have been created` });
              this.selectedFolder.expanded = true;
              this.viewFolder(this.selectedFolder);


            }
          );
      });



  }

  changeOwner(selectedFolder) {
    console.log('☆----- this is change Folder owner -----');
    console.log(selectedFolder);
    const modal = this.modalService.show(ModalChangeFolderownerComponent, this.config);
    (<ModalChangeFolderownerComponent>modal.content).showConfirmationModal(selectedFolder);
    this.viewFolder(this.selectedFolder);
    
    return (<ModalChangeFolderownerComponent>modal.content).onClose;    
  }

  modifyFolder(selectedFolder) {
    console.log('modifyFolder (change Folder Name) ==> selectedFolder');
    console.log(selectedFolder);

    this.commonModalService.openSelectModal('modalModifyFolder', this.selectedFolder, null).
      subscribe(result => {
        console.log('****** modifyFolder: result *******');
        console.log(result);
        let folderName = result;
        console.log(folderName);

        this.filesService.modifyFolderName(selectedFolder.data.id, folderName)
          .subscribe(res => {
            this.messageService.add({ severity: 'success', summary: 'Modify Folder Name', detail: `${folderName} have been modified` });
            location.reload();
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Modify Folder Name', life: 10000, detail: `更新失敗: ${error} ，請重新確認!` });
          });
      });

  }

  deleteFolder(selectedFolder) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this folder?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        //console.log('accept')
        // this.msgs = [{severity:'info', summary:'Confirmed', detail:'Record deleted'}];
        this.filesService.deleteFolder(selectedFolder.data.id)
          .subscribe(result => {
            location.reload();            
            this.viewFolder(this.selectedFolder);
            this.messageService.add({ severity: 'success', summary: 'Delete Folder OK', detail: `` });
          });



      },
      reject: () => {
        //console.log('reject')
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }



  getFolderCount() {

    let count = 0;
    if (this.files) {
      let selects = this.files.filter(x => x.isfolder === true);
      if (Array.isArray(selects)) {
        count = selects.length;
      }
    }

    return count;
  }
  getFileCount() {

    let count = 0;
    if (this.files) {
      let selects = this.files.filter(x => x.isfolder === false);
      if (Array.isArray(selects)) {
        count = selects.length;
      }
    }
    return count;
  }


  /////////files viewer///////////////////////////////////////////////

  tableSelectFolder(id) {

    // console.log('tableSelectFolder')
    // console.log(this.selectedFolder)
    // console.log(id)

    let findFolder = this.selectedFolder.children.find(x => x.data.id == id);

    this.selectedFolder.expanded = true;
    this.selectedFolder = findFolder;
    this.viewFolder(this.selectedFolder);
    //console.log(findFolder)

  }

  tableContextMenuSelect(event) {
    /*  */


    console.log('tableContextMenuSelect')
    console.log(this.selectedFile)

    if (this.selectedFile.isfolder === false) {


      let disabled_CheckIn: boolean = false;
      let disabled_CheckOut: boolean = false;
      let disabled_DiscardCheckOut: boolean = false;
      if (this.selectedFile.status === "1") {
        disabled_CheckIn = true;
        disabled_CheckOut = false;
      } else if (this.selectedFile.status === "2" && (this.selectedFile.checkOutBy == this.ADName)) {
        disabled_CheckIn = false;
        disabled_CheckOut = true;
      } else {
        disabled_CheckIn = true;
        disabled_CheckOut = true;
      }
      disabled_DiscardCheckOut = !disabled_CheckOut;
      if (this.selectedFile.checkOutBy != this.ADName) {
        disabled_DiscardCheckOut = true;
      }

      let classname_isAlertMe: string = 'fa fa-bell';
      if (this.selectedFile.isAlertMe === true) {
        classname_isAlertMe = 'fa fa-bell-slash'
      }


      if ((this.selectedFolder.data.auth === 3 || this.selectedFolder.data.isOwner === true || this.IsAdmin === true) && (this.selectedFolder.data.isDelete !== true)) {

        this.fileviewItems = [
          { label: 'Check In', disabled: disabled_CheckIn, icon: 'fa fa-cloud-upload-alt', command: (event) => this.checkInFile() },
          { label: 'Check Out', disabled: disabled_CheckOut, icon: 'fa fa-cloud-download-alt', command: (event) => this.checkOutFile(this.selectedFile) },
          { label: 'Discard Check Out', disabled: disabled_DiscardCheckOut, icon: 'fa fa-undo-alt', command: (event) => this.disCheckOutFile(this.selectedFile) },
          { label: 'Download', icon: 'fa fa-download', command: (event) => this.downloadFile(this.selectedFile) },
          { label: 'History', icon: 'fa fa-history', command: (event) => this.viewFileHistory(this.selectedFile) },
          { label: 'Alert Me', icon: classname_isAlertMe, command: (event) => this.alertMe(this.selectedFile) },
          { label: 'Information', icon: 'fa fa-info-circle', command: (event) => this.viewFileInfo(this.selectedFile) },
          { label: 'Delete', icon: 'fa fa-minus', command: (event) => this.deleteFile(this.selectedFile) },
        ];



      }
      else if (this.selectedFolder.data.auth === 2 && this.selectedFolder.data.isDelete != true) {

        this.fileviewItems = [
          { label: 'Check In', disabled: disabled_CheckIn, icon: 'fa fa-cloud-upload-alt', command: (event) => this.checkInFile() },
          { label: 'Check Out', disabled: disabled_CheckOut, icon: 'fa fa-cloud-download-alt', command: (event) => this.checkOutFile(this.selectedFile) },
          { label: 'Discard Check Out', disabled: disabled_DiscardCheckOut, icon: 'fa fa-undo-alt', command: (event) => this.disCheckOutFile(this.selectedFile) },
          { label: 'Download', icon: 'fa fa-download', command: (event) => this.downloadFile(this.selectedFile) },
          { label: 'History', icon: 'fa fa-history', command: (event) => this.viewFileHistory(this.selectedFile) },
          { label: 'Alert Me', icon: classname_isAlertMe, command: (event) => this.alertMe(this.selectedFile) },
          { label: 'Information', icon: 'fa fa-info-circle', command: (event) => this.viewFileInfo(this.selectedFile) },
        ];


      }
      else if (this.selectedFolder.data.auth === 1 && this.selectedFolder.data.isDelete !== true) {

        this.fileviewItems = [
          { label: 'Download', icon: 'fa fa-download', command: (event) => this.downloadFile(this.selectedFile) },
          { label: 'History', icon: 'fa fa-history', command: (event) => this.viewFileHistory(this.selectedFile) },
          { label: 'Alert Me', icon: classname_isAlertMe, command: (event) => this.alertMe(this.selectedFile) },
          { label: 'Information', icon: 'fa fa-info-circle', command: (event) => this.viewFileInfo(this.selectedFile) },
          // { label: 'Permission', icon: 'fas fa-shield-alt', command: (event) => this.Permission(this.selectedFile) },
        ];

      }
      else {

        this.fileviewItems = [
          { label: 'No Permission', icon: 'fa fa-search', },
        ];

      }

      this.contextMenu = false;

     }
     else {

      this.contextMenu = true;
        this.fileviewItems = [
          //{ label: 'No Function', icon: 'fa fa-times',}
        ];

        // this.folderContextItems = [
        //   { label: 'View', icon: 'fa fa-search', command: (event) => this.viewFolder(this.selectedFolder) },
        // ];

     }

  }

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  openFile(directoryName: string, fileName: string) {

  }

  unselectFile() {
    //console.log('unselectFile')
    this.selectedFolder = null;
  }


  viewFile(file: File) {
  }










  checkOutFile(selectedFile) {

    this.loaderService.show();

    this.filesService.checkOutStatus(selectedFile.id)
      .toPromise()
      .then(resp => {
        console.log('resp:' + resp);
        var str = resp.toString().split(';');
        let docStatus = str[0];
        let checkOutUser = str[1];
        if (docStatus == '2') {
          this.messageService.add({ severity: 'error', summary: 'Check-Out error', life: 10000, detail: `檔案已被 ${checkOutUser} 簽出了! 再重新刷新頁面. ` });
          this.loaderService.hide();
        } else if (docStatus == '3') {
          this.messageService.add({ severity: 'error', summary: 'Check-Out error', life: 10000, detail: `檔案已被刪除!!` });
          this.loaderService.hide();
        } else {

          this.filesService.checkOutFile(selectedFile.id)
            .subscribe(blob => {

              this.viewFolder(this.selectedFolder);

              if (navigator.appVersion.toString().indexOf('.NET') > 0) { // for IE browser
                window.navigator.msSaveBlob(blob, selectedFile.name);
              } else { // for other browsers
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = selectedFile.name;
                link.click();
              }
              this.loaderService.hide();
            },
              error => {

                this.messageService.add({ severity: 'error', summary: 'checkOutFile error', life: 10000, detail: error });
                this.loaderService.hide();
              },
              () => {
                console.log('downloadFile complete 1 ........................')

                this.loaderService.hide();
              }
            )

        }
      })
      .catch(error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Check-Out error', life: 10000, detail: error });
        this.loaderService.hide();
      });


  }

  disCheckOutFile(selectedFile) {

    this.filesService.disCheckOutFile(selectedFile.id)
      .subscribe(blob => {

        this.viewFolder(this.selectedFolder);
      });



  }


  downloadFile(selectedFile) {
    this.loaderService.show();
    this.filesService.downloadFile(selectedFile.id)
      .subscribe(blob => {

        console.log('downloadFile blob 1 ........................');
        if (navigator.appVersion.toString().indexOf('.NET') > 0) { // for IE browser
          window.navigator.msSaveBlob(blob, selectedFile.name);
        } else { // for other browsers
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = selectedFile.name;
          link.click();
        }
        this.loaderService.hide();
      },
        error => {
          this.messageService.add({ severity: 'error', summary: 'download error', life: 10000, detail: error });
          this.loaderService.hide();
        },
        () => {
          console.log('downloadFile complete 1 ........................');

          this.loaderService.hide();
        })

  }

  checkInFile() {

    this.commonModalService.openSelectModal('modalCheckinSinglefile', this.selectedFolder, this.selectedFile).
      subscribe(result => {

        if (result === 'error') {
          this.messageService.add({ severity: 'error', summary: 'FileName not equal', life: 10000, detail: `upload false` });

        } else if (result === 'OK') {
          this.viewFolder(this.selectedFolder);
          this.messageService.add({ severity: 'success', summary: 'Upload Single File', detail: `upload OK` });

        }

      },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'error', life: 10000, detail: error });
        }

      );
  }
  newFiles() {

    this.commonModalService.openSelectModal('modalCheckinMultifiles', this.selectedFolder, this.selectedFile).
      subscribe(result => {
        this.viewFolder(this.selectedFolder);
        this.messageService.add({ severity: 'success', summary: 'Upload Multi File', detail: `upload OK` });


      });

  }

  viewFileInfo(file: File) {
    this.commonModalService.openSelectModal('modalFileInfo', null, file).
      subscribe(result => {

      });
  }
  deleteFile(selectedFile) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this file ?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {

        this.filesService.deleteFile(selectedFile.id)
          .subscribe(blob => {

            this.viewFolder(this.selectedFolder);
            this.messageService.add({ severity: 'success', summary: 'Delete File success', detail: `Delete OK` });
          });

      },
      reject: () => {
        //console.log('reject')
        //this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }


  viewFileHistory(file: File) {
    this.commonModalService.openSelectModal('modalFileHistory', null, file).
      subscribe(result => {
      })
  }

  alertMe(file: File) {

    if (this.selectedFile.isAlertMe === true) {

      this.filesService.cancelAlertMe(file.id)
        .subscribe(
          res => {
            this.viewFolder(this.selectedFolder);
            this.messageService.add({ severity: 'success', summary: 'Cancel AlertMe success', detail: `Update OK` });

          });

    } else {
      this.filesService.alertMe(file.id)
        .subscribe(
          res => {
            this.viewFolder(this.selectedFolder);
            this.messageService.add({ severity: 'success', summary: 'Set AlertMe success', detail: `Update OK` });

          });

    }

  }

  search() {
    this.commonModalService.openSelectModal('modalSearch', this.selectedFolder, this.selectedFile).
    subscribe(result => {
      console.log('********* return search *********');
      console.log(result);
      this.filesService.getDirByID(result).subscribe(
          res => {
            console.log('>>>>>>>>>> return filesService.getfiles(folderID) >>>>>>>>>>');
            console.log(res);
            this.viewFolder(res);
          }
      );

      
      //this.viewFolder(result);

      //this.viewFolder(this.selectedFolder);
      //this.messageService.add({ severity: 'success', summary: 'Upload Multi File', detail: `upload OK` });
    });
  }

}
