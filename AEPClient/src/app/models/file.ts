export class File
{
  id: string;
  name: string;
  isfolder: boolean;
  owner: string ;
  status: string;
  physicalPath: string;
  createDateTime: Date;
  updateDateTime: Date;
  version: string;
  checkOutBy: string;
  checkInBy: string;
  checkOutDateTime: Date;
  deleteBy: string;
  deleteDateTime: Date;
  comments: string;
  isAlertMe: boolean;
  isDelete: boolean;
  folderID: number;

}
export class Folder
{
  name: string;
  ParentID: string;
  ParentPhysicalPath: string;
}
export class MyCreateFolder
{
  name: string;
  parentID: string;
  parentPhysicalPath: string;
}


export class MyFolderAttr
{
  id: number;
  physicalPath: string;
  owner: string[];
  parentId: number;
  isOwner: boolean;
  auth: number;
  isDelete: boolean;
}

export class AEPReturnUploadFile
{
  FileName: string;
  IsOK: boolean;
  DocID: string;
  file:any;
  message:string;

}
