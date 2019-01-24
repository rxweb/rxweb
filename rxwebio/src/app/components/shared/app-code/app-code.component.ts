import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './app-code.component.html',
})
export class AppCodeComponent implements OnInit {
  @Input() content:any;
  contentItem:any = {};
  allContents:any[] = [];
  type:string;
  ngOnInit(){
    this.type = typeof this.content;
    this.allContents = [];
    if(this.type == "object")
    {  
      for (var prop in this.content) {
        this.contentItem = Object.assign({},this.contentItem);
        if (this.content.hasOwnProperty(prop)) {
          this.contentItem['title'] = prop;
          this.contentItem['content'] = this.content[prop];
          this.allContents.push(this.contentItem);
      }
    }

    }

  }
}

