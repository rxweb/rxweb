[![Build Status](https://dev.azure.com/ajayojha/rxweb/_apis/build/status/rxweb-CI?branchName=master)](https://dev.azure.com/ajayojha/rxweb/_build/latest?definitionId=39&branchName=master)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/rxweb/rxweb)	


![image](https://user-images.githubusercontent.com/20392302/85145383-1bbefb80-b26a-11ea-81f9-26c26afea2f7.png)


<img src="https://user-images.githubusercontent.com/20392302/85050307-83663f80-b1b3-11ea-97e0-f3e395e862f2.gif"/>


## How Code Looks Like?
<img src="https://user-images.githubusercontent.com/20392302/85085119-6ef66700-b1f4-11ea-852e-052de1d85ce2.png"/>

## Through FormGroup Class
![formgroup](https://user-images.githubusercontent.com/20392302/86140589-a4f9ec00-bb0e-11ea-82b0-9b9c31545316.png)

## Through FormArray Class
![formarray](https://user-images.githubusercontent.com/20392302/86140601-a7f4dc80-bb0e-11ea-94fd-26c423136b37.png)

## Through FormControl Class
![formcontrol](https://user-images.githubusercontent.com/20392302/86140611-a9bea000-bb0e-11ea-92d2-d91b948daafe.png)

## Code
#### How Code Looks Like?

```js
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray
} from "@angular/forms";
import { User } from "./models/user";
import { Address } from "./models/address";
import { Skill } from "./models/skill";
import { IFormBuilder, IFormGroup, IFormArray } from "@rxweb/types";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  formGroup: IFormGroup<User>;
  formBuilder: IFormBuilder;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group<User>({
      firstName: ["", [Validators.required]],
      address: this.formBuilder.group<Address>({
        countryName: ["", Validators.required]
      }),
      skills: this.formBuilder.array<Skill>([
        this.formBuilder.group({
          name: ["", Validators.required]
        })
      ])
    });
  }
}
```

#### Through FormGroup Class

```js
let formGroup: IFormGroup<User> = new FormGroup(<ControlProp<User>>{
    firstName: new FormControl((<ControlState<string>>"")),
}) as IFormGroup<User>;
```

#### Through FormArray Class

```js
let formArray: IFormGroup<Skill> = new FormArray([
    new FormGroup(<ControlProp<Skill>>{
    name: new FormControl((<ControlState<string>>"")),
  }) as IFormGroup<Skill>
])
```

#### Through FormControl Class

```js
let formControl: FormControl<string> = new FormControl(<ControlState<string>>"");
```

## Refer Type Mismatch Errors
* [FormGroup](https://docs.rxweb.io/strongly-typed/angular-strongly-typed#formgroup)
* [FormControl](https://docs.rxweb.io/strongly-typed/angular-strongly-typed#formcontrol)
* [Nested FormGroup](https://docs.rxweb.io/strongly-typed/angular-strongly-typed#nested-formgroup)
* [Nested FormArray](https://docs.rxweb.io/strongly-typed/angular-strongly-typed#nested-formarray)

## Contributing
If you are thinking to make rxweb framework better, that's truly great. You can contribute from a single character to core architectural work or significant documentation – all with the goal of making a robust rxweb framework which helps for everyone in their projects. Even if you are don’t feel up to writing code or documentation yet, there are a variety of other ways that you can contribute like reporting issues to testing patches.

Check out the <a href="https://rxweb.io/community/where_to_start_contributing">docs</a> on how you can put your precious efforts on the rxweb framework and contribute in the respective area.

## Need Help
We highly recommend for help please ask your questions on our <a href="https://gitter.im/rxweb-project/rxweb?source=orgpage">gitter/rxweb-project</a> to get quick response from us. Otherthan our gitter channel you can ask your question on <a
href="https://stackoverflow.com/search?q=rxweb">StackOverflow</a> or <a href="https://github.com/rxweb/rxweb/issues/new/choose">create a new issue</a> in our Github Repository.

For, issue please refer our issue workflow wiki for better visibility our issue process.

## Feature Request
You can request a new feature by submitting an issue to our <a href="https://github.com/rxweb/rxweb">GitHub Repository</a>. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it.

# License
MIT
