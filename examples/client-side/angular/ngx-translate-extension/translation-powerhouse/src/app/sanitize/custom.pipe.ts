import { Pipe, PipeTransform } from '@angular/core';
import { sanitize } from '@rxweb/translate';

@sanitize({name:'custom'})
@Pipe({ name: 'custom' })
export class CustomPipe implements PipeTransform {
    transform(value: number, emoji: string = ""): string {
        return `${value} Custom Pipe ${emoji}`;
    }
}
