import { Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
    name: 'MergeDash',  
    pure: false  
})  
  
export class MergeDashPipe implements PipeTransform {  
    transform(value:string): any {  
        if (!value) {  
            return value;  
        }  
        let splitedArray = value.split("-");
        let newString:string = "";
        splitedArray.forEach(element => {
            newString+= element.match(/[a-z]+/gi).map(function (word) { return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase() }).join('') + " ";
        });
        return newString;
    }  
} 