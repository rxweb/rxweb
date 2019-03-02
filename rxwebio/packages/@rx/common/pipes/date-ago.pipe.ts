import { Pipe, PipeTransform } from "@angular/core";
import { ApplicationConfiguration } from "@rx/core"
@Pipe({ name: 'rxDateAgo' })    
export class RxDateAgoPipe implements PipeTransform {
    //format: string;
    //seperator: string;
    constructor() {
        //var date = ApplicationConfiguration.get('internationalization.date');
        //this.format = date.format;
        //this.seperator = date.seperator;
    }
    transform(value: any): any {
        if (value) {
            let dateString: Date = this.getDate(value);
            var timeAgo = this.makeTimeAgoString(dateString);
            return timeAgo;
        }
        return undefined;
    }
    getDate(value: string): Date {
        let splitedDate: string[] = value.split("-");
        let dateData = new Date(value);
        //switch (this.format) {
        //    case 'dmy':
        //        dateData = new Date(parseInt(splitedDate[2]), parseInt(splitedDate[1]) - 1, parseInt(splitedDate[0]))
        //        break;
        //    case 'mdy':
        //        dateData = new Date(parseInt(splitedDate[1]) - 1, parseInt(splitedDate[2]), parseInt(splitedDate[0]))
        //        break;
        //    case 'ydm':
        //        dateData = new Date(parseInt(splitedDate[0]), parseInt(splitedDate[2]), parseInt(splitedDate[1])-1)
        //        break;
        //    case 'myd':
        //        dateData = new Date(parseInt(splitedDate[1]) - 1, parseInt(splitedDate[0]), parseInt(splitedDate[2]))
        //        break;
        //    case 'dym':
        //        dateData = new Date(parseInt(splitedDate[2]), parseInt(splitedDate[0]), parseInt(splitedDate[1])-1)
        //        break;
        //    case 'ymd':
        //        dateData = new Date(parseInt(splitedDate[0]), parseInt(splitedDate[1]) - 1, parseInt(splitedDate[0]))
        //        break;
        //}
        return dateData;
    }
    makeTimeAgoString(value: Date): string {
        let timeAgoString: string = '';
        let nowDate: Date = new Date()
        let seconds = Math.round(Math.abs((nowDate.getTime() - value.getTime()) / 1000));
        let minutes = Math.round(Math.abs(seconds / 60));
        let hours = Math.round(Math.abs(minutes / 60));
        let days = Math.round(Math.abs(hours / 24));
        let months = Math.round(Math.abs(days / 30.416));
        let years = Math.round(Math.abs(days / 365));
        if (seconds <= 45) {
            timeAgoString = 'a few seconds ago';
        }
        else if (seconds <= 90) {
            timeAgoString = 'a minute ago';
        }
        else if (minutes <= 45) {
            return minutes + ' minutes ago';
        }
        else if (minutes <= 90) {
            return 'an hour ago';
        }
        else if (hours <= 22) {
            return hours + ' hours ago';
        }
        else if (hours <= 36) {
            return 'a day ago';
        }
        else if (days <= 25) {
            return days + ' days ago';
        }
        else if (days <= 45) {
            return 'a month ago';
        }
        else if (days <= 345) {
            return months + ' months ago';
        }
        else if (days <= 545) {
            return 'a year ago';
        }
        else {
            return years + ' years ago';
        }
        return timeAgoString;
    }
}