import { Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
    name: 'filter',  
    pure: false  
})  
  
export class FilterPipe implements PipeTransform {  
    transform(items: any[], searchText:string,key:string): any {  
        if (!items || !searchText) {  
            return items;  
        }  
        return items.filter(item => item[key].indexOf(searchText) !== -1);  
    }  
} 