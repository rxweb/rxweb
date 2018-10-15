
export class EntityService {

  clone = (source: {}) => Object.assign({}, source);

  merge = (target: any, ...sources: any[]) => Object.assign(target, ...sources);
 
}
