/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
import { Component, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/primeng';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

type AOA = Array<Array<any>>;

function s2ab(s: string): ArrayBuffer {
	const buf = new ArrayBuffer(s.length);
	const view = new Uint8Array(buf);
	for (let i = 0; i !== s.length; ++i) {
		view[i] = s.charCodeAt(i) & 0xFF;
	};
	return buf;
}

@Component({
	selector: 'sheetjs',
	template: `

	<div class="form-inline">
		<input type="file" accept=".xlsx,.xls" (change)="onFileChange($event)"  class="form-control" />
		<label> Read first Sheet, </label>
		<label> File Name: {{fileName}} </label>
    </div>

	`

})

export class SheetJSComponent {
	@Output() onCompleted = new EventEmitter();

	data: AOA = [[], []];
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'binary' };
	fileName: string = "";

	constructor(private messageService: MessageService,) {
		this.IECheck();
	}





	onFileChange(evt: any) {
		//console.log("SheetJSComponent onFileChange");


		var inputValue = evt.target;
		this.fileName = inputValue.files[0].name;
		let fileExtension = this.fileName.split('.').pop();
		//console.log('FileExtension => ' + fileExtension);

		if (fileExtension != 'xls' && fileExtension != 'xlsx') {
			this.messageService.add({ severity: 'error', summary: 'Error Message', life: 10000, detail: `Please choose excel file!` });
			return false;
		}

		this.data = [[], []];
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		//console.log(target.files[0]);
		if (target.files.length != 1) { throw new Error("Cannot upload multiple files on the entry") };
		const reader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr = e.target.result;
			//console.log(bstr);
			const wb = XLSX.read(bstr, { type: 'binary' });
			/* grab first sheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];

			/* save data */
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
			this.onCompleted.emit(this.data);
			evt.target.value = '';
			//console.log(this.data);
		};
		reader.readAsBinaryString(target.files[0]);
	}

	IECheck(): void {
		if (FileReader.prototype.readAsBinaryString === undefined) {
			FileReader.prototype.readAsBinaryString = function (fileData) {
				let binary = '';
				const pt = this;
				const reader = new FileReader();
				reader.onload = function (e) {
					const bytes = new Uint8Array(reader.result);
					const length = bytes.byteLength;
					for (let i = 0; i < length; i++) {
						binary += String.fromCharCode(bytes[i]);
					}
					const f = { target: { result: binary } };
					pt.onload(f);
				}
				reader.readAsArrayBuffer(fileData);
			}
		}
	}
	export(): void {
		/* generate worksheet */
		const ws = XLSX.utils.aoa_to_sheet(this.data);

		/* generate workbook and add the worksheet */
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		const wbout = XLSX.write(wb, this.wopts);
		//console.log(this.fileName);
		saveAs(new Blob([s2ab(wbout)]), this.fileName);
	}
}
