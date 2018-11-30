import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DisqusComponent } from "src/app/components/shared/disqus/disqus/disqus.component";
import { TimeAgoPipe } from 'time-ago-pipe';
import { ReactiveFormsModule } from "@angular/forms";
import { GitHubIssueComponent } from "src/app/components/shared/disqus/github-issue/github-issue.component";

@NgModule({
 imports:      [ CommonModule ,FormsModule, ReactiveFormsModule,],
 declarations: [ DisqusComponent,TimeAgoPipe,GitHubIssueComponent ],
 exports:      [ DisqusComponent,CommonModule, FormsModule,GitHubIssueComponent ]
})
export class DisqusSharedModule { }