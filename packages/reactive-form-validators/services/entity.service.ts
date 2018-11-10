
export class EntityService {

  clone(jsonObject:{[key:string]:any}){
      let jObject:any = {};
      for(var columnName in jsonObject)
      {
         if(Array.isArray(jsonObject[columnName])){
            jObject[columnName] = [];
            for(let row of jsonObject[columnName]){
                jObject[columnName].push(this.clone(row))
            }
          }else if(typeof jsonObject[columnName] == "object")
              jObject[columnName] = this.clone(jsonObject[columnName]);
           else
              jObject[columnName] = jsonObject[columnName]    
      }
    return jObject;
  }

}
