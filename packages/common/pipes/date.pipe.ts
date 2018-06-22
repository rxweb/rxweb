import { Pipe, PipeTransform } from "@angular/core";
import { ApplicationConfiguration } from "../../core"
@Pipe({ name: 'rxDate' })
export class RxDatePipe implements PipeTransform {
    format: string;
    seperator: string;
    constructor() {
        var date = ApplicationConfiguration.get('internationalization.date');
        this.format = date.format;
        this.seperator = date.seperator;
    }
    transform(value: any): any {
        if (value) {
            var date = this.makeDateString(new Date(value));
            return date;
        }
        return undefined;
    }

    makeDateString(value: Date): string {
        let dateString: string = '';
        for (let character of this.format) {
            switch (character) {
                case 'm':
                    dateString += dateString.length == 0 ? (value.getMonth() + 1).toString() : this.seperator + (value.getMonth() + 1)
                    break;
                case 'd':
                    dateString += dateString.length == 0 ? (value.getDate()).toString() : this.seperator + (value.getDate())
                    break;
                case 'y':
                    dateString += dateString.length == 0 ? (value.getFullYear()).toString() : this.seperator + (value.getFullYear())
                    break;
            }
        }
        return dateString;
    }
}
