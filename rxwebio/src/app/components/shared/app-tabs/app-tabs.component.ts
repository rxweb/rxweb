import { Component, OnInit, Input} from '@angular/core';
import { TabModel } from "src/app/components/shared/app-tabs/tab.model";

@Component({
  selector: 'app-tabs',
  templateUrl: './app-tabs.component.html',
})

export class AppTabsComponent implements OnInit {
  @Input() tabArray:TabModel[];
  @Input() content;
  @Input() typeName:string;
  @Input() templateDrivenType:string;
  activeTab:string;
  constructor(
  ) {
  }
  ngOnInit(): void {
      this.activeTab = this.tabArray[0].tabName;
  }
}

