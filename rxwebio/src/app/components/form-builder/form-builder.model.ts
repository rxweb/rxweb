import { required, json, propArray, prop, IpVersion, NumericValueType, RxFormGroup, password } from "@rxweb/reactive-form-validators";
import { FormGroup } from "@angular/forms";


export class ParameterItems{
  @prop()
  keyLabel:string;
  @prop()
  keyValue:any;
  @prop()
  parameterType:any;

  @propArray(ParameterItems)
  subParamerterItems:ParameterItems[] = []
}


export class Validators{
  @required()
  validatorName:string;

  @propArray(ParameterItems)
  parameterItems:ParameterItems[] = [];

  // @prop()
  // parameters:{ [key: string] : string; }
}




export class Properties{

  @required()
  propertyName:string

  @propArray(Validators)
  validators:Validators[]=[]
  
  @prop()
  validatorName:string[] = [];


  // @propArray(ParameterItems)
  // parameterItems:ParameterItems[] = [];

  // @propArray(Validators)
  // validators:Validators[] = [];

  @prop()
  otherProperties:string[];
 
}

export class FormBuilderModel {
  
  @required()
  @json()
  Json:string;

  @required()
  validatorType:string = "Validators";

  @propArray(Properties)
  properties:Properties[] = [];
}




