import { Folder } from '../models/file';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as models from '../models';
import { MyCreateFolder } from '../models/file';
import { Observable } from 'rxjs';
import { AppUser } from '../models/AppUser';
import { MenuItem, TreeNode } from 'primeng/api';

import { DataService } from './data-service.service';
import { FilesService } from './files-service.service';
import { AuthenticationService } from './authentication-service.service';

@Injectable()
export class MyADUserProviderService {

  private appUser: AppUser = null;

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

  get MyColor(): string {
    return this.dataService.MyColor;
  }
  set MyColor(value: string) {
    this.dataService.MyColor = value;
  }


  constructor(private http: HttpClient,
    private dataService: DataService,
    private filesService: FilesService,
  ) {

  }

  public getAppUser(): AppUser {
    return this.appUser;
  }

  load() {
    return new Promise((resolve, reject) => {

      let serviceUrl: string = `${environment.serviceBaseUrl}auth/login`;
      this.http.get(serviceUrl, { responseType: 'json' })
        .subscribe(response => {
          this.appUser = <AppUser>response;
          this.ADName = this.appUser.DomainName;
          this.IsAdmin = this.appUser.Role === "Admin";
          this.IsAuth = true;
          this.MyColor = this.appUser.MyColor;

          this.filesService.getDir()
            .subscribe(
              res => {
                //  console.log('this.dataSvc.getDir()')
                //  console.log(res)
                this.folderTree = <TreeNode[]>res;
                resolve(true);
              });
        },
          error => {
            console.log(error)
            this.ADName = error.error.Message;
            this.IsAuth = false;
            console.log(this.ADName)
            //this.router.navigate(['/s209']);
            resolve(false);
          });
    });
  }
}



