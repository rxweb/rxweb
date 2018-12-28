import { Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

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
  @Input() validationName?:string;
  @Input() activeTab?:string;
  showComponent: boolean = false;
  linkHref:string = "";
  constructor(
    private router: Router
  ) {
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

  route(typeName: string, templateDrivenType?: string) {
    if (templateDrivenType)
      this.router.navigate(['/', this.mainType, this.validationName, typeName, templateDrivenType])
    else
      this.router.navigate(['/', this.mainType, this.validationName, typeName])
  }

}

