import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ChoiceAddValidatorComponent } from './add/choice-add.component';
import { ChoiceCompleteValidatorComponent } from './complete/choice-complete.component';
import { ChoiceConditionalExpressionValidatorComponent } from './conditionalExpression/choice-conditonal-expression.component';
import { ChoiceMessageValidatorComponent } from './message/choice-message.component';
import { ChoiceMaxLengthValidatorComponent } from './maxLength/choice-max-length.component';
import { ChoiceMinLengthValidatorComponent } from './minLength/choice-min-length.component';
import { ChoiceDynamicValidatorComponent } from './dynamic/choice-dynamic.component';

@NgModule({
  declarations: [
    ChoiceAddValidatorComponent,
    ChoiceCompleteValidatorComponent,
    ChoiceConditionalExpressionValidatorComponent,
    ChoiceAddValidatorComponent,
    ChoiceMaxLengthValidatorComponent,
    ChoiceMessageValidatorComponent,
    ChoiceMinLengthValidatorComponent,
    ChoiceDynamicValidatorComponent
  ],
  entryComponents: [
    ChoiceAddValidatorComponent,
    ChoiceCompleteValidatorComponent,
    ChoiceConditionalExpressionValidatorComponent,
    ChoiceAddValidatorComponent,
    ChoiceMaxLengthValidatorComponent,
    ChoiceMessageValidatorComponent,
    ChoiceMinLengthValidatorComponent,
    ChoiceDynamicValidatorComponent
  ],
  imports: [
    CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule, RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ChoiceAddValidatorComponent,
    ChoiceCompleteValidatorComponent,
    ChoiceConditionalExpressionValidatorComponent,
    ChoiceAddValidatorComponent,
    ChoiceDynamicValidatorComponent,
    ChoiceMaxLengthValidatorComponent,
    ChoiceMessageValidatorComponent,
    ChoiceMinLengthValidatorComponent
  ],

})
export class ChoiceValidatorsExtendedModule { }
