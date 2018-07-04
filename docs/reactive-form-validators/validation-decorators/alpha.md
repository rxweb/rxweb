# alpha

Alpha validation decorator will allow only alphabets to be entered. It will not allow any number or special character. If user tries to do so the property will become invalid. To use the alpha decorator on particular property 

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
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[conditionalExpression](#conditionalExpression) | Alpha validation should be applied if the condition is matched in the `conditionalExpression' function.  |

## allowWhiteSpace
| |
|--- |
| This will allow whitespace in particular control property.The default value is `false`. |
| allowWhiteSpace : boolean |
| `export class Country {  @alpha({ allowWhiteSpace : true }) stateName: string; }` |





