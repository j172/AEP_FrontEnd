export class GroupModel {
    GroupID: number;
    GroupName: string;
    IsSystem: boolean;
    lstGroupUser: GroupUserModel[];
  }

export class GroupUserModel {
    GroupID: number;
    UserAD: string; 

}

export class UserModel {
    UserAD: string;
}