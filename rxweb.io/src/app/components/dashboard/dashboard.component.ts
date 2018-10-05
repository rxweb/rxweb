import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnChanges {
  showComponent:boolean = false;
  validators: any
  @Input() searchText: any;
  masterList: any;
  constructor(
    private router: Router, private http: HttpClient
  ) {
  }

  ngOnChanges(change: any) {
    if (change.searchText.currentValue)
      this.filterList(change.searchText.currentValue);
    else
      this.validators = this.masterList;
  }

  filterList(search: any) {
    this.validators = this.masterList.filter(t => t.title.toLowerCase().startsWith(search.toLowerCase()))
  }

  ngOnInit(): void {
    this.http.get('assets/json/validation.json')
      .subscribe((response:any) => {
        debugger
        this.validators = response.routes;
        this.masterList = this.validators.map(x => Object.assign({}, x));
        this.showComponent = true;
      });
  }

  logOut(): void {
  }
}
