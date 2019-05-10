

import { BrowserModule } from '@angular/platform-browser';
import { NgModule , APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';


import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AngularSplitModule } from 'angular-split';
//import { ContextMenuModule } from 'ngx-contextmenu';

 import { FormsModule , ReactiveFormsModule} from '@angular/forms';



//-primeng--------------------------------------

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                 //api
import {MessageService} from 'primeng/primeng';
import {TreeModule} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {FileUploadModule} from 'primeng/fileupload';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';
import {KeyFilterModule} from 'primeng/keyfilter';
import {PanelModule} from 'primeng/panel';
import {CheckboxModule} from 'primeng/checkbox';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ColorPickerModule } from 'primeng/colorpicker';
//-ngx-bootstrap--------------------------------------
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

//-Modal Component -----------------------------------
import { CommonModalService } from './modal/commonModal.service';
import { QueryAdComponent } from './modal/query-ad/query-ad.component';
import { QueryAdNoPermissionComponent } from './modal/query-ad-nopermission/query-ad-nopermission.component';
import { QueryGroupComponent } from './modal/query-group/query-group.component';
import { ModalCheckinSinglefileComponent } from './modal/modal-checkin-singlefile/modal-checkin-singlefile.component';
import { ModalCheckinMultifilesComponent } from './modal/modal-checkin-multifiles/modal-checkin-multifiles.component';
import { ModalFolderModifyComponent } from './modal/modal-folder-modify/modal-folder-modify.component';
import { ModalNewFolderComponent } from './modal/modal-new-folder/modal-new-folder.component';
import { ModalChangeFolderownerComponent } from './modal/modal-change-folderowner/modal-change-folderowner.component';
import { ModalFolderPermissionComponent } from './modal/modal-folder-permission/modal-folder-permission.component';
import { ModalBaseComponent } from './modal/modal-base.component';


//-Other Component-------------------------------------

import { SheetJSComponent } from './modal/sheetjs.component';
import { ModalUploadMemberlistComponent } from './modal/modal-upload-memberlist/modal-upload-memberlist.component';
import { ModalNewGroupComponent } from './modal/modal-new-group/modal-new-group.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalFileInfoComponent } from './modal/modal-file-info/modal-file-info.component';
import { ModalFileHistoryComponent } from './modal/modal-file-history/modal-file-history.component';
import { ModalMyCheckOutListComponent } from './modal/modal-my-check-out-list/modal-my-check-out-list.component';
import { ModalMyAlertmeListComponent } from './modal/modal-my-alertme-list/modal-my-alertme-list.component';
import { ModalSearchComponent } from './modal/modal-search/modal-search.component';


//-Page Component -----------------------------------------
import { PageFileComponent } from './page-file/page-file.component';
import { PageGroupComponent } from './page-group/page-group.component';



import {MyADUserProviderService} from './services/myAdUserProvider.service';


import { GroupService } from './services/GroupService';
import { FilesService } from './services/files-service.service';
import { DataService} from './services/data-service.service';
import { AuthenticationService} from './services/authentication-service.service';
import { WinAuthInterceptor } from './interceptors/winauth-interceptor';
import { ExcelService } from './services/ExcelService';


import { LoaderService } from './loading/LoaderService';
import { LoadingComponent } from './loading/loading/loading.component';



export function myADUserProviderFactory(provider: MyADUserProviderService) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ModalBaseComponent,
    QueryAdComponent,
    QueryAdNoPermissionComponent,
    QueryGroupComponent,
    ModalCheckinSinglefileComponent,
    ModalCheckinMultifilesComponent,
    ModalFolderModifyComponent,
    ModalNewFolderComponent,
    SheetJSComponent,
    ModalUploadMemberlistComponent,
    ModalNewGroupComponent,
    PageGroupComponent,
    ModalFileInfoComponent,
    ModalFileHistoryComponent,
    PageFileComponent,
    ModalChangeFolderownerComponent,
    ModalFolderPermissionComponent,
    ModalMyCheckOutListComponent,
    ModalMyAlertmeListComponent,
    ModalSearchComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularSplitModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    ModalModule.forRoot(),

    TreeModule,
    ToastModule,
    ButtonModule,
    ContextMenuModule,
    TabViewModule,
    CodeHighlighterModule,

    TableModule,
    SliderModule,
    MultiSelectModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    BreadcrumbModule,
    FileUploadModule,
    ConfirmDialogModule,
    KeyFilterModule,
    RadioButtonModule,
    PanelModule,
    CheckboxModule,
    MessagesModule,
    MessageModule,
    ColorPickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptor,
      multi: true
    },

    MyADUserProviderService,
    { provide: APP_INITIALIZER,
      useFactory: myADUserProviderFactory,
      deps: [MyADUserProviderService], multi: true
    },


    WinAuthInterceptor,
    DataService,
    FilesService,
    AuthenticationService,
    GroupService,
    MessageService,
    ConfirmationService,
    CommonModalService,
    LoaderService,
    ExcelService,
    DatePipe,
  ],


  entryComponents: [
    QueryAdComponent,
    QueryAdNoPermissionComponent,
    QueryGroupComponent,
    ModalCheckinSinglefileComponent,
    ModalCheckinMultifilesComponent,
    ModalFolderModifyComponent,
    ModalNewFolderComponent,
    ModalUploadMemberlistComponent,
    ModalNewGroupComponent,
    ModalFileInfoComponent,
    ModalFileHistoryComponent,
    ModalChangeFolderownerComponent,
    ModalFolderPermissionComponent,
    ModalMyCheckOutListComponent,
    ModalMyAlertmeListComponent,
    ModalSearchComponent,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
