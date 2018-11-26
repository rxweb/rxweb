import { Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter,AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { AppCodeComponent } from "src/app/components/shared/app-code/app-code.component";
import { AlphaAllowWhiteSpaceComponent } from "src/assets/examples/reactive-form-validators/decorators/alpha/allowWhiteSpace/alpha-allow-white-space.component";
import { ElementRef } from "@angular/core";
import { ComponentFactoryResolver } from "@angular/core";
import { ViewContainerRef } from "@angular/core";
import { ComponentView } from "src/app/domain/view";
import { ViewChild } from "@angular/core";
import { CodeExampleComponent } from "src/app/components/shared/code-example/code-example.component";

@Component({
  selector: 'app-example-runner',
  templateUrl: './app-example-runner.component.html',
  entryComponents: [AppCodeComponent,CodeExampleComponent]
})

export class AppExampleRunnerComponent implements OnInit {
  @Input() title: string;
  @Input() refComponent: string;
  @Input() content: any;
  showElement: any = {};
  tabArray: any = {};
  activeTab: string;
  showComponent: boolean = false;
  constructor(
  ) {
  }
  ngOnInit(): void {
    this.showElement = false;
    this.tabArray = [];
    if(this.content){
      if (this.content.model != null)
        this.tabArray.push({ "tabName": "Model", "tabItem": "model", "content": this.content.model })
      if (this.content.component != null)
        this.tabArray.push({ "tabName": "Component", "tabItem": "component", "content": this.content.component })
      if (this.content.json != null)
        this.tabArray.push({ "tabName": "Json", "tabItem": "json", "content": this.content.json })
      if (this.content.html != null)
        this.tabArray.push({ "tabName": "Html", "tabItem": "html", "content": this.content.html })
      this.activeTab = this.tabArray[0].tabName;
    }
  }
}

