import { CommonModalService } from './modal/commonModal.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


import * as models from './models/';
import { AppUser } from './models/AppUser';
import { PostDataModel } from './models/PostData';
import { TreeviewItem } from 'ngx-treeview';
import { File, Folder, MyCreateFolder } from './models/file';
import { MenuItem, TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { TreeDragDropService } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MessageService } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { environment } from '../environments/environment';
import { MyADUserProviderService } from './services/myAdUserProvider.service';
import { LoaderService } from './loading/LoaderService';
import { FilesService } from './services/files-service.service';
import { DataService } from './services/data-service.service';
import { ExcelService } from './services/ExcelService';
import { AuthenticationService} from './services/authentication-service.service';
import { DownloadLogModel } from './models/DownloadLogModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


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

  title = 'app';

  options = {};

  myLog: DownloadLogModel[];

  public currentColor: string = "#124F76";


  constructor(
    public excelService: ExcelService,
    public datePipe: DatePipe,

    private http: HttpClient,
    private confirmationService: ConfirmationService,

    private adUserSvc: MyADUserProviderService,
    private dataService: DataService,
    private messageService: MessageService,
    private authService: AuthenticationService,
    
    private loaderService: LoaderService,
    private commonModalService: CommonModalService,
    private filesService: FilesService,
  ) {



  }


  ngOnInit() {
    console.log('myColor =' + this.MyColor);
    this.currentColor = this.MyColor; //"#124F76";
  }

  downloadLog() {
    console.log('download log function');
    this.filesService.getDownloadLog()
      .subscribe(data => {
        console.log(data);
        this.myLog = <DownloadLogModel[]>data;
        this.exportExcel();
      });
  }

  exportExcel() {
    this.loaderService.show();
    var col = [];
    var rows = [];

    this.myLog.forEach(item => {
      let object = {
        下載人員: item.UserAD,
        文件名稱: item.DocName,
        文件版本: item.DocVersion,
        下載時間: this.datePipe.transform(item.DownloadTime, 'yyyy/MM/dd HH:mm:ss')
      };
      rows.push(object);
    });

    console.log(this.myLog);
    let DateStamp = this.datePipe.transform(new Date(), 'yyyyMMdd');
    this.excelService.exportAsExcelFile(rows, 'AEP_DownloadLog_' + DateStamp + '.xlsx').subscribe((data) => {
      console.log('exportAsExcelFile')
      this.loaderService.hide();
    });
  }


  changeColor(color) {
    console.log('change color-->');
    console.log(color);
    this.currentColor = color;
    this.saveMyColor(color.replace('#',''));
  }

  saveMyColor(color) {
    console.log('my new Color = ' + color);
    this.authService.saveColor(color)
        .subscribe(res => {
          //this.messageService.add({ severity: 'success', summary: 'Color', detail: `Setting color done.` });
        }, error => {
          console.log(error); //JSON.parse(error._body).Message
          this.messageService.add({ severity: 'error', summary: 'Color', life: 10000, detail: `${error.error.Message}` });
        });
  }

  myCheckOutList() {
    console.log('******* this is my check out list button *******');
    this.commonModalService.openSelectModal('modalMyCheckOutList', null, null).
      subscribe(result => {
        let mylist = result;
        console.log(mylist);
      });
  }

  myAlertMeList() {
    console.log('******* this is my alert me list button *******');
    this.commonModalService.openSelectModal('modalMyAlertMeList', null, null).
      subscribe(result => {
        let mylist = result;
        console.log(mylist);
      });
  }

}
