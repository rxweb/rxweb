import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ChoiceCompleteComponent } from './complete/choice-complete.component';
import { ChoiceConditionalExpressionComponent } from './conditionalExpression/choice-conditional-expression.component';
import { ChoiceMessageComponent } from './message/choice-message.component';
import { ChoiceDynamicComponent } from './dynamic/choice-dynamic.component';
import { ChoiceAddComponent } from './add/choice-add.component';
import { ChoiceMaxLengthComponent } from './maxLength/choice-max-length.component';
import { ChoiceMinLengthComponent } from './minLength/choice-min-length.component';

@NgModule({
  declarations: [
	ChoiceCompleteComponent,
	ChoiceMinLengthComponent,
	ChoiceMaxLengthComponent,
	ChoiceConditionalExpressionComponent,
	ChoiceMessageComponent,
	ChoiceDynamicComponent,
	ChoiceAddComponent,
  ],
entryComponents: [
	ChoiceCompleteComponent,
	ChoiceMinLengthComponent,
	ChoiceMaxLengthComponent,
	ChoiceConditionalExpressionComponent,
	ChoiceMessageComponent,
	ChoiceDynamicComponent,
	ChoiceAddComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ChoiceCompleteComponent,
	ChoiceMinLengthComponent,
	ChoiceMaxLengthComponent,
	ChoiceConditionalExpressionComponent,
	ChoiceMessageComponent,
	ChoiceDynamicComponent,
	ChoiceAddComponent,
  ],

})
export class  ChoiceDecoratorsExtendedModule { }
