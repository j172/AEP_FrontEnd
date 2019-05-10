import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { MenuItem, TreeNode } from 'primeng/api';
import { environment } from '../../environments/environment';
import * as models from '../models/';
import { Observable } from 'rxjs';
import { File, Folder, MyCreateFolder } from './../models/file';


@Injectable()
export class DataService {

  constructor(
    private http: HttpClient,

  ) { }


  private _folderTree: TreeNode[];
  private _ADName: string;
  private _IsAdmin: boolean;
  private _IsAuth: boolean;
  private _files: File[];
  private _MyColor: string;

  get files(): File[] {

    return this._files;
  }
  set files(value: File[]) {

    this._files = value;

  }

  get folderTree(): TreeNode[] {

    return this._folderTree;
  }
  set folderTree(value: TreeNode[]) {

    this._folderTree = value;

  }

  get ADName(): string {

    return this._ADName;
  }
  set ADName(value: string) {

    this._ADName = value;

  }

  
  get MyColor(): string{
    return this._MyColor;
  }
  set MyColor(value: string) {
    this._MyColor = value;
  }

  
  get IsAdmin(): boolean {

    return this._IsAdmin;
  }
  set IsAdmin(value: boolean) {

    this._IsAdmin = value;

  }
  get IsAuth(): boolean {

    return this._IsAuth;
  }
  set IsAuth(value: boolean) {

    this._IsAuth = value;

  }


}
