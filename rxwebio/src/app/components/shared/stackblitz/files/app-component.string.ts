export const APP_COMPONENT :string = `import { Component,OnInit } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  ngOnInit(){
    //if you want to apply global configuration then use below code. 
    ReactiveFormConfig.set(##global-config##);
  }
}`

