import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SANITIZATION_ROUTING } from "src/app/components/sanitization/sanitization.routing";
import { PageModule } from "src/app/components/page/page.module";


@NgModule({
  imports: [SANITIZATION_ROUTING ,PageModule,],
  exports: [RouterModule],
  })
export class SanitizationModule { }

