import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RightSideBarComponent } from "src/app/components/shared/right-sidebar/right-sidebar.component";
import { TitleComponent } from "src/app/components/shared/title/title.component";
import { AppCodeComponent } from "src/app/components/shared/app-code/app-code.component";
import { ClipboardModule } from "ngx-clipboard";
import { HighlightModule } from "ngx-highlightjs";
import { AppExampleRunnerComponent } from "src/app/components/shared/app-example-runner/app-example-runner.component";
import { AppNotesComponent } from "src/app/components/shared/app-notes/app-notes.component";
import { PageViewerComponent } from "src/app/components/shared/page-viewer/page-viewer.component";
import { CodeExampleComponent } from "src/app/components/shared/code-example/code-example.component";
import { AppTabsComponent } from "src/app/components/shared/app-tabs/app-tabs.component";
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { DisqusComponent } from "src/app/components/shared/disqus/disqus/disqus.component";
import { GitHubIssueComponent } from "src/app/components/shared/disqus/github-issue/github-issue.component";
import { ContributionComponent } from '../disqus/contribution/contribution.component';

@NgModule({
 imports:      [CommonModule,ClipboardModule,HighlightModule ,DisqusSharedModule ],
 declarations: [ PageViewerComponent,TitleComponent,AppCodeComponent,AppExampleRunnerComponent,AppNotesComponent,CodeExampleComponent,AppTabsComponent ],
 exports:      [ CommonModule, FormsModule,TitleComponent,AppCodeComponent,AppExampleRunnerComponent,AppNotesComponent,PageViewerComponent,CodeExampleComponent,AppTabsComponent,DisqusSharedModule ],
 entryComponents: [GitHubIssueComponent,DisqusComponent,ContributionComponent],
})
export class CommonSharedModule { }