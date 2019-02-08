import { required, propArray, prop } from "@rxweb/reactive-form-validators";

export class ConditionalExpressionModel{
    @prop()
    fieldName:string;
    @prop()
    fieldValue:string;
    @prop()
    operator:string;
}

export class ParameterItems{
    @prop()
    keyLabel:string;
    //@required({conditionalExpression:x => x.isRequired == true})
    @prop()
    keyValue:any;
    @prop()
    parameterType:any;    
    @prop()
    isRequired:boolean;    
    @propArray(ParameterItems)
    subParamerterItems:ParameterItems[] = []
    @propArray(ConditionalExpressionModel)
    conditionalExpressionModels:ConditionalExpressionModel[]=[];
}

export class Validators{
    @prop()
    validatorName:string;
    @prop()
    isHide:boolean = false;
    @propArray(ParameterItems)
    parameterItems:ParameterItems[] = [];
}

export class PropertyModel{
    @prop()
    propertyName:string;
    @prop()
    propertyValue:string;
    @prop()
    isRemoved:boolean = false;
    @propArray(Validators)
    validators:Validators[] = [];
    @prop()
    otherProperties:string[];
}

export class DynamicFormBuilderModel {
    @required()
    json:string;
    @propArray(PropertyModel)
    keyList:PropertyModel[] = [];
}


export class Model {
    @prop()
    modelName:string;
    @prop()
    propertyName:string;
    @prop()
    annotationType:string;
    @prop()
    refrenceType:string;
    @prop()
    isRemoved:boolean;
}


