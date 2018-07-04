# alpha

Alpha validation decorator will allow only alphabets to be entered. It will not allow any number or special character. If user tries to do so the property will become invalid. To use the alpha decorator on particular property 
# [Basic Validation With Client Data Model](#tab/basic-validation-with-client-data-model)
> app/models/country.model.ts
```js
export class Country{
    @alpha() countryName: string;
}
```
> Note : Import all neccesary dependencies in the respective component. 

> app/components/country.component.ts
```js
@Component({ ...})
export class CountryComponent implements OnInit {
    countryFormGroup: FormGroup;
    constructor(private formBuilder: RxFormBuilder) { }
    ngOnInit() {
        let country = new Country();
        this.countryFormGroup = this.formBuilder.formGroup(country);
    }
}
```
> app/components/country.component.html
```html
<form [formGroup]="countryFormGroup">
    <div class="form-group">
      <label>Country Name</label>
      <input type="text" formControlName="countryName" class="form-control"  />
      <small class="form-text text-danger" *ngIf="countryFormGroup.controls.userName.errors">{{countryFormGroup.controls.countryName.errors.alpha.message}}</small>
    </div>
</form>
```
# [Basic Validation With Server Data](#tab/basic-validation-with-server-data)
> app/models/country.model.ts
```js
export class Country{
    @alpha() countryName: string;
}
```
> Note : Import all neccesary dependencies in the respective component. 

> app/components/country.component.ts
```js
@Component({ ...})
export class CountryComponent implements OnInit {
    countryFormGroup: FormGroup;
    constructor(private formBuilder: RxFormBuilder) { }
    ngOnInit() {
        let country = new Country();
        this.countryFormGroup = this.formBuilder.formGroup(country);
    }
}
```
> app/components/country.component.html
```html
<form [formGroup]="countryFormGroup">
    <div class="form-group">
      <label>Country Name</label>
      <input type="text" formControlName="countryName" class="form-control"  />
      <small class="form-text text-danger" *ngIf="countryFormGroup.controls.userName.errors">{{countryFormGroup.controls.countryName.errors.alpha.message}}</small>
    </div>
</form>
```
# AlphaConfig 
Below options are not mandatory to use the options in the `@alpha()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[allowWhiteSpace](#allowWhiteSpace) | This will allow whitespace in particular control property.The default value is `false`. |
|[conditionalExpression](#conditionalExpression) | Alpha validation should be applied if the condition is matched in the `conditionalExpression' function.  |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## allowWhiteSpace
| |
|--- |
| This will allow whitespace in particular control property.The default value is `false`. |
| allowWhiteSpace : boolean |
```js 
export class Country {  @alpha({ allowWhiteSpace : true }) stateName: string; }
```

## conditionalExpression
| |
|--- |
| Alpha validation should be applied if the condition is matched in the `conditionalExpression` function. There are two parameter will be passed at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value will be passed. You can apply condition on respective object value.
Binding expression with string at the time of dynamic validation should be perfomed. The value is comming from the remote location and bind accordingly.
 |
| conditionalExpression : `Function` `|` `string` |
| |
> Binding `conditionalExpression` with `Function` object.

```js
export class Country 
{  
    @prop() countryName:string;

    @alpha({ conditionalExpression : (x,y) => x.countryName == 'America' }) stateName: string; 
}
```

> Binding `conditionalExpression` with `string` datatype.

```js
export class Country 
{  
    @prop() countryName:string;

    @alpha({ conditionalExpression : "(x,y) => x.countryName == 'America'" }) stateName: string; 
}
```

## message
| |
|--- |
| To override the global configuration message and show the custom message on particular control property. |
| message : `string` |
| |
```js
export class Country 
{  
    @alpha({ message:"You can enter only alphabets. " }) stateCode: string; 
}
```






