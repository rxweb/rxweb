import { ElementRef, Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { PageViewerComponent } from "src/app/components/shared/page-viewer/page-viewer.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './text-page.component.html',
  entryComponents: [PageViewerComponent],
})
export class TextPageComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent: any = "";
  validationName: string;
  mainType: string;
  constructor(
    private http: HttpClient
  ) {
    
  }
  ngOnInit(): void {
    this.bind();
  }

  bind() {
    let splitedArray = location.pathname.split('/');
    this.mainType = splitedArray[1];
    this.validationName = splitedArray[2];
    let codeUri = "";
    codeUri = 'assets/json/generator/' + this.validationName + '/decorators.json';
    this.http.get(codeUri, this.options).subscribe(response => {
        this.codeContent = JSON.parse(response.toString());
        var element = document.getElementById("mainContent")
        element.innerHTML = this.codeContent.htmlContent;
        document.title = "rxweb " + this.codeContent.title
    });

  }

  scrollTo(section) {
    window.location.hash = section;
  }
}
