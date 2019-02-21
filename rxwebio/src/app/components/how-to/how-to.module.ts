import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageModule } from "src/app/components/page/page.module";
import { HOWTO_ROUTING } from './how-to.routing';



@NgModule({
  imports: [HOWTO_ROUTING ,PageModule],
  exports: [RouterModule],
  })
export class HowtoModule { }

