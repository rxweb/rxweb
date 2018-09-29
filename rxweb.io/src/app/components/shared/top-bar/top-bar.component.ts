import { Component, OnChanges, SimpleChanges, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})

export class TopBarComponent implements OnInit {
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  hideSideBar(): void {
    const body = document.getElementsByTagName('body')[0];
    if (window.innerWidth < 769) {
      body.classList.toggle('show-sidebar');
    } else {
      body.classList.toggle('hide-sidebar');
    }
  }
}
