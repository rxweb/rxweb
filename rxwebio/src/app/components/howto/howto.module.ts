import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HOWTO_ROUTING } from "src/app/components/howto/howto.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [HOWTO_ROUTING ,PageModule],
  exports: [RouterModule],
  })
export class HowtoModule { }

