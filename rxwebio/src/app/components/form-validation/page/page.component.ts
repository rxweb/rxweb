import { ElementRef,Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { PageViewerComponent } from "src/app/components/shared/page-viewer/page-viewer.component";
import { ActivatedRoute } from "@angular/router";
import { Inject } from "@angular/core";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";

@Component({
  templateUrl: './page.component.html',
  entryComponents:[PageViewerComponent]
})
export class PageComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = "";
  jsonContent:any = "";
  activeTab:string = "validators";
  element:HTMLElement;
  typeName:string;
  validationName:string;
  showViewer:boolean = false;
   
  constructor(
    private http: HttpClient, private elementRef:ElementRef,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {
    this.element = elementRef.nativeElement as HTMLElement;
    activatedRoute.params.subscribe(t=>{
      if(t["typeName"])
        this.typeName = t["typeName"];
      this.bind();
    })
  }
  ngOnInit(): void {
    
  }

  bind(){
    this.showViewer = false;
    let splitedArray = location.pathname.split('/');
    this.validationName = splitedArray[2];
    this.http.get('assets/json/generator/' + this.validationName +'/' + this.typeName + '.json', this.options).subscribe(response => {
      this.codeContent =JSON.parse(response.toString());
      this.http.get('assets/json/generator/' + this.validationName +'/' +this.validationName + '-' + this.typeName + '.json', this.options).subscribe((responseObj: object) => {
        this.jsonContent =JSON.parse(responseObj.toString());
        this.showComponent = true;
        if (splitedArray[3] != undefined)
          document.title = splitedArray[2] + " : " + splitedArray[3]
        this.activeTab = splitedArray[3];
        this.showViewer= true;
      });
    });
  }

  route(typeName:string){
    this.router.navigate(['form-validation',this.validationName,typeName])
  }
}
