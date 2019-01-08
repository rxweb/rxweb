import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ChoiceCompleteTemplateDrivenValidationDirectivesComponent } from './complete/choice-complete.component';
import { ChoiceMaxLengthTemplateDrivenValidationDirectivesComponent } from './maxLength/choice-max-length.component';
import { ChoiceConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/choice-conditional-expression.component';
import { ChoiceMessageTemplateDrivenValidationDirectivesComponent } from './message/choice-message.component';
import { ChoiceDynamicTemplateDrivenValidationDirectivesComponent } from './dynamic/choice-dynamic.component';
import { ChoiceAddTemplateDrivenValidationDirectivesComponent } from './add/choice-add.component';
import { ChoiceMinLengthTemplateDrivenValidationDirectivesComponent } from './minLength/choice-min-length.component';

@NgModule({
  declarations: [
	ChoiceCompleteTemplateDrivenValidationDirectivesComponent,
	ChoiceMinLengthTemplateDrivenValidationDirectivesComponent,
	ChoiceMaxLengthTemplateDrivenValidationDirectivesComponent,
	ChoiceConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	ChoiceMessageTemplateDrivenValidationDirectivesComponent,
	ChoiceDynamicTemplateDrivenValidationDirectivesComponent,
	ChoiceAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	ChoiceCompleteTemplateDrivenValidationDirectivesComponent,
	ChoiceMinLengthTemplateDrivenValidationDirectivesComponent,
	ChoiceMaxLengthTemplateDrivenValidationDirectivesComponent,
	ChoiceConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	ChoiceMessageTemplateDrivenValidationDirectivesComponent,
	ChoiceDynamicTemplateDrivenValidationDirectivesComponent,
	ChoiceAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ChoiceCompleteTemplateDrivenValidationDirectivesComponent,
	ChoiceMinLengthTemplateDrivenValidationDirectivesComponent,
	ChoiceMaxLengthTemplateDrivenValidationDirectivesComponent,
	ChoiceConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	ChoiceMessageTemplateDrivenValidationDirectivesComponent,
	ChoiceDynamicTemplateDrivenValidationDirectivesComponent,
	ChoiceAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  ChoiceTemplateDrivenValidationDirectivesExtendedModule { }
