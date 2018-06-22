import { Pipe, PipeTransform } from "@angular/core";
import { ApplicationConfiguration } from "../../core"
import { DatePipe } from "@angular/common";
@Pipe({ name: 'valueOf' })
export class ValueOfPipe implements PipeTransform {
  format: string;
  seperator: string;
  defaultDateFormat: string;
  dateInternationalization: { [key: string]: any };
  constructor(private datePipe: DatePipe) {
      var internationalization = ApplicationConfiguration.get('internationalization');
      this.dateInternationalization = ApplicationConfiguration.get('internationalization.date');
    this.defaultDateFormat = internationalization.viewDefaultDateFormatName;
    this.format = (this.defaultDateFormat) ? this.dateInternationalization[this.defaultDateFormat] : this.dateInternationalization["shortDate"];
    this.seperator = this.dateInternationalization.seperator;
  }
  transform(row: any, filed: string, format: string): any {
      if (format) {
          format = this.dateInternationalization[format];
      }
    if (row[filed]) {
      var date = this.makeDateString(row[filed],format);
      return date;
    }
    return row[filed];
  }

  makeDateString(value: any,format:string): string {
      if (/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/gm.test(value)) {
      var date = new Date(value);
      if (date.toString() !== "Invalid Date") {
        let dateString: string = this.datePipe.transform(value,format || this.format);
        return dateString;
      }
      else
        return value;
    }
    return value;
  }
}
