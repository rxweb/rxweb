import { Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})

export class SideBarComponent implements OnInit {
  links: any;
  showComponent: boolean;
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
    this.http.get('assets/json/sidebar.json').subscribe((response: any) => {
      this.links = response.links;
      this.showComponent = true;
    });
  }
}


