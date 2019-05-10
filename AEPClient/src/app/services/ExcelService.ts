import { Component, Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable()
export class ExcelService {

  constructor(
    //private loaderService: LoaderService
  ) { }

  public exportAsExcelFile(json: any[], excelFileName: string): Observable<any> {

    return Observable.create(observer => {


      //this.loaderService.show();
      const ws_name = 'SomeSheet';
      const wb: WorkBook = { SheetNames: [], Sheets: {} };
      const ws: any = utils.json_to_sheet(json);
      wb.SheetNames.push(ws_name);
      wb.Sheets[ws_name] = ws;
      const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

      function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xFF;
        };
        return buf;
      }

      saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), excelFileName);


      observer.next('done');
      observer.complete();
      //this.loaderService.hide();
    });

  }






}
