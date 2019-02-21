import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { FILE_OBJECT_ROUTING } from "src/app/components/how-to/fileObject/file-object.routing";
import { PageModule } from "src/app/components/page/page.module";
import { FILE_OBJECT_COMPONENT_EXAMPLE_CONSTANT } from './file-object.constants';
import { ErrorMessagesComponentExtendedModule } from 'src/assets/examples/how-to/errorMessage-extended.module';



@NgModule({
  imports: [FILE_OBJECT_ROUTING ,PageModule,ErrorMessagesComponentExtendedModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: FILE_OBJECT_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class FileObjectModule { }

