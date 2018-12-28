import { ElementRef,Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
})

export class TitleComponent implements OnInit {
  @Input() title:string;
  @Input() description:string;
  @Input() validatorType?:string;
  @Input() validationTypeTitle?:string;
  @Input() mainType?:string;
  showComponent: boolean = false;

  templateDrivenType: string;
  showViewer: boolean = false;
  validationName: string;
  typeName: string;
  options: any = { responseType: 'text' };
  codeContent: any = "";
  jsonContent: any = "";
  activeTab: string = "validators";
  showExample: boolean = true;
  element: HTMLElement;
  
  linkHref:string = "";
  constructor(
    private http: HttpClient,
    private router: Router,
    private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.element = elementRef.nativeElement as HTMLElement;
    activatedRoute.params.subscribe(t => {
      if (t["typeName"])
        this.typeName = t["typeName"];
      if (t["templateDrivenType"])
        this.templateDrivenType = t["templateDrivenType"];
      this.bind();
    })
    activatedRoute.queryParams.subscribe(params => {
      if (params.showExample)
        this.showExample = params.showExample == "true" ? true : false;
      else
        this.showExample = true;
      this.bind();
    });
  }
  ngOnInit(): void {
    if(this.mainType)
      this.linkHref += "/" + this.mainType;
    else if(this.title)
      this.linkHref += "/" + this.title;
    else if(this.validatorType)
      this.linkHref += "/" + this.validatorType;
    this.showComponent = true;
  }

  bind() {
    this.showViewer = false;
    let splitedArray = location.pathname.split('/');
    this.mainType = splitedArray[1];
    this.validationName = splitedArray[2];
    let titleString = "";
    let codeUri = "";
    let htmlUri = ""
    if (splitedArray[3] != undefined) {
      switch (splitedArray[3]) {
        case "decorators":
          codeUri = 'assets/json/generator/' + this.validationName + '/' + this.typeName + '.json';
          htmlUri = 'assets/json/generator/' + this.validationName + '/' + this.validationName + '-' + this.typeName + '.json';
          titleString = "decorator";
          break;
        case "validators":
          codeUri = 'assets/json/generator/' + this.validationName + '/' + this.typeName + '.json'
          htmlUri = 'assets/json/generator/' + this.validationName + '/' + this.validationName + '-' + this.typeName + '.json';
          titleString = "validator";
          break;
        case "template-driven":
          codeUri = 'assets/json/generator/' + this.validationName + '/' + this.typeName + '-' + this.templateDrivenType + '.json'
          if (this.templateDrivenType == "decorators")
            htmlUri = 'assets/json/generator/' + this.validationName + '/' + this.typeName + '/' + this.validationName + '-validation-' + this.templateDrivenType + '.json';
          else if (this.templateDrivenType == "directives")
            htmlUri = 'assets/json/generator/' + this.validationName + '/' + this.typeName + '/' + this.validationName + '-validation-' + this.templateDrivenType + '.json';
          titleString = "template-driven";
          break;
      }
      document.title = "rxweb " + splitedArray[2] + " : " + titleString;
    }
  
      this.http.get(codeUri, this.options).subscribe(response => {
        this.codeContent = JSON.parse(response.toString());
        this.http.get(htmlUri, this.options).subscribe((responseObj: object) => {
          this.jsonContent = JSON.parse(responseObj.toString());
          this.showComponent = true;
          this.activeTab = splitedArray[3];
          this.showViewer = true;
        });
      });
  }

  route(typeName: string, templateDrivenType?: string) {
    if (templateDrivenType)
      this.router.navigate(['/', 'form-validations', this.validationName, typeName, templateDrivenType])
    else
      this.router.navigate(['/', 'form-validations', this.validationName, typeName])
  }

  routeExample() {
    this.showExample = !this.showExample;
    var splitedArray = location.pathname.split('/');
    if (splitedArray[4])
      this.router.navigate(['/', splitedArray[1], splitedArray[2], splitedArray[3], splitedArray[4]], { queryParams: { showExample: this.showExample }, replaceUrl: false });
    else
      this.router.navigate(['/', splitedArray[1], splitedArray[2], splitedArray[3]], { queryParams: { showExample: this.showExample }, replaceUrl: false });
  }
}

