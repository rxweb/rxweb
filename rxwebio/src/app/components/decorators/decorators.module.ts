import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DECORATORS_ROUTING } from "src/app/components/decorators/decorators.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [DECORATORS_ROUTING ,PageModule],
  exports: [RouterModule],
  })
export class DecoratorsModule { }

