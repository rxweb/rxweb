import { Component, OnChanges, SimpleChanges,  Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApplicationBroadcaster } from "src/app/domain/application-broadcaster";
import { Router } from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})

export class TopBarComponent {

  searchvalue: string
  @ViewChild('search') searchInput: ElementRef;
  hideSideBar(): void {
    const body = document.getElementsByTagName('body')[0];
    if (window.innerWidth < 769)
      body.classList.toggle('show-sidebar');
    else
      body.classList.toggle('hide-sidebar');
  }
  showsearchcontent(event, searchvalue: string) {
    if (event.key == "Escape")
      this.hideSearch();
    else {
      if (searchvalue != undefined && searchvalue.length > 0)
        document.getElementById("searchlist-content").style.display = "block";
      else
        this.hideSearch();
    }
  }
  hideSearch() {
    this.searchInput['searchBox'].nativeElement.value = "";
    this.searchvalue = "";
    document.getElementById("searchlist-content").style.display = "none";
  }

}