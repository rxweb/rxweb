import { ElementRef, Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { PageViewerComponent } from "src/app/components/shared/page-viewer/page-viewer.component";
import { ActivatedRoute } from "@angular/router";
import { Inject } from "@angular/core";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  templateUrl: './page.component.html',
  entryComponents: [PageViewerComponent],
  // animations: [
  //   trigger(
  //     'enterAnimation', [
  //       transition(':enter', [
  //         style({transform: 'translateX(100%)', opacity: 0}),
  //         animate('2000ms', style({transform: 'translateX(0)', opacity: 1}))
  //       ]),
  //       transition(':leave', [
  //         style({transform: 'translateX(0)', opacity: 1}),
  //         animate('2000ms', style({transform: 'translateX(100%)', opacity: 0}))
  //       ])
  //     ]
  //   )
  // ],
})
export class PageComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent: any = "";
  jsonContent: any = "";
  activeTab: string = "validators";
  element: HTMLElement;
  typeName: string;
  validationName: string;
  showViewer: boolean = false;

  constructor(
    private http: HttpClient, private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.element = elementRef.nativeElement as HTMLElement;
    activatedRoute.params.subscribe(t => {
      if (t["typeName"])
        this.typeName = t["typeName"];
      this.bind();
    })
  }
  ngOnInit(): void {

  }

  bind() {
    this.showViewer = false;
    let splitedArray = location.pathname.split('/');
    this.validationName = splitedArray[2];
    this.http.get('assets/json/generator/' + this.validationName + '/' + this.typeName + '.json', this.options).subscribe(response => {
      this.codeContent = JSON.parse(response.toString());
      this.http.get('assets/json/generator/' + this.validationName + '/' + this.validationName + '-' + this.typeName + '.json', this.options).subscribe((responseObj: object) => {
        this.jsonContent = JSON.parse(responseObj.toString());
        this.showComponent = true;
        let titleString = "";
        if (splitedArray[3] != undefined) {
          switch (splitedArray[3]) {
            case "decorators":
              titleString = "decorator";
              break;
            case "validators":
              titleString = "validator";
              break;
            case "template-driven":
              titleString = "template-driven";
              break;
          }
          document.title = "rxweb " + splitedArray[2] + " : " + titleString ;
        }
        this.activeTab = splitedArray[3];
        this.showViewer = true;
      });
    });
  }

  route(typeName: string) {
    this.router.navigate(['form-validations', this.validationName, typeName])
  }

  scrollTo(section) {
    window.location.hash = section;
  }
}
