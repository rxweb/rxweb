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
  @Input() validatorType:string;
  showComponent: boolean = false;
  constructor(
  ) {
  }
  ngOnInit(): void {
      this.showComponent = true;
  }
}

