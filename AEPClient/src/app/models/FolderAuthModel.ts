export class FolderAuthModel {
    AuthID: number;
    FolderID: number;
    FolderName: string;
    GroupID: number;
    GroupName: string;
    UserAD: string;
    FolderAuth: number;
    AuthType: number;
    FolderAuthModel: boolean;
  }

  export class FolderAuthMainModel {
    FolderID: number;
    IsAuthInherit: boolean;
    lstFolderAuth: FolderAuthModel[] = [];
  }
