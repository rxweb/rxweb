[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	

[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	

Generics are used to design classes and functions that differentiate in specification of
one or more types. One of the common use of generics are list functions

List Functions
It provides different list methods for manipulation of data in collection, There are list of methods which can be used in typescript for interacting with data which are similar to LINQ functions in C#

* [Add](#add)
* [AddRange](#addrange)
* [All](#all)
* [Any](#any)
* [Average](#average)
* [Contains](#contains)
* [Count](#count)
* [Concat](#concat)
* [Where](#where)
* [Distinct](#distinct)
* [DistinctBy](#distinctby)
* [Shift](#shift)
* [First](#first)
* [FirstOrDefault](#firstordefault)
* [GroupBy](#groupby)
* [Insert](#insert)
* [Pop](#pop)
* [Last](#last)
* [LastOrDefault](#lastordefault)
* [Max](#max)
* [MaxBy](#maxby)
* [OrderBy](#orderby)
* [OrderByDescending](#orderbydescending)
* [Remove](#remove)
* [RemoveAt](#removeat)
* [RemoveAll](#removeall)
* [Single](#single)
* [SingleOrDefault](#singleordefault)
* [Skip](#skip)
* [Sum](#sum)
* [Take](#take)

## Add
It is used to add collection to the list.

```js
   export class ListAddComponent implements OnInit {
    result:any;
     items: List<UserModel> = new List<UserModel>([{ name: 'John' }]);

   ngOnInit() {
    this.items.add({name:"Bharat"});
  }
```

## AddRange
It is used to add range of collection to the list

```js
   export class ListAddRangeComponent implements OnInit {
    result:any;
     items: List<UserModel> = new List<UserModel>([{ name: 'John' }]);

   ngOnInit() {
    this.items.addRange([{name:"Bharat"},{name:"David"}]);
  }  
}
```

## All
It is used to check whether all the elements satisfy the particular condition.

```js
export class ListAllComponent implements OnInit {
    result:any;
     items: List<UserModel> = new List<UserModel>([{ name: 'John' },{name:"David"}]);

   ngOnInit() {
    this.result = this.items.all(x=>x.name.startsWith("J"));
  }  
}
```

## Any
It is used to check whether any of the elements satisfy the particular condition.


```js
export class ListAnyComponent implements OnInit {
    result:any;
     items: List<UserModel> = new List<UserModel>([{ name: 'John' },{name:"David"}]);

   ngOnInit() {
    this.result = this.items.any(x=>x.name.startsWith("J"));
  }  
}
```

## Average
It is used to get average of the particular entity of the elements.

```js
export class ListAverageComponent implements OnInit {
    result:any;
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.average(x=>x.grades);
  }  
}
```

## Contains
It is used to check whether the collection contains the element specified in the condition.

```js
export class ListContainsComponent implements OnInit {
    result:any;
    items: List<UserModel> = new List<UserModel>([{ name: 'John' },{name:"David"}]);

   ngOnInit() {
    this.result = this.items.contains(x=>x.name == "John");
  }  
 }
```

## Count
It is used to get count of the particular element in the collection.

```js
export class ListCountComponent implements OnInit {
    result:any;
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.count(x=>x.grades >= 60);
  }  
}
```

## Concat
It is used to concat collection items in data.

```js
export class ListConcatComponent implements OnInit {
    result:any;
    items: List<UserModel> = new List<UserModel>([{ name: 'John' },{name:"David"}]);

   ngOnInit() {
    this.result = this.items.concat([{"name":"John"},{"name":"David"}]);
  }  
}
```

## Where
It is used to return value based upon where condition.

```js
export class ListWhereComponent implements OnInit {
    result:any;
    items: List<UserModel> = new List<UserModel>([{ name: 'John' },{name:"David"}]);

    ngOnInit() {
    this.result = this.items.where(x=>x.name == "John");
  }  
}
```

## Distinct
It is used to get distinct value of elements.

```js
export class ListDistinctComponent implements OnInit {
    result:any;
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.distinct();
  }  
}
```

## DistinctBy
It is used to get distinct value of elements based upon entity.

```js
export class ListDistinctByComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.distinctBy(x=>x.grades);
  }  
}
```

## Shift
It is used to remove element at first index.

```js
export class ListShiftComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
   this.items.shift();
  }  
}
```

## First
It is used to get first value of the elements based on condition.

```js
export class ListFirstComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.first(x=>x.grades == 68);
  }  
}
```

## FirstOrDefault
It is used to get FirstOrDefault value of the elements based on condition.

```js
export class ListFirstOrDefaultComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.firstOrDefault(x=>x.grades == 68);
  }  
}
```

## GroupBy
It is used to get to get value of the elements based on groupBy entity.

```js
export class ListGroupByComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.groupBy(x=>x.grades);
  }  
}
```

## Insert
It is used to insert element at the mentioned index.

```js
export class ListInsertComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
     this.items.insert(1,{ grades: 68 });
  }  
}
```

## pop
It is used to delete last element in the list.

```js
export class ListPopComponent implements OnInit {
    result:any;
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
   this.items.pop();
  }  
}
```

## last
It is used to get last value of the elements based on condition.

```js
export class ListLastComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{name:"John"},{name:"David"}]);

   ngOnInit() {
   this.result =  this.items.last(x=>x.name == "John");
  }  
}
```

## lastOrDefault
It is used to get lastOrDefault value of the elements based on condition.

```js
export class ListLastOrDefaultComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{name:"John"},{name:"David"}]);

   ngOnInit() {
   this.result =  this.items.lastOrDefault(x=>x.name == "John");
  }  
}
```

## max
It is used to return max value from the collection.

```js
export class ListMaxComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.max();
  }  
}
```

## maxBy
It is used to return max value from the collection based on entity.

```js
export class ListMaxByComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.maxBy(x=>x.grades);
  }  
}
```

## orderBy
It is used to get to get value of the elements based on orderBy entity.

```js
export class ListOrderByComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.orderBy(x=>x.grades);
  }  
}
```

## orderByDescending
It is used to get to get value of the elements based on orderBy entity in descending order.

```js
export class ListOrderByDescendingComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.orderByDescending(x=>x.grades);
  }  
}
```

## remove
it is used remove a particular element from the collection.

```js
export class ListRemoveComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.items.remove({ grades: 68 });
  }  
}
```

## removeAt
it is used remove a particular element from the collection.

```js
export class ListRemoveAtComponent implements OnInit {
    result:any;
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
   this.result = this.items.removeAt(1);
  }  
}
```

## removeAll
it is used remove all elements from the collection.
```js
export class ListRemoveAllComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.items.removeAll(x=>x.grades == 68);
  }  
}
```

## single
It is used to get single value of the elements based on condition.
```js
export class ListSingleComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.single(x=>x.grades == 68);;
  }  
}
```


## singleOrDefault
It is used to get single or default value of the elements based on condition.
```js
export class ListSingleOrDefaultComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.singleOrDefault(x=>x.grades == 68);
  }  
}
```

## skip
It is used to get skip element at a particular index.
```js
export class ListSkipComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result =  this.items.skip(1);
  }  
}
```

## sum
It is used to get sum of all elements.
```js
export class ListSumComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.items.sum(x=>x.grades);
  }  
}
```

## take
It is used to get take element at a particular index.

```js
export class ListTakeComponent implements OnInit {
    result:any;  
    items: List<UserModel> = new List<UserModel>([{ grades: 68 },{grades:89},{grades:30},{grades:90}]);

   ngOnInit() {
    this.result = this.items.take(1);
  }  
}
```

