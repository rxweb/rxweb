import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { translate } from "@rxweb/translate";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit{
    @translate({translationName:'sidebar'}) sidebar:any;
    showComponent:boolean = false;
    ngOnInit(){
       this.showComponent = true;
    }
}