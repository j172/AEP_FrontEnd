import { GroupModel, GroupUserModel, UserModel } from '../models/Group';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


@Injectable()
export class GroupService {

    constructor(private http: HttpClient  ) { }




    getGroup() {
       // console.log('Calling getGroup');
        let serviceUrl: string = `${environment.serviceBaseUrl}Group/Group`;
        return this.http.get(serviceUrl, { responseType: 'json' });
    }
    
    getGroupMember(GroupID) {
        let serviceUrl: string = `${environment.serviceBaseUrl}Group/GetGroupMember?GroupID=${GroupID}`;
        return this.http.get(serviceUrl, { responseType: 'json' });
    }

    getGroupWithName(GroupName) {
      //  console.log('Calling getGroup with search Group Name');
        let serviceUrl: string = `${environment.serviceBaseUrl}Group/GroupWithName?GroupName=${GroupName}`;
        return this.http.get(serviceUrl, { responseType: 'json' });
    }

    createGroup(GroupName) {
       // console.log('Calling createGroup');
        let serviceUrl: string = `${environment.serviceBaseUrl}Group/CreateGroup?GroupName=${GroupName}`;
        return this.http.get(serviceUrl, { responseType: 'json' });
    }

    addGroupUser(GroupID, UserAD) {
       // console.log('this is addGroupUser!!!');
        let serviceUrl: string = `${environment.serviceBaseUrl}Group/AddGroupUser?GroupID=${GroupID}&UserAD=${UserAD}`;
        return this.http.get(serviceUrl, { responseType: 'json' });
    }

    delGroupUser(GroupID, UserAD) {
       // console.log('this is delGroupUser!!!');
        let serviceUrl: string = `${environment.serviceBaseUrl}Group/DelGroupUser?GroupID=${GroupID}&UserAD=${UserAD}`;
        return this.http.get(serviceUrl, { responseType: 'json' });
    }

    saveGroup(myGroup) {
      ///  console.log('this is saveGroup!!!');
      //  console.log(myGroup);
        let serviceUrl: string = `${environment.serviceBaseUrl}Group/SaveGroup`;
        let body = JSON.stringify(myGroup);

         const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.post(serviceUrl, body, httpOptions);

    }

    deleteGroup(GroupID) {
        let serviceUrl: string = `${environment.serviceBaseUrl}Group/DeleteGroup?GroupID=${GroupID}`;
        return this.http.get(serviceUrl, { responseType: 'json' });
    }

    // uploadGroupUser(GroupID, lstUser: GroupUser) {
    //     console.log('this is uploadGroupUser!');
    //     let serviceUrl: string = `${environment.serviceBaseUrl}/Group/Upload?GroupID=${GroupID}&lstUser=${lstUser}`;
    // }

    uploadGroupUser(dataGroup: GroupUserModel[]): Observable<Object[]> {
       // console.log('this is uploadGroupUser!');
        let serviceUrl: string = `${environment.serviceBaseUrl}/Group/Upload`;
        return Observable.create(observer => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', serviceUrl, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.setRequestHeader('Cache-Control', 'no-store');
            xhr.setRequestHeader('Pragma', 'no-cache');
            xhr.withCredentials = true;
            xhr.responseType = 'blob';

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {

                        var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                        var blob = new Blob([xhr.response], { type: contentType });
                        observer.next(blob);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            }
            xhr.send(JSON.stringify(dataGroup));
        });
    }

    checkADListIsExist(userList: UserModel[]) {
        let serviceUrl: string = `${environment.serviceBaseUrl}Group/CheckADListIsExist`;
        let body = JSON.stringify(userList);
        console.log('8888888888888888888888');
        console.log(userList);
        console.log('9999999999999999999999');
        console.log(body);
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.post(serviceUrl, body, httpOptions);
    }
}
