import { Pipe, PipeTransform } from "@angular/core";
import { ApplicationConfiguration } from "@rx/core"
import { DatePipe } from "@angular/common";
@Pipe({ name: 'valueOf' })
export class ValueOfPipe implements PipeTransform {
  format: string;
  seperator: string;
  defaultDateFormat: string;
  constructor(private datePipe: DatePipe) {
    var internationalization = ApplicationConfiguration.get('internationalization');
    var date = ApplicationConfiguration.get('internationalization.date');
    this.defaultDateFormat = internationalization.viewDefaultDateFormatName;
    this.format = (this.defaultDateFormat) ? date[this.defaultDateFormat] : date["shortDate"];
    this.seperator = date.seperator;
  }
  transform(row: any, filed: string, dataType: string): any {
    if (row[filed]) {
      var date = this.makeDateString(row[filed]);
      return date;
    }
    return row[filed];
  }

  makeDateString(value: any): string {
    if (!(/^[\d]+$/i.test(value) || /^[\d]*(\.\d+)?$/i.test(value) || /^[A-Za-z0-9\s]+$/i.test(value) || /[!@#$%^&*(),.?"{}|<>]/g.test(value))) {
      var date = new Date(value);
      if (date.toString() !== "Invalid Date") {
        let dateString: string = this.datePipe.transform(value, this.format);
        return dateString;
      }
      else
        return value;
    }
    return value;
  }
}
