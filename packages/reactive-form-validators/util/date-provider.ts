import { ReactiveFormConfig } from "./reactive-form-config";

export class DateProvider{
    regex(){
      var regExp:RegExp;
      if(ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.internationalization && ReactiveFormConfig.json.internationalization.dateFormat  && ReactiveFormConfig.json.internationalization.seperator)
      {
        var seperator = ReactiveFormConfig.json.internationalization.seperator;
        switch(ReactiveFormConfig.json.internationalization.dateFormat){
            case 'ymd':
            regExp = /^(\d{4}-\d{1,2}-\d{1,2})$/;
            break;
            case 'dmy':
            case 'mdy':
            regExp = /^(\d{1,2}-\d{1,2}-\d{4})$/;
            break;
      }
      }
    return regExp;
    }

  getDate(value:string){
    let year,month,day;
    if(ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.internationalization && ReactiveFormConfig.json.internationalization.dateFormat  && ReactiveFormConfig.json.internationalization.seperator)
      {
        var seperator = ReactiveFormConfig.json.internationalization.seperator;
        switch(ReactiveFormConfig.json.internationalization.dateFormat){
            case 'ymd':
            [year, month, day] = value.split(seperator).map((val: string) => +val);
            break;
            case 'dmy':
            [day,month,year] = value.split(seperator).map((val: string) => +val);
            break;
            case 'mdy':
            [month,day,year] = value.split(seperator).map((val: string) => +val);
            break;
      }
      }
    return new Date(year,month-1,day);
  }

  isValid(value:string){
    value = value.replace(ReactiveFormConfig.json.internationalization.seperator,'-').replace(ReactiveFormConfig.json.internationalization.seperator,'-');
    return this.regex().test(value);
  }
}
