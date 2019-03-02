import {Injectable } from "@angular/core";
import {user } from './user';

@Injectable()
export class PermissionService {

    isAccess(accessItems: any[]) {
        let haveAccess: boolean = true;
        if (user.pagePermission != undefined) {
            if (accessItems.length == 1)
                haveAccess = !(user.pagePermission[accessItems[0]]);
            else {
                let item;
                for (let accessItem of accessItems) {
                    if (!item)
                        item = user.pagePermission[accessItem];
                    else
                        item = item[accessItem]
                    haveAccess = !(item);
                }
            }
            return haveAccess;
        }
        return false;
    }

}