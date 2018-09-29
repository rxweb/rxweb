import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {


  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }


  logOut(): void {
  }
}
