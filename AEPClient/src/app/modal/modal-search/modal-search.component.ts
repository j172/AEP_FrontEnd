import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { TreeNode } from 'primeng/api';
import { File } from '../../models/file';
import { FolderAuthModel } from '../../models/FolderAuthModel';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DataService } from '../../services/data-service.service';
import { FilesService } from '../../services/files-service.service';
import { AuthenticationService } from '../../services/authentication-service.service';


@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.css']
})
export class ModalSearchComponent implements OnInit {

  public selectedFolder: TreeNode;
  public onClose: Subject<any>;
  public searchString: string;
  public searchField: FormControl;

  searchList: File[];
  resultList: File[];
  selectedFile: File;
  cols: any[];
  folderAuth: FolderAuthModel;

  constructor(
    private filesService: FilesService,
    public bsModalRef: BsModalRef) {

    this.folderAuth = new FolderAuthModel();
  }

  ngOnInit() {

    this.onClose = new Subject();
    this.cols = [
      { field: 'Type', header: 'Type' },
      { field: 'name', header: 'Name' },
      { field: 'physicalPath', header: 'Path' }
    ];

    this.searchField = new FormControl();
    this.searchField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {

        if (value && value.toString().length >= 2) {
          this.filesService.getKeywordSearch(value).subscribe(
            res => {
              this.searchList = <File[]>res;
              //console.log(this.searchList);

              this.searchString = this.searchField.value;
              let i = 0;
              this.searchList.forEach(rowData => {
                  this.searchList[i].name = this.highlight(rowData.name, this.searchString);
                  this.searchList[i].physicalPath = this.highlight(rowData.physicalPath, this.searchString);
                  i++;
              });
            }
          );
        }//if

      }); // Need to call subscribe to make it hot!

  }

  public highlight(rowData, keywordString) {
    if(!keywordString) {
        return "";
    }
    return rowData.replace(new RegExp(keywordString, "gi"), match => {
        return '<span class="highlightText">' + match + '</span>';
    });
  }


  onRowSelect(event) {
    this.selectedFile = event;
    console.log(this.selectedFile);
    let folderID;
    if (this.selectedFile['data'].isfolder) {
        folderID = this.selectedFile['data'].id;
    }
    else {
        folderID = this.selectedFile['data'].folderID;
    }    
    console.log(folderID);
    //////////////////////////////////////////////
    //this.onClose.next(this.selectedFile['data']);
    this.onClose.next(folderID);
    this.bsModalRef.hide();
  }
  onRowUnselect(event) {

  }

  public showConfirmationModal(): void {

  }

  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }
  public hideConfirmationModal(): void {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }

  click() {
    console.log('click button');
    let myselectedFile: any = this.selectedFile;
    myselectedFile = myselectedFile;
    console.log(myselectedFile);
  }

}
