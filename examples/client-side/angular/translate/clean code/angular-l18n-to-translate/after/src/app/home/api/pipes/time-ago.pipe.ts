import { Pipe, PipeTransform } from '@angular/core';
import { sanitize } from '@rxweb/translate';
import * as moment from "moment";

@sanitize({ name: 'timeAgo' })
@Pipe({ name: 'formatNumber' })
export class TimeAgoPipe implements PipeTransform {
    transform(value: number): string {
        console.log(value)
        return moment(value).fromNow(); 
    }
}
