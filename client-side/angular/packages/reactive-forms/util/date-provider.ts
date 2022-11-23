import { ReactiveFormConfig } from "./reactive-form-config";
import {ApplicationUtil } from './app-util'
const ISO_DATE_REGEX = /^(\d{4}-\d{1,2}-\d{1,2})$/;
export class DateProvider{

  isDate(value: any): Boolean {
    return value instanceof Date && !isNaN(value.valueOf());
  }

    private getRegex(dateFormat:string) : RegExp{
      var regExp:string;
      switch(dateFormat){
            case 'ymd':
            regExp = "^(?:[0-9]{4})-(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])$";
            break;
            case 'dmy':
            regExp = "^(3[01]|[12][0-9]|0?[1-9])-(1[0-2]|0?[1-9])-(?:[0-9]{2})?[0-9]{2}$";
            break;
            case 'mdy':
            regExp = "^(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])-(?:[0-9]{2})?[0-9]{2}$";
            break;
      }
      return new RegExp(regExp);
    }

    regex(){
      var regExp:RegExp;
      if(ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.internationalization && ReactiveFormConfig.json.internationalization.dateFormat  && ReactiveFormConfig.json.internationalization.seperator)
        regExp = this.getRegex(ReactiveFormConfig.json.internationalization.dateFormat)
      else
        regExp = (ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.baseConfig && ReactiveFormConfig.json.baseConfig.dateFormat) ? this.getRegex(ReactiveFormConfig.json.baseConfig.dateFormat) : this.getRegex("mdy");
      return regExp;
    }

  getDate(value:string | Date,isBaseFormat:boolean = false): Date{
    let year:any,month:any,day:any;
    if(!this.isDate(value)){
      let seperator:string;
      let dateFormat:string;
      if(ISO_DATE_REGEX.test(<string>value)){
        seperator = "-";
        dateFormat = "ymd"
      }else{
        seperator = ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.baseConfig && ReactiveFormConfig.json.baseConfig.seperator ? ReactiveFormConfig.json.baseConfig.seperator : "/";
        dateFormat = ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.baseConfig && ReactiveFormConfig.json.baseConfig.dateFormat ? ReactiveFormConfig.json.baseConfig.dateFormat : "mdy";
      }
      
      if(!isBaseFormat && ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.internationalization && ReactiveFormConfig.json.internationalization.dateFormat  && ReactiveFormConfig.json.internationalization.seperator)
      {
        seperator = ReactiveFormConfig.json.internationalization.seperator;
        dateFormat = ReactiveFormConfig.json.internationalization.dateFormat;
      }
        switch(dateFormat){
            case 'ymd':
            [year, month, day] = (<String>value).split(seperator).map((val: string) => +val);
            break;
            case 'dmy':
            [day,month,year] = (<String>value).split(seperator).map((val: string) => +val);
            break;
            case 'mdy':
            [month,day,year] = (<String>value).split(seperator).map((val: string) => +val);
            break;
        }

        return new Date(year,month-1,day);
    }else
      return <Date>value;
  }

  isValid(value:string | Date) : Boolean{
    if(typeof value == "string"){
      if(ISO_DATE_REGEX.test(<string>value))
        return true;
      let seperator = '/'
      if(ReactiveFormConfig.json && ReactiveFormConfig.json.internationalization && ReactiveFormConfig.json.internationalization.seperator)
        seperator = ReactiveFormConfig.json.internationalization.seperator;
      value = value.replace(seperator,'-').replace(seperator,'-');
      return this.regex().test(value);
    }else
      return this.isDate(value);
  }

  getConfigDateValue(config:any){
    let date = config.value;
    if(config.value && typeof config.value == "string"){
      date = this.getDate(config.value,true);
    }
    return date;
  }

   getCompareDate(config:any,control:any){
          let date = this.getConfigDateValue(config);
          if(config.fieldName){
            let checkControl : any = ApplicationUtil.getFormControl(config.fieldName,control);
              if(checkControl && checkControl.value){
                  date = this.getDate(checkControl.value)
                  }
                }
        return date;
  }
}
