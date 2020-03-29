import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppComponent, ContactListComponent, ContactListChildComponent, ContactComponent} from './app.component';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RxReactiveDynamicFormsModule } from '@rxweb/reactive-dynamic-forms'
import { Routes, RouterModule, CanActivate, } from '@angular/router';
export class MyGuard implements CanActivate {
    canActivate() {
        debugger;
        console.log("guard called")
        return true;
    }
}
var routes: Routes = [{ path: 'contact', component: ContactComponent }, {
    path: 'contacts', component: ContactListComponent,
    children: [{
        path: 'child',
        component: ContactListChildComponent
    }]
},];
import {
    RouteReuseStrategy,
    ActivatedRouteSnapshot,
    DetachedRouteHandle,
 
    UrlSegment
} from '@angular/router';
var t = null;

//var prototype: any = ActivatedRouteSnapshot.prototype
//prototype.routeConfig = {
//    get: () => { console.log(t); return t },
//    set: (v) => {
//        t = v;
//        console.log(t);
//    },
//    enumerable: true,
//    configurable: true
//}
//Object.defineProperty(ActivatedRouteSnapshot.prototype, "routeConfig", {
//    get: function () { return this.cloneSnap;},
//    set: function(v) {
//        debugger;
//        this.cloneSnap = v;
//        if (this.cloneSnap && !this.cloneSnap.canActivate)
//            this.cloneSnap.canActivate = [MyGuard];
//        },
//    enumerable: true,
//    configurable: true
//})
import {  RxTranslateModule } from "@rxweb/translate"
//Translator.language = "en";
@NgModule({
  declarations: [
        AppComponent, ContactListComponent, ContactListChildComponent, ContactComponent
  ],
    imports: [RouterModule.forRoot(routes),
        BrowserModule, ReactiveFormsModule, FormsModule, RxReactiveFormsModule, RxReactiveDynamicFormsModule,
        CommonModule,
        RxTranslateModule.forRoot({ globalFilePath: "multilingual/#lcode#/global.json", folderPath: "multilingual/#lcode#" })
     ],
    providers: [MyGuard],
    bootstrap: [AppComponent],
    exports: [RouterModule],
    entryComponents: [],
})
export class AppModule { }


