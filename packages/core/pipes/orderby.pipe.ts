import { Pipe, PipeTransform } from "@angular/core";
import {ApplicationConfiguration } from "../applicationconfiguration"
@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
    transform(source: any, columnName: any, sortOrder: any): any {
       var data  = source.sort((item1: any, item2: any) => {
            let a = item1[columnName];
            let b = item2[columnName];
            if (sortOrder)
                return this.comparator(a, b);
            else
                return this.comparator(b, a);
        });
       return data;
    } 

    private comparator(firstValue: any, secondValue: any): number {
        if (!firstValue) {
            if (secondValue)
                firstValue = typeof secondValue === "number" ? 0 : typeof secondValue === "boolean" ? false : "";
            else {
                firstValue = ''; secondValue = '';
            }
        }
        if (!secondValue)
            secondValue = typeof firstValue === "number" ? 0 : typeof firstValue === "boolean" ? false : "";
        if ((isNaN(parseFloat(firstValue)) || !isFinite(firstValue)) || (isNaN(parseFloat(secondValue)) || !isFinite(secondValue))) {
            if (typeof firstValue === "boolean" && typeof secondValue === "boolean") {
                if (firstValue === secondValue) return -1;
                if (firstValue !== secondValue) return 1;
            } else {
                if (firstValue.toLowerCase() < secondValue.toLowerCase()) return -1;
                if (firstValue.toLowerCase() > secondValue.toLowerCase()) return 1;
            }
        }
        else {
            if (parseFloat(firstValue) < parseFloat(secondValue)) return -1;
            if (parseFloat(firstValue) > parseFloat(secondValue)) return 1;
        }
        return 0;
    }
}