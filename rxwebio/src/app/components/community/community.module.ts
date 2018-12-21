import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMMUNITY_ROUTING } from "src/app/components/community/community.routing";
import { TextPageModule } from '../text-page/text-page.module';



@NgModule({
  imports: [COMMUNITY_ROUTING ,TextPageModule],
  exports: [RouterModule],
  })
export class CommunityModule { }

