import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicFormBuildConfig, DynamicFormConfiguration, RxDynamicFormBuilder } from "@rxweb/reactive-dynamic-forms";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    serverData = [{
        name: "email",
        type: "text",
        ui: {
            viewMode: {
                advance: {
                    div: ["col-md-6", "col-sm-6"]
                }
            },
            img:'abc.jpg',
            //label: "Email",
            placeholder: "Email",
        }
    },
    {
        name: "password",
        type: "password",
        ui: {
            viewMode: {
                advance: {
                    div: ["col-md-6", "col-sm-6"]
                }
            },
            label: "Password",
            placeholder: "Password"
        }
    },
    {
        name: "address",
        type: "text",
        ui: {
            viewMode: {
                advance: {
                    div: ["col-md-12", "col-sm-12"]
                }
            },
            label: "Address",
            placeholder: "1234 Main St"
        }
    },
    {
        name: "address2",
        type: "text",
        ui: {
            viewMode: {
                advance: {
                    div: ["col-md-12", "col-sm-12"]
                }
            },
            label: "Address 2",
            placeholder: "Apartment, studio or floor"
        }
    },
    {
        name: "city",
        type: "text",
        ui: {
            viewMode: {
                advance: {
                    div: ["col-md-6", "col-sm-6"]
                }
            },
            label: "City"
        }
    },
    {
        name: "state",
        type: "select",
        source: [{ value: 1, text: "..." }],
        ui: {
            viewMode: {
                advance: {
                    div: ["col-md-4", "col-sm-4"]
                }
            },
            label: "State",
            placeholder: "Choose"
        }
    },
    {
        name: "zip",
        type: "text",
        ui: {
            viewMode: {
                advance: {
                    div: ["col-md-2", "col-sm-2"]
                }
            },
            label: "Zip"
        }
    },
    {
        name: "check",
        type: "checkbox",
        source: [{ value: 1, text: "Check me out" }],
        ui: {
            viewMode: {
                advance: {
                    div: ["col-md-12", "col-sm-12"]
                }
            }
        }
    }
    ]

    uiBindings = [["email", "password"], "address", "address2", ["city", "state", "zip"], "check"];
    dynamicFormBuildConfig: DynamicFormBuildConfig;

    constructor(private formBuilder: RxDynamicFormBuilder) { }
    ngOnInit() {
        debugger;
        this.dynamicFormBuildConfig = this.formBuilder.formGroup(this.serverData, {});
    }
}


