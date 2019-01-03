import { Component, OnChanges, SimpleChanges, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApplicationBroadcaster } from "src/app/domain/application-broadcaster";
import { Router } from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})

export class TopBarComponent{
  searchvalue:string
  hideSideBar(): void {
    const body = document.getElementsByTagName('body')[0];
    
    if (window.innerWidth < 769) {
      body.classList.toggle('show-sidebar');
    } else {
      body.classList.toggle('hide-sidebar');
    }
  }
  showsearchcontent(event, searchvalue : string)
  {
    if(event.key == "Escape"){
      document.getElementById("searchlist-content").style.display = "none";
      this.searchvalue = "";
    }
    else
    {
     if(searchvalue.length > 0)
     {
     document.getElementById("searchlist-content").style.display = "block";
     }
     else{
       document.getElementById("searchlist-content").style.display = "none";
     }
    }
  }

}