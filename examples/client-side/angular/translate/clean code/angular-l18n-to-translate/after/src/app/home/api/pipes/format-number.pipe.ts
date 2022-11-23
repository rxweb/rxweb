import { Pipe, PipeTransform } from '@angular/core';
import { sanitize } from '@rxweb/translate';

@sanitize({ name: 'formatNumber' })
@Pipe({ name: 'formatNumber' })
export class FormatNumberPipe implements PipeTransform {
    transform(value: number): string {
        return Math.floor(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
}
