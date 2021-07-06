[![Build Status](https://dev.azure.com/ajayojha/rxweb/_apis/build/status/rxweb-CI?branchName=master)](https://dev.azure.com/ajayojha/rxweb/_build/latest?definitionId=39&branchName=master)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/rxweb/rxweb)	

## How Code Looks Like?

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

## Through FormGroup Class
```js
let formGroup: IFormGroup<User> = new FormGroup(<ControlProp<User>>{
    firstName: new FormControl((<ControlState<string>>"")),
}) as IFormGroup<User>;
```

## Through FormArray Class
```js
let formArray: IFormGroup<Skill> = new FormArray([
    new FormGroup(<ControlProp<Skill>>{
    name: new FormControl((<ControlState<string>>"")),
  }) as IFormGroup<Skill>
])
```

## Through FormControl Class
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
