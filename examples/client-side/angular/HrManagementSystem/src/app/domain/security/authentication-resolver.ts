import { Injectable } from "@angular/core";
import { IAuthResolver } from "@rxweb/angular-router";
import { HttpClient } from "@angular/common/http";

var Users: any = [];
@Injectable({
  providedIn: "root"
})
export class AuthResolver implements IAuthResolver {
  constructor(private http: HttpClient) {}

  resolveAuth(): Promise<{ [key: string]: any }> | { [key: string]: any } {
    var promise = new Promise<{ [key: string]: any }>((resolve, reject) => {

      // Your custom logic here
      if (Users.length == 0)
        this.http.get("assets/json/users.json").subscribe(response => {
          Users = response;
          resolve(response);
        });
        else resolve(Users);
    });
    return promise;
  }
}
